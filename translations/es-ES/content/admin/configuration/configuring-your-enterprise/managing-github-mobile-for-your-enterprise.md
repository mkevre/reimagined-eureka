---
title: Managing GitHub Mobile for your enterprise
intro: 'Puedes decidir si los usuarios autenticados pueden conectarse a {% data variables.product.product_location %} con {% data variables.product.prodname_mobile %}.'
permissions: 'Enterprise owners can manage {% data variables.product.prodname_mobile %} for an enterprise on {% data variables.product.product_name %}.'
versions:
  ghes: '*'
type: how_to
topics:
  - Enterprise
  - Mobile
redirect_from:
  - /admin/configuration/configuring-your-enterprise/managing-github-for-mobile-for-your-enterprise
  - /admin/configuration/managing-github-for-mobile-for-your-enterprise
shortTitle: Manage GitHub Mobile
---

{% ifversion ghes %}
{% data reusables.mobile.ghes-release-phase %}
{% endif %}

## Acerca de {% data variables.product.prodname_mobile %}

{% data reusables.mobile.about-mobile %} For more information, see "[{% data variables.product.prodname_mobile %}](/get-started/using-github/github-mobile)."

Los miembros de tu empresa pueden utilizar {% data variables.product.prodname_mobile %} para clasificar, colaborar y administrar el trabajo en {% data variables.product.product_location %} desde un dispositivo móvil. Predeterminadamente, {% data variables.product.prodname_mobile %} se encuentra habilitado para {% data variables.product.product_location %}. Puedes permitir o dejar de permitir que los miembros de la empresa utilicen {% data variables.product.prodname_mobile %} para autenticarse en {% data variables.product.product_location %} y accedan a tus datos empresariales.

## Habilitar o inhabilitar {% data variables.product.prodname_mobile %}

{% data reusables.enterprise_site_admin_settings.access-settings %}
{% data reusables.enterprise_site_admin_settings.management-console %}
{% data reusables.enterprise_management_console.type-management-console-password %}
1. En la barra lateral, da clic en **Móvil**. !["Móvil" en la barra lateral izquierda para la consola de administración de {% data variables.product.prodname_ghe_server %}](/assets/images/enterprise/management-console/click-mobile.png)
1. Under "GitHub Mobile", select or deselect **Enable GitHub Mobile Apps**. ![Casilla de verificación para "Habilitar las Apps de GitHub Móvil" en la consola de administración de {% data variables.product.prodname_ghe_server %}](/assets/images/enterprise/management-console/select-enable-github-mobile-apps.png)
{% data reusables.enterprise_management_console.save-settings %}
