---
title: GitHub 安全功能
intro: '{% data variables.product.prodname_dotcom %} 安全功能概述。'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: overview
topics:
  - Repositories
  - Dependencies
  - Vulnerabilities
  - Advanced Security
---

## 关于 {% data variables.product.prodname_dotcom %} 安全功能

{% data variables.product.prodname_dotcom %} 具有安全功能，有助于在仓库和组织间保持代码和秘密安全。 {% data reusables.advanced-security.security-feature-availability %}

{% data variables.product.prodname_advisory_database %} 包含您可以查看、搜索和过滤的安全漏洞列表。 {% data reusables.security-advisory.link-browsing-advisory-db %}

{% ifversion fpt or ghes or ghae-issue-4864 or ghec %}
## 适用于所有仓库
{% endif %}
{% ifversion fpt or ghes > 3.0 or ghae or ghec %}
### 安全策略

让您的用户能够轻松地秘密报告他们在仓库中发现的安全漏洞。 更多信息请参阅“[添加安全政策到仓库](/code-security/getting-started/adding-a-security-policy-to-your-repository)”。
{% endif %}

{% ifversion fpt or ghec %}
### 安全通告

私下讨论并修复仓库代码中的安全漏洞。 然后，您可以发布安全通告，提醒您的社区注意漏洞并鼓励社区成员升级。 更多信息请参阅“[关于 {% data variables.product.prodname_security_advisories %}](/github/managing-security-vulnerabilities/about-github-security-advisories)”。

{% endif %}
{% ifversion fpt or ghec or ghes > 3.2 %}

### {% data variables.product.prodname_dependabot_alerts %} 和安全更新

查看有关已知包含安全漏洞的依赖项的警报，并选择是否自动生成拉取请求以更新这些依赖项。 更多信息请参阅“[关于漏洞依赖项的警报](/github/managing-security-vulnerabilities/about-alerts-for-vulnerable-dependencies)”和“[关于 {% data variables.product.prodname_dependabot_security_updates %}](/github/managing-security-vulnerabilities/about-dependabot-security-updates)”。
{% endif %}

{% ifversion ghes < 3.3 or ghae-issue-4864 %}
### {% data variables.product.prodname_dependabot_alerts %}

{% data reusables.dependabot.dependabot-alerts-beta %}

查看有关已知包含安全漏洞的依赖项的警报，并管理这些警报。 更多信息请参阅“[关于易受攻击的依赖项的警报](/github/managing-security-vulnerabilities/about-alerts-for-vulnerable-dependencies)”。
{% endif %}

{% ifversion fpt or ghec or ghes > 3.2 %}
### {% data variables.product.prodname_dependabot %} 版本更新

使用 {% data variables.product.prodname_dependabot %} 自动提出拉取请求以保持依赖项的更新。 这有助于减少您暴露于旧版本依赖项。 如果发现安全漏洞，使用更新后的版本就更容易打补丁，{% data variables.product.prodname_dependabot_security_updates %} 也更容易成功地提出拉取请求以升级有漏洞的依赖项。 更多信息请参阅“[关于 {% data variables.product.prodname_dependabot_version_updates %}](/github/administering-a-repository/about-dependabot-version-updates)”。
{% endif %}

{% ifversion fpt or ghes or ghae-issue-4864 or ghec %}
### 依赖关系图
依赖关系图允许您探索仓库所依赖的生态系统和包，以及依赖于您的仓库的仓库和包。

您可以在仓库的 **Insights（洞察）**选项卡上找到依赖项图。 更多信息请参阅“[关于依赖关系图](/github/visualizing-repository-data-with-graphs/about-the-dependency-graph)”。
{% endif %}

## Available with {% data variables.product.prodname_GH_advanced_security %}

{% data reusables.advanced-security.ghas-availability %}

### {% data variables.product.prodname_code_scanning_capc %}

自动检测新代码或修改代码中的安全漏洞和编码错误。 潜在的问题被高亮显示，并附有详细信息，允许您在将代码合并到默认分支之前修复它。 更多信息请参阅“[关于代码扫描](/github/finding-security-vulnerabilities-and-errors-in-your-code/about-code-scanning)”。

### {% data variables.product.prodname_secret_scanning_caps %}

Automatically detect tokens or credentials that have been checked into a repository. {% ifversion fpt or ghec %}For secrets identified in public repositories, the service is informed that the secret may be compromised.{% endif %}
{%- ifversion ghec or ghes or ghae %}
{% ifversion ghec %}For private repositories, you can view {% elsif ghes or ghae %}View {% endif %}any secrets that {% data variables.product.company_short %} has found in your code. You should treat tokens or credentials that have been checked into the repository as compromised.{% endif %} For more information, see "[About secret scanning](/github/administering-a-repository/about-secret-scanning)."

{% ifversion fpt or ghes > 3.1 or ghae-issue-4864 or ghec %}
### 依赖项审查

在合并拉取请求之前显示依赖项更改的全部影响以及任何有漏洞版本的详情。 更多信息请参阅“[关于依赖项审查](/code-security/supply-chain-security/about-dependency-review)”。
{% endif %}

## 延伸阅读
- “[{% data variables.product.prodname_dotcom %} 的产品](/github/getting-started-with-github/githubs-products)”
- "[{% data variables.product.prodname_dotcom %} 语言支持](/github/getting-started-with-github/github-language-support)"
