---
title: 在代码空间中使用源控制
intro: 在对代码空间中的文件进行更改后，您可以快速提交更改并将更新推送到远程仓库。
product: '{% data reusables.gated-features.codespaces %}'
versions:
  fpt: '*'
  ghec: '*'
type: how_to
topics:
  - Codespaces
  - Fundamentals
  - Developer
shortTitle: 源控制
---

 

## 关于 {% data variables.product.prodname_codespaces %} 中的源控制

您可以直接在代码空间内执行所需的所有 Git 操作。 例如，您可以从远程仓库获取更改、切换分支、创建新分支、提交和推送更改，以及创建拉取请求。 您可以使用代码空间内的集成终端输入 Git 命令，也可以单击图标和菜单选项以完成所有最常见的 Git 任务。 本指南解释如何使用图形用户界面来控制源代码。

在 {% data variables.product.prodname_github_codespaces %} 中的源控制使用与 {% data variables.product.prodname_vscode %} 相同的工作流程。 更多信息请参阅 {% data variables.product.prodname_vscode %} 文档“[在 VS 代码中使用版本控制](https://code.visualstudio.com/docs/editor/versioncontrol#_git-support)”。

使用 {% data variables.product.prodname_github_codespaces %} 更新文件的典型工作流程将是：

* 从 {% data variables.product.prodname_dotcom %} 上仓库的默认分支，创建代码空间。 请参阅“[创建代码空间](/codespaces/developing-in-codespaces/creating-a-codespace)”。
* 在代码空间中，创建一个新的分支来操作。
* 进行更改并保存。
* 提交更改。
* 提出拉取请求。

## 创建或切换分支

{% data reusables.codespaces.create-or-switch-branch %}

{% tip %}

**提示**：如果有人在远程仓库上更改了文件，则在您切换到的分支中，只有将更改拉入代码空间后，您才能看到这些更改。

{% endtip %}

## 从远程仓库拉取更改

您可以随时将远程仓库的更改拉取到您的代码空间。

{% data reusables.codespaces.source-control-display-dark %}
1. 在侧边栏的顶部，单击省略号 (**...**)。 ![查看和更多操作的省略号按钮](/assets/images/help/codespaces/source-control-ellipsis-button.png)
1. 在下拉菜单中，单击 **Pull（拉取）**。

如果自创建代码空间以来开发容器配置已更改，则可以通过为代码空间重建容器来应用更改。 For more information, see "[Introduction to dev containers](/codespaces/setting-up-your-codespace/configuring-codespaces-for-your-project#applying-changes-to-your-configuration)."

## 设置代码空间以自动获取新更改

您可以设置代码空间，以自动获取对远程仓库所做的任何新提交的详细信息。 这允许您查看仓库的本地副本是否过时，如果是，您可以选择拉取新的更改。

如果获取操作检测到远程仓库上的新更改，您将在状态栏中看到新提交的数量。 然后，您可以将更改拉取到本地副本。

1. 单击活动栏底部的 **Manage（管理）**按钮。 ![管理按钮](/assets/images/help/codespaces/manage-button.png)
1. 在菜单中，单击 **Settings（设置）**。
1. 在 Settings（设置）页面上，搜索：`autofetch`。 ![搜索自动获取](/assets/images/help/codespaces/autofetch-search.png)
1. 要获取当前仓库注册的所有远程仓库的更新详情，请将 **Git: Autofetch** 设置为 `all`。 ![启用 Git 自动获取](/assets/images/help/codespaces/autofetch-all.png)
1. 如果要更改自动获取的间隔秒数，请编辑 **Git: Autofetch Period** 的值。

## 提交更改

{% data reusables.codespaces.source-control-commit-changes %}

## 提出拉取请求

{% data reusables.codespaces.source-control-pull-request %}

## 将更改推送到远程仓库

您可以推送所做的更改。 这将应用这些更改到远程仓库上的上游分支。 如果您尚未准备好创建拉取请求，或者希望在 {% data variables.product.prodname_dotcom %} 上创建拉取请求，则可能需要这样做。

1. 在侧边栏的顶部，单击省略号 (**...**)。 ![查看和更多操作的省略号按钮](/assets/images/help/codespaces/source-control-ellipsis-button-nochanges.png)
1. 在下拉菜单中，单击 **Push（推送）**。
