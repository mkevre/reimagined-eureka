---
title: Organization の Team 同期を管理する
intro: '{% data variables.product.product_name %} 上のアイデンティティプロバイダ (IdP) と Organization の間で Team の同期の有効/無効を切り替えることができます。'
redirect_from:
  - /articles/synchronizing-teams-between-your-identity-provider-and-github
  - /github/setting-up-and-managing-organizations-and-teams/synchronizing-teams-between-your-identity-provider-and-github
  - /github/articles/synchronizing-teams-between-okta-and-github
  - /github/setting-up-and-managing-organizations-and-teams/managing-team-synchronization-for-your-organization
permissions: Organization owners can manage team synchronization for an organization.
miniTocMaxHeadingLevel: 3
versions:
  ghec: '*'
topics:
  - Organizations
  - Teams
shortTitle: Teamの同期の管理
---

{% data reusables.enterprise-accounts.emu-scim-note %}

## Team の同期について

IdP と {% data variables.product.product_name %} の間で Team の同期を有効化すると、Organization のオーナーとチームメンテナが Organization の Team を IdP グループに接続できるようになります。

{% data reusables.identity-and-permissions.about-team-sync %}

{% data reusables.identity-and-permissions.supported-idps-team-sync %}

{% data reusables.identity-and-permissions.sync-team-with-idp-group %}

Enterprise アカウントが所有する Organization に対して Team の同期を有効化することもできます。 For more information, see "[Managing team synchronization for organizations in your enterprise](/enterprise-cloud@latest/admin/authentication/managing-identity-and-access-for-your-enterprise/managing-team-synchronization-for-organizations-in-your-enterprise)."

{% data reusables.enterprise-accounts.team-sync-override %}

{% data reusables.identity-and-permissions.team-sync-usage-limits %}

## Team の同期を有効化する

Team の同期を有効化する手順は、使用する IdP によって異なります。 各 IdP によって、Team の同期を有効化するうえで必要な環境があります。 個々の IdP ごとに、さらに必要な環境があります。

### 必要な環境

{% data reusables.identity-and-permissions.team-sync-required-permissions %}

Organization と、サポートされている IdP について、SAMLシングルサインオンを有効にする必要があります。 詳細は「[Organization で SAML シングルサインオンを施行する](/articles/enforcing-saml-single-sign-on-for-your-organization)」を参照してください。

You must have a linked SAML identity. To create a linked identity, you must authenticate to your organization using SAML SSO and the supported IdP at least once. 詳しい情報については「[SAMLシングルサインオンで認証する](/articles/authenticating-with-saml-single-sign-on)」を参照してください。

Your SAML settings **must** contain a valid IdP URL for the **Issuer** field.

![SAML Issuer field](/assets/images/help/saml/saml_issuer.png)



### Azure AD で Team の同期を有効化する

{% data reusables.identity-and-permissions.team-sync-azure-permissions %}

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.security %}
{% data reusables.identity-and-permissions.team-sync-confirm-saml %}
{% data reusables.identity-and-permissions.enable-team-sync-azure %}
{% data reusables.identity-and-permissions.team-sync-confirm %}
6. Organization に接続したいアイデンティティプロバイダのテナント情報を確認してから、[**Approve**] をクリックします。 ![特定の IdP テナントに対して、Team の同期を有効化するペンディングリクエストと、リクエストを承認またはキャンセルするオプション](/assets/images/help/teams/approve-team-synchronization.png)

### Okta で Team の同期を有効化する

Okta team synchronization requires that SAML and SCIM with Okta have already been set up for your organization.

To avoid potential team synchronization errors with Okta, we recommend that you confirm that SCIM linked identities are correctly set up for all organization members who are members of your chosen Okta groups, before enabling team synchronization on {% data variables.product.prodname_dotcom %}.

If an organization member does not have a linked SCIM identity, then team synchronization will not work as expected and the user may not be added or removed from teams as expected. If any of these users are missing a SCIM linked identity, you will need to reprovision them.

For help on provisioning users that have missing a missing SCIM linked identity, see "[Troubleshooting identity and access management](/organizations/managing-saml-single-sign-on-for-your-organization/troubleshooting-identity-and-access-management)."

{% data reusables.identity-and-permissions.team-sync-okta-requirements %}

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.security %}
{% data reusables.identity-and-permissions.team-sync-confirm-saml %}
{% data reusables.identity-and-permissions.team-sync-confirm-scim %}
1. Consider enforcing SAML in your organization to ensure that organization members link their SAML and SCIM identities. 詳細は「[Organization で SAML シングルサインオンを施行する](/organizations/managing-saml-single-sign-on-for-your-organization/enforcing-saml-single-sign-on-for-your-organization)」を参照してください。
{% data reusables.identity-and-permissions.enable-team-sync-okta %}
7. Organization 名の下で、有効な SSWS トークンと Okta インスタンスの URL を入力します。 ![Okta Organization で Team の同期を有効化するフォーム](/assets/images/help/teams/confirm-team-synchronization-okta-organization.png)
6. Organization に接続したいアイデンティティプロバイダのテナント情報を確認してから、[**Create**] をクリックします。 ![Team の同期を有効化する [Create] ボタン](/assets/images/help/teams/confirm-team-synchronization-okta.png)

## Team の同期を無効化する

{% data reusables.identity-and-permissions.team-sync-disable %}

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.security %}
5. [Team synchronization] の下にある [**Disable team synchronization**] をクリックします。 ![Team の同期を無効化する](/assets/images/help/teams/disable-team-synchronization.png)
