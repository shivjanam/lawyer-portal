#!/bin/bash
# Git operations for shivjanamsonkar/lawyer-portal
cd /d d:/projects/Lawer/lawyer-portal

echo "Step 1: Check current status"
git status --short

echo "Step 2: Remove existing origin"
git remote remove origin 2>/dev/null || echo "No existing origin"

echo "Step 3: Add new origin (shivjanamsonkar)"
git remote add origin https://github.com/shivjanamsonkar/lawyer-portal.git

echo "Step 4: Verify remotes"
git remote -v

echo "Step 5: Stage all changes"
git add -A

echo "Step 6: Commit changes"
git commit -m "Add CI/CD sync workflow for GitHub Actions"

echo "Step 7: Push to shivjanamsonkar/lawyer-portal"
git push -u origin main

echo "Done!"