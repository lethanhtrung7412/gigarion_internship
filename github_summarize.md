### This is the summarize about all the content that I have learn about Git

Git is a version controll manager that help user to keep track of their code

Some simple command that I have learn:
- `git status`: check for  any change that happen
- `git add .` or `git add <path to file>`:add the change into the staging area
- `git commit -m "Your message"`: confirm all the change that in the staging area and save it
- `git push`: push all the commit code to the online repository
- `git pull`: get all the change from the online repository and merge into local repo
- `git branch <new branch name>`: create a new branch, like a new version of the main repo
- `git merge <branch you want to merge>`: combine the change that you make from other one to the branch that you 
currently on

Git flow: is a Git branching model using feature branch and multiple primary branch. Some branch name that is usual
to see in this model is `main` branch, `hotfix` branch, `release` branch, `develop` branch (primary branch) and the 
`feature` branchs that is checkout from the `develop` branch. When the `feature` is complete it will be merge 
back to `develop`. When the `release` branch is done, it will be merged into `main` and develop branch. If a issue is
found in `main` branch, we create a `hotfix` branch from `main`, and then merge back to `main` and 
`develop` after complete fixing it  

