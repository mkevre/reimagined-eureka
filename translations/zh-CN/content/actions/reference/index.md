---
title: 参考
intro: 使用 GitHub 托管的运行器和身份验证创建工作流程的参考文档。
redirect_from:
  - /actions/configuring-and-managing-workflows/using-variables-and-secrets-in-a-workflow
versions:
  free-pro-team: '*'
  enterprise-server: '>=2.22'
  github-ae: '*'
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}
{% data reusables.actions.ae-beta %}

### 工作流程语法

工作流程文件以 YAML 编写。 在 YAML 工作流程文件中，您可以使用表达式语法来评估上下文信息、文字、运算符和函数。 上下文信息包括工作流程、环境变量、密码和触发工作流程的事件。 当您在工作流程步骤中使用 [`run`](/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun) 运行 shell 命令时，您可以使用特定的工作流程命令语法来设置环境变量、设置后续步骤的输出参数，以及设置错误或调试信息。

{% link_in_list /workflow-syntax-for-github-actions %}
{% link_in_list /context-and-expression-syntax-for-github-actions %}
{% link_in_list /workflow-commands-for-github-actions %}

### 事件

您可以配置工作流和在发生特定 GitHub 事件时运行、在计划的时间运行、手动运行、手动或者当 GitHub 外部事件发生时运行。

{% link_in_list /events-that-trigger-workflows %}

### 身份验证和密码

{% data variables.product.prodname_dotcom %} 提供一个令牌，可用于代表 {% data variables.product.prodname_actions %} 进行身份验证。 您还可以将敏感信息存储在您的组织{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@3.0" or currentVersion == "github-ae@latest" %}、仓库或者环境{% else %} 或仓库{% endif %} 中。 {% data variables.product.prodname_dotcom %} 对所有密码加密。

{% link_in_list /authentication-in-a-workflow %}
{% link_in_list /encrypted-secrets %}

{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@3.0" or currentVersion == "github-ae@latest" %}
### 环境

工作流程作业可以引用具有保护规则或环境特定机密的环境。

{% link_in_list /environments %}
{% endif %}

### 环境变量

{% data variables.product.prodname_dotcom %} 为每个 {% data variables.product.prodname_actions %} 工作流程运行设置默认环境变量。 您也可以在工作流程文件中设置自定义环境变量。

{% link_in_list /environment-variables %}

{% if currentVersion == "free-pro-team@latest" %}
### 管理

在 {% data variables.product.prodname_dotcom %} 托管的运行器上运行工作流程时，存在使用限制和潜在的使用费用。 您也可以禁用或限制 {% data variables.product.prodname_actions %} 在仓库和组织中的使用。

{% link_in_list /usage-limits-billing-and-administration %}

{% endif %}
