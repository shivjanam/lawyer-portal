Write-Host "Creating .github/workflows directory..."
$dirPath = "d:/projects/Lawer/lawyer-portal/.github/workflows"
if (-not (Test-Path $dirPath)) {
    New-Item -ItemType Directory -Path $dirPath -Force | Out-Null
    Write-Host "Directory created."
} else {
    Write-Host "Directory already exists."
}

Write-Host "Creating sync.yml workflow file..."
$workflowContent = @'
name: Mirror Repo to shivjanam

on:
  push:
    branches:
      - main      # Change to 'master' if your primary branch is master
      - dev       # Add other branches you want to sync, or remove if only main
  workflow_dispatch: # Allows manual trigger from the GitHub Actions tab

jobs:
  git-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Push to Target Repository
        run: |
          git remote add target https://shivjanam:${{ secrets.TARGET_REPO_PAT }}@github.com/shivjanam/lawyer-portal.git
          git push --force --prune target refs/remotes/origin/*:refs/heads/*
          git push --force --tags target
'@

$workflowPath = "d:/projects/Lawer/lawyer-portal/.github/workflows/sync.yml"
$workflowContent | Out-File -FilePath $workflowPath -Encoding UTF8
Write-Host "Workflow file created at $workflowPath"