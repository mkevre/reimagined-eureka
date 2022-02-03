---
title: Setting up your C# (.NET) project for Codespaces
shortTitle: Setting up your C# (.NET) project
allowTitleToDifferFromFilename: true
product: '{% data reusables.gated-features.codespaces %}'
intro: '通过创建自定义开发容器，开始在 {% data variables.product.prodname_codespaces %} 中使用 C# (.NET) 项目。'
redirect_from:
  - /codespaces/getting-started-with-codespaces/getting-started-with-your-dotnet-project
versions:
  fpt: '*'
  ghec: '*'
topics:
  - Codespaces
hasExperimentalAlternative: true
hidden: true
---



## 简介

本指南介绍如何在 {% data variables.product.prodname_codespaces %} 中设置 C# (.NET) 项目。 它将演示在代码空间中打开项目以及从模板添加和修改开发容器配置的示例。

### 基本要求

- 您应该在 {% data variables.product.prodname_dotcom_the_website %} 的仓库中有现有的 C# (.NET) 项目。 如果您没有项目，可以使用以下示例尝试本教程：https://github.com/2percentsilk/dotnet-quickstart。
- 您必须为组织启用 {% data variables.product.prodname_codespaces %} 。

## 步骤 1：在代码空间中打开项目

1. Under the repository name, use the **{% octicon "code" aria-label="The code icon" %} Code** drop-down menu, and in the **Codespaces** tab, click {% octicon "plus" aria-label="The plus icon" %} **New codespace**.

  ![新建代码空间按钮](/assets/images/help/codespaces/new-codespace-button.png)

  If you don’t see this option, {% data variables.product.prodname_codespaces %} isn't available for your project. See [Access to {% data variables.product.prodname_codespaces %}](/codespaces/developing-in-codespaces/creating-a-codespace#access-to-codespaces) for more information.

创建代码空间时，您的项目是在专用于您的远程 VM 上创建的。 默认情况下，代码空间的容器具有多种语言和运行时，包括 .NET。 它还包括一套常见的工具，例如 git、wget、rsync、openssh 和 nano。

您可以通过调整 vCPU 和 RAM 的数量、[添加 dotfiles 以个性化环境](/codespaces/setting-up-your-codespace/personalizing-codespaces-for-your-account)或者修改安装的工具和脚本来自定义代码空间。

{% data variables.product.prodname_codespaces %} 使用名为 `devcontainer.json` 的文件来存储配置。 在启动时， {% data variables.product.prodname_codespaces %} 使用文件安装项目可能需要的任何工具、依赖项或其他设置。 For more information, see "[Introduction to dev containers](/codespaces/setting-up-your-codespace/configuring-codespaces-for-your-project)."


## 步骤 2：从模板将开发容器添加到您的代码空间

默认代码空间容器附带最新的 .NET 版本和预安装的常用工具。 但是，我们鼓励您设置自定义容器，以便根据项目的需求定制在代码空间创建过程中运行的工具和脚本，并确保为仓库中的所有 {% data variables.product.prodname_codespaces %} 用户提供完全可复制的环境。

要使用自定义容器设置项目，您需要使用 `devcontainer.json` 文件来定义环境。 在 {% data variables.product.prodname_codespaces %} 中，您可以从模板添加它，也可以自己创建。 For more information on dev containers, see "[Introduction to dev containers ](/codespaces/setting-up-your-codespace/configuring-codespaces-for-your-project)."


{% data reusables.codespaces.command-palette-container %}
2. 对于此示例，单击 **C# (.NET)**。 如果需要其他功能，您可以选择任何特定于 C# (.NET) 或工具（如 C# (.NET) 和 MS SQL）组合的容器。 ![从列表中选择 C# (.NET) 选项](/assets/images/help/codespaces/add-dotnet-prebuilt-container.png)
3. 单击推荐的 .NET 版本。 ![.NET 版本选择](/assets/images/help/codespaces/add-dotnet-version.png)
4. 接受默认选项，将 Node.js 添加到您的自定义中。 ![添加 Node.js 选择](/assets/images/help/codespaces/dotnet-options.png)
{% data reusables.codespaces.rebuild-command %}

### 开发容器的剖析

添加 C# (.NET) 开发容器模板会将 `.devcontainer` 文件夹添加到项目仓库的根目录中，其中包含以下文件：

- `devcontainer.json`
- Dockerfile

新添加的 `devcontainer.json` 文件定义了几个在样本之后描述的属性。

#### devcontainer.json

```json
{
    "name": "C# (.NET)",
    "build": {
        "dockerfile": "Dockerfile",
        "args": {
            // Update 'VARIANT' to pick a .NET Core version: 2.1, 3.1, 5.0
            "VARIANT": "5.0",
            // Options
            "INSTALL_NODE": "true",
            "NODE_VERSION": "lts/*",
            "INSTALL_AZURE_CLI": "false"
        }
    },

    // Set *default* container specific settings.json values on container create.
    "settings": {
        "terminal.integrated.shell.linux": "/bin/bash"
    },

    // Add the IDs of extensions you want installed when the container is created.
    "extensions": [
        "ms-dotnettools.csharp"
    ],

    // Use 'forwardPorts' to make a list of ports inside the container available locally.
    // "forwardPorts": [5000, 5001],

    // [Optional] To reuse of your local HTTPS dev cert:
    //
    // 1. Export it locally using this command:
    //    * Windows PowerShell:
    //        dotnet dev-certs https --trust; dotnet dev-certs https -ep "$env:USERPROFILE/.aspnet/https/aspnetapp.pfx" -p "SecurePwdGoesHere"
    //    * macOS/Linux terminal:
    //        dotnet dev-certs https --trust; dotnet dev-certs https -ep "${HOME}/.aspnet/https/aspnetapp.pfx" -p "SecurePwdGoesHere"
    //
    // 2. Uncomment these 'remoteEnv' lines:
    //    "remoteEnv": {
    //        "ASPNETCORE_Kestrel__Certificates__Default__Password": "SecurePwdGoesHere",
    //        "ASPNETCORE_Kestrel__Certificates__Default__Path": "/home/vscode/.aspnet/https/aspnetapp.pfx",
    //    },
    //
    // 3. Do one of the following depending on your scenario:
    //    * When using GitHub Codespaces and/or Remote - Containers:
    //      1. Start the container
    //      2. Drag ~/.aspnet/https/aspnetapp.pfx into the root of the file explorer
    //      3. Open a terminal in VS Code and run "mkdir -p /home/vscode/.aspnet/https && mv aspnetapp.pfx /home/vscode/.aspnet/https"
    //
    //    * If only using Remote - Containers with a local container, uncomment this line instead:
    //      "mounts": [ "source=${env:HOME}${env:USERPROFILE}/.aspnet/https,target=/home/vscode/.aspnet/https,type=bind" ],

    // Use 'postCreateCommand' to run commands after the container is created.
    // "postCreateCommand": "dotnet restore",

    // Comment out connect as root instead. More info: https://aka.ms/vscode-remote/containers/non-root.
    "remoteUser": "vscode"
}
```

- **Name** - 您可以将开发容器命名为任何名称，这只是默认名称。
- **Build** - 构建属性。
  - **Dockerfile** - 在构建对象中，`dockerfile` 是对 Dockerfile 的引用，该文件也是从模板中添加的。
  - **Args**
    - **Variant**：此文件仅包含一个构建参数，即我们要使用的 .NET Core 版本。
- **Settings** - 它们是 {% data variables.product.prodname_vscode %} 设置。
  - **Terminal.integrated.shell.linux** - 虽然 bash 是此处的默认设置，但您可以通过修改它来使用其他终端 shell。
- **Extensions** - 它们是默认包含的扩展名。
  - **ms-dotnettools.csharp** - Microsoft C# 扩展为使用 C# 的开发提供丰富的支持，包括 IntelliSense、linting、调试、代码导航、代码格式化、重构、变量资源管理器、测试资源管理器等功能。
- **forwardPorts** - 此处列出的任何端口都将自动转发。 For more information, see "[Forwarding ports in your codespace](/codespaces/developing-in-codespaces/forwarding-ports-in-your-codespace)."
- **postCreateCommand** - 如果您要在进入 Dockerfile 中未定义的代码空间（例如 `dotnet restore`）后执行任何操作，您可以在此处执行。
- **remoteUser** - 默认情况下，您以 vscode 用户身份运行，但您可以选择将其设置为 root。

#### Dockerfile

```bash
# [Choice] .NET version: 5.0, 3.1, 2.1
ARG VARIANT="5.0"
FROM mcr.microsoft.com/vscode/devcontainers/dotnetcore:0-${VARIANT}

# [Option] Install Node.js
ARG INSTALL_NODE="true"
ARG NODE_VERSION="lts/*"
RUN if [ "${INSTALL_NODE}" = "true" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# [Option] Install Azure CLI
ARG INSTALL_AZURE_CLI="false"
COPY library-scripts/azcli-debian.sh /tmp/library-scripts/
RUN if [ "$INSTALL_AZURE_CLI" = "true" ]; then bash /tmp/library-scripts/azcli-debian.sh; fi \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1
```

您可以使用 Dockerfile 添加其他容器层，以指定要包含在容器中的操作系统包、节点版本或全局包。

## 步骤 3：修改 devcontainer.json 文件

添加了开发容器并基本了解所有功能之后，您现在可以进行更改以针对您的环境进行配置。 在此示例中，您将在代码空间启动时添加属性以安装扩展和恢复项目依赖项。

1. 在 Explorer 中，展开 `.devcontainer` 文件夹，从树中选择 `devcontainer.json` 文件并打开它。

  ![devcontainer.json file in the Explorer](/assets/images/help/codespaces/devcontainers-options.png)

2. 更新 `devcontainer.json` 文件中的 `extensions` 列表，以添加一些在处理项目时有用的扩展。

  ```json{:copy}
  "extensions": [
          "ms-dotnettools.csharp",
          "streetsidesoftware.code-spell-checker",
      ],
  ```

3. 取消注释 `postCreateCommand` 以便在代码空间设置过程中恢复依赖项。

  ```json{:copy}
  // Use 'postCreateCommand' to run commands after the container is created.
  "postCreateCommand": "dotnet restore",
  ```

{% data reusables.codespaces.rebuild-command %}

  在代码空间内进行重建可确保在将更改提交到仓库之前，更改能够按预期工作。 如果某些问题导致了故障，您将进入带有恢复容器的代码空间中，您可以从该容器进行重建以继续调整容器。

5. 通过验证是否安装了 "Code Spell Checker" 扩展，检查更改是否成功应用。

    ![扩展列表](/assets/images/help/codespaces/dotnet-extensions.png)

## 步骤 4：运行应用程序

在上一节中，您使用 `postCreateCommand` 通过 `dotnet restore` 命令安装了一组包。 现在安装了依赖项，我们可以运行应用程序。

1. 通过按 `F5` 或在终端中输入 `dotnet watch run` 来运行您的应用程序。

2. 项目启动时，您应该在右下角看到一个信息框，提示您连接到项目使用的端口。

  ![端口转发信息框](/assets/images/help/codespaces/python-port-forwarding.png)

## 步骤 5：提交更改

{% data reusables.codespaces.committing-link-to-procedure %}

## 后续步骤

现在，您应该准备开始在 {% data variables.product.prodname_codespaces %} 中开发您的 C# (.NET) 项目。 以下是用于更高级场景的一些额外资源。

- [管理 {% data variables.product.prodname_codespaces %} 的加密密码](/codespaces/working-with-your-codespace/managing-encrypted-secrets-for-codespaces)
- [管理 {% data variables.product.prodname_codespaces %} 的 GPG 验证](/codespaces/working-with-your-codespace/managing-gpg-verification-for-codespaces)
- [代码空间中的转发端口](/codespaces/developing-in-codespaces/forwarding-ports-in-your-codespace)
