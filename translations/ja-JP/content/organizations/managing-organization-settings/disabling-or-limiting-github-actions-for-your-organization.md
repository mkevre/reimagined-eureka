---
title: Organization について GitHub Actions を無効化または制限する
intro: Organization のオーナーは Organization の GitHub Actions を無効化、有効化、制限することができます。
redirect_from:
  - /github/setting-up-and-managing-organizations-and-teams/disabling-or-limiting-github-actions-for-your-organization
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Organizations
  - Teams
shortTitle: アクションの無効化もしくは制限
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## Organization の {% data variables.product.prodname_actions %} 権限について

{% data reusables.github-actions.disabling-github-actions %} {% data variables.product.prodname_actions %} の詳細は、「[{% data variables.product.prodname_actions %}について](/actions/getting-started-with-github-actions/about-github-actions)」を参照してください。

Organization のすべてのリポジトリについて {% data variables.product.prodname_actions %} を有効化することができます。 {% data reusables.github-actions.enabled-actions-description %} Organization のすべてのリポジトリについて 、{% data variables.product.prodname_actions %} を無効化できます。 {% data reusables.github-actions.disabled-actions-description %}

あるいは、Organization のすべてのリポジトリについて {% data variables.product.prodname_actions %} を有効化したうえで、ワークフローで実行できるアクションを制限することができます。 {% data reusables.github-actions.enabled-local-github-actions %}

## Organization の {% data variables.product.prodname_actions %} 権限の管理

Organization のワークフローをすべて無効にすることも、Organization でどのアクションを使用できるかを設定するポリシーを設定することもできます。

{% data reusables.actions.actions-use-policy-settings %}

{% note %}

**注釈:** Organizationが、優先ポリシーのある Enterprise アカウントによって管理されている場合、これらの設定を管理できない場合があります。 For more information, see "[Enforcing policies for {% data variables.product.prodname_actions %} in your enterprise](/admin/policies/enforcing-policies-for-your-enterprise/enforcing-github-actions-policies-for-your-enterprise)."

{% endnote %}

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.settings-sidebar-actions %}
1. [**Policies**] でオプションを選択します。 ![この Organization に対するアクションポリシーを設定する](/assets/images/help/organizations/actions-policy.png)
1. [**Save**] をクリックします。

## 特定のアクションの実行を許可する

{% data reusables.actions.allow-specific-actions-intro %}

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.settings-sidebar-actions %}
1. [**Policies**] で [**Allow select actions**] を選択し、必要なアクションをリストに追加します。
   {%- ifversion ghes > 3.0 %}
   ![許可リストにアクションを追加する](/assets/images/help/organizations/actions-policy-allow-list.png)
   {%- else %}
   ![許可リストにアクションを追加する](/assets/images/enterprise/github-ae/organizations/actions-policy-allow-list.png)
   {%- endif %}
1. [**Save**] をクリックします。

{% ifversion fpt or ghec %}
## パブリックフォークからのワークフローに対する必須の承認の設定

{% data reusables.actions.workflow-run-approve-public-fork %}

You can configure this behavior for an organization using the procedure below. この設定を変更すると、Enterpriseレベルでの設定が上書きされます。

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.settings-sidebar-actions %}
{% data reusables.github-actions.workflows-from-public-fork-setting %}

{% data reusables.actions.workflow-run-approve-link %}
{% endif %}

{% ifversion fpt or ghes or ghec %}
## プライベートリポジトリのフォークのワークフローを有効にする

{% data reusables.github-actions.private-repository-forks-overview %}

### Organization のプライベートフォークポリシーを設定する

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.settings-sidebar-actions %}
{% data reusables.github-actions.private-repository-forks-configure %}
{% endif %}

{% ifversion fpt or ghes > 3.1 or ghae or ghec %}
## Organizationに対する`GITHUB_TOKEN`の権限の設定

{% data reusables.github-actions.workflow-permissions-intro %}

Organizationもしくはリポジトリの設定で、`GITHUB_TOKEN`のデフォルト権限を設定できます。 Organizationの設定でデフォルトとして制限付きのオプションを選択した場合、そのオプションはOrganization内のリポジトリの設定でも自動設定され、許可するようなオプションは無効化されます。 Organizationが{% data variables.product.prodname_enterprise %}に属しており、Enterprise設定でさらに制約の強いデフォルトが選択されている場合、Organizationの設定でもっと許可をするようなデフォルトは選択できません。

{% data reusables.github-actions.workflow-permissions-modifying %}

### デフォルトの`GITHUB_TOKEN`権限の設定

{% data reusables.profile.access_profile %}
{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.settings-sidebar-actions %}
1. [**Workflow permissions**]の下で、`GITHUB_TOKEN`にすべてのスコープに対する読み書きアクセスを持たせたいか、あるいは`contents`スコープに対する読み取りアクセスだけを持たせたいかを選択してください。 ![このOrganizationのGITHUB_TOKENの権限を設定](/assets/images/help/settings/actions-workflow-permissions-organization.png)
1. **Save（保存）**をクリックして、設定を適用してください。
{% endif %}
