---
title: Deploying to Azure Static Web App
intro: You can deploy your web app to Azure Static Web App as part of your continuous deployment (CD) workflows.
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: tutorial
topics:
  - CD
  - Azure Static Web Apps
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}


## Introducción

This guide explains how to use {% data variables.product.prodname_actions %} to build and deploy a web app to [Azure Static Web Apps](https://azure.microsoft.com/services/app-service/static/).

{% ifversion fpt or ghec or ghae-issue-4856 %}

{% note %}

**Nota**: {% data reusables.actions.about-oidc-short-overview %} y "[Configurar OpenID Connect en Azure](/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-azure)".

{% endnote %}

{% endif %}

## Prerrequisitos

Antes de crear tu flujo de trabajo de {% data variables.product.prodname_actions %}, primero necesitarás completar los siguientes pasos de configuración:

1. Create an Azure Static Web App using the 'Other' option for deployment source. For more information, see "[Quickstart: Building your first static site in the Azure portal](https://docs.microsoft.com/azure/static-web-apps/get-started-portal)" in the Azure documentation.

2. Create a secret called `AZURE_STATIC_WEB_APPS_API_TOKEN` with the value of your static web app deployment token. For more information about how to find your deployment token, see "[Reset deployment tokens in Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/deployment-token-management)" in the Azure documentation.

## Crear un flujo de trabajo

Una vez que hayas completado los prerequisitos, puedes proceder con la creación del flujo de trabajo.

The following example workflow demonstrates how to build and deploy an Azure static web app when there is a push to the `main` branch or when a pull request targeting `main` is opened, synchronized, or reopened. The workflow also tears down the corresponding pre-production deployment when a pull request targeting `main` is closed.

Under the workflow `env` key, change the following values:
- `APP_LOCATION` to the location of your client code
- `API_LOCATION` to the location of your API source code. If `API_LOCATION` is not relevant, you can delete the variable and the lines where it is used.
- `APP_ARTIFACT_LOCATION` to the location of your client code build output

For more information about these values, see "[Build configuration for Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/build-configuration?tabs=github-actions)" in the Azure documentation.

```yaml{:copy}
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Deploy web app to Azure Static Web Apps

env:
  APP_LOCATION: "/" # location of your client code
  API_LOCATION: "api" # location of your api source code - optional
  APP_ARTIFACT_LOCATION: "build" # location of client code build output

  on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

permissions:
  issues: write

jobs:
  build_and_deploy:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@1a947af9992250f3bc2e68ad0754c0b0c11566c9
        with:
          azure_static_web_apps_api_token: {% raw %}${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}{% endraw %}
          repo_token: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
          action: "upload"
          app_location: {% raw %}${{ env.APP_LOCATION }}{% endraw %}
          api_location: {% raw %}${{ env.API_LOCATION }}{% endraw %}
          app_artifact_location: {% raw %}${{ env.APP_ARTIFACT_LOCATION }}{% endraw %}

  close:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close
    steps:
      - name: Close
        uses: Azure/static-web-apps-deploy@1a947af9992250f3bc2e68ad0754c0b0c11566c9
        with:
          azure_static_web_apps_api_token: {% raw %}${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}{% endraw %}
          action: "close"
```

## Recursos adicionales

Los siguientes recursos también pueden ser útiles:

* Para encontrar el flujo de trabajo inicial original, consulta el archivo [`azure-staticwebapp.yml`](https://github.com/actions/starter-workflows/blob/main/deployments/azure-staticwebapp.yml) en el repositorio `starter-workflows` de {% data variables.product.prodname_actions %}.
* The action used to deploy the web app is the official Azure [`Azure/static-web-apps-deploy`](https://github.com/Azure/static-web-apps-deploy) action.
* Para encontrar más ejemplos de flujos de trabajo de GitHub Actions que desplieguen a Azure, consulta el repositorio [actions-workflow-samples](https://github.com/Azure/actions-workflow-samples).
