# Git Commands to Push Changes to shivjanamsonkar/lawyer-portal

## Prerequisites:
1. Ensure you have a GitHub Personal Access Token (PAT) with repo scope
2. Create the repository `shivjanamsonkar/lawyer-portal` on GitHub if it doesn't exist

## Step 1: Create .github/workflows/sync.yml
The file has already been created at: d:/projects/Lawer/lawyer-portal/.github/workflows/sync.yml

## Step 2: Execute Git Commands
Open Git Bash or PowerShell in the project directory and run:

```bash
# Navigate to the project
cd d:/projects/Lawer/lawyer-portal

# Remove existing origin (if any)
git remote remove origin

# Add new origin pointing to shivjanamsonkar/lawyer-portal
git remote add origin https://github.com/shivjanamsonkar/lawyer-portal.git

# Stage all changes
git add -A

# Commit the new workflow file
git commit -m "Add CI/CD sync workflow for GitHub Actions"

# Push to shivjanamsonkar/lawyer-portal main branch
git push -u origin main
```

## Step 3: Store PAT in GitHub Secrets
After pushing, go to the repository settings on GitHub and add the PAT:
1. Go to your repository on GitHub
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Name: `TARGET_REPO_PAT`
5. Value: Your GitHub Personal Access Token

## Step 4: Enable Workflows
The workflow will run automatically on push to main branch. You can also trigger it manually:
1. Go to Actions tab
2. Find "Mirror Repo to shivjanam" workflow
3. Click "Run workflow"