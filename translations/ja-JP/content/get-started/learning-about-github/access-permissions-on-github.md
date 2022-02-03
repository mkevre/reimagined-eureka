---
title: GitHub 上のアクセス権限
redirect_from:
  - /articles/needs-to-be-written-what-can-the-different-types-of-org-team-permissions-do
  - /articles/what-are-the-different-types-of-team-permissions
  - /articles/what-are-the-different-access-permissions
  - /articles/access-permissions-on-github
  - /github/getting-started-with-github/access-permissions-on-github
  - /github/getting-started-with-github/learning-about-github/access-permissions-on-github
intro: 'With roles, you can control who has access to your accounts and resources on {% data variables.product.product_name %} and the level of access each person has.'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Permissions
  - Accounts
shortTitle: Access permissions
---

## About access permissions on {% data variables.product.prodname_dotcom %}

{% data reusables.organizations.about-roles %}

Roles work differently for different types of accounts. For more information about accounts, see "[Types of {% data variables.product.prodname_dotcom %} accounts](/get-started/learning-about-github/types-of-github-accounts)."

## 個人ユーザアカウント

ユーザアカウントが所有するリポジトリは、*リポジトリオーナー*と*コラボレータ*という 2 つの権限レベルを持ちます。 詳しい情報については[ユーザアカウントのリポジトリ権限レベル](/articles/permission-levels-for-a-user-account-repository)を参照してください。

## Organization アカウント

Organization のメンバーは、*owner (オーナー)*{% ifversion fpt or ghec %}、*billing manager (支払いマネージャー)*、{% endif %}あるいは*member (メンバー)* ロールを持つことができます。 オーナーは、Organization に対する完全な管理者アクセスを持ち{% ifversion fpt or ghec %}、支払いマネージャーは支払いの設定を管理でき{% endif %}ます。 メンバーは、その他の人のデフォルトのロールです。 Team を使って、複数のメンバーのアクセス権限を一度に管理できます。 詳しい情報については、以下を参照してください。
- "[Roles in an organization](/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization)"
- [Organization のプロジェクトボード権限](/articles/project-board-permissions-for-an-organization)
- "[Repository roles for an organization](/organizations/managing-access-to-your-organizations-repositories/repository-roles-for-an-organization)"
- [Team について](/articles/about-teams)

## Enterprise アカウント

{% ifversion fpt %}
{% data reusables.gated-features.enterprise-accounts %}

For more information about permissions for enterprise accounts, see [the {% data variables.product.prodname_ghe_cloud %} documentation](/enterprise-cloud@latest/get-started/learning-about-github/access-permissions-on-github).
{% else %}
*Enterprise owners* have ultimate power over the enterprise account and can take every action in the enterprise account.{% ifversion ghec or ghes %} *Billing managers* can manage your enterprise account's billing settings.{% endif %} Members and outside collaborators of organizations owned by your enterprise account are automatically members of the enterprise account, although they have no access to the enterprise account itself or its settings. 詳しい情報については、「[Enterprise アカウントのロール](/admin/user-management/managing-users-in-your-enterprise/roles-in-an-enterprise)」を参照してください。

{% ifversion ghec %}
If an enterprise uses {% data variables.product.prodname_emus %}, members are provisioned as new user accounts on {% data variables.product.prodname_dotcom %} and are fully managed by the identity provider. The {% data variables.product.prodname_managed_users %} have read-only access to repositories that are not a part of their enterprise and cannot interact with users that are not also members of the enterprise. Within the organizations owned by the enterprise, the {% data variables.product.prodname_managed_users %} can be granted the same granular access levels available for regular organizations. For more information, see "[About {% data variables.product.prodname_emus %}](/admin/authentication/managing-your-enterprise-users-with-your-identity-provider/about-enterprise-managed-users)."
{% endif %}
{% endif %}

## 参考リンク

- 「[{% data variables.product.prodname_dotcom %}アカウントの種類](/articles/types-of-github-accounts)」
