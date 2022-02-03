---
title: Managing billing for Codespaces in your organization
shortTitle: 管理计费
intro: 'You can check your {% data variables.product.prodname_codespaces %} usage and set usage limits.'
product: '{% data reusables.gated-features.codespaces %}'
permissions: 'To manage billing for Codespaces for an organization, you must be an organization owner or a billing manager.'
versions:
  fpt: '*'
  ghec: '*'
type: reference
topics:
  - Codespaces
  - Billing
---

## 概览

To learn about pricing for {% data variables.product.prodname_codespaces %}, see "[{% data variables.product.prodname_codespaces %} pricing](/billing/managing-billing-for-github-codespaces/about-billing-for-codespaces#codespaces-pricing)."

{% data reusables.codespaces.codespaces-billing %}

- As an an organization owner or a billing manager you can manage {% data variables.product.prodname_codespaces %} billing for your organization: ["About billing for Codespaces"](/billing/managing-billing-for-github-codespaces/about-billing-for-codespaces)

- For users, there is a guide that explains how billing works: ["Understanding billing for Codespaces"](/codespaces/codespaces-reference/understanding-billing-for-codespaces)

## 使用限制

You can set a usage limit for the codespaces in your organization or repository. This limit is applied to the compute and storage usage for {% data variables.product.prodname_codespaces %}:

- **Compute minutes:** Compute usage is calculated by the actual number of minutes used by all {% data variables.product.prodname_codespaces %} instances while they are active. These totals are reported to the billing service daily, and is billed monthly. You can set a spending limit for {% data variables.product.prodname_codespaces %} usage in your organization. For more information, see "[Managing spending limits for Codespaces](/billing/managing-billing-for-github-codespaces/managing-spending-limits-for-codespaces)."

- **Storage usage:**  For {% data variables.product.prodname_codespaces %} billing purposes, this includes all storage used by all codespaces in your account. This includes all used by the codespaces, such as cloned repositories, configuration files, and extensions, among others. These totals are reported to the billing service daily, and is billed monthly. 到月底，{% data variables.product.prodname_dotcom %} 会将您的存储量舍入到最接近的 MB。 To check how many compute minutes and storage GB have been used by {% data variables.product.prodname_codespaces %}, see "[Viewing your Codespaces usage"](/billing/managing-billing-for-github-codespaces/viewing-your-codespaces-usage)."

## Disabling or limiting {% data variables.product.prodname_codespaces %}

You can disable the use of {% data variables.product.prodname_codespaces %} in your organization or repository. For more information, see "[Managing repository access for your organization's codespaces](/codespaces/managing-codespaces-for-your-organization/managing-access-and-security-for-your-organizations-codespaces)."

You can also limit the individual users who can use {% data variables.product.prodname_codespaces %}. For more information, see "[Managing user permissions for your organization](/codespaces/managing-codespaces-for-your-organization/managing-user-permissions-for-your-organization)."

You can limit the choice of machine types that are available for repositories owned by your organization. This allows you to prevent people using overly resourced machines for their codespaces. For more information, see "[Restricting access to machine types](/codespaces/managing-codespaces-for-your-organization/restricting-access-to-machine-types)."

## Deleting unused codespaces

Your users can delete their codespaces in https://github.com/codespaces and from within Visual Studio Code. To reduce the size of a codespace, users can manually delete files using the terminal or from within Visual Studio Code.

{% note %}

**注意：**只有创建代码空间的人才能将其删除。 目前，组织所有者无法删除其组织内创建的代码空间。

{% endnote %}
