---
title: Introduction to dev containers
intro: '您可以使用 `devcontainer.json` 文件来定义仓库的 {% data variables.product.prodname_codespaces %} 环境。'
allowTitleToDifferFromFilename: true
permissions: People with write permissions to a repository can create or edit the codespace configuration.
redirect_from:
  - /github/developing-online-with-github-codespaces/configuring-github-codespaces-for-your-project
  - /codespaces/setting-up-your-codespace/configuring-codespaces-for-your-project
  - /github/developing-online-with-codespaces/configuring-codespaces-for-your-project
  - /codespaces/customizing-your-codespace/configuring-codespaces-for-your-project
versions:
  fpt: '*'
  ghec: '*'
type: how_to
topics:
  - Codespaces
  - Set up
  - Fundamentals
product: '{% data reusables.gated-features.codespaces %}'
---

 

## 关于开发容器

开发容器是 {% data variables.product.prodname_codespaces %} 用于提供项目开发所需的工具和运行时的环境。 If your project does not already have a dev container defined, {% data variables.product.prodname_codespaces %} will use the default configuration, which contains many of the common tools that your team might need for development with your project. For more information, see "[Using the default configuration](#using-the-default-configuration)."

If you want all users of your project to have a consistent environment that is tailored to your project, you can add a dev container to your repository. You can use a predefined configuration to select a common configuration for various project types with the option to further customize your project or you can create your own custom configuration. For more information, see "[Using a predefined container configuration](#using-a-predefined-container-configuration)" and "[Creating a custom codespace configuration](#creating-a-custom-codespace-configuration)." 您选择的选项取决于用户在项目中取得成功可能需要使用的工具、运行时、依赖项和工作流程。

{% data variables.product.prodname_codespaces %} 允许使用 `devcontainer.json` 文件针对每个项目和每个分支进行自定义。 此配置文件通过定义可包括框架、工具、扩展和端口转发的开发容器，确定任何人为仓库创建的每个新代码空间的环境。 Dockerfile 还可与 `.devcontainer` 文件夹中的 `devcontainer.json` 文件一起使用，以定义创建容器映像所需的所有要素。

### devcontainer.json

{% data reusables.codespaces.devcontainer-location %}

您可以使用 `devcontainer.json` 为整个代码空间环境设置默认设置，包括编辑器，但您也可以在 `.vscode/set.json` 文件中设置代码空间中单个[工作空间](https://code.visualstudio.com/docs/editor/workspaces)的编辑器特定设置。

有关在 `devcontainer.json` 中可以设置的设置和属性，请参阅 {% data variables.product.prodname_vscode %} 文档中的 [devcontainer.json 参考](https://aka.ms/vscode-remote/devcontainer.json)。

### Dockerfile

Dockerfile 也存在于 `.devcontainer` 文件夹中。

您可以将 Dockerfile 添加到项目中来定义容器映像和安装软件。 在 Dockerfile 中，您可以使用 `FROM` 来指定容器映像。

```Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-14

# ** [Optional] Uncomment this section to install additional packages. **
# USER root
#
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
#
# USER codespace
```

您可以使用 `RUN` 指令安装任何软件并使用 `&&` 加入命令。

使用 `dockerfile` 属性，在您的 `devcontainer.json` 文件中引用 Dockerfile。

```json
{
  ...
  "build": { "dockerfile": "Dockerfile" },
  ...
}
```

有关在开发容器中使用 Dockerfile 的更多信息，请参阅 {% data variables.product.prodname_vscode %} 文档中的[创建开发容器](https://code.visualstudio.com/docs/remote/create-dev-container#_dockerfile)。

## 使用默认配置

如果您没有在仓库中定义配置，{% data variables.product.prodname_dotcom %} 将创建一个具有基本 Linux 映像的代码空间。 基本 Linux 映像包括语言和运行时，例如 Python、Node.js、JavaScript、TypeScript、C++、Java、.NET、PHP、PowerShell、Go、Ruby 和 Rust。 它还包括其他开发工具和实用程序，例如 git、GitHub CLI、yarn、openssh 和 vim。 要查看包含的所有语言、运行时和工具，请在代码空间终端内使用 `devcontainer-info content-url` 命令，然后遵循命令输出的 url。

或者，要详细了解基本 Linux 映像中包含的所有内容，请参阅 [`microsoft/vscode-dev-containers`](https://github.com/microsoft/vscode-dev-containers/tree/main/containers/codespaces-linux) 仓库中的最新文件。

如果您要处理使用 {% data variables.product.prodname_codespaces %} 提供的语言和工具的小型项目，默认配置是个不错的选择。


## 使用预定义的容器配置

预定义容器定义包括特定项目类型的共同配置，可帮助您利用现有的配置快速开始使用，配置中已经有适当的容器选项、{% data variables.product.prodname_vscode %} 设置和应该安装的 {% data variables.product.prodname_vscode %} 扩展。

如果您需要一些额外的扩展性，使用预先定义的配置是一个好主意。 您也可以从预定义的配置开始，然后根据项目的设置对其进行修改。

{% data reusables.codespaces.command-palette-container %}
1. 单击要使用的定义。 ![预定义容器定义列表](/assets/images/help/codespaces/predefined-container-definitions-list.png)
1. 按照提示自定义您的定义。 For more information on the options to customize your definition, see "[Adding additional features to your `devcontainer.json` file](#adding-additional-features-to-your-devcontainerjson-file)."
1. 单击 **OK（确定）**。 ![确定按钮](/assets/images/help/codespaces/prebuilt-container-ok-button.png)
1. 要应用更改，请在屏幕右下角单击 **Rebuild now（立即重建）**。 有关重建容器的更多信息，请参阅“[应用对配置的更改](#applying-changes-to-your-configuration)”。 !["Codespaces: Rebuild Container" in the {% data variables.product.prodname_vscode_command_palette %}](/assets/images/help/codespaces/rebuild-prompt.png)

### Adding additional features to your `devcontainer.json` file

{% note %}

**Note:** This feature is in beta and subject to change.

{% endnote %}

You can add features to your predefined container configuration to customize which tools are available and extend the functionality of your workspace without creating a custom codespace configuration. For example, you could use a predefined container configuration and add the {% data variables.product.prodname_cli %} as well. You can make these additional features available for your project by adding the features to your `devcontainer.json` file when you set up your container configuration.

You can add some of the most common features by selecting them when configuring your predefined container. For more information on the available features, see the [script library](https://github.com/microsoft/vscode-dev-containers/tree/main/script-library#scripts) in the `vscode-dev-containers` repository.

![The select additional features menu during container configuration.](/assets/images/help/codespaces/select-additional-features.png)

You can also add or remove features outside of the **Add Development Container Configuration Files** workflow.
1. Access the Command Palette (`Shift + Command + P` / `Ctrl + Shift + P`), then start typing "configure". Select **Codespaces: Configure Devcontainer Features**. ![The Configure Devcontainer Features command in the command palette](/assets/images/help/codespaces/codespaces-configure-features.png)
2. Update your feature selections, then click **OK**. ![The select additional features menu during container configuration.](/assets/images/help/codespaces/select-additional-features.png)
1. 要应用更改，请在屏幕右下角单击 **Rebuild now（立即重建）**。 有关重建容器的更多信息，请参阅“[应用对配置的更改](#applying-changes-to-your-configuration)”。 ![命令面板中的"Codespaces：重建容器"](/assets/images/help/codespaces/rebuild-prompt.png)


## 创建自定义代码空间配置

如果任何预定义的配置都不能满足您的需要，您可以通过添加 `devcontainer.json` 文件来创建自定义配置。 {% data reusables.codespaces.devcontainer-location %}

在该文件中，您可以使用[支持的配置键](https://code.visualstudio.com/docs/remote/devcontainerjson-reference)来指定代码空间环境的各个方面，例如要安装哪些 {% data variables.product.prodname_vscode %} 扩展。

{% data reusables.codespaces.vscode-settings-order %}

您可以在两个地方定义 {% data variables.product.prodname_vscode %} 的默认编辑器设置。

* `.vscode/settings.json` 中定义的编辑器设置在代码空间中用作 _Workspace_ 范围的设置。
* `devcontainer.json` 的 `settings` 键中定义的编辑器设置在代码空间中用作 _Remote [Codespaces]_ 范围的设置。

在更新 `devcontainer.json` 文件后，您可以重建代码空间的容器来应用更改。 更多信息请参阅“[应用对配置的更改](#applying-changes-to-your-configuration)”。


<!--
## Supported codespace configuration keys

You can use configuration keys supported by {% data variables.product.prodname_codespaces %} in `devcontainer.json`.

### General settings

- `name`
- `settings`
- `extensions`
- `forwardPorts`
- `postCreateCommand`

### Docker, Dockerfile, or image settings

- `image`
- `dockerFile`
- `context`
- `containerEnv`
- `remoteEnv`
- `containerUser`
- `remoteUser`
- `mounts`
- `runArgs`
- `overrideCommand`
- `dockerComposeFile`

For more information about the available settings for `devcontainer.json`, see [devcontainer.json reference](https://aka.ms/vscode-remote/devcontainer.json) in the {% data variables.product.prodname_vscode %} documentation.
-->

## 应用对配置的更改

{% data reusables.codespaces.apply-devcontainer-changes %}

{% data reusables.codespaces.rebuild-command %}
1. {% data reusables.codespaces.recovery-mode %} 修复配置中的错误。 ![有关恢复模式的错误消息](/assets/images/help/codespaces/recovery-mode-error-message.png)
   - 要通过查看创建日志来诊断错误，请单击 **View creation log（查看创建日志）**。
   - 要修复日志中发现的错误，请更新您的 `devcontainer.json` 文件。
   - 要应用更改，请重建容器。 
