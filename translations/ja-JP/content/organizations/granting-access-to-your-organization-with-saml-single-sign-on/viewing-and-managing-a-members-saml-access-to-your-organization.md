---
title: 組織へのメンバーの SAML アクセスの表示と管理
intro: Organization のメンバーのリンクされたアイデンティティ、アクティブなセッション、認可されたクレデンシャルの表示と取り消しが可能です。
permissions: Organization owners can view and manage a member's SAML access to an organization.
redirect_from:
  - /articles/viewing-and-revoking-organization-members-authorized-access-tokens
  - /github/setting-up-and-managing-organizations-and-teams/viewing-and-revoking-organization-members-authorized-access-tokens
  - /github/setting-up-and-managing-organizations-and-teams/viewing-and-managing-a-members-saml-access-to-your-organization
versions:
  ghec: '*'
topics:
  - Organizations
  - Teams
shortTitle: SAMLアクセスの管理
---

## Organization への SAML アクセスについて

When you enable SAML single sign-on for your organization, each organization member can link their external identity on your identity provider (IdP) to their existing account on {% data variables.product.product_location %}. {% data variables.product.product_name %}上の Organizationのリソースにアクセスするには、メンバーはアクティブなSAMLセッションをブラウザーに持っていなければなりません。 OrganizationのリソースにAPIまたはGitを使ってアクセスするには、メンバーは、メンバーがOrganizationでの利用のために認可した個人アクセストークンもしくはSSHキーを使わなければなりません。

各メンバーのリンクされたアイデンティティ、アクティブなセッション、同じページで認可されたクレデンシャルの表示と取り消しが可能です。

## リンクされているアイデンティティの表示と取り消し

{% data reusables.saml.about-linked-identities %}

利用できる場合には、このエントリにはSCIMデータが含まれます。 詳しい情報については「[SCIMについて](/organizations/managing-saml-single-sign-on-for-your-organization/about-scim)」を参照してください。

{% warning %}

**Warning:** For organizations using SCIM:
- Revoking a linked user identity on {% data variables.product.product_name %} will also remove the SAML and SCIM metadata. As a result, the identity provider will not be able to synchronize or deprovision the linked user identity.
- An admin must revoke a linked identity through the identity provider.
- To revoke a linked identity and link a different account through the identity provider, an admin can remove and re-assign the user to the {% data variables.product.product_name %} application. For more information, see your identity provider's documentation.

{% endwarning %}


{% data reusables.identity-and-permissions.revoking-identity-team-sync %}

{% data reusables.profile.access_org %}
{% data reusables.user_settings.access_org %}
{% data reusables.organizations.people %}
{% data reusables.saml.click-person-revoke-identity %}
{% data reusables.saml.saml-identity-linked %}
{% data reusables.saml.view-sso-identity %}
{% data reusables.saml.revoke-sso-identity %}
{% data reusables.saml.confirm-revoke-identity %}

## アクティブな SAML セッションの表示と取り消し

{% data reusables.profile.access_org %}
{% data reusables.user_settings.access_org %}
{% data reusables.organizations.people %}
{% data reusables.saml.click-person-revoke-session %}
{% data reusables.saml.saml-identity-linked %}
{% data reusables.saml.view-saml-sessions %}
{% data reusables.saml.revoke-saml-session %}

## 認可されたクレデンシャルの表示と取り消し

{% data reusables.saml.about-authorized-credentials %}

{% data reusables.profile.access_org %}
{% data reusables.user_settings.access_org %}
{% data reusables.organizations.people %}
{% data reusables.saml.click-person-revoke-credentials %}
{% data reusables.saml.saml-identity-linked %}
{% data reusables.saml.view-authorized-credentials %}
{% data reusables.saml.revoke-authorized-credentials %}
{% data reusables.saml.confirm-revoke-credentials %}

## 参考リンク

- "[About identity and access management with SAML single sign-on](/articles/about-identity-and-access-management-with-saml-single-sign-on)"{% ifversion ghec %}
- "[Viewing and managing a user's SAML access to your enterprise account](/admin/user-management/managing-users-in-your-enterprise/viewing-and-managing-a-users-saml-access-to-your-enterprise)"{% endif %}
