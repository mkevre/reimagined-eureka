---
title: About GitHub Advanced Security
intro: '{% data variables.product.prodname_dotcom %} makes extra security features available to customers under an {% data variables.product.prodname_advanced_security %} license.{% ifversion fpt or ghec %} These features are also enabled for public repositories on {% data variables.product.prodname_dotcom_the_website %}.{% endif %}'
product: '{% data reusables.gated-features.ghas %}'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Security
redirect_from:
  - /github/getting-started-with-github/about-github-advanced-security
  - /github/getting-started-with-github/learning-about-github/about-github-advanced-security
shortTitle: GitHub Advanced Security
---
## About {% data variables.product.prodname_GH_advanced_security %}

{% data variables.product.prodname_dotcom %} has many features that help you improve and maintain the quality of your code. Some of these are included in all plans{% ifversion not ghae %}, such as dependency graph and {% data variables.product.prodname_dependabot_alerts %}{% endif %}. Other security features require {% data variables.product.prodname_GH_advanced_security %}{% ifversion fpt or ghec %} to run on repositories apart from public repositories on {% data variables.product.prodname_dotcom_the_website %}{% endif %}.

{% ifversion ghes > 3.0 or ghec %}For information about buying a license for {% data variables.product.prodname_GH_advanced_security %}, see "[About billing for {% data variables.product.prodname_GH_advanced_security %}](/billing/managing-billing-for-github-advanced-security/about-billing-for-github-advanced-security)."{% elsif ghae %}There is no charge for {% data variables.product.prodname_GH_advanced_security %} on {% data variables.product.prodname_ghe_managed %} during the beta release.{% elsif fpt %}To purchase a {% data variables.product.prodname_GH_advanced_security %} license, you must be using {% data variables.product.prodname_enterprise %}. For information about upgrading to {% data variables.product.prodname_enterprise %} with {% data variables.product.prodname_GH_advanced_security %}, see "[GitHub's products](/get-started/learning-about-github/githubs-products)" and "[About billing for {% data variables.product.prodname_GH_advanced_security %}](/billing/managing-billing-for-github-advanced-security/about-billing-for-github-advanced-security)."{% endif %}

## About {% data variables.product.prodname_advanced_security %} features

A {% data variables.product.prodname_GH_advanced_security %} license provides the following additional features:

- **{% data variables.product.prodname_code_scanning_capc %}** - Search for potential security vulnerabilities and coding errors in your code. For more information, see "[About {% data variables.product.prodname_code_scanning %}](/github/finding-security-vulnerabilities-and-errors-in-your-code/about-code-scanning)."

- **{% data variables.product.prodname_secret_scanning_caps %}** - Detect secrets, for example keys and tokens, that have been checked into the repository. For more information, see "[About {% data variables.product.prodname_secret_scanning %}](/github/administering-a-repository/about-secret-scanning)."

{% ifversion fpt or ghes > 3.1 or ghec or ghae-issue-4864 %}
- **Dependency review** - Show the full impact of changes to dependencies and see details of any vulnerable versions before you merge a pull request. For more information, see "[About dependency review](/code-security/supply-chain-security/about-dependency-review)."
{% endif %}

{% ifversion ghec or ghes > 3.1 %}
- **Security overview** - Review the security configuration and alerts for an organization and identify the repositories at greatest risk. For more information, see "[About the security overview](/code-security/security-overview/about-the-security-overview)."
{% endif %}

For information about {% data variables.product.prodname_advanced_security %} features that are in development, see "[{% data variables.product.prodname_dotcom %} public roadmap](https://github.com/github/roadmap)." For an overview of all security features, see "[{% data variables.product.prodname_dotcom %} security features](/code-security/getting-started/github-security-features)."

{% ifversion fpt or ghec %}
{% data variables.product.prodname_GH_advanced_security %} features are enabled for all public repositories on {% data variables.product.prodname_dotcom_the_website %}. Organizations that use {% data variables.product.prodname_ghe_cloud %} with {% data variables.product.prodname_advanced_security %} can additionally enable these features for private and internal repositories. They also have access an organization-level security overview. {% ifversion fpt %}For more information, see the [{% data variables.product.prodname_ghe_cloud %} documentation](/enterprise-cloud@latest/get-started/learning-about-github/about-github-advanced-security#enabling-advanced-security-features).{% endif %}
{% endif %}

{% ifversion ghes or ghec %}
## Deploying GitHub Advanced Security in your enterprise

To learn about what you need to know to plan your {% data variables.product.prodname_GH_advanced_security %} deployment at a high level, see "[Overview of {% data variables.product.prodname_GH_advanced_security %} deployment](/admin/advanced-security/overview-of-github-advanced-security-deployment)."

To review the rollout phases we recommended in more detail, see "[Deploying {% data variables.product.prodname_GH_advanced_security %} in your enterprise](/admin/advanced-security/deploying-github-advanced-security-in-your-enterprise)."
{% endif %}

{% ifversion not fpt %}
## Enabling {% data variables.product.prodname_advanced_security %} features

{%- ifversion ghes %}
The site administrator must enable {% data variables.product.prodname_advanced_security %} for {% data variables.product.product_location %} before you can use these features. For more information, see "[Configuring Advanced Security features](/admin/configuration/configuring-advanced-security-features).

Once your system is set up, you can enable and disable these features at the organization or repository level.

{%- elsif ghec %}
For public repositories these features are permanently on and can only be disabled if you change the visibility of the project so that the code is no longer public. 

For other repositories, once you have a license for your enterprise account, you can enable and disable these features at the organization or repository level. 

{%- elsif ghae %}
You can enable and disable these features at the organization or repository level.
{%- endif %}
For more information, see "[Managing security and analysis settings for your organization](/organizations/keeping-your-organization-secure/managing-security-and-analysis-settings-for-your-organization)" and "[Managing security and analysis settings for your repository](/github/administering-a-repository/managing-security-and-analysis-settings-for-your-repository)."

{% ifversion ghec or ghes > 3.0 %}
If you have an enterprise account, license use for the entire enterprise is shown on your enterprise license page. For more information, see "[Viewing your {% data variables.product.prodname_GH_advanced_security %} usage](/billing/managing-licensing-for-github-advanced-security/viewing-your-github-advanced-security-usage)."
{% endif %}

{% endif %}

{% ifversion ghec or ghes > 3.0 or ghae  %}
## Further reading

- "[Enforcing policies for {% data variables.product.prodname_advanced_security %} in your enterprise account](/admin/policies/enforcing-policies-for-advanced-security-in-your-enterprise)"

{% endif %}
