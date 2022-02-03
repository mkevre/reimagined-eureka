---
title: Codespaces 的灾难恢复
intro: 本文描述了当整个地区因重大自然灾害或大范围服务中断而中断时，灾难恢复情景的指导。
versions:
  fpt: '*'
  ghec: '*'
product: '{% data reusables.gated-features.codespaces %}'
topics:
  - Codespaces
shortTitle: Disaster recovery
---

我们努力确保您始终能够使用 {% data variables.product.prodname_codespaces %}。 但是，超出我们控制范围的力量有时会以导致计划外服务中断的方式影响服务。

虽然灾难恢复情况很少发生，但我们建议您为整个区域出现中断的可能性做好准备。 如果整个区域遇到服务中断，则数据的本地冗余副本将暂时不可用。

以下指南提供了如何处理部署代码空间的整个区域的服务中断的选项。

{% note %}

**注意：** 您可以通过频繁推送到远程仓库来减少服务中断的潜在影响。

{% endnote %}

## Option 1: Create a new codespace in another region

In the case of a regional outage, we suggest you recreate your codespace in an unaffected region to continue working. 此新代码将包含您上次推送到 {% data variables.product.prodname_dotcom %} 后的所有更改。 For information on manually setting another region, see "[Setting your default region for Codespaces](/codespaces/managing-your-codespaces/setting-your-default-region-for-codespaces)."

You can optimize recovery time by configuring a `devcontainer.json` in the project's repository, which allows you to define the tools, runtimes, frameworks, editor settings, extensions, and other configuration necessary to restore the development environment automatically. For more information, see "[Introduction to dev containers](/codespaces/setting-up-your-codespace/configuring-codespaces-for-your-project)."

## 选项 2：等待恢复

在这种情况下，不需要您采取任何行动。 要知道，我们正在努力恢复服务可用性。

You can check the current service status on the [Status Dashboard](https://www.githubstatus.com/).

## 选项 3：本地克隆仓库或在浏览器中编辑

虽然 {% data variables.product.prodname_codespaces %} 具有预配置的开发者环境的优点，但您的源代码应该始终可以通过 {% data variables.product.prodname_dotcom_the_website %} 托管的仓库访问。 如果发生 {% data variables.product.prodname_codespaces %} 中断，您仍然可以本地克隆存储库或在 {% data variables.product.company_short %} 浏览器编辑器中编辑文件。 For more information, see "[Editing files](/repositories/working-with-files/managing-files/editing-files)."

虽然此选项没有为您配置开发环境， 但它允许您在等待服务中断解决时根据需要更改源代码。

## 选项 4：对本地容器化环境使用远程容器和 Docker

如果您的存储库具有 `devconconer.json`，请考虑在 Visual Studio Code 中使用[远程容器扩展](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume)构建并连接到仓库的本地开发容器。 此选项的设置时间将因您本地规格和开发容器设置的复杂性而异。

{% note %}

**注意：** 在尝试此选项之前，请确保您的本地设置符合[最低要求](https://code.visualstudio.com/docs/remote/containers#_system-requirements)。

{% endnote %}
