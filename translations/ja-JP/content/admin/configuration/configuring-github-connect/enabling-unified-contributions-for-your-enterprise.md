---
title: Enabling unified contributions for your enterprise
shortTitle: Unified contributions
intro: 'You can allow users to include anonymized contribution counts for their work on {% data variables.product.product_location %} in their contribution graphs on {% data variables.product.prodname_dotcom_the_website %}.'
redirect_from:
  - /enterprise/admin/guides/developer-workflow/enabling-unified-contributions-between-github-enterprise-and-github-com
  - /enterprise/admin/guides/developer-workflow/enabling-unified-contributions-between-github-enterprise-server-and-github-com
  - /enterprise/admin/developer-workflow/enabling-unified-contributions-between-github-enterprise-server-and-githubcom
  - /enterprise/admin/installation/enabling-unified-contributions-between-github-enterprise-server-and-githubcom
  - /enterprise/admin/configuration/enabling-unified-contributions-between-github-enterprise-server-and-githubcom
  - /admin/configuration/enabling-unified-contributions-between-github-enterprise-server-and-githubcom
  - /admin/configuration/managing-connections-between-github-enterprise-server-and-github-enterprise-cloud/enabling-unified-contributions-between-github-enterprise-server-and-githubcom
  - /admin/configuration/managing-connections-between-your-enterprise-accounts/enabling-unified-contributions-between-your-enterprise-account-and-githubcom
permissions: 'Enterprise owners who are also owners of the connected {% data variables.product.prodname_ghe_cloud %} organization or enterprise account can enable unified contributions between {% data variables.product.product_location %} and {% data variables.product.prodname_dotcom_the_website %}.'
versions:
  ghes: '*'
  ghae: '*'
type: how_to
topics:
  - Enterprise
  - GitHub Connect
---

{% data reusables.github-connect.beta %}

## About unified contributions

As an enterprise owner, you can allow end users to send anonymized contribution counts for their work from {% data variables.product.product_location %} to their {% data variables.product.prodname_dotcom_the_website %} contribution graph.

After you enable {% data variables.product.prodname_unified_contributions %}, before individual users can send contribution counts from {% data variables.product.product_location %} to {% data variables.product.prodname_dotcom_the_website %}, each user must also connect their personal account on {% data variables.product.product_name %} with a personal account on {% data variables.product.prodname_dotcom_the_website %}. For more information, see "[Sending enterprise contributions to your {% data variables.product.prodname_dotcom_the_website %} profile](/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/sending-enterprise-contributions-to-your-githubcom-profile)."

{% data reusables.github-connect.sync-frequency %}

If the enterprise owner disables the functionality or individual users opt out of the connection, the contribution counts from {% data variables.product.product_name %} will be deleted on {% data variables.product.prodname_dotcom_the_website %}. If the user reconnects their profiles after disabling them, the contribution counts for the past 90 days are restored.

{% data variables.product.product_name %} は、接続されているユーザーのコントリビューションカウントおよびソース ({% data variables.product.product_name %}) **のみ**を送信します。 コントリビューションまたはその作成方法に関する情報は送信されません。

## Enabling unified contributions

Before enabling {% data variables.product.prodname_unified_contributions %} on {% data variables.product.product_location %}, you must enable {% data variables.product.prodname_github_connect %}. For more information, see "[Managing {% data variables.product.prodname_github_connect %}](/admin/configuration/configuring-github-connect/managing-github-connect)."

{% ifversion ghes %}
{% data reusables.github-connect.access-dotcom-and-enterprise %}
{% data reusables.enterprise_site_admin_settings.access-settings %}
{% data reusables.enterprise_site_admin_settings.business %}
{% ifversion ghes < 3.1 %}{% data reusables.enterprise-accounts.settings-tab %}{% endif %}{% data reusables.enterprise-accounts.github-connect-tab %}{% else %}
1. {% data variables.product.product_location %}と{% data variables.product.prodname_dotcom_the_website %}にサインインしてください。
{% data reusables.enterprise-accounts.access-enterprise %}{% data reusables.enterprise-accounts.github-connect-tab %}{% endif %}
1. Under "Users can share contribution counts to {% data variables.product.prodname_dotcom_the_website %}", click **Request access**. ![Request access to unified contributions option](/assets/images/enterprise/site-admin-settings/dotcom-ghe-connection-request-access.png){% ifversion ghes %}
2. {% data variables.product.prodname_ghe_server %} サイトに[サインイン](https://enterprise.github.com/login)して、以降の指示を受けてください。

When you request access, we may redirect you to the {% data variables.product.prodname_ghe_server %} site to check your current terms of service.
{% endif %}
