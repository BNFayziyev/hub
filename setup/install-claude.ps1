# Hub qoidasini shu kompyuterdagi Claude Code'ga ulaydi (har bir kompyuterda bir marta).
$target = Join-Path $HOME '.claude\CLAUDE.md'
$block  = Get-Content (Join-Path $PSScriptRoot 'claude-global.md') -Raw -Encoding UTF8
New-Item -ItemType Directory -Force (Split-Path $target) | Out-Null
$existing = if (Test-Path $target) { Get-Content $target -Raw -Encoding UTF8 } else { '' }
if ($existing -notmatch 'Loyihalar hubi \(C:\\hub\)') {
    [IO.File]::WriteAllText($target, ($existing.TrimEnd() + "`r`n`r`n" + $block).TrimStart(), (New-Object Text.UTF8Encoding $false))
    "Qo'shildi: $target"
} else { "Allaqachon bor: $target" }
"Kompyuter nomi: $env:COMPUTERNAME  (C:\hub\COMPUTERS.md ga yozing)"
