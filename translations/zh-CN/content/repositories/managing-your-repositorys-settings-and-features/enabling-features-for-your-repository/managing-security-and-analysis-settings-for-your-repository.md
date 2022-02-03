---
title: 管理仓库的安全性和分析设置
intro: '您可以控制功能以保护 {% data variables.product.prodname_dotcom %} 上项目的安全并分析其中的代码。'
permissions: People with admin permissions to a repository can manage security and analysis settings for the repository.
redirect_from:
  - /articles/managing-alerts-for-vulnerable-dependencies-in-your-organization-s-repositories
  - /articles/managing-alerts-for-vulnerable-dependencies-in-your-organizations-repositories
  - /articles/managing-alerts-for-vulnerable-dependencies-in-your-organization
  - /github/managing-security-vulnerabilities/managing-alerts-for-vulnerable-dependencies-in-your-organization
  - /github/administering-a-repository/managing-security-and-analysis-settings-for-your-repository
  - /github/administering-a-repository/managing-repository-settings/managing-security-and-analysis-settings-for-your-repository
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: how_to
topics:
  - Dependabot
  - Alerts
  - Advanced Security
  - Dependency graph
  - Secret scanning
  - Repositories
shortTitle: 安全和分析
---

{% ifversion fpt or ghec %}
## 为公共仓库启用或禁用安全和分析功能

您可以管理公共仓库的一部分安全和分析功能。 其他功能是永久启用的，包括依赖项图和密码扫描。

{% data reusables.repositories.navigate-to-repo %}
{% data reusables.repositories.sidebar-settings %}
{% data reusables.repositories.navigate-to-security-and-analysis %}
4. Under "Configure security and analysis features", to the right of the feature, click **Disable** or **Enable**.{% ifversion fpt %} !["Enable" or "Disable" button for "Configure security and analysis" features in a public repository](/assets/images/help/repository/security-and-analysis-disable-or-enable-fpt-public.png){% elsif ghec %}
!["Enable" or "Disable" button for "Configure security and analysis" features in a public repository](/assets/images/help/repository/security-and-analysis-disable-or-enable-ghec-public.png){% endif %}
{% endif %}

## 为私有仓库启用或禁用安全和分析功能{% ifversion fpt or ghec %}{% endif %}

You can manage the security and analysis features for your {% ifversion fpt or ghec %}private or internal {% endif %}repository.{% ifversion ghes or ghec %} If your organization belongs to an enterprise with a license for {% data variables.product.prodname_GH_advanced_security %} then extra options are available. {% data reusables.advanced-security.more-info-ghas %}
{% elsif fpt %} Organizations that use {% data variables.product.prodname_ghe_cloud %} with {% data variables.product.prodname_advanced_security %} have extra options available. For more information, see the [{% data variables.product.prodname_ghe_cloud %} documentation](/enterprise-cloud@latest//repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-security-and-analysis-settings-for-your-repository#enabling-or-disabling-security-and-analysis-features-for-private-repositories).
{% endif %}

{% data reusables.security.security-and-analysis-features-enable-read-only %}

{% data reusables.repositories.navigate-to-repo %}
{% data reusables.repositories.sidebar-settings %}
{% data reusables.repositories.navigate-to-security-and-analysis %}
{% ifversion fpt or ghes > 3.0 or ghec %}
4. 在“Configure security and analysis features（配置安全性和分析功能）”下，单击功能右侧的 **Disable（禁用）**或 **Enable（启用）**。 {% ifversion not fpt %}The control for "{% data variables.product.prodname_GH_advanced_security %}" is disabled if your enterprise has no available licenses for {% data variables.product.prodname_advanced_security %}.{% endif %}{% ifversion fpt %} !["Enable" or "Disable" button for "Configure security and analysis" features](/assets/images/help/repository/security-and-analysis-disable-or-enable-fpt-private.png){% elsif ghec %}
!["Enable" or "Disable" button for "Configure security and analysis" features](/assets/images/help/repository/security-and-analysis-disable-or-enable-ghec-private.png){% elsif ghes > 3.2 %}
!["Enable" or "Disable" button for "Configure security and analysis" features](/assets/images/enterprise/3.3/repository/security-and-analysis-disable-or-enable-ghes.png){% else %}
!["Enable" or "Disable" button for "Configure security and analysis" features](/assets/images/enterprise/3.1/help/repository/security-and-analysis-disable-or-enable-ghes.png){% endif %}

  {% ifversion not fpt %}
  {% note %}

  **Note:** If you disable {% data variables.product.prodname_GH_advanced_security %}, {% ifversion ghec %}dependency review, {% endif %}{% data variables.product.prodname_secret_scanning %} and {% data variables.product.prodname_code_scanning %} are disabled. 任何工作流程、SARIF上传或 {% data variables.product.prodname_code_scanning %} 的 API 调用都将失败。
  {% endnote %}{% endif %}

  {% endif %}

  {% ifversion ghes = 3.0 %}
4. 在“Configure security and analysis features（配置安全性和分析功能）”下，单击功能右侧的 **Disable（禁用）**或 **Enable（启用）**。 !["Configure security and analysis（配置安全性和分析）"功能的"Enable（启用）"或"Disable（禁用）"按钮](/assets/images/help/repository/security-and-analysis-disable-or-enable-ghe.png)
  {% endif %}
  {% ifversion ghae %}
4. 在“Configure security and analysis features（配置安全性和分析功能）”下，单击功能右侧的 **Disable（禁用）**或 **Enable（启用）**。 在启用“{% data variables.product.prodname_secret_scanning %}”之前，您可能需要先启用 {% data variables.product.prodname_GH_advanced_security %}。 ![为您的仓库启用或禁用 {% data variables.product.prodname_GH_advanced_security %} 或 {% data variables.product.prodname_secret_scanning %}](/assets/images/enterprise/github-ae/repository/enable-ghas-secret-scanning-ghae.png)
  {% endif %}

## 授予对安全警报的访问权限

Security alerts for a repository are visible to people with admin access to the repository and, when the repository is owned by an organization, organization owners. You can give additional teams and people access to the alerts.

{% note %}

组织所有者和仓库管理员只能向具有仓库写入权限的人员授予安全警报的查看权限，如 {% data variables.product.prodname_secret_scanning %} 警报。

{% endnote %}

{% data reusables.repositories.navigate-to-repo %}
{% data reusables.repositories.sidebar-settings %}
{% data reusables.repositories.navigate-to-security-and-analysis %}
4. 在“Access to alerts（访问警报）”下，在搜索字段中开始键入您要查找的个人或团队的名称，然后单击匹配列表中的名称。
   {% ifversion fpt or ghec or ghes > 3.2 %}
   ![用于授予人员或团队访问安全警报的搜索字段](/assets/images/help/repository/security-and-analysis-security-alerts-person-or-team-search.png)
   {% endif %}
   {% ifversion ghes < 3.3 %}
   ![用于授予人员或团队访问安全警报的搜索字段](/assets/images/enterprise/3.2/repository/security-and-analysis-security-alerts-person-or-team-search.png)
   {% endif %}
   {% ifversion ghae %}
   ![用于授予人员或团队访问安全警报的搜索字段](/assets/images/enterprise/github-ae/repository/security-and-analysis-security-alerts-person-or-team-search-ghae.png)
   {% endif %}

5. 单击 **Save changes（保存更改）**。
   {% ifversion fpt or ghes > 3.2 or ghec %}
   ![用于更改安全警报设置的"Save changes（保存更改）"按钮](/assets/images/help/repository/security-and-analysis-security-alerts-save-changes.png)
   {% endif %}
   {% ifversion ghes < 3.3 %}
   ![用于更改安全警报设置的"Save changes（保存更改）"按钮](/assets/images/enterprise/3.2/repository/security-and-analysis-security-alerts-save-changes.png)
   {% endif %}
   {% ifversion ghae %}
   ![用于更改安全警报设置的"Save changes（保存更改）"按钮](/assets/images/enterprise/github-ae/repository/security-and-analysis-security-alerts-save-changes-ghae.png)
   {% endif %}

## 删除对安全警报的访问权限

{% data reusables.repositories.navigate-to-repo %}
{% data reusables.repositories.sidebar-settings %}
{% data reusables.repositories.navigate-to-security-and-analysis %}
4. 在“Access to alerts（访问警报）”下，在要删除其访问权限的个人或团队的右侧，单击 {% octicon "x" aria-label="X symbol" %}。
   {% ifversion fpt or ghec or ghes > 3.2 %}
   ![用于删除某人对您仓库的安全警报访问权限的 "x" 按钮](/assets/images/help/repository/security-and-analysis-security-alerts-username-x.png)
   {% endif %}
   {% ifversion ghes < 3.3 %}
   ![用于删除某人对您仓库的安全警报访问权限的 "x" 按钮](/assets/images/enterprise/3.2/repository/security-and-analysis-security-alerts-username-x.png)
   {% endif %}
   {% ifversion ghae %}
   ![用于删除某人对您仓库的安全警报访问权限的 "x" 按钮](/assets/images/enterprise/github-ae/repository/security-and-analysis-security-alerts-username-x-ghae.png)
   {% endif %}
  5. 单击 **Save changes（保存更改）**。

## 延伸阅读

- "[保护您的仓库](/code-security/getting-started/securing-your-repository)"
- “[管理组织的安全性和分析设置](/organizations/keeping-your-organization-secure/managing-security-and-analysis-settings-for-your-organization)”
