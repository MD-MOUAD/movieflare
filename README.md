## migrate to nextjs

git checkout nextjs-main
git rebase main # Replay Next.js commits after old Vite commits
git checkout main
git merge nextjs-main --ff-only # Fast-forward merge
