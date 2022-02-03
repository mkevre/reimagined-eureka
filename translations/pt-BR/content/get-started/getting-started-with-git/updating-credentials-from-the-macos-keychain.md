---
title: Atualizar credenciais da keychain OSX
intro: 'Você precisará atualizar suas credenciais salvas no auxiliar `git-credential-osxkeychain` se você alterar o seu {% ifversion not ghae %} nome de usuário, senha ou{% endif %} token de acesso pessoal em {% data variables.product.product_name %}.'
redirect_from:
  - /articles/updating-credentials-from-the-osx-keychain
  - /github/using-git/updating-credentials-from-the-osx-keychain
  - /github/using-git/updating-credentials-from-the-macos-keychain
  - /github/getting-started-with-github/updating-credentials-from-the-macos-keychain
  - /github/getting-started-with-github/getting-started-with-git/updating-credentials-from-the-macos-keychain
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
shortTitle: Credenciais de keychain do macOS
---

{% tip %}

**Observação:** A atualização das credenciais do macOS Keychain aplica-se apenas a usuários que configuraram manualmente um PAT usando o auxiliar  `osxkeychain` integrado ao macOS.

Recomendamos que você [configure o SSH](/articles/generating-an-ssh-key) ou faça a atualização para o [Gerente de Credenciais do Git](/get-started/getting-started-with-git/caching-your-github-credentials-in-git) (GCM). O GCM pode gerenciar a autenticação em seu nome (sem PATs manuais), incluindo a 2FA (autenticação de dois fatores).

{% endtip %}

{% data reusables.user_settings.password-authentication-deprecation %}

## Atualizar credenciais pelo Keychain Access

1. Clique no ícone do Spotlight (lente ampliada) no lado direito da barra de menu. Digite `Acesso da Keychain` e, em seguida, pressione a chave Enter para iniciar o aplicativo. ![Barra de pesquisa do Spotlight](/assets/images/help/setup/keychain-access.png)
2. No Keychain Access, procure por **{% data variables.command_line.backticks %}**.
3. Localize a entrada "internet password" (senha da internet) referente a `{% data variables.command_line.backticks %}`.
4. Edite ou exclua a entrada de acordo.

## Excluir credenciais pela linha de comando

Através da linha de comando, você pode usar o auxiliar de credenciais diretamente para apagar a entrada de keychain.

```shell
$ git credential-osxkeychain erase
host={% data variables.command_line.codeblock %}
protocol=https
> <em>[Pressione Return]</em>
```

Se a ação for bem-sucedida, nada será impresso. Para testar se funciona, tente clonar um repositório privado a partir de {% data variables.product.product_location %}. Se for solicitada uma senha, significa que a entrada da keychain foi excluída.

## Leia mais

- "[Armazenar suas credenciais de {% data variables.product.prodname_dotcom %} no Git](/github/getting-started-with-github/caching-your-github-credentials-in-git/)"
