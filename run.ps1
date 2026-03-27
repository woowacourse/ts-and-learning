param(
    [string]$exerciseNumber
)

if (-not $exerciseNumber) {
    Write-Output "Error: Please provide an exercise number."
    exit 1
}

$exNo = "{0:D2}" -f [int]$exerciseNumber

Write-Output "Running: exercise-$exNo"

npx tsc "exercises/exercise-$exNo/index.ts" --noEmit
