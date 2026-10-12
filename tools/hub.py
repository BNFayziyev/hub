"""Hub coordination: Python 3.10+, Git; no third-party dependencies."""
import argparse
import datetime as dt
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import uuid

ROOT = Path(__file__).resolve().parents[1]
REF = 'refs/heads/hub-coordination'
GROUPS = {'synapse_promo': 'synapse', 'synapse_instagram': 'synapse', 'tejamkor': 'hub', 'hubweb': 'hub'}


def git(root, *args, check=True):
    p = subprocess.run(['git', '-C', str(root), *args], text=True,
                       encoding='utf-8', errors='replace', capture_output=True,
                       env={**os.environ, 'GIT_TERMINAL_PROMPT': '0'})
    if check and p.returncode:
        raise RuntimeError(p.stderr.strip() or p.stdout.strip())
    return p


def now():
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds')


def coordinate(root, action, project=None, owner=None, task=None, summary=None,
               result=None, tests=None, next_step=None):
    """Remote fast-forward push is the atomic claim; never start before success."""
    remote = git(root, 'remote', 'get-url', 'origin').stdout.strip()
    for value in (owner, summary) if action == 'claim' else (() if action == 'status' else (owner, task, result, tests, next_step)):
        if not value or not value.strip():
            raise RuntimeError('Majburiy qiymat bo\'sh bo\'lmasin.')
    if project and not re.fullmatch(r'[a-zA-Z0-9_-]+', project):
        raise RuntimeError('Loyiha nomi noto\'g\'ri.')
    if action == 'claim' and not (root / 'projects' / f'{project}.md').is_file():
        raise RuntimeError('Loyiha kartasi topilmadi; avval karta yarating va yuboring.')
    for attempt in range(6):
        with tempfile.TemporaryDirectory(prefix='hub-coordination-') as folder:
            repo = Path(folder)
            git(repo, 'init', '-q')
            git(repo, 'remote', 'add', 'origin', remote)
            exists = git(repo, 'ls-remote', '--exit-code', 'origin', REF, check=False)
            if exists.returncode not in (0, 2):
                raise RuntimeError(exists.stderr.strip())
            if exists.returncode == 0:
                git(repo, 'fetch', '-q', 'origin', REF)
                git(repo, 'checkout', '-q', '--detach', 'FETCH_HEAD')
                state = json.loads((repo / 'state.json').read_text(encoding='utf-8'))
                if state.get('version') != 1:
                    raise RuntimeError('Noma\'lum coordination versiyasi.')
            else:
                state = {'version': 1, 'tasks': []}
            if action == 'status':
                return state
            active = [t for t in state['tasks'] if t['status'] in ('active', 'blocked')]
            if action == 'claim':
                resource = GROUPS.get(project, project)
                busy = next((t for t in active if GROUPS.get(t['project'], t['project']) == resource), None)
                if busy:
                    raise RuntimeError(f"Band: {busy['id']} | {busy['owner']} | {busy['summary']}")
                entry = {'id': uuid.uuid4().hex, 'project': project, 'owner': owner,
                         'summary': summary, 'status': 'active', 'started': now()}
                state['tasks'].append(entry)
            else:
                entry = next((t for t in active if t['id'] == task), None)
                if not entry or entry['owner'] != owner:
                    raise RuntimeError('Faol vazifa va egasi mos emas.')
                entry.update(status={'finish': 'done', 'block': 'blocked',
                                     'cancel': 'cancelled'}[action], updated=now(),
                             result=result, tests=tests, next_step=next_step)
            (repo / 'state.json').write_text(json.dumps(state, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
            git(repo, 'add', '--', 'state.json')
            git(repo, '-c', 'user.name=Hub Coordinator', '-c', 'user.email=hub@localhost',
                '-c', 'commit.gpgsign=false', 'commit', '-q', '-m', f"hub: {action} {entry['id']}")
            pushed = git(repo, 'push', 'origin', f'HEAD:{REF}', check=False)
            if pushed.returncode == 0:
                return entry
            # Another machine may have won. Re-read remote and re-check ownership.
            if not any(s in pushed.stderr for s in ('rejected', 'cannot lock ref', 'failed to update ref')):
                raise RuntimeError('Push tasdiqlanmadi. Ishni boshlamang; status bilan tekshiring.\n' + pushed.stderr)
    raise RuntimeError('Parallel yangilanish ko\'p. status ni tekshirib qayta urinib ko\'ring.')


def validate(root):
    errors, warnings = [], []
    index = (root / 'INDEX.md').read_text(encoding='utf-8-sig')
    links = re.findall(r'\]\(projects/([\w-]+)\.md\)', index)
    cards = {p.stem: p for p in (root / 'projects').glob('*.md')}
    if len(links) != len(set(links)):
        errors.append('INDEX: takroriy loyiha')
    for slug in sorted(set(links) - cards.keys()):
        errors.append(f'INDEX: karta yo\'q: {slug}')
    for slug, path in cards.items():
        text = path.read_text(encoding='utf-8-sig')
        if slug not in links:
            errors.append(f'{slug}: INDEX da yo\'q')
        if len(text.splitlines()) > 150:
            errors.append(f'{slug}: 150 qatordan oshgan')
        for field in ('Bir jumlada', 'Joylashuv', 'Holat', 'Oxirgi yangilanish'):
            if not re.search(r'^\*\*' + field + r':\*\* .+', text, re.M):
                errors.append(f'{slug}: {field} yo\'q')
        for section in ('Keyingi qadamlar', 'Tarix'):
            if f'## {section}' not in text:
                errors.append(f'{slug}: {section} yo\'q')
        date = re.search(r'\*\*Oxirgi yangilanish:\*\* (\d{4}-\d{2}-\d{2})', text)
        if not date:
            errors.append(f'{slug}: sana formati noto\'g\'ri')
        else:
            try:
                dt.date.fromisoformat(date[1])
            except ValueError:
                errors.append(f'{slug}: sana mavjud emas')
            row = next((r for r in index.splitlines() if f'](projects/{slug}.md)' in r), '')
            if row and date[1] not in row:
                errors.append(f'{slug}: INDEX va karta sanasi farq qiladi')
        if re.search(r'Git: (yo.q|lokal)', text):
            warnings.append(f'{slug}: kod remote manzili ko\'rsatilmagan')
    for path in root.rglob('*'):
        if not path.is_file() or '.git' in path.parts or path.suffix not in ('.md', '.json', '.py', '.ps1'):
            continue
        text = path.read_text(encoding='utf-8-sig')
        if re.search(r'^(<<<<<<< |=======\s*$|>>>>>>> )', text, re.M):
            errors.append(f'{path.relative_to(root)}: merge konflikti')
    return errors, warnings


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    sub = parser.add_subparsers(dest='action', required=True)
    for name in ('status', 'validate', 'sync'):
        sub.add_parser(name)
    claim = sub.add_parser('claim')
    claim.add_argument('--project', required=True)
    claim.add_argument('--owner', required=True, help='AI/COMPUTER/session')
    claim.add_argument('--summary', required=True)
    for name in ('finish', 'block', 'cancel'):
        p = sub.add_parser(name)
        for arg in ('task', 'owner', 'result', 'tests', 'next-step'):
            p.add_argument('--' + arg, required=True)
    args = vars(parser.parse_args())
    root = args.pop('root').resolve()
    action = args.pop('action')
    if action == 'validate':
        errors, warnings = validate(root)
        print(json.dumps({'errors': errors, 'warnings': warnings}, ensure_ascii=False, indent=2))
        return bool(errors)
    if action == 'sync':
        if git(root, 'status', '--porcelain').stdout.strip():
            raise RuntimeError('Ish papkasida o\'zgarish bor. Avval egasi bilan kelishing.')
        print(git(root, 'pull', '--ff-only').stdout)
    else:
        print(json.dumps(coordinate(root, action, **args), ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (RuntimeError, ValueError, OSError) as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
