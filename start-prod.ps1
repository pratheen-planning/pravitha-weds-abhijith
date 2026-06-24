$ErrorActionPreference = "Stop"
$node = "C:\Users\Pratheen\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$next = Join-Path $PSScriptRoot "node_modules\next\dist\bin\next"

& $node $next start -p 3000
