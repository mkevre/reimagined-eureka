---
title: Deploying Java to Azure App Service
intro: You can deploy your Java project to Azure App Service as part of your continuous deployment (CD) workflows.
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: tutorial
topics:
  - CD
  - Java
  - Azure App Service
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}


## 简介

This guide explains how to use {% data variables.product.prodname_actions %} to build and deploy a Java project to [Azure App Service](https://azure.microsoft.com/services/app-service/).

{% ifversion fpt or ghec or ghae-issue-4856 %}

{% note %}

**Note**: {% data reusables.actions.about-oidc-short-overview %} and "[Configuring OpenID Connect in Azure](/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-azure)."

{% endnote %}

{% endif %}

## 基本要求

在创建 {% data variables.product.prodname_actions %} 工作流程之前，首先需要完成以下设置步骤：

{% data reusables.actions.create-azure-app-plan %}

1. 创建 Web 应用。

   For example, you can use the Azure CLI to create an Azure App Service web app with a Java runtime:

   ```bash{:copy}
   az webapp create \
       --name MY_WEBAPP_NAME \
       --plan MY_APP_SERVICE_PLAN \
       --resource-group MY_RESOURCE_GROUP \
       --runtime "JAVA|11-java11"
   ```

   在上面的命令中，将参数替换为您自己的值，其中 `MY_WEBAPP_NAME` 是 Web 应用的新名称。

{% data reusables.actions.create-azure-publish-profile %}

{% ifversion fpt or ghes > 3.0 or ghae or ghec %}
1. Optionally, configure a deployment environment. {% data reusables.actions.about-environments %}
{% endif %}

## 创建工作流程

完成先决条件后，可以继续创建工作流程。

The following example workflow demonstrates how to build and deploy a Java project to Azure App Service when there is a push to the `main` branch.

确保在工作流程 `env` 中将 `AZURE_WEBAPP_NAME` 密钥设置为您创建的 web 应用程序名称。 If you want to use a Java version other than `11`, change `JAVA_VERSION`.

{% data reusables.actions.delete-env-key %}

```yaml{:copy}
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Build and deploy JAR app to Azure Web App

env:
  AZURE_WEBAPP_NAME: MY_WEBAPP_NAME   # set this to your application's name
  JAVA_VERSION: '11'                  # set this to the Java version to use

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Java version
        uses: actions/setup-java@v2.3.1
        with:
          java-version: {% raw %}${{ env.JAVA_VERSION }}{% endraw %}
          cache: 'maven'

      - name: Build with Maven
        run: mvn clean install

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v2
        with:
          name: java-app
          path: '{% raw %}${{ github.workspace }}{% endraw %}/target/*.jar'

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'production'
      url: {% raw %}${{ steps.deploy-to-webapp.outputs.webapp-url }}{% endraw %}

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v2
        with:
          name: java-app

      - name: Deploy to Azure Web App
        id: deploy-to-webapp
        uses: azure/webapps-deploy@0b651ed7546ecfc75024011f76944cb9b381ef1e
        with:
          app-name: {% raw %}${{ env.AZURE_WEBAPP_NAME }}{% endraw %}
          publish-profile: {% raw %}${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}{% endraw %}
          package: '*.jar'
```

## 其他资源

以下资源也可能有用：

* For the original starter workflow, see [`azure-webapps-java-jar.yml`](https://github.com/actions/starter-workflows/blob/main/deployments/azure-webapps-java-jar.yml) in the {% data variables.product.prodname_actions %} `starter-workflows` repository.
* 用于部署 Web 应用的操作是正式的 Azure [`Azure/webapps-deploy`](https://github.com/Azure/webapps-deploy) 操作。
* For more examples of GitHub Action workflows that deploy to Azure, see the [actions-workflow-samples](https://github.com/Azure/actions-workflow-samples) repository.
