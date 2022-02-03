---
title: Filtering alerts in the security overview
intro: Use filters to view specific categories of alerts
permissions: Organization owners and security managers can access the security overview for organizations. Members of a team can see the security overview for repositories that the team has admin privileges for.
product: '{% data reusables.gated-features.security-center %}'
versions:
  fpt: '*'
  ghes: '>3.1'
  ghec: '*'
type: how_to
topics:
  - Security overview
  - Advanced Security
  - Alerts
  - Organizations
  - Teams
shortTitle: Filtering alerts
---

{% data reusables.security-center.beta %}

## About filtering the security overview

You can use filters in the security overview to narrow your focus based on a range of factors, like alert risk level, alert type and feature enablement. Different filters are available depending on the specific view and whether you analysing at the organization, team or repository level.

## リポジトリでフィルタ

Available in all organization-level and team-level views.

| 修飾子                    | 説明                                            |
| ---------------------- | --------------------------------------------- |
| `repo:REPOSITORY-NAME` | Displays alerts for the specified repository. |

## Filter by whether security features are enabled

Available in the organization-level and team-level overview.

| 修飾子                           | 説明                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `code-scanning:enabled`       | {% data variables.product.prodname_code_scanning %}が有効化されているリポジトリを表示します。      |
| `code-scanning:not-enabled`   | {% data variables.product.prodname_code_scanning %}が有効化されていないリポジトリを表示します。     |
| `secret-scanning:enabled`     | {% data variables.product.prodname_secret_scanning %}が有効化されているリポジトリを表示します。    |
| `secret-scanning:not-enabled` | {% data variables.product.prodname_secret_scanning %}が有効化されているリポジトリを表示します。    |
| `dependabot:enabled`          | {% data variables.product.prodname_dependabot_alerts %}が有効化されているリポジトリを表示します。  |
| `dependabot:not-enabled`      | {% data variables.product.prodname_dependabot_alerts %}が有効化されていないリポジトリを表示します。 |
| `not-enabled:any`             | Display repositories with at least one security feature that is not enabled.    |

## リポジトリの種類によるフィルタ

Available in the organization-level and team-level overview.

| 修飾子 | 説明 |
| --- | -- |
|     |    |
{%- ifversion fpt or ghes or ghec %}
| `is:public` | Display public repositories. |
{%- endif %}
{%- ifversion ghes or ghec or ghae %}
| `is:internal` | Display internal repositories. |
{%- endif %}
| `is:private` | Display private repositories. | | `archived:true` | Display archived repositories. | | `archived:true` | Display archived repositories. |

## リポジトリに対するリスクレベルによるフィルタリング

The level of risk for a repository is determined by the number and severity of alerts from security features. If one or more security features are not enabled for a repository, the repository will have an unknown level of risk. If a repository has no risks that are detected by security features, the repository will have a clear level of risk. Available in the organization-level overview.

| 修飾子            | 説明                          |
| -------------- | --------------------------- |
| `risk:high`    | 高リスクのリポジトリを表示します。           |
| `risk:medium`  | 中程度のリスクのリポジトリを表示します。        |
| `risk:low`     | 低リスクのリポジトリを表示します。           |
| `risk:unknown` | リスクレベルが不明なリポジトリを表示します。      |
| `risk:clear`   | リスクレベルが検出されていないリポジトリを表示します。 |

## アラート数によるフィルタ

Available in the organization-level overview.

| 修飾子                       | 説明                                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <code>code-scanning:<em>n</em></code> | *n*件の{% data variables.product.prodname_code_scanning %}アラートがあるリポジトリを表示します。 This qualifier can use `=`, `>` and `<` comparison operators.   |
| <code>secret-scanning:<em>n</em></code> | *n*件の{% data variables.product.prodname_secret_scanning %}アラートを持つリポジトリを表示します。 This qualifier can use `=`, `>` and `<` comparison operators. |
| <code>dependabot:<em>n</em></code> | *n*件の{% data variables.product.prodname_dependabot_alerts %}を持つリポジトリを表示します。 This qualifier can use `=`, `>` and `<` comparison operators.   |


## Teamによるフィルタ

Available in the organization-level overview.

| 修飾子                       | 説明                               |
| ------------------------- | -------------------------------- |
| <code>team:<em>TEAM-NAME</em></code> | *TEAM-NAME*が管理者権限を持つリポジトリを表示します。 |

## トピックによるフィルタ

Available in the organization-level overview.

| 修飾子                       | 説明                             |
| ------------------------- | ------------------------------ |
| <code>topic:<em>TOPIC-NAME</em></code> | *TOPIC-NAME*で分類されるリポジトリを表示します。 |

{% ifversion ghec or ghes > 3.4 %}

## Filter by severity

Available in the code scanning alert views. All code scanning alerts have one of the categories shown below. You can click any result to see full details of the relevant rule, and the line of code that triggered the alert.

| 修飾子                 | 説明                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| `severity:critical` | Displays {% data variables.product.prodname_code_scanning %} alerts categorized as critical. |
| `severity:high`     | Displays {% data variables.product.prodname_code_scanning %} alerts categorized as high.     |
| `severity:medium`   | Displays {% data variables.product.prodname_code_scanning %} alerts categorized as medium.   |
| `severity:low`      | Displays {% data variables.product.prodname_code_scanning %} alerts categorized as low.      |
| `severity:error`    | Displays {% data variables.product.prodname_code_scanning %} alerts categorized as errors.   |
| `severity:warning`  | Displays {% data variables.product.prodname_code_scanning %} alerts categorized as warnings. |
| `severity:note`     | Displays {% data variables.product.prodname_code_scanning %} alerts categorized as notes.    |

{% endif %}

## Filter by secret types

Available in the secret scanning alert views.

| 修飾子                            | 説明                                                                                                                                                                                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `secret-type:SERVICE_PROVIDER` | Displays alerts for the specified secret and provider. For more information, see "[List of supported secrets for private repositories](/code-security/secret-scanning/about-secret-scanning#list-of-supported-secrets-for-private-repositories) |
| `secret-type:CUSTOM-PATTERN`   | Displays alerts for secrets matching the specified custom pattern. For more information, see "[Defining custom patterns for secret scanning](/code-security/secret-scanning/defining-custom-patterns-for-secret-scanning)."                     |

## Filter by provider

Available in the secret scanning alert views.

| 修飾子                      | 説明                                                                                                                                                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider:PROVIDER_NAME` | Displays alerts for all secrets issues by the specified provider. For more information, see "[List of supported secrets for private repositories](/code-security/secret-scanning/about-secret-scanning#list-of-supported-secrets-for-private-repositories) |
