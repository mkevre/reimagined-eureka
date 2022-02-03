---
title: 邀请用户参加您的组织
intro: 'You can invite anyone to become a member of your organization using their username or email address for {% data variables.product.product_location %}.'
permissions: Organization owners can invite users to join an organization.
redirect_from:
  - /articles/adding-or-inviting-members-to-a-team-in-an-organization
  - /articles/inviting-users-to-join-your-organization
  - /github/setting-up-and-managing-organizations-and-teams/inviting-users-to-join-your-organization
versions:
  fpt: '*'
  ghec: '*'
topics:
  - Organizations
  - Teams
shortTitle: 邀请用户加入
---

## About organization invitations

如果您的组织采用付费的每用户订阅，则必须有未使用的许可才可邀请新成员加入组织或恢复前组织成员。 更多信息请参阅“[关于每用户定价](/articles/about-per-user-pricing)”。

{% data reusables.organizations.org-invite-scim %}

如果您的组织要求成员使用双重身份验证，则您邀请的用户在接受邀请之前必须启用双重身份验证。 更多信息请参阅“[在组织中要求双重身份验证](/organizations/keeping-your-organization-secure/requiring-two-factor-authentication-in-your-organization)”和“[使用双重身份验证 (2FA) 保护您的帐户](/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa)”。

{% ifversion fpt %}Organizations that use {% data variables.product.prodname_ghe_cloud %}{% else %}You{% endif %} can implement SCIM to add, manage, and remove organization members' access to {% data variables.product.prodname_dotcom_the_website %} through an identity provider (IdP). For more information, see "[About SCIM](/enterprise-cloud@latest/organizations/managing-saml-single-sign-on-for-your-organization/about-scim){% ifversion fpt %}" in the {% data variables.product.prodname_ghe_cloud %} documentation.{% else %}."{% endif %}

## Inviting a user to join your organization

{% data reusables.profile.access_org %}
{% data reusables.user_settings.access_org %}
{% data reusables.organizations.people %}
{% data reusables.organizations.invite_member_from_people_tab %}
{% data reusables.organizations.invite_to_org %}
{% data reusables.organizations.choose-to-restore-privileges %}
{% data reusables.organizations.choose-user-role %}
{% data reusables.organizations.add-user-to-teams %}
{% data reusables.organizations.send-invitation %}
{% data reusables.organizations.user_must_accept_invite_email %} {% data reusables.organizations.cancel_org_invite %}

## 延伸阅读
- "[向团队添加组织成员](/articles/adding-organization-members-to-a-team)"
