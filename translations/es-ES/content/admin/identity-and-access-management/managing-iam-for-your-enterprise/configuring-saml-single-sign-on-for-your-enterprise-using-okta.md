---
title: Configuring SAML single sign-on for your enterprise using Okta
intro: 'Puedes utilizar el inicio de sesión único (SSO, por sus siglas en inglés) del Lenguaje de Marcado para Confirmaciones (SAML, por sus siglas en inglés) con Okta para administrar automáticamente el acceso a tu cuenta empresarial en {% data variables.product.product_name %}.'
redirect_from:
  - /github/setting-up-and-managing-your-enterprise/configuring-single-sign-on-for-your-enterprise-account-using-okta
  - /github/setting-up-and-managing-your-enterprise-account/configuring-saml-single-sign-on-for-your-enterprise-account-using-okta
  - /github/setting-up-and-managing-your-enterprise/configuring-saml-single-sign-on-for-your-enterprise-account-using-okta
  - /github/setting-up-and-managing-your-enterprise/configuring-identity-and-access-management-for-your-enterprise-account/configuring-saml-single-sign-on-for-your-enterprise-account-using-okta
  - /admin/authentication/managing-identity-and-access-for-your-enterprise/configuring-saml-single-sign-on-for-your-enterprise-using-okta
versions:
  ghec: '*'
topics:
  - Authentication
  - Enterprise
type: how_to
shortTitle: Configurar el SAML con Okta
---

{% data reusables.enterprise-accounts.emu-saml-note %}

## Acerca de SAML con Okta

Puedes controlar el acceso a tu cuenta empresarial en {% data variables.product.product_name %} y en otras aplicaciones web desde una interface central si configuras dicha cuenta para que utilice el SSO de SAML con Okta, un proveedor de identidad (IdP).

El SSO de SAML controla y protege el acceso a los recursos de la cuenta empresarial como las organizaciones, repositorios, informes de problemas y solicitudes de extracción. Para obtener más información, consulta la sección "[Configurar el inicio de sesión único de SAML para tu empresa](/admin/authentication/managing-identity-and-access-for-your-enterprise/configuring-saml-single-sign-on-for-your-enterprise)".

{% data reusables.saml.switching-from-org-to-enterprise %} Para obtener más información, consulta la sección "[Cambiar tu configuración de SAML de una cuenta de organización a una de empresa](/github/setting-up-and-managing-your-enterprise/configuring-identity-and-access-management-for-your-enterprise-account/switching-your-saml-configuration-from-an-organization-to-an-enterprise-account)".

Alternatively, you can also configure SAML SSO using Okta for an organization that uses {% data variables.product.prodname_ghe_cloud %}. Para obtener más información, consulta la sección "[Configurar el inicio de sesión único de SAML y SCIM utilizando Okta](/organizations/managing-saml-single-sign-on-for-your-organization/configuring-saml-single-sign-on-and-scim-using-okta)".

## Agregar la aplicación {% data variables.product.prodname_ghe_cloud %} en Okta

{% data reusables.saml.okta-sign-into-your-account %}
1. Navigate to the [Github Enterprise Cloud - Enterprise Accounts](https://www.okta.com/integrations/github-enterprise-cloud-enterprise-accounts) application in the Okta Integration Network and click **Add Integration**.
{% data reusables.saml.okta-dashboard-click-applications %}
1. Opcionalmente, a la derecha de la "Etiqueta de aplicación", teclea un nombre descriptivo para la aplicación.
1. A la derecha de "Empresas de {% data variables.product.prodname_dotcom %}", teclea el nombre de tu cuenta empresarial. Por ejemplo, si la URL de tu cuenta empresarial es `https://github.com/enterprises/octo-corp`, teclea `octo-corp`.
1. Haz clic en **Done** (listo).

## Habilitar y probar el SSO de SAML

{% data reusables.saml.okta-sign-into-your-account %}
{% data reusables.saml.okta-dashboard-click-applications %}
{% data reusables.saml.click-enterprise-account-application %}
{% data reusables.saml.assign-yourself-to-okta %}
{% data reusables.saml.okta-sign-on-tab %}
1. A la derecha de los Ajustes, da clic en **Editar**.
1. Debajo de "Atributos de SAML Configurados", a la derecha de "grupos"; utiliza el menú desplegable y selecciona **Coincidencias de regex**.
1. A la derecha del menú desplegable, teclea `.*.*`.
1. Haz clic en **Save ** (guardar).
{% data reusables.saml.okta-view-setup-instructions %}
1. Habilita SAML para tu cuenta empresarial utilizando la información en las instrucciones de configuración. Para obtener más información, consulta la sección "[Configurar el inicio de sesión único de SAML para tu empresa](/admin/authentication/managing-identity-and-access-for-your-enterprise/configuring-saml-single-sign-on-for-your-enterprise)".

## Crear grupos en Okta

1. En Okta, crea un grupo para que empate con la organización que pertenezca a tu cuenta empresarial. El nombre de cada grupo debe coincidir con el nombre de cuenta de la organización (no así, con el nombre mostrado de la misma). Por ejemplo, si la URL de la organización es `https://github.com/octo-org`, nombra `octo-org` al grupo.
1. Asigna la aplicación que creaste para tu cuenta empresarial a cada grupo. {% data variables.product.prodname_dotcom %} recibirá todos los datos de los `groups` para cada usuario.
1. Agrega usuarios a los grupos basándote en las organizaciones a las cuales quisieras que pertenezcan dichos usuarios.
