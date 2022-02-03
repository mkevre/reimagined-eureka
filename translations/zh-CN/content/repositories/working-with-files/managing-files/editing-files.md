---
title: Editing files
intro: '您可以使用文件编辑器，在任何仓库中的 {% data variables.product.product_name %} 上直接编辑文件。'
redirect_from:
  - /articles/editing-files
  - /articles/editing-files-in-your-repository
  - /github/managing-files-in-a-repository/editing-files-in-your-repository
  - /articles/editing-files-in-another-user-s-repository
  - /github/managing-files-in-a-repository/editing-files-in-another-users-repository
  - /github/managing-files-in-a-repository/managing-files-on-github/editing-files-in-your-repository
  - /github/managing-files-in-a-repository/managing-files-on-github/editing-files-in-another-users-repository
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Repositories
shortTitle: Edit files
---

## 编辑仓库中的文件

{% tip %}

**提示**：{% data reusables.repositories.protected-branches-block-web-edits-uploads %}

{% endtip %}

{% note %}

**注意：** {% data variables.product.product_name %} 的文件编辑器使用 [CodeMirror](https://codemirror.net/)。

{% endnote %}

1. 在您的仓库中，浏览至要编辑的文件。
{% data reusables.repositories.edit-file %}
3. 在 **Edit file（编辑文件）** 选项卡上，对文件做所需的更改。 ![文件中的新内容](/assets/images/help/repository/edit-readme-light.png)
{% data reusables.files.preview_change %}
{% data reusables.files.write_commit_message %}
{% data reusables.files.choose-commit-email %}
{% data reusables.files.choose_commit_branch %}
{% data reusables.files.propose_file_change %}

## 编辑其他用户仓库中的文件

When you edit a file in another user's repository, we'll automatically [fork the repository](/articles/fork-a-repo) and [open a pull request](/articles/creating-a-pull-request) for you.

1. 才其他用户的仓库中，浏览到包含要编辑文件的文件夹。 单击要编辑文件的名称。
2. 在文件内容上方，单击 {% octicon "pencil" aria-label="The edit icon" %}。 此时，GitHub 会为您复刻仓库。
3. 对文件做任何需要的更改。 ![文件中的新内容](/assets/images/help/repository/edit-readme-light.png)
{% data reusables.files.preview_change %}
{% data reusables.files.write_commit_message %}
{% data reusables.files.choose-commit-email %}
6. 单击 **Propose file change（提议文件更改）**。 ![提交更改按钮](/assets/images/help/repository/propose_file_change_button.png)
7. 为您的拉取请求输标题和说明。 ![拉取请求说明页面](/assets/images/help/pull_requests/pullrequest-description.png)
8. 单击 **Create pull request（创建拉取请求）**。 ![拉取请求按钮](/assets/images/help/pull_requests/pullrequest-send.png)
