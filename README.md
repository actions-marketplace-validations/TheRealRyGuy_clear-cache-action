# clear-cache-action
![Build](https://github.com/TheRealRyGuy/clear-cache-action/actions/workflows/build.yml/badge.svg)

A Github action to clear out your repositories cache for workflows, which may fix some dependency issues when building
# Using this in your workflow: 
```yml
- name: Delete Repository Cache
  uses: TheRealRyGuy/clear-cache-action@master
  env:
    token: ${{ secrets.GITHUB_TOKEN }}
```
