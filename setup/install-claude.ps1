param(
    [Parameter(Mandatory=$true)][string]$ProjectPath,
    [Parameter(Mandatory=$true)][string]$HubPath
)
# Eski global sozlamalarni yashirincha o'zgartirmaydi; uch AI uchun loyiha ulanishi.
& (Join-Path $PSScriptRoot 'install-ai.ps1') -ProjectPath $ProjectPath -HubPath $HubPath
