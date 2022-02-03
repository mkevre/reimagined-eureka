---
title: 删除用户帐户
intro: '可随时删除 {% data variables.product.product_name %} 用户帐户。'
redirect_from:
  - /articles/deleting-a-user-account
  - /articles/deleting-your-user-account
  - /github/setting-up-and-managing-your-github-user-account/deleting-your-user-account
  - /github/setting-up-and-managing-your-github-user-account/managing-user-account-settings/deleting-your-user-account
versions:
  fpt: '*'
  ghes: '*'
  ghec: '*'
topics:
  - Accounts
shortTitle: 删除用户帐户
---

删除用户帐户会移除帐户所拥有的所有仓库、私有仓库分支、wiki、议题、拉取请求和页面。 {% ifversion fpt or ghec %} 在其他用户拥有的仓库中创建的议题和拉取请求以及所做的评论将不会被删除，而是与我们的[Ghost 用户](https://github.com/ghost)关联。{% else %}在其他用户拥有的仓库中创建的议题和拉取请求以及所做的评论将不会被删除。{% endif %}

{% ifversion fpt or ghec %} When you delete your account we stop billing you. The email address associated with the account becomes available for use with a different account on {% data variables.product.product_location %}. After 90 days, the account name also becomes available to anyone else to use on a new account. {% endif %}

如果您是组织的唯一所有者，则必须先将所有权转让给其他人或删除该组织，然后才能删除您的用户帐户。 如果组织中有其他所有者，则必须先从组织中删除自己，然后才能删除用户帐户。

更多信息请参阅：
- “[转让组织所有权](/articles/transferring-organization-ownership)”
- “[删除组织帐户](/articles/deleting-an-organization-account)”
- “[从组织中删除自己](/articles/removing-yourself-from-an-organization/)”

## 备份帐户数据

在删除用户帐户之前，请复制帐户拥有的所有仓库、私有分支、wiki、议题和拉取请求。

{% warning %}

**警告：**删除用户帐户后，GitHub 无法恢复您的内容。

{% endwarning %}

## 删除用户帐户

{% data reusables.user_settings.access_settings %}
{% data reusables.user_settings.account_settings %}
3. 在帐户设置页面底部，“Delete account（删除帐户）”下，单击 **Delete your account（删除帐户）**。 然后即可删除用户帐户。
    - 如果您是组织中的唯一所有者，则必须将所有权转让给其他人或删除您的组织。
    - 如果组织中有其他组织所有者，则必须将自己从组织中删除。 ![帐户删除按钮](/assets/images/help/settings/settings-account-delete.png)
4. 在“Make sure you want to do this（确保要执行此操作）”对话框中，完成以下步骤，以确认您了解删除帐户时会发生什么： ![删除帐户确认对话框](/assets/images/help/settings/settings-account-deleteconfirm.png)
  {% ifversion fpt or ghec %}- Recall that all repositories, forks of private repositories, wikis, issues, pull requests and {% data variables.product.prodname_pages %} sites owned by your account will be deleted and your billing will end immediately, and your username will be available to anyone for use on {% data variables.product.product_name %} after 90 days.
  {% else %}- 重新考虑一下，您帐户拥有的所有仓库、私有仓库分支、wiki、议题、提取请求和网页都将被删除，并且任何人将可在 {% data variables.product.product_name %} 上使用您的用户名。
  {% endif %}- 在第一个字段中，输入您的 {% data variables.product.product_name %} 用户名或电子邮件。
    - 在第二个字段中，键入提示短语。
