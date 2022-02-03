---
title: Acerca del despliegue contínuo
intro: 'Puedes crear flujos de trabajo de despliegue continuo (DC) personalizados directamente en tu repositorio de {% data variables.product.prodname_dotcom %} con {% data variables.product.prodname_actions %}.'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: overview
redirect_from:
  - /actions/deployment/about-continuous-deployment
topics:
  - CD
shortTitle: Acerca del despliegue contínuo
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## Acerca del despliegue contínuo

_Continuous deployment_ (CD) is the practice of using automation to publish and deploy software updates. As part of the typical CD process, the code is automatically built and tested before deployment.

Continuous deployment is often coupled with continuous integration. Para obtener más información acerca de la integración contínua, consulta la sección "[Acerca de la Integración Contínua](/actions/guides/about-continuous-integration)".

## About continuous deployment using {% data variables.product.prodname_actions %}

You can set up a {% data variables.product.prodname_actions %} workflow to deploy your software product. To verify that your product works as expected, your workflow can build the code in your repository and run your tests before deploying.

Puedes configurar tu flujo de trabajo de DC para que se ejecute cuando ocurra un evento de {% data variables.product.product_name %} (por ejemplo, cuando se sube código nuevo a la rama predeterminada de tu repositorio), en un horario establecido o cuando ocurre un evento externo que utilice el webhook de despacho. For more information about when your workflow can run, see "[Events that trigger workflows](/actions/reference/events-that-trigger-workflows)."

{% ifversion fpt or ghae or ghes > 3.0 or ghec %}
{% data variables.product.prodname_actions %} provides features that give you more control over deployments. For example, you can use environments to require approval for a job to proceed, restrict which branches can trigger a workflow, or limit access to secrets. {% ifversion fpt or ghae or ghes > 3.1 or ghec %}You can use concurrency to limit your CD pipeline to a maximum of one in-progress deployment and one pending deployment. {% endif %}Para obtener más información sobre estas características, consulta las secciones "[Desplegar con GitHub Actions](/actions/deployment/deploying-with-github-actions)" y "[Utilizar ambientes para despliegue](/actions/deployment/using-environments-for-deployment)".{% endif %}

{% ifversion fpt or ghec or ghae-issue-4856 %}

## Using OpenID Connect to access cloud resources

{% data reusables.actions.about-oidc-short-overview %}

{% endif %}

## Starter workflows and third party actions

{% data reusables.actions.cd-templates-actions %}

{% ifversion fpt or ghae or ghes > 3.0 or ghec %}

## Leer más

- [Deploying with GitHub Actions](/actions/deployment/deploying-with-github-actions)
- [Utilizar ambientes para desplegue](/actions/deployment/using-environments-for-deployment){% ifversion fpt or ghec %}
- "[Administrar la facturación para las {% data variables.product.prodname_actions %}](/billing/managing-billing-for-github-actions)"{% endif %}

{% endif %}
