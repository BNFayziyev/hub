import concurrent.futures
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('hub', Path(__file__).with_name('hub.py'))
hub = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hub)


class CoordinationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.remote = self.root / 'remote.git'
        self.remote.mkdir()
        hub.git(self.remote, 'init', '--bare', '-q')
        self.clients = []
        for name in ('a', 'b'):
            repo = self.root / name
            repo.mkdir()
            hub.git(repo, 'init', '-q')
            hub.git(repo, 'remote', 'add', 'origin', str(self.remote))
            (repo / 'projects').mkdir()
            for slug in ('demo', 'other', 'synapse', 'synapse_promo'):
                (repo / 'projects' / f'{slug}.md').write_text('# test\n')
            self.clients.append(repo)

    def claim(self, number, project='demo'):
        return hub.coordinate(self.clients[number], 'claim', project=project,
                              owner=f'AI/PC/{number}', summary='test')

    def test_simultaneous_claim_has_one_winner(self):
        with concurrent.futures.ThreadPoolExecutor(2) as pool:
            futures = [pool.submit(self.claim, i) for i in range(2)]
            winners, losers = [], []
            for future in futures:
                try:
                    winners.append(future.result())
                except RuntimeError as exc:
                    losers.append(str(exc))
        self.assertEqual(len(winners), 1)
        self.assertEqual(len(losers), 1)
        self.assertIn('Band:', losers[0])
        self.assertEqual(len(hub.coordinate(self.clients[0], 'status')['tasks']), 1)

    def test_owner_block_finish_and_reclaim(self):
        entry = self.claim(0)
        args = dict(task=entry['id'], owner=entry['owner'], result='commit abc', tests='passed', next_step='none')
        with self.assertRaisesRegex(RuntimeError, 'mos emas'):
            hub.coordinate(self.clients[1], 'finish', **{**args, 'owner': 'wrong'})
        hub.coordinate(self.clients[0], 'block', **args)
        with self.assertRaisesRegex(RuntimeError, 'Band:'):
            self.claim(1)
        hub.coordinate(self.clients[0], 'finish', **args)
        self.assertEqual(self.claim(1)['status'], 'active')

    def test_independent_projects_and_shared_directory(self):
        self.claim(0, 'synapse')
        with self.assertRaisesRegex(RuntimeError, 'Band:'):
            self.claim(1, 'synapse_promo')
        self.assertEqual(self.claim(1, 'other')['status'], 'active')

    def test_failed_remote_does_not_grant_claim(self):
        hub.git(self.clients[0], 'remote', 'set-url', 'origin', str(self.root / 'missing'))
        with self.assertRaises(RuntimeError):
            self.claim(0)

    def test_parallel_independent_claims_preserve_both(self):
        with concurrent.futures.ThreadPoolExecutor(2) as pool:
            a = pool.submit(self.claim, 0, 'demo')
            b = pool.submit(self.claim, 1, 'other')
            a.result()
            b.result()
        self.assertEqual(len(hub.coordinate(self.clients[0], 'status')['tasks']), 2)

    def test_cancel_and_empty_handoff(self):
        entry = self.claim(0)
        args = dict(task=entry['id'], owner=entry['owner'], result='cancelled', tests='not run', next_step='none')
        with self.assertRaisesRegex(RuntimeError, 'bo'):
            hub.coordinate(self.clients[0], 'finish', **{**args, 'tests': ' '})
        hub.coordinate(self.clients[0], 'cancel', **args)
        self.assertEqual(self.claim(1)['status'], 'active')

    def test_validator_detects_bad_index_and_conflict(self):
        repo = self.clients[0]
        (repo / 'INDEX.md').write_text('[missing](projects/missing.md)\n')
        (repo / 'conflict.md').write_text('<<<<<<< HEAD\na\n=======\nb\n>>>>>>> other\n')
        errors, _ = hub.validate(repo)
        self.assertTrue(any('karta yo' in e for e in errors))
        self.assertTrue(any('merge konflikti' in e for e in errors))


if __name__ == '__main__':
    unittest.main()
