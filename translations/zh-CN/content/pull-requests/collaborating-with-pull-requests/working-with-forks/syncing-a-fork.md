---
title: 同步复刻
intro: 同步仓库的复刻以通过上游仓库使其保持最新。
redirect_from:
  - /github/collaborating-with-issues-and-pull-requests/working-with-forks/syncing-a-fork
  - /articles/syncing-a-fork
  - /github/collaborating-with-issues-and-pull-requests/syncing-a-fork
  - /github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Pull requests
---

{% ifversion fpt or ghes > 3.1 or ghae or ghec %}

## 从 web UI 同步复刻

1. 在 {% data variables.product.product_name %} 上，导航到您想要与上游版本库同步的复刻仓库主页。
1. 选择 **Fetch upstream（提取上游）**下拉菜单。 !["Fetch upstream（提取上游）"下拉菜单](/assets/images/help/repository/fetch-upstream-drop-down.png)
1. 查看上游仓库中有关提交的细节，然后单击“**提取并合并**”。 !["提取并合并"按钮](/assets/images/help/repository/fetch-and-merge-button.png)

如果上游仓库的更改导致冲突，{% data variables.product.company_short %} 将提示您创建拉取请求以解决冲突。

## 从命令行同步复刻

{% endif %}
必须在 Git 中[配置指向上游仓库的远程仓库](/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork)，然后才能将您的复刻与上游仓库同步。

{% data reusables.command_line.open_the_multi_os_terminal %}
2. 将当前工作目录更改为您的本地仓库。
3. 从上游仓库获取分支及其各自的提交。 对 `BRANCHNAME` 的提交将存储在本地分支 `upstream/BRANCHNAME` 中。
  ```shell
  $ git fetch upstream
  > remote: Counting objects: 75, done.
  > remote: Compressing objects: 100% (53/53), done.
  > remote: Total 62 (delta 27), reused 44 (delta 9)
  > Unpacking objects: 100% (62/62), done.
  > From https://{% data variables.command_line.codeblock %}/<em>ORIGINAL_OWNER</em>/<em>ORIGINAL_REPOSITORY</em>
  >  * [new branch]      main     -> upstream/main
  ```
4. 检出复刻的本地默认分支 - 在本例中，我们使用 `main`。
  ```shell
  $ git checkout main
  > Switched to branch 'main'
  ```
5. 将上游默认分支 - 本例中为 `upstream/main` - 的更改合并到本地默认分支。 这会使复刻的默认分支与上游仓库同步，而不会丢失本地更改。
  ```shell
  $ git merge upstream/main
  > Updating a422352..5fdff0f
  > Fast-forward
  >  README                    |    9 -------
  >  README.md                 |    7 ++++++
  >  2 files changed, 7 insertions(+), 9 deletions(-)
  >  delete mode 100644 README
  >  create mode 100644 README.md
  ``` If your local branch didn't have any unique commits, Git will instead perform a "fast-forward":
  ```shell
  $ git merge upstream/main
  > Updating 34e91da..16c56ad
  > Fast-forward
  >  README.md                 |    5 +++--
  >  1 file changed, 3 insertions(+), 2 deletions(-)
  ```

{% tip %}

**提示**：同步复刻仅更新仓库的本地副本。 要在 {% data variables.product.product_location %} 上更新复刻，您必须[推送更改](/github/getting-started-with-github/pushing-commits-to-a-remote-repository/)。

{% endtip %}
