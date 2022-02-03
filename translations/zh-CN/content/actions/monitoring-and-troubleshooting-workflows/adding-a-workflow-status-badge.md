---
title: 添加工作流程状态徽章
intro: 您可以在您的仓库中显示状态徽章，以指示您的工作流程状态。
redirect_from:
  - /actions/managing-workflow-runs/adding-a-workflow-status-badge
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
shortTitle: 添加状态徽章
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

{% data reusables.repositories.actions-workflow-status-badge-intro %}

您使用工作流程文件的名称来引用工作流程。

```markdown
![example workflow]({% ifversion fpt or ghec %}https://github.com{% else %}<HOSTNAME>{% endif %}/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg)
```
## 使用工作流程文件名称

此 Markdown 示例为文件路径为 `.github/workflows/main.yml` 的工作流程添加状态徽章。 仓库的 `OWNER` 为 `github` 组织，`REPOSITORY` 名称为 `docs`。

```markdown
![example workflow](https://github.com/github/docs/actions/workflows/main.yml/badge.svg)
```

## 使用 `branch` 参数

此 Markdown 示例为名为 `feature-1` 的分支添加状态徽章。

```markdown
![example branch parameter](https://github.com/github/docs/actions/workflows/main.yml/badge.svg?branch=feature-1)
```

## 使用 `event` 参数

This Markdown example adds a badge that displays the status of workflow runs triggered by the `push` event, which will show the status of the build for the current state of that branch.

```markdown
![example event parameter](https://github.com/github/docs/actions/workflows/main.yml/badge.svg?event=push)
```
