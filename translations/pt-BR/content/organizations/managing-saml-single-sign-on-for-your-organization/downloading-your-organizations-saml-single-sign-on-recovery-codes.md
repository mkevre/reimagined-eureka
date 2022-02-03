---
title: Baixar os códigos de recuperação de logon único de SAML da organização
intro: 'Os administradores da organização devem baixar os códigos de recuperação de logon único de SAML dela para garantir que possam acessar o {% data variables.product.product_name %} mesmo se o provedor de identidade da organização não estiver disponível.'
redirect_from:
  - /articles/downloading-your-organization-s-saml-single-sign-on-recovery-codes
  - /articles/downloading-your-organizations-saml-single-sign-on-recovery-codes
  - /github/setting-up-and-managing-organizations-and-teams/downloading-your-organizations-saml-single-sign-on-recovery-codes
versions:
  ghec: '*'
topics:
  - Organizations
  - Teams
shortTitle: Fazer o download de códigos de recuperação SAML
---

Os códigos de recuperação não devem ser compartilhados ou distribuídos. Recomendamos salvá-los com um gerenciador de senhas como [LastPass](https://lastpass.com/) ou [1Password](https://1password.com/).

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.security %}
5. Em "SAML single sign-on" (Logon único de SAML), na observação sobre código de recuperação, clique em **Save your recovery codes** (Salvar os códigos de recuperação). ![Link para exibir e salvar os códigos de recuperação](/assets/images/help/saml/saml_recovery_codes.png)
6. Salve seus códigos de recuperação clicando em **Download** (Baixar), **Print** (Imprimir) ou **Copy** (Copiar). ![Botões para baixar, imprimir ou copiar os códigos de recuperação](/assets/images/help/saml/saml_recovery_code_options.png)

  {% note %}

  **Observação:** os códigos de recuperação ajudam você a retornar para o {% data variables.product.product_name %} caso seu IdP fique indisponível. Se você gerar novos códigos de recuperação, os exibidos na página "Códigos de recuperação de logon único" serão atualizados automaticamente.

  {% endnote %}

7. Cada código de recuperação só pode ser usado uma vez para recuperar o acesso ao {% data variables.product.product_name %}. O acesso ao {% data variables.product.product_name %} só ficará disponível 24 horas antes de você fazer login usando o login único.

## Leia mais

- "[Sobre gerenciamento de identidade e acesso com o SAML de logon único](/articles/about-identity-and-access-management-with-saml-single-sign-on)"
- "[Acessar a organização se o provedor de identidade estiver indisponível](/articles/accessing-your-organization-if-your-identity-provider-is-unavailable)"
