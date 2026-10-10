Write-Host "Step 1: Remove existing origin"
git remote remove origin

Write-Host "Step 2: Add new origin"
git remote add origin https://github.com/shivjanamsonkar/lawyer-portal.git

Write-Host "Step 3: Verify remotes"
git remote -v

Write-Host "Step 4: Stage all changes"
git add -A

Write-Host "Step 5: Commit changes"
git commit -m "Security upgrade: upgraded Next.js to 15.5.24, added Vercel deployment config, added security headers"

Write-Host "Step 6: Push to GitHub"
git push -u origin main