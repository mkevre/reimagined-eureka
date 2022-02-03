---
title: Sobre repositórios remotos
redirect_from:
  - /articles/working-when-github-goes-down
  - /articles/sharing-repositories-without-github
  - /articles/about-remote-repositories
  - /articles/which-url-should-i-use
  - /articles/which-remote-url-should-i-use
  - /github/using-git/which-remote-url-should-i-use
  - /github/using-git/about-remote-repositories
  - /github/getting-started-with-github/about-remote-repositories
  - /github/getting-started-with-github/getting-started-with-git/about-remote-repositories
intro: 'A abordagem colaborativa do GitHub para o desenvolvimento depende da publicação de commits do seu repositório local para {% data variables.product.product_name %} para que outras pessoas visualizem, façam buscas e atualizações.'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
---

## Sobre repositórios remotos

Uma URL remota é outra forma de o Git dizer "o lugar onde seu código é armazenado". A URL poderia ser seu repositório no GitHub, ou a bifurcação de outro usuário, ou até mesmo em um servidor totalmente diferente.

Você pode fazer push apenas de dois tipos de endereço URL:

* Uma URL HTTPS como `https://{% data variables.command_line.backticks %}/user/repo.git`
* Uma URL SSH, como `git@{% data variables.command_line.backticks %}:user/repo.git`

O Git associa uma URL remota a um nome, e seu remote padrão geralmente é chamado de `origin`.

## Criar repositórios remotos

Você pode usar o comando `git remote add` para corresponder uma URL remota a um nome. Por exemplo, você digitaria o seguinte na linha de comando:

```shell
git remote add origin <em> &ltURL_REMOTO> </em>
```

Isso associa o nome `origin` ao `URL_REMOTO`.

É possível usar o comando `git remote set-url` para [alterar uma URL de remote](/github/getting-started-with-github/managing-remote-repositories).

## Escolher uma URL para o seu repositório remoto

Existem várias maneiras de clonar repositórios disponíveis no {% data variables.product.product_location %}.

Quando você visualiza um repositório conectado à sua conta, as URLs que podem ser usadas para clonar o projeto no computador ficam disponíveis abaixo dos detalhes do repositório.

Para obter informações sobre a configuração ou alteração da URL remota, consulte "[Gerenciar repositórios remotos](/github/getting-started-with-github/managing-remote-repositories)".

## Clonando com as URLs de HTTPS

As URLs de clone de `https:/` estão disponíveis em todos os repositórios, independentemente da visibilidade. As URL de clone de `https://` funcionam mesmo se você estiver atrás de um firewall ou proxy.

Quando você aplicar `git clone`, `git fetch`, `git pull` ou `git push` a um repositório remote usando URLS de HTTPS na linha de comando, o Git solicitará o seu nome de usuário e sua senha do {% data variables.product.product_name %}. {% data reusables.user_settings.password-authentication-deprecation %}

{% data reusables.command_line.provide-an-access-token %}

{% tip %}

**Dicas**:
- Você pode usar um auxiliar de credenciais para que o Git se lembre de suas credenciais de {% data variables.product.prodname_dotcom %} toda vez que falar com {% data variables.product.prodname_dotcom %}. Para obter mais informações, consulte "[Armazenar as suas credenciais do {% data variables.product.prodname_dotcom %} no Git](/github/getting-started-with-github/caching-your-github-credentials-in-git)".
- Para clonar um repositório sem autenticar no {% data variables.product.product_name %} na linha de comando, use o {% data variables.product.prodname_desktop %}. Para obter mais informações, consulte "[Clonar um repositório do {% data variables.product.prodname_dotcom %} para o {% data variables.product.prodname_dotcom %} Desktop](/desktop/contributing-to-projects/cloning-a-repository-from-github-to-github-desktop)".

{% endtip %}

 {% ifversion fpt or ghec %}Se você prefere usar o SSH mas não consegue conectar-se pela porta 22, você poderá usar o SSH através da porta HTTPS. Para obter mais informações, consulte "[Usar SSH através da porta HTTPS](/github/authenticating-to-github/using-ssh-over-the-https-port)".{% endif %}

## Clonar com URLs de SSH

As URLs de SSH fornecem acesso a um repositório do Git via SSH, um protocolo seguro. Para usar estas URLs, você deve gerar um par de chaves SSH no seu computador e adicionar a chave **pública** à sua conta em {% ifversion ghae %}{% data variables.product.product_name %}{% else %}{% data variables.product.product_location %}{% endif %}. Para obter mais informações, consulte "[Conectar-se ao {% data variables.product.prodname_dotcom %} com SSH](/github/authenticating-to-github/connecting-to-github-with-ssh)".

Quando você aplicar `git clone`, `git fetch`, `git pull` ou `git push` a um repositório remote usando URLs de SSH, precisará digitar uma senha e a frase secreta da sua chave SSH. Para obter mais informações, consulte "[Trabalhar com frases secretas da chave SSH](/github/authenticating-to-github/working-with-ssh-key-passphrases)".

{% ifversion fpt or ghec %}Se você estiver acessando uma organização que usa o logon único SAML (SSO), você deverá autorizar sua chave SSH para acessar a organização antes de efetuar a autenticação. Para obter mais informações, consulte "[Sobre a autenticação com o logon único SAML em](/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/about-authentication-with-saml-single-sign-on)" e "[Autorizando uma chave SSH para uso com o logon único SAML](/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on){% ifversion fpt %}" na documentação de {% data variables.product.prodname_ghe_cloud %}.{% else %}."{% endif %}{% endif %}

{% tip %}

**Dica**: Você pode usar uma URL com SSH para clonar um repositório para o seu computador ou como uma forma segura de implantar seu código nos servidores de produção. Você também pode usar o encaminhamento de agente SSH com o seu script de implantação para evitar o gerenciamento de chaves no servidor. Para obter mais informações, consulte "[Usar o encaminhamento do agente SSH](/developers/overview/using-ssh-agent-forwarding)."

{% endtip %}

{% ifversion fpt or ghes or ghae or ghec %}

## Clonar com {% data variables.product.prodname_cli %}

Você também pode instalar o {% data variables.product.prodname_cli %} para usar os fluxos de trabalho do {% data variables.product.product_name %} no seu terminal. Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_cli %}](/github-cli/github-cli/about-github-cli)".

{% endif %}

{% ifversion not ghae %}
## Clonar com o Subversion

Você também pode usar um cliente de [Subversion](https://subversion.apache.org/) para acessar qualquer repositório no {% data variables.product.prodname_dotcom %}. O Subversion oferece um conjunto de recursos diferente do Git. Para obter mais informações, consulte "[Quais são as diferenças entre Subversion e Git?](/github/importing-your-projects-to-github/what-are-the-differences-between-subversion-and-git)"

Você também pode acessar repositórios no {% data variables.product.prodname_dotcom %} a partir de clientes do Subversion. Para obter mais informações, consulte "[Suporte para clientes do Subversion](/github/importing-your-projects-to-github/support-for-subversion-clients)".
{% endif %}
