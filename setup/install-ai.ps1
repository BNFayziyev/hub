param(
    [Parameter(Mandatory=$true)][string]$ProjectPath,
    [Parameter(Mandatory=$true)][string]$HubPath
)
$ErrorActionPreference = 'Stop'
$projectDir = (Resolve-Path -LiteralPath $ProjectPath).Path
$hubDir = (Resolve-Path -LiteralPath $HubPath).Path
if (-not (Test-Path -LiteralPath (Join-Path $hubDir 'AGENTS.md'))) { throw 'Hub AGENTS.md topilmadi' }
if ($projectDir -eq $hubDir) { throw "Hubning o'ziga installer kerak emas" }
$start = '<!-- HUB-LINK:START -->'
$end = '<!-- HUB-LINK:END -->'
$block = @"
$start
## Hub bilan ishlash
Hub nusxasi: $hubDir
Ish boshlashdan oldin shu nusxadagi AGENTS.md va COORDINATION.md ni o'qing.
Har sessiya alohida Hub clone ishlatsin; status va claim tasdiqlanmaguncha yozishni boshlamang.
Ish oxirida karta, test, aniq fayllar commit/push va finish majburiy.
$end
"@
foreach ($name in @('AGENTS.md','CLAUDE.md','GEMINI.md')) {
    $file = Join-Path $projectDir $name
    $old = if (Test-Path -LiteralPath $file) { [IO.File]::ReadAllText($file) } else { '' }
    $hasStart = $old.Contains($start)
    $hasEnd = $old.Contains($end)
    if ($hasStart -ne $hasEnd) { throw "Buzilgan Hub bo'limi: $file" }
    $new = if ($hasStart) {
        [regex]::Replace($old, '(?s)<!-- HUB-LINK:START -->.*?<!-- HUB-LINK:END -->', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $block })
    } else { $old.TrimEnd() + "`r`n`r`n" + $block + "`r`n" }
    if ($new -ne $old) {
        if (Test-Path -LiteralPath $file) {
            Copy-Item -LiteralPath $file -Destination ($file + '.hub-backup-' + [guid]::NewGuid().ToString('N'))
        }
        [IO.File]::WriteAllText($file, $new, (New-Object Text.UTF8Encoding $false))
        Write-Output "Yangilandi: $file"
    }
}
