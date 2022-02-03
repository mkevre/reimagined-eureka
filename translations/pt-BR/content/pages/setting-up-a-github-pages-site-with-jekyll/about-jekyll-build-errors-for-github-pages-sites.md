---
title: Sobre erros de criação do Jekyll para sites do GitHub Pages
intro: 'Se o Jekyll encontrar um erro ao criar seu site do {% data variables.product.prodname_pages %} localmente ou no {% data variables.product.product_name %}, você receberá uma mensagem de erro com mais informações.'
redirect_from:
  - /articles/viewing-jekyll-build-error-messages
  - /articles/generic-jekyll-build-failures
  - /articles/about-jekyll-build-errors-for-github-pages-sites
  - /github/working-with-github-pages/about-jekyll-build-errors-for-github-pages-sites
product: '{% data reusables.gated-features.pages %}'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Pages
shortTitle: Erros de criação do Jekyll para as páginas
---

## Sobre erros de criação do Jekyll

Às vezes, o {% data variables.product.prodname_pages %} não tentará criar seu site depois que você fizer push das alterações na fonte de publicação do site.{% ifversion fpt or ghec %}
- A pessoa que fez push das alterações não verificou o endereço de e-mail dela. Para obter mais informações, consulte "[Verificar o endereço de e-mail](/articles/verifying-your-email-address)".{% endif %}
- Você está fazendo push com uma chave de implantação. Se desejar automatizar pushes para o repositório do seu site, você poderá configurar um usuário de máquina. Para obter mais informações, consulte "[Gerenciar chaves de implantação](/developers/overview/managing-deploy-keys#machine-users)".
- Você está usando um serviço de CI que não está configurado para criar sua fonte de publicação. Por exemplo, Travis CI não criará o branch `gh-pages`, a menos que você adicione o branch a uma lista segura. Para obter mais informações, consulte "[Personalizar a criação](https://docs.travis-ci.com/user/customizing-the-build/#safelisting-or-blocklisting-branches)" em Travis CI ou na documentação do seu serviço de CI.

{% note %}

**Observação:** podem ser necessários até 20 minutos para que as alterações no site sejam publicadas após o push delas no {% data variables.product.product_name %}.

{% endnote %}

Se o Jekyll não tentar criar seu site e encontrar um erro, você receberá uma mensagem de erro de criação. Existem dois tipos principais de mensagens de erro de compilação do Jekyll.
- Uma mensagem "Page build warning" significa que sua criação foi concluída com êxito, mas talvez você precise fazer alterações para evitar problemas futuros.
- Uma mensagem "Page build failed" significa que sua criação falhou ao ser concluída. Se for possível para o Jekyll detectar um motivo para a falha, você verá uma mensagem de erro descritiva.

Para obter informações sobre como solucionar problemas de erros de criação, consulte [Solução de problemas de erros de criação do Jekyll para sites do {% data variables.product.prodname_pages %}](/articles/troubleshooting-jekyll-build-errors-for-github-pages-sites)".

{% ifversion fpt %}
## Visualizando as mensagens de erro de criação do Jekyll com {% data variables.product.prodname_actions %}

Por padrão, seu site de {% data variables.product.prodname_pages %} foi criado e implantado com a execução de um fluxo de trabalho de {% data variables.product.prodname_actions %}, a menos que você tenha configurado seu site do {% data variables.product.prodname_pages %} para usar uma ferramenta de CI diferente. Para encontrar possíveis erros de criação, verifique a execução do fluxo de trabalho para o seu site do {% data variables.product.prodname_pages %}, revisando a execução do fluxo de trabalho do seu repositório. Para obter mais informações, consulte "[Visualizar histórico de execução de fluxo de trabalho](/actions/monitoring-and-troubleshooting-workflows/viewing-workflow-run-history)".  Para obter mais informações sobre como executar novamente o fluxo de trabalho em caso de erro, consulte "[Executar novamente fluxos de trabalho e trabalhos](/actions/managing-workflow-runs/re-running-workflows-and-jobs)".
{% note %}

{% data reusables.pages.pages-builds-with-github-actions-public-beta %}

{% endnote %}
{% endif %}

## Visualizando as falhas de criação de seu repositório em {% data variables.product.product_name %}

É possível ver falhas de criação (mas não os avisos de criação) para seu site no {% data variables.product.product_name %}, na guia **Settings** (Configurações) do repositório do site.

## Visualizando as mensagens de erro de criação do Jekyll localmente

É recomendável testar o site no local, o que permite ver mensagens de erro de criação na linha de comando e solucionar qualquer falha de criação antes de fazer push das alterações no {% data variables.product.product_name %}. Para obter mais informações, consulte "[Testar seu site do {% data variables.product.prodname_pages %} localmente com o Jekyll](/articles/testing-your-github-pages-site-locally-with-jekyll)".

## Visualizando mensagens de erro de criação do Jekyll no seu pull request

Quando você cria uma pull request para atualizar a fonte de publicação no {% data variables.product.product_name %}, é possível ver mensagens de erro de criação na guia **Checks** (Verificações) da pull request. Para obter mais informações, consulte "[Sobre verificações de status](/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)".

## Visualizando os erros de criação do Jekyll por e-mail

Quando você fizer push das alterações na fonte de publicação no {% data variables.product.product_name %}, o {% data variables.product.prodname_pages %} tentará criar seu site. Se a criação falhar, você receberá um e-mail no seu endereço de e-mail principal. Você também receberá e-mails para avisos de criação. {% data reusables.pages.build-failure-email-server %}

## Visualizando as mensagens de erro do Jekyll no seu pull request com um serviço de CI de terceiros

Você pode configurar um serviço de terceiros, como o [Travis CI](https://travis-ci.org/), para exibir mensagens de erro após cada commit.

1. Se você ainda não tiver, adicione um arquivo chamado _Gemfile_ na raiz da sua fonte de publicação, com o seguinte conteúdo:
  ```ruby
  source `https://rubygems.org`
  gem `github-pages`
  ```

2. Configure o repositório do site para o serviço de teste de sua escolha. Por exemplo, para usar [Travis CI](https://travis-ci.org/), adicione um arquivo chamado _.travis.yml_ na raiz da fonte de publicação, com o seguinte conteúdo:
  ```yaml
  language: ruby
  rvm:
    - 2.3
  script: "bundle exec jekyll build"
  ```
3. Talvez você precise ativar o repositório com o serviço de teste de terceiros. Para obter mais informações, consulte a documentação do seu serviço de teste.
