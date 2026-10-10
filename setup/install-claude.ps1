# Hub qoidasini shu kompyuterdagi Claude Code'ga ulaydi (har bir kompyuterda bir marta).
$target = Join-Path $HOME '.claude\CLAUDE.md'
$block  = Get-Content (Join-Path $PSScriptRoot 'claude-global.md') -Raw -Encoding UTF8
New-Item -ItemType Directory -Force (Split-Path $target) | Out-Null
$existing = if (Test-Path $target) { Get-Content $target -Raw -Encoding UTF8 } else { '' }
if ($existing -notmatch 'Loyihalar hubi \(C:\\hub\)') {
    [IO.File]::WriteAllText($target, ($existing.TrimEnd() + "`r`n`r`n" + $block).TrimStart(), (New-Object Text.UTF8Encoding $false))
    "Qo'shildi: $target"
} else { "Allaqachon bor: $target" }
# Hub uchun git push/pull ruxsatlari (faqat C:\hub)
$settingsPath = Join-Path $HOME '.claude\settings.json'
$s = if (Test-Path $settingsPath) { Get-Content $settingsPath -Raw -Encoding UTF8 | ConvertFrom-Json } else { New-Object PSObject }
if (-not $s.permissions) { $s | Add-Member permissions (New-Object PSObject) -Force }
if (-not $s.permissions.allow) { $s.permissions | Add-Member allow @() -Force }
$rules = 'PowerShell(git -C C:\hub push *)','PowerShell(git -C C:\hub pull *)','Bash(git -C C:\hub push *)','Bash(git -C C:\hub pull *)','Bash(git -C /c/hub push *)','Bash(git -C /c/hub pull *)'
$s.permissions.allow = @(@($s.permissions.allow) + $rules | Select-Object -Unique)
[IO.File]::WriteAllText($settingsPath, ($s | ConvertTo-Json -Depth 20), (New-Object Text.UTF8Encoding $false))
"Ruxsatlar: $settingsPath"
"Kompyuter nomi: $env:COMPUTERNAME  (C:\hub\COMPUTERS.md ga yozing)"
