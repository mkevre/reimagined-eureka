---
title: About GitHub Connect
intro: '{% data variables.product.prodname_github_connect %} amplía a {% data variables.product.product_name %} otorgándote acceso a características y flujos de trabajo adicionales que dependen del poder de {% data variables.product.prodname_dotcom_the_website %}.'
versions:
  ghes: '*'
  ghae: '*'
type: overview
topics:
  - Enterprise
  - GitHub Connect
---

## Acerca de {% data variables.product.prodname_github_connect %}

{% data variables.product.prodname_github_connect %} amplía a {% data variables.product.product_name %} permitiendo a {% data variables.product.product_location %} beneficiarse del poder de {% data variables.product.prodname_dotcom_the_website %} de forma limitada. Después de que habilites {% data variables.product.prodname_github_connect %}, podrás habilitar características y flujos de trabajo adicionales que dependen de {% data variables.product.prodname_dotcom_the_website %}, tales como {% ifversion ghes or ghae-issue-4864 %}las {% data variables.product.prodname_dependabot_alerts %} para las vulnerabilidades de seguridad que se rastrean en la {% data variables.product.prodname_advisory_database %}{% else %}permitiendo a los usuarios utilizar acciones impulsadas por la comunidad de {% data variables.product.prodname_dotcom_the_website %} en sus archivos de flujo de trabajo{% endif %}.

{% data variables.product.prodname_github_connect %} does not open {% data variables.product.product_location %} to the public internet. None of your enterprise's private data is exposed to {% data variables.product.prodname_dotcom_the_website %} users. Instead, {% data variables.product.prodname_github_connect %} transmits only the limited data needed for the individual features you choose to enable. Unless you enable license sync, no personal data is transmitted by {% data variables.product.prodname_github_connect %}. Para obtener más información sobre los datos que transmite {% data variables.product.prodname_github_connect %}, consulta la sección "[Transmisión de datos para {% data variables.product.prodname_github_connect %}](#data-transmission-for-github-connect)".

Enabling {% data variables.product.prodname_github_connect %} will not allow {% data variables.product.prodname_dotcom_the_website %} users to make changes to {% data variables.product.product_name %}.

Para habilitar {% data variables.product.prodname_github_connect %}, configuras una conexión entre {% data variables.product.product_location %} y la cuenta de organización o empresa de {% data variables.product.prodname_dotcom_the_website %} que utilice {% data variables.product.prodname_ghe_cloud %}. For more information, see "[Managing {% data variables.product.prodname_github_connect %}](/admin/configuration/configuring-github-connect/managing-github-connect)."

After enabling {% data variables.product.prodname_github_connect %}, you will be able to enable features such as {% ifversion ghes %}automatic user license sync and {% endif %}{% data variables.product.prodname_dependabot_alerts %}. For more information about all of the features available, see "[{% data variables.product.prodname_github_connect %} features](#github-connect-features)."

## {% data variables.product.prodname_github_connect %} features

Después de que configuras la conexión entre {% data variables.product.product_location %} y {% data variables.product.prodname_ghe_cloud %}, puedes habilitar las características individuales de {% data variables.product.prodname_github_connect %} para tu empresa.

| Característica                                                     | Descripción                                                                                                                                                                                                                                     | Más información                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |{% ifversion ghes %}
| Automatic user license sync                                        | Manage license usage across your {% data variables.product.prodname_enterprise %} deployments by automatically syncing user licenses from {% data variables.product.product_location %} to {% data variables.product.prodname_ghe_cloud %}. | "[Enabling automatic user license sync for your enterprise](/admin/configuration/configuring-github-connect/enabling-automatic-user-license-sync-for-your-enterprise)"{% endif %}{% ifversion ghes or ghae-issue-4864 %}
| {% data variables.product.prodname_dependabot_alerts %}          | Allow users to find and fix vulnerabilities in code dependencies.                                                                                                                                                                               | "[Habilitar la gráfica de dependencias y las {% data variables.product.prodname_dependabot_alerts %}  para tu empresa](/admin/configuration/configuring-github-connect/enabling-the-dependency-graph-and-dependabot-alerts-for-your-enterprise)"{% endif %}
| {% data variables.product.prodname_dotcom_the_website %} actions | Allow users to use actions from {% data variables.product.prodname_dotcom_the_website %} in workflow files.                                                                                                                                   | "[Habilitar el acceso automático a las acciones de {% data variables.product.prodname_dotcom_the_website %} utilizando {% data variables.product.prodname_github_connect %}](/admin/github-actions/managing-access-to-actions-from-githubcom/enabling-automatic-access-to-githubcom-actions-using-github-connect)" |
| Unified search                                                     | Allow users to include repositories on {% data variables.product.prodname_dotcom_the_website %} in their search results when searching from {% data variables.product.product_location %}.                                                  | "[Enabling {% data variables.product.prodname_unified_search %} for your enterprise](/admin/configuration/configuring-github-connect/enabling-unified-search-for-your-enterprise)"                                                                                                                                   |
| Unified contributions                                              | Allow users to include anonymized contribution counts for their work on {% data variables.product.product_location %} in their contribution graphs on {% data variables.product.prodname_dotcom_the_website %}.                             | "[Enabling {% data variables.product.prodname_unified_contributions %} for your enterprise](/admin/configuration/configuring-github-connect/enabling-unified-contributions-for-your-enterprise)"                                                                                                                     |

## Data transmission for {% data variables.product.prodname_github_connect %}

Cuando habilitas {% data variables.product.prodname_github_connect %} o características específicas de {% data variables.product.prodname_github_connect %}, un registro en las tiendas de {% data variables.product.prodname_ghe_cloud %} almacena la siguiente información sobre la conexión.
{% ifversion ghes %}
- La parte pública de la clave de tu licencia {% data variables.product.prodname_ghe_server %}
- Un hash de tu licencia {% data variables.product.prodname_ghe_server %}
- El nombre personalizado de tu licencia {% data variables.product.prodname_ghe_server %}
- La versión de {% data variables.product.product_location_enterprise %}{% endif %}
- The hostname of {% data variables.product.product_location %}
- The organization or enterprise account on {% data variables.product.prodname_ghe_cloud %} that's connected to {% data variables.product.product_location %}
- The authentication token that's used by {% data variables.product.product_location %} to make requests to {% data variables.product.prodname_ghe_cloud %}
- Si se habilitó la Seguridad de Capa de Transporte (TLS) y se configuró en {% data variables.product.product_location %}{% ifversion ghes %}
- Las características de {% data variables.product.prodname_github_connect %} que se habilitan en {% data variables.product.product_location %} y la fecha y hora de su habilitación.{% endif %}

{% data variables.product.prodname_github_connect %} sincroniza los datos de conexión anteriores entre {% data variables.product.product_location %}y {% data variables.product.prodname_ghe_cloud %} semanalmente, desde el día y hora aproximada en que se habilitó {% data variables.product.prodname_github_connect %}.

{% note %}

**Note:** No repositories, issues, or pull requests are ever transmitted by {% data variables.product.prodname_github_connect %}.

{% endnote %}

Additional data is transmitted if you enable individual features of {% data variables.product.prodname_github_connect %}.

| Característica                                                     | Data                                                                                      | Which way does the data flow?                                                                                                                                                                                                                    | Where is the data used?                                                                               |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |{% ifversion ghes %}
| Automatic user license sync                                        | Each {% data variables.product.product_name %} user's user ID and email addresses         | From {% data variables.product.product_name %} to {% data variables.product.prodname_ghe_cloud %}                                                                                                                                              | {% data variables.product.prodname_ghe_cloud %} |{% endif %}{% ifversion ghes or ghae-issue-4864 %}
| {% data variables.product.prodname_dependabot_alerts %}          | Vulnerability alerts                                                                      | From {% data variables.product.prodname_dotcom_the_website %} to {% data variables.product.product_name %}                                                                                                                                   | {% data variables.product.product_name%} 
{% endif %}
| {% data variables.product.prodname_dotcom_the_website %} actions | Name of action, action (YAML file from {% data variables.product.prodname_marketplace %}) | From {% data variables.product.prodname_dotcom_the_website %} to {% data variables.product.product_name %}<br><br>From {% data variables.product.product_name %} to {% data variables.product.prodname_dotcom_the_website %} | {% data variables.product.product_name %}
| Unified search                                                     | Search terms, search results                                                              | De {% data variables.product.prodname_dotcom_the_website %} a {% data variables.product.product_name %}<br><br>De {% data variables.product.product_name %} a {% data variables.product.prodname_dotcom_the_website %}       | {% data variables.product.product_name %}
| Unified contributions                                              | Contribution counts                                                                       | From {% data variables.product.product_name %} to {% data variables.product.prodname_dotcom_the_website %}                                                                                                                                   | {% data variables.product.prodname_dotcom_the_website %}

## Leer más

- "[Cuentas empresariales](/graphql/guides/managing-enterprise-accounts)" en la documentación de la API de GraphQL
