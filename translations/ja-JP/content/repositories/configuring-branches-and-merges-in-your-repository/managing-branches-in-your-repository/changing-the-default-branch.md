---
title: デフォルトブランチを変更する
intro: リポジトリに複数のブランチがある場合、任意のブランチをデフォルトブランチとして設定できます。
permissions: People with admin permissions to a repository can change the default branch for the repository.
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
redirect_from:
  - /github/administering-a-repository/setting-the-default-branch
  - /articles/setting-the-default-branch
  - /github/administering-a-repository/changing-the-default-branch
  - /github/administering-a-repository/managing-branches-in-your-repository/changing-the-default-branch
topics:
  - Repositories
shortTitle: Change the default branch
---

## デフォルトブランチの変更について

リポジトリのデフォルトブランチは選択できます。 デフォルトブランチは、プルリクエストやコードのコミットを行う基点となるブランチです。 デフォルトブランチの詳細については、「[ブランチについて](/github/collaborating-with-issues-and-pull-requests/about-branches#about-the-default-branch)」を参照してください。

{% ifversion not ghae %}
{% note %}

**注釈**: Git-Subversion ブリッジを使用している場合、デフォルトブランチを変更すると, changing the default branch will affect your `trunk` ブランチのコンテンツと、リモートリポジトリのリファレンスを一覧表示するときに表示される`HEAD` に影響を与えます。 詳しい情報については、「[Subversion クライアントのサポート](/github/importing-your-projects-to-github/support-for-subversion-clients)」および Git ドキュメンテーション内の [git-ls-remote](https://git-scm.com/docs/git-ls-remote.html) を参照してください。

{% endnote %}
{% endif %}

{% ifversion fpt or ghes > 3.0 or ghae or ghec %}

デフォルトブランチの名前は変更することもできます。 詳しい情報については、「[ブランチの名前を変更する](/github/administering-a-repository/renaming-a-branch)」を参照してください。

{% endif %}

{% data reusables.branches.set-default-branch %}

## 必要な環境

デフォルトブランチを変更するには、リポジトリに複数のブランチが存在する必要があります。 詳しい情報については[リポジトリ内でのブランチの作成と削除](/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository#creating-a-branch)を参照してください。

## デフォルトブランチを変更する

{% data reusables.repositories.navigate-to-repo %}
{% data reusables.repositories.sidebar-settings %}
{% data reusables.repositories.repository-branches %}
1. [Default branch] の下にある、デフォルトブランチ名の右側の、{% octicon "arrow-switch" aria-label="The switch icon with two arrows" %} をクリックします。 ![現在のデフォルトブランチ名の右側にある、2 つの矢印がついた切り替えアイコン](/assets/images/help/repository/repository-options-defaultbranch-change.png)
1. ドロップダウンメニューで、ブランチ名をクリックします。 ![新しいデフォルトブランチを選択するドロップダウン](/assets/images/help/repository/repository-options-defaultbranch-drop-down.png)
1. [**Update**] をクリックします。 ![新しいブランチを選択後の [Update] ボタン](/assets/images/help/repository/repository-options-defaultbranch-update.png)
1. 警告を読んでから、[**I understand, update the default branch.**] (わかりました。デフォルトのブランチを更新してください) をクリックします。 !["I understand, update the default branch." button to perform the update](/assets/images/help/repository/repository-options-defaultbranch-i-understand.png)

