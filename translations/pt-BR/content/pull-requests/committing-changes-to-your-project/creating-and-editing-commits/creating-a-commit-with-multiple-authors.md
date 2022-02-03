---
title: Criar um commit com vários autores
intro: |-
  Você pode atribuir um commit a mais de um autor adicionando um ou mais trailers "Co-authored-by" à mensagem do commit. Os commits coautorados podem ser vistos no {% data variables.product.product_name %}{% ifversion ghes or ghae %} e podem ser incluídos no gráfico de contribuições de perfil e nas estatísticas
   do repositório{% endif %}.
redirect_from:
  - /articles/creating-a-commit-with-multiple-authors
  - /github/committing-changes-to-your-project/creating-a-commit-with-multiple-authors
  - /github/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
shortTitle: Com vários autores
---

## Informações obrigatórias do coautor

Para poder adicionar um coautor a um commit, você deve saber o e-mail adequado a ser usado para cada coautor. Para o commit do coautor contar como uma contribuição, você deve usar o e-mail associado à sua conta em {% ifversion ghae %}{% data variables.product.product_name %}{% else %}{% data variables.product.product_location %}{% endif %}.

{% ifversion fpt or ghec %}

Se uma pessoa optar por manter o respectivo endereço de e-mail privado, você deverá usar o e-mail `no-reply` dela fornecido pelo {% data variables.product.product_name %} para proteger a privacidade. Caso contrário, o e-mail do coautor estará disponível para o público na mensagem do commit. Se desejar manter seu e-mail privado, você poderá usar um e-mail `no-reply` fornecido pelo {% data variables.product.product_name %} para operações de Git e pedir que outros coautores listem seu e-mail `no-reply` nos trailers de commit.

Para obter mais informações, consulte "[Setting your commit email address](/articles/setting-your-commit-email-address)."

  {% tip %}

  **Dica:** você pode ajudar um coautor a encontrar o endereço de e-mail de preferência dele compartilhando essas informações:
  - Para encontrar o e-mail `no-reply` fornecido pelo {% data variables.product.product_name %}, navegue até a página de configurações do e-mail em "Keep my email address private" (Manter meu endereço de e-mail privado).
  - Para encontrar o e-mail usado para configurar o Git no seu computador, execute `git config user.email` na linha de comando.

  {% endtip %}

{% endif %}

## Criar commits coautorados usando o {% data variables.product.prodname_desktop %}

Você pode usar o {% data variables.product.prodname_desktop %} para criar um commit com um coautor. Para obter mais informações, consulte "[Escrever uma mensagem do commit e fazer push das alterações](/desktop/contributing-to-projects/committing-and-reviewing-changes-to-your-project#4-write-a-commit-message-and-push-your-changes)" e [{% data variables.product.prodname_desktop %}](https://desktop.github.com).

![Adicionar um coautor à mensagem do commit](/assets/images/help/desktop/co-authors-demo-hq.gif)

## Criar commits coautorados na linha de comando

{% data reusables.pull_requests.collect-co-author-commit-git-config-info %}

1. Digite sua mensagem de commit e uma descrição curta e significativa de suas alterações. Depois da descrição do commit, em vez de inserir aspas para encerrar, adicione duas linhas vazias.
  ```shell
  $ git commit -m "Refactor usability tests.
  >
  >
  ```
  {% tip %}

  **Dica:** Se estiver usando um editor de texto na linha de comando para digitar sua mensagem de commit, certifique-se de que existam duas novas linhas entre o final da sua descrição de commit e o indicador `Co-authored-by:`.

  {% endtip %}

3. Na próxima linha da mensagem do commit, digite `Co-authored-by: name <name@example.com>` com informações específicas para cada coautor. Depois das informações do coautor, adicione aspas de fechamento.

  Se estiver adicionando vários coautores, dê a cada um a própria linha e o trailer de commit `Co-authored-by:`.
  ```shell
  $ git commit -m "Refactor usability tests.
  >
  >
  Co-authored-by: <em>name</em> &lt;<em>name@example.com</em>&gt;
  Co-authored-by: <em>another-name</em> &lt;<em>another-name@example.com</em>&gt;"
  ```

O novo commit e a mensagem aparecerão no {% data variables.product.product_location %} na próxima vez que você fizer push. Para obter mais informações, consulte "[Fazer push das alterações em um repositório remoto](/github/getting-started-with-github/pushing-commits-to-a-remote-repository/)".

## Criar commits coautorados no {% data variables.product.product_name %}

Depois que fizer alterações em um arquivo usando o editor web no {% data variables.product.product_name %}, você poderá criar um commit coautorado adicionando um trailer `Co-authored-by:` à mensagem do commit.

{% data reusables.pull_requests.collect-co-author-commit-git-config-info %}
2. Depois de fazer as alterações juntos, na parte inferior da página, digite uma mensagem de commit curta e significativa que descreve as alterações feitas. ![Mensagem do commit para sua alteração](/assets/images/help/repository/write-commit-message-quick-pull.png)
3. Na caixa de texto abaixo da mensagem do commit, adicione `Co-authored-by: name <name@example.com>` com informações específicas para cada coautor. Se estiver adicionando vários coautores, dê a cada um a própria linha e o trailer de commit `Co-authored-by:`.

  ![Exemplo de trailer de coautor da mensagem do commit na segunda caixa de texto da mensagem do commit](/assets/images/help/repository/write-commit-message-co-author-trailer.png)
4. Clique em **Commit changes** (Fazer commit de alterações) ou **Propose changes** (Propor alterações).

O novo commit e a mensagem aparecerão no {% data variables.product.product_location %}.

## Leia mais
{% ifversion ghes or ghae %}
- "[Exibir contribuições no perfil](/articles/viewing-contributions-on-your-profile)"
- "[Por que minhas contribuições não aparecem no meu perfil?](/articles/why-are-my-contributions-not-showing-up-on-my-profile)"{% endif %}
- "[Exibir contribuidores de um projeto](/articles/viewing-a-projects-contributors)"
- "[Alterar uma mensagem do commit](/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message)"
- "[Fazer commit e revisar alterações no seu projeto](/desktop/contributing-to-projects/committing-and-reviewing-changes-to-your-project#4-write-a-commit-message-and-push-your-changes)" na documentação do {% data variables.product.prodname_desktop %}
