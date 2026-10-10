#!/bin/bash
# Push changes to shivjanamsonkar/lawyer-portal
cd /d d:/projects/Lawer/lawyer-portal
git remote remove origin
git remote add origin https://github.com/shivjanamsonkar/lawyer-portal.git
git add -A
git commit -m "Security upgrade: upgraded Next.js to 15.5.24, added Vercel deployment config, added security headers"
git push -u origin main