---
title: 在代码空间中开发
intro: '您可以在 {% data variables.product.product_name %} 上打开代码空间，然后使用 {% data variables.product.prodname_vscode %} 的功能进行开发。'
permissions: Anyone can develop in a codespace owned by their user account.
redirect_from:
  - /github/developing-online-with-github-codespaces/developing-in-a-codespace
  - /github/developing-online-with-codespaces/developing-in-a-codespace
versions:
  free-pro-team: '*'
type: how_to
topics:
  - Codespaces
  - Fundamentals
  - Developer
---

{% data reusables.codespaces.release-stage %}

### 关于 {% data variables.product.prodname_codespaces %} 的开发

{% data variables.product.prodname_codespaces %} 为您提供 {% data variables.product.prodname_vscode %} 的完整开发体验。 {% data reusables.codespaces.use-visual-studio-features %}

![带注释的代码空间概述](/assets/images/help/codespaces/codespace-overview-annotated.png)

1. 侧栏 - 默认情况下，此区域显示您在资源管理器中的项目文件。
2. 活动栏 - 显示视图并提供在视图之间切换的方法。 您可以通过拖放来重新排列视图。
3. 编辑器 - 这是您编辑文件的地方。 您可以使用每个编辑器的选项卡将其准确定位到您需要的位置。
4. 面板 - 这是您可以查看输出和调试信息的位置，以及集成终端的默认位置。
5. 状态栏 - 此区域提供有关您的代码空间和项目的有用信息。 例如，分支名称、配置端口等。

有关使用 {% data variables.product.prodname_vscode %} 的更多信息，请参阅 {% data variables.product.prodname_vscode %} 文档中的[用户界面指南](https://code.visualstudio.com/docs/getstarted/userinterface)。

{% data reusables.codespaces.connect-to-codespace-from-vscode %}

{% data reusables.codespaces.use-chrome %} 更多信息请参阅“[代码空间故障排除](/github/developing-online-with-codespaces/troubleshooting-your-codespace)”。

#### 个性化代码空间

{% data reusables.codespaces.about-personalization %} 更多信息请参阅“[个性化您帐户的 {% data variables.product.prodname_codespaces %}](/codespaces/setting-up-your-codespace/personalizing-codespaces-for-your-account)”。

{% data reusables.codespaces.apply-devcontainer-changes %} 更多信息请参阅“[为项目配置 {% data variables.product.prodname_codespaces %}](/github/developing-online-with-codespaces/configuring-codespaces-for-your-project#apply-changes-to-your-configuration)”。

#### 从代码空间运行应用程序
{% data reusables.codespaces.about-port-forwarding %} 更多信息请参阅“[代码空间中的转发端口](/github/developing-online-with-codespaces/forwarding-ports-in-your-codespace)”。

#### 提交更改

{% data reusables.codespaces.committing-link-to-procedure %}

### 导航到现有代码空间

1. {% data reusables.codespaces.you-can-see-all-your-codespaces %}
2. 单击您要在其中开发的代码空间的名称。 ![代码空间的名称](/assets/images/help/codespaces/click-name-codespace.png)

或者，您可以通过导航到创建代码空间的仓库并选择 **{% octicon "codespaces" aria-label="The codespaces icon" %} 代码空间**来查看仓库的任何活动代码空间。
