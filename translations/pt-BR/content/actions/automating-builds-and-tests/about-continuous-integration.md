---
title: Sobre integração contínua
intro: 'Você pode criar fluxos de trabalho de integração contínua (CI) personalizados diretamente no repositório do {% data variables.product.prodname_dotcom %} com o {% data variables.product.prodname_actions %}.'
redirect_from:
  - /articles/about-continuous-integration
  - /github/automating-your-workflow-with-github-actions/about-continuous-integration
  - /actions/automating-your-workflow-with-github-actions/about-continuous-integration
  - /actions/building-and-testing-code-with-continuous-integration/about-continuous-integration
  - /actions/guides/about-continuous-integration
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: overview
topics:
  - CI
shortTitle: Integração contínua
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## Sobre integração contínua

A integração contínua (CI, Continuous Integration) é uma prática de software que exige commits frequentes de códigos para um repositório compartilhado. Fazer commits de códigos com frequência detecta erros com mais antecedência e reduz a quantidade de código necessária para depuração quando os desenvolvedores chegam à origem de um erro. As atualizações frequentes de código também facilitam o merge de alterações dos integrantes de uma equipe de desenvolvimento de software. Assim, os desenvolvedores podem se dedicar mais à gravação de códigos e se preocupar menos com erros de depuração ou conflitos de merge.

Ao fazer commit do seu repositório, você pode continuamente compilar e testar o código para garantir que o commit não insira erros. Seus testes podem incluir linters de código (que verificam formatação de estilo), verificações de segurança, cobertura de código, testes funcionais e outras verificações personalizadas.

Para compilar e testar seu código, é necessário usar um servidor. Você pode criar e testar atualizações no local antes de fazer push do código para um repositório, ou pode usar um servidor de CI que verifica os novos commits de código em um repositório.

## Sobre integração contínua usando {% data variables.product.prodname_actions %}

{% ifversion ghae %}CI que usa {% data variables.product.prodname_actions %} oferece fluxos de trabalho que podem criar o código no repositório e executar os seus testes. Os fluxos de trabalho podem ser executados em sistemas de executores que você hospeda. Para obter mais informações, consulte "[Sobre os executores auto-hospedados](/actions/hosting-your-own-runners/about-self-hosted-runners)."
{% else %} CI que usa {% data variables.product.prodname_actions %} oferece fluxos de trabalho que podem criar o código no seu repositório e executar seus testes. Fluxos de trabalho podem ser executados em máquinas virtuais hospedadas em {% data variables.product.prodname_dotcom %} ou em máquinas que você mesmo hospeda. Para obter mais informações, consulte "[Ambientes virtuais para executores hospedados em {% data variables.product.prodname_dotcom %}](/actions/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners)" e "[Sobre executores auto-hospedados](/actions/automating-your-workflow-with-github-actions/about-self-hosted-runners)".
{% endif %}

Você pode configurar a execução do seu fluxo de trabalho de CI para ocorrer diante de um evento do {% data variables.product.prodname_dotcom %} (por exemplo, quando houver push de um novo código para o seu repositório), com base em uma programação definida ou quando houver um evento externo usando o webhook de despacho do repositório.

{% data variables.product.product_name %} executa seus testes de CI e fornece os resultados de cada teste no pull request para que você possa ver se a mudança no seu branch introduz um erro. Quando todos os testes de CI em um fluxo de trabalho forem aprovados, as alterações que passaram por push estarão prontas para a revisão de um integrante da equipe ou para o merge. Se algum teste falhar, uma de suas alterações pode ter causado a falha.

Ao configurar o CI no seu repositório, {% data variables.product.product_name %} analisa o código no seu repositório e recomenda fluxos de trabalho CI baseados no idioma e na estrutura do seu repositório. Por exemplo, se você usar [Node.js](https://nodejs.org/en/), {% data variables.product.product_name %} irá sugerir um fluxo de trabalho inicial que instala seus pacotes Node.js e executa seus testes. Você pode usar o fluxo de trabalho inicial de CI sugerido por {% data variables.product.product_name %}, personalizar o fluxo de trabalho inicial sugerido ou criar o seu próprio arquivo de fluxo de trabalho personalizado para executar seus testes de CI.

![Captura de tela de fluxos de trabalho iniciais de integração contínua sugeridos](/assets/images/help/repository/ci-with-actions-template-picker.png)

Além de ajudá-lo a configurar fluxos de trabalho de CI para seu projeto, você pode usar {% data variables.product.prodname_actions %} para criar fluxos de trabalho ao longo de todo o ciclo de vida de desenvolvimento do software. Por exemplo, você pode usar ações para implantar, criar pacotes ou lançar uma versão do seu projeto. Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_actions %}](/articles/about-github-actions)".

Para obter uma definição de termos comuns, consulte "[Conceitos básicos de {% data variables.product.prodname_actions %}](/github/automating-your-workflow-with-github-actions/core-concepts-for-github-actions)".

## Fluxo de trabalho inicial

{% data variables.product.product_name %} oferece fluxo de trabalho inicial de CI para uma série de linguagens e estruturas.

Navegue pela lista completa do fluxo de trabalho inicial da CI oferecido por {% data variables.product.company_short %} no repositório de {% ifversion fpt or ghec %}[ações/starter-workflows](https://github.com/actions/starter-workflows/tree/main/ci) repository{% else %} `actions/starter-workflows` em {% data variables.product.product_location %}{% endif %}.

## Leia mais

{% ifversion fpt or ghec %}
- "[Gerenciando cobrança para {% data variables.product.prodname_actions %}](/billing/managing-billing-for-github-actions)"
{% endif %}
