---
title: Sobre a autenticação no GitHub
intro: 'Você pode acessar com segurança os recursos da sua conta efetuando a autenticação no {% data variables.product.product_name %} e usando credenciais diferentes dependendo de onde você efetua a autenticação.'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Identity
  - Access management
redirect_from:
  - /github/authenticating-to-github/about-authentication-to-github
  - /github/authenticating-to-github/keeping-your-account-and-data-secure/about-authentication-to-github
shortTitle: Autenticação no GitHub
---

## Sobre autenticação no {% data variables.product.prodname_dotcom %}

Para manter sua conta protegida, você deve efetuar a autenticação antes de poder acessar{% ifversion not ghae %} certos{% endif %} recursos em {% data variables.product.product_name %}. Ao efetuar a autenticação em {% data variables.product.product_name %}, você fornece ou confirma credenciais que são exclusivas que provam quem você declara ser.

Você pode acessar seus recursos em {% data variables.product.product_name %} de várias formas: no navegador, por meio do {% data variables.product.prodname_desktop %} ou outro aplicativo da área de trabalho, com a API ou por meio da linha de comando. Cada forma de acessar o {% data variables.product.product_name %} é compatível com diferentes modos de autenticação.

- {% ifversion ghae %}Seu provedor de identidade (IdP){% else %}Nome de usuário e senha com autenticação de dois fatores{% endif %}
- Token de acesso de pessoal
- Chave SSH

## Efetuar a autenticação no seu navegador

Você pode efetuar a autenticação no {% data variables.product.product_name %} no navegador {% ifversion ghae %}usando o seu IdP. Para obter mais informações, consulte "[Sobre a autenticação com o logon único SAML](/github/authenticating-to-github/about-authentication-with-saml-single-sign-on)."{% else %}de formas diferentes.

{% ifversion fpt or ghec %}
- Se você for um integrante de um {% data variables.product.prodname_emu_enterprise %}, você irá efetuar a autenticação em {% data variables.product.product_name %} no seu navegador usando seu IdP. Para obter mais informações, consulte "[Efetuando a autenticação como um usuário gerenciado](/enterprise-cloud@latest/admin/authentication/managing-your-enterprise-users-with-your-identity-provider/about-enterprise-managed-users#authenticating-as-a-managed-user)){% ifversion fpt %}" na documentação {% data variables.product.prodname_ghe_cloud %}.{% else %}."{% endif %} Se você não é um integrante de {% data variables.product.prodname_emu_enterprise %}, você irá efetuar a autenticação usando seu navegador em {% data variables.product.prodname_dotcom_the_website %}.
{% endif %}

- **Apenas nome de usuário e senha**
    - Você criará uma senha ao criar sua conta de usuário em {% data variables.product.product_name %}. Recomendamos que você use um gerenciador de senhas para gerar uma senha aleatória e única. Para obter mais informações, consulte "[Criar uma senha forte](/github/authenticating-to-github/creating-a-strong-password)".
- **Autenticação de dois fatores (2FA)** (recomendado)
    - Se você habilitar a 2FA, também iremos solicitar que você forneça um código gerado por um aplicativo no seu dispositivo móvel ou enviado como uma mensagem de texto (SMS) depois que você digitar seu nome de usuário e senha com sucesso. Para obter mais informações, consulte "[Acessar o {% data variables.product.prodname_dotcom %} usando a autenticação de dois fatores](/github/authenticating-to-github/accessing-github-using-two-factor-authentication#providing-a-2fa-code-when-signing-in-to-the-website)".
    - Além de autenticação com um aplicativo para celular ou uma mensagem de texto. você pode, opcionalmente, adicionar um método secundário de autenticação com uma chave de segurança usando o WebAuthn. Para obter mais informações, consulte "[Configurar a autenticação de dois fatores usando uma chave de segurança](/github/authenticating-to-github/configuring-two-factor-authentication#configuring-two-factor-authentication-using-a-security-key)".
{% endif %}

## Efetuar a autenticação com {% data variables.product.prodname_desktop %}

Você pode efetuar a autenticação com o {% data variables.product.prodname_desktop %} usando seu navegador. Para obter mais informações, consulte "

Autenticar-se no {% data variables.product.prodname_dotcom %}."</p> 



## Efetuar a autenticação com a API

Você pode efetuar a autenticação com a API de diferentes formas.

- **Tokens de acesso pessoal** 
      - Em algumas situações, como, por exemplo, testes, você pode usar um token de acesso pessoal para acessar a API. Usar um token de acesso pessoal permite que você revogue o acesso a qualquer momento. Para mais informação, consulte "[Criando um token de acesso pessoal](/github/authenticating-to-github/creating-a-personal-access-token)."
- **Fluxo do aplicativo web** 
      - Para aplicativos OAuth em produção, você deve efetuar a autenticação usando o fluxo do aplicativo web. Para obter mais informações, consulte "[Autorizar aplicativos OAuth](/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow)".
- **Aplicativos do GitHub** 
      - Para aplicativos GitHub em produção, você deve efetuar a autenticação em nome da instalação do aplicativo. Para obter mais informações, consulte "[Efetuando a autenticação com o {% data variables.product.prodname_github_apps %}](/apps/building-github-apps/authenticating-with-github-apps/)".



## Efetuando a autenticação com a linha de comando

Você pode acessar repositórios no {% data variables.product.product_name %} pela linha de comando de duas maneiras, HTTPS e SSH. Ambos têm uma maneira diferente de efetuar a autenticação. O método de autenticação é determinado com base na escolha de uma URL remota de HTTPS ou SSH quando você clonar o repositório. Para obter mais informações sobre qual maneira acessar, consulte "[Sobre repositórios remotos](/github/getting-started-with-github/about-remote-repositories)".



### HTTPS

Você pode trabalhar com todos os repositórios no {% data variables.product.product_name %} por meio de HTTPS, mesmo que você esteja atrás de um firewall ou proxy. 

Se você fizer a autenticação com {% data variables.product.prodname_cli %}, você poderá efetuar a autenticação com um token de acesso pessoal ou por meio do navegador web. Para mais informações sobre a autenticação com {% data variables.product.prodname_cli %}, consulte [`login gh`](https://cli.github.com/manual/gh_auth_login).

Se você efetuar a autenticação sem {% data variables.product.prodname_cli %}, você deverá efetuar a autenticação com um token de acesso pessoal. {% data reusables.user_settings.password-authentication-deprecation %} Sempre que você usar o Git para efetuar a autenticação com {% data variables.product.product_name %}, será solicitado que você insira as suas credenciais para efetuar a autenticação com {% data variables.product.product_name %}, a menos que você faça o armazenamento em cache de um [auxiliar de credenciais](/github/getting-started-with-github/caching-your-github-credentials-in-git).



### SSH

Você pode trabalhar com todos os repositórios no {% data variables.product.product_name %} por meio de SSH, embora os firewalls e proxys possam se recusar a permitir conexões de SSH.

Se você efetuar a autenticação com {% data variables.product.prodname_cli %}, a CLI encontrará chaves públicas SSH no seu computador e solicitará que você selecione uma para upload. Se {% data variables.product.prodname_cli %} não encontrar uma chave pública SSH para o upload, ele poderá gerar um novo SSH público/privado e fazer o upload da chave pública para a sua conta em {% ifversion ghae %}{% data variables.product.product_name %}{% else %}{% data variables.product.product_location %}{% endif %}. Em seguida, você pode efetuar a autenticação com um token de acesso pessoal ou por meio do navegador web. Para mais informações sobre a autenticação com {% data variables.product.prodname_cli %}, consulte [`login gh`](https://cli.github.com/manual/gh_auth_login).

Se você efetuar a autenticação sem {% data variables.product.prodname_cli %}, você deverá gerar um conjunto de chaves pública/privada no seu computador local e adicionar a chave pública à sua conta em {% ifversion ghae %}{% data variables.product.product_name %}{% else %}{% data variables.product.product_location %}{% endif %}. Para obter mais informações, consulte "[Gerar uma nova chave SSH e adicioná-la ao ssh-agent](/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)". Sempre que usar o Git para efetuar a autenticação com {% data variables.product.product_name %}, será solicitado que você digite a senha da sua chave SSH, a menos que você [tenha armazenado a chave](/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent).



### Autorizando para logon único SAML

{% ifversion fpt or ghec %}Para usar um token de acesso pessoal ou chave SSH para acessar os recursos que pertencem a uma organização que usa o logon único SAML, você também deve autorizar o token pessoal ou chave SSH. Para mais informações, consulte "[Autorizando um token de acesso pessoal para usar com logon único SAML ](/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on)" ou "[Autorizando uma chave SSH para usar com o logon único SAML](/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-an-ssh-key-for-use-with-saml-single-sign-on){% ifversion fpt %}" na documentação de {% data variables.product.prodname_ghe_cloud %}.{% else %}."{% endif %}{% endif %}

{% ifversion fpt or ghes > 3.1 or ghae or ghec %}



## Formatos de token de {% data variables.product.company_short %}

{% data variables.product.company_short %} emite tokens que começam com um prefixo para indicar o tipo do token.

| Tipo de token                                                                             | Prefixo | Mais informações                                                                                                                                                |
|:----------------------------------------------------------------------------------------- |:------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token de acesso de pessoal                                                                | `ghp_`  | "[Criando um token de acesso pessoal](/github/authenticating-to-github/creating-a-personal-access-token)"                                                       |
| Token de acesso do OAuth                                                                  | `gho_`  | "[Autorizar {% data variables.product.prodname_oauth_apps %}](/developers/apps/authorizing-oauth-apps)"                                                       |
| Token de usuário para servidor para um {% data variables.product.prodname_github_app %} | `ghu_`  | "[Identificar e autorizar usuários em {% data variables.product.prodname_github_apps %}](/developers/apps/identifying-and-authorizing-users-for-github-apps)" |
| Token de servidor para usuário para {% data variables.product.prodname_github_app %}    | `ghs_`  | "[Autenticar com {% data variables.product.prodname_github_apps %}](/developers/apps/authenticating-with-github-apps#authenticating-as-an-installation)"      |
| Atualizar token para um {% data variables.product.prodname_github_app %}                | `ghr_`  | "[Atualizar tokens de acesso do usuário para servidor](/developers/apps/refreshing-user-to-server-access-tokens)"                                               |


{% endif %}
