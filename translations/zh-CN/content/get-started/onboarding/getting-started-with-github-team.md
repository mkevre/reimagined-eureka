---
title: Getting started with GitHub Team
intro: 'With {% data variables.product.prodname_team %} groups of people can collaborate across many projects at the same time in an organization account.'
versions:
  fpt: '*'
---

This guide will walk you through setting up, configuring and managing your {% data variables.product.prodname_team %} account as an organization owner.

## Part 1: Configuring your account on {% data variables.product.product_location %}
As the first steps in starting with {% data variables.product.prodname_team %}, you will need to create a user account or log into your existing account on {% data variables.product.prodname_dotcom %}, create an organization, and set up billing.

### 1. 关于组织
组织是共享帐户，其中业务和开源项目可一次协助处理多个项目。 所有者和管理员可通过复杂的安全和管理功能管理成员对组织数据和项目的访问。 For more information on the features of organizations, see "[About organizations](/organizations/collaborating-with-groups-in-organizations/about-organizations#terms-of-service-and-data-protection-for-organizations)."

### 2. Creating an organization and signing up for {% data variables.product.prodname_team %}
Before creating an organization, you will need to create a user account or log in to your existing account on {% data variables.product.product_location %}. 更多信息请参阅“[注册新 {% data variables.product.prodname_dotcom %} 帐户](/get-started/signing-up-for-github/signing-up-for-a-new-github-account)”。

Once your user account is set up, you can create an organization and pick a plan. This is where you can choose a {% data variables.product.prodname_team %} subscription for your organization. 更多信息请参阅“[从头开始创建新组织](/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch)”。

### 3. Managing billing for an organization
You must manage billing settings, payment method, and paid features and products for each of your personal accounts and organizations separately. You can switch between settings for your different accounts using the context switcher in your settings. 更多信息请参阅“[在不同帐户的设置之间切换](/billing/managing-your-github-billing-settings/about-billing-on-github#switching-between-settings-for-your-different-accounts)”。

Your organization's billing settings page allows you to manage settings like your payment method, billing cycle and billing email, or view information such as your subscription, billing date and payment history. You can also view and upgrade your storage and GitHub Actions minutes. For more information on managing your billing settings, see "[Managing your {% data variables.product.prodname_dotcom %} billing settings](/billing/managing-your-github-billing-settings)."

Only organization members with the *owner* or *billing manager* role can access or change billing settings for your organization. A billing manager is someone  who manages the billing settings for your organization and does not use a paid license in your organization's subscription. For more information on adding a billing manager to your organization, see "[Adding a billing manager to your organization](/organizations/managing-peoples-access-to-your-organization-with-roles/adding-a-billing-manager-to-your-organization)."


## Part 2: Adding members and setting up teams
After creating your organization, you can invite members and set permissions and roles. You can also create different levels of teams and set customized levels of permissions for your organization's repositories, project boards, and apps.

### 1. Managing members of your organization
{% data reusables.getting-started.managing-org-members %}

### 2. Organization permissions and roles
{% data reusables.getting-started.org-permissions-and-roles %}

### 3. About and creating teams
{% data reusables.getting-started.about-and-creating-teams %}
### 4. Managing team settings
{% data reusables.getting-started.managing-team-settings %}

### 5. Giving people and teams access to repositories, project boards and apps
{% data reusables.getting-started.giving-access-to-repositories-projects-apps %}
## Part 3: Managing security for your organization
You can help to make your organization more secure by recommending or requiring two-factor authentication for your organization members, configuring security features, and reviewing your organization's audit log and integrations.

### 1. Requiring two-factor authentication
{% data reusables.getting-started.requiring-2fa %}

### 2. Configuring security features for your organization
{% data reusables.getting-started.configuring-security-features %}

### 3. Reviewing your organization's audit log and integrations
{% data reusables.getting-started.reviewing-org-audit-log-and-integrations %}

## Part 4: Setting organization level policies
### 1. Managing organization policies
{% data reusables.getting-started.managing-org-policies %}
### 2. Managing repository changes
{% data reusables.getting-started.managing-repo-changes %}
### 3. Using organization-level community health files and moderation tools
{% data reusables.getting-started.using-org-community-files-and-moderation-tools %}
## Part 5: Customizing and automating your work on {% data variables.product.product_name %}

{% data reusables.getting-started.customizing-and-automating %}
### 1. Using {% data variables.product.prodname_marketplace %}
{% data reusables.getting-started.marketplace %}
### 2. Using the {% ifversion fpt or ghec %}{% data variables.product.prodname_dotcom %}{% else %}{% data variables.product.product_name %}{% endif %} API
{% data reusables.getting-started.api %}

### 3. Building {% data variables.product.prodname_actions %}
{% data reusables.getting-started.actions %}

### 4. Publishing and managing {% data variables.product.prodname_registry %}
{% data reusables.getting-started.packages %}

## Part 6: Participating in {% data variables.product.prodname_dotcom %}'s community
{% data reusables.getting-started.participating-in-community %}
### 1. Contributing to open source projects
{% data reusables.getting-started.open-source-projects %}

### 2. Interacting with the {% data variables.product.prodname_gcf %}
{% data reusables.support.ask-and-answer-forum %}

### 3. Reading about {% data variables.product.prodname_team %} on {% data variables.product.prodname_docs %}
You can read documentation that reflects the features available with {% data variables.product.prodname_team %}. For more information, see "[About versions of {% data variables.product.prodname_docs %}](/get-started/learning-about-github/about-versions-of-github-docs)."

### 4. Learning with {% data variables.product.prodname_learning %}
{% data reusables.getting-started.learning-lab %}

### 5. Supporting the open source community
{% data reusables.getting-started.sponsors %}

### 6. 联系 {% data variables.contact.github_support %}
{% data reusables.getting-started.contact-support %}
## 延伸阅读

- "[Getting started with your GitHub account](/get-started/onboarding/getting-started-with-your-github-account)"
