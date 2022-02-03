---
title: Sintaxe de fluxo de trabalho para o GitHub Actions
shortTitle: Sintaxe de fluxo de trabalho
intro: Um fluxo de trabalho é um processo automatizado configurável constituído de um ou mais trabalhos. Você deve criar um arquivo YAML para definir a configuração do seu fluxo de trabalho.
product: '{% data reusables.gated-features.actions %}'
redirect_from:
  - /articles/workflow-syntax-for-github-actions
  - /github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions
  - /actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions
versions:
  free-pro-team: '*'
  enterprise-server: '>=2.22'
  github-ae: '*'
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}
{% data reusables.actions.ae-beta %}

### Sobre sintaxe YAML para fluxos de trabalho

Arquivos de fluxo de trabalho usam sintaxe YAML e devem ter uma extensão de arquivo `.yml` ou `.yaml`. {% data reusables.actions.learn-more-about-yaml %}

Você deve armazenar os arquivos de fluxo de trabalho no diretório `.github/workflows` do seu repositório.

### `name`

Nome do fluxo de trabalho. O {% data variables.product.prodname_dotcom %} exibe os nomes dos fluxos de trabalho na página de ações do repositório. Se você omitir o `nome`, o {% data variables.product.prodname_dotcom %} irá defini-lo como o caminho do arquivo do fluxo de trabalho relativo à raiz do repositório.

### `on`

**Obrigatório**. O nome do evento de {% data variables.product.prodname_dotcom %} que aciona o fluxo de trabalho. Você pode fornecer uma única `string` de evento, um `array` de eventos, um `array` de `types` (tipos) de eventos ou um `map` (mapa) de configuração de eventos que programe um fluxo de trabalho ou restrinja a execução do fluxo de trabalho a alterações em determinados arquivos, tags ou branches. Para obter uma lista de eventos disponíveis, consulte "[Eventos que acionam fluxos de trabalho](/articles/events-that-trigger-workflows)".

{% data reusables.github-actions.actions-on-examples %}

### `on.<event_name>.types`

Seleciona os tipos de atividades que acionarão a execução de um fluxo de trabalho. A maioria dos eventos GitHub são acionados por mais de um tipo de atividade.  Por exemplo, o evento para o recurso release (versão) é acionado quando uma versão é `published` (publicada), `unpublished` (a publicação é cancelada), `created` (criada), `edited` (editada), `deleted` (excluída) ou `prereleased` (versão prévia). A palavra-chave `types` (tipos) permite que você limite a atividade que faz com que o fluxo de trabalho seja executado. Quando somente um tipo de atividade aciona um evento de webhook, a palavra-chave `types` (tipos) é desnecessária.

É possível usar um array de `types` (tipos) de evento. Para obter mais informações sobre cada evento e seus tipos de atividades, consulte "[Eventos que acionam fluxos de trabalho](/articles/events-that-trigger-workflows#webhook-events)".

```yaml
# Aciona o fluxo de trabalho na atividade de pull request
on:
  release:
    # Usa apenas a palavra-chave types (tipos) para limitar os tipos de atividades que acionam o fluxo de trabalho.
    types: [published, created, edited]
```

### `on.<push|pull_request>.<branches|tags>`

Ao usar os eventos `push` e `pull_request`, é possível configurar um fluxo de trabalho para ser executado em branches ou tags específicos. Para um evento de `pull_request`, são avaliados apenas os branches e tags na base. Se você definir apenas `tags` ou `branches`, o fluxo de trabalho não será executado para eventos que afetam o Git ref indefinido.

As palavras-chave `branches`, `branches-ignore`, `tags` e `tags-ignore` aceitam padrões glob que usam os caracteres curinga `*` e `**` para coincidir com mais de um nome de branch ou tag. Para obter mais informações, consulte a "[Folha de consulta de filtro padrão](#filter-pattern-cheat-sheet)".

#### Exemplo com branches e tags

Os padrões definidos nos `branches` e `tags` são avaliados relativamente ao nome do Git ref. Por exemplo, definir o padrão `mona/octocat` nos `branches` corresponde ao Git ref `refs/heads/mona/octocat`. O padrão `releases/**` corresponderá ao Git ref `refs/heads/releases/10`.

```yaml
on:
  push:
    # Sequence of patterns matched against refs/heads
    branches:    
      # Push events on main branch
      - main
      # Push events to branches matching refs/heads/mona/octocat
      - 'mona/octocat'
      # Push events to branches matching refs/heads/releases/10
      - 'releases/**'
    # Sequence of patterns matched against refs/tags
    tags:        
      - v1             # Push events to v1 tag
      - v1.*           # Push events to v1.0, v1.1, and v1.9 tags
```

#### Exemplo desconsiderando branches e tags

Sempre que um padrão corresponde ao padrão `branches-ignore` ou `tags-ignore`, o fluxo de trabalho não será executado. Os padrões definidos em `branches-ignore` e `tags-ignore` são avaliados relativamente ao nome do Git ref. Por exemplo, definir o padrão `mona/octocat` nos `branches` corresponde ao Git ref `refs/heads/mona/octocat`. O padrão `releases/**-alpha` em `branches` corresponderá ao Git ref `refs/releases/beta/3-alpha`.

```yaml
em:
  push:
    # Sequência de padrões que correspondem a refs/heads
    branches-ignore:
      # Push de eventos para branches que correspondem a refs/heads/mona/octocat
      - 'mona/octocat'
      # Push de eventos para branches que correspondem a refs/heads/releases/beta/3-alpha
      - 'releases/**-alpha'
    # Sequência de padrões que correspondem a refs/tags
    tags-ignore:
      - v1.*           # Push events to tags v1.0, v1.1, and v1.9
```

#### Excluir branches e tags

Você pode usar dois tipos de filtros para impedir a execução de um fluxo de trabalho em pushes e pull requests para tags e branches.
- `branches` ou `branches-ignore` - não é possível usar os dois filtros `branches` e `branches-ignore` para o mesmo evento em um fluxo de trabalho. Use o filtro `branches` quando você precisa filtrar branches para correspondências positivas e excluir branches. Use o filtro `branches-ignore` quando você só precisa excluir nomes de branches.
- `tags` ou `tags-ignore` - não é possível usar os dois filtros `tags` e `tags-ignore` para o mesmo evento em um fluxo de trabalho. Use o filtro `tags` quando você precisa filtrar tags para correspondências positivas e excluir tags. Use o filtro `tags-ignore` quando você só precisa excluir nomes de tags.

#### Exemplo com padrões positivos e negativos

Você pode excluir `tags` e `branches` usando o caractere `!`. A ordem de definição dos padrões é importante.
  - Um padrão negativo (precedido por `!`) depois de uma correspondência positiva excluirá o Git ref.
  - Um padrão positivo correspondente após uma correspondência negativa incluirá a Git ref novamente.

O fluxo de trabalho a seguir será executado em pushes para `releases/10` ou `releases/beta/mona`, mas não em `releases/10-alpha` ou `releases/beta/3-alpha`, pois o padrão negativo `!releases/**-alpha` está na sequência do padrão positivo.

```yaml
on:
  push:
    branches:    
      - 'releases/**'
      - '!releases/**-alpha'
```

### `on.<push|pull_request>.paths`

Ao usar os eventos `push` e `pull_request`, é possível configurar um fluxo de trabalho para ser executado quando pelo menos um arquivo não corresponde a `paths-ignore` ou pelo menos um arquivo modificado corresponde ao `paths` configurado. Flitros de caminho não são avaliados em pushes para tags.

As palavras-chave `paths-ignore` e `paths` aceitam padrões glob que usam os caracteres curinga `*` e `**` para coincidir com mais de um nome de caminho. Para obter mais informações, consulte a "[Folha de consulta de filtro padrão](#filter-pattern-cheat-sheet)".

#### Exemplo desconsiderando caminhos

Quando todos os caminhos de nome correspondem a padrões em `paths-ignore`, o fluxo de trabalho não será executado. O {% data variables.product.prodname_dotcom %} avalia os padrões definidos em `paths-ignore` com relação ao nome do caminho. Um fluxo de trabalho com o seguinte filtro de caminho só será executado em eventos `push` que tiverem pelo menos um arquivo fora do diretório `docs` na raiz do repositório.

```yaml
on:
  push:
    paths-ignore:
      - 'docs/**'
```

#### Exemplo incluindo caminhos

Se pelo menos um caminho corresponder a um padrão no filtro `paths`, o fluxo de trabalho será executado. Para acionar uma compilação sempre que você fizer push de um arquivo JavaScript, você pode usar um padrão curinga.

```yaml
on:
  push:
    paths:
      - '**.js'
```

#### Excluir caminhos

Você pode excluir caminhos com dois tipos de filtros. Não é possível usar ambos os filtros para o mesmo evento em um fluxo de trabalho.
- `paths-ignore` - use o filtro `paths-ignore` quando você precisa somente excluir nomes de caminhos.
- `paths` - use o filtro `paths` quando você precisa filtrar caminhos para correspondências positivas e excluir caminhos.

#### Exemplo com padrões positivos e negativos

Você pode excluir `paths` usando o caractere `!`. A ordem de definição dos padrões é importante:
  - Um padrão negativo (precedido por `!`) depois de uma correspondência positiva excluirá o caminho.
  - Um padrão positivo correspondente após uma correspondência negativa incluirá o caminho novamente.

Este exemplo é executado sempre que o evento `push` inclui um arquivo no diretório `sub-project` ou seus subdiretórios, a menos que o arquivo esteja no diretório `sub-project/docs`. Por exemplo, um push que alterou `sub-project/index.js` ou `sub-project/src/index.js` acionará uma execução de fluxo de trabalho, mas um push que altere somente`sub-project/docs/readme.md` não acionará.

```yaml
on:
  push:
    paths:
      - 'sub-project/**'
      - '!sub-project/docs/**'
```

#### Comparações Git diff

{% note %}

**Observação:** se você fizer push de mais de 1.000 commits ou se o {% data variables.product.prodname_dotcom %} não gera o diff devido a um tempo limite esgotado (diffs muito grandes), o fluxo de trabalho sempre será executado.

{% endnote %}

O filtro determina se um fluxo de trabalho deve ser executado avaliando os arquivos alterados e comparando-os à lista de `paths-ignore` ou `paths`. Se não houver arquivos alterados, o fluxo de trabalho não será executado.

O {% data variables.product.prodname_dotcom %} gera a lista de arquivos alterados usando diffs de dois pontos para pushes e diffs de três pontos para pull requests:
- **Pull requests:** diffs de três pontos são uma comparação entre a versão mais recente do branch de tópico e o commit onde o branch de tópico foi sincronizado pela última vez com o branch de base.
- **Pushes para branches existentes:** um diff de dois pontos compara os SHAs head e base, um com o outro.
- **Pushes para novos branches:** um diff de dois pontos compara o principal do ancestral do commit mais extenso que foi feito push.

Para obter mais informações, consulte "[Sobre comparação de branches em pull requests](/articles/about-comparing-branches-in-pull-requests)".

### `on.schedule`

{% data reusables.repositories.actions-scheduled-workflow-example %}

Para obter mais informações sobre a sintaxe cron, consulte "[Eventos que acionam fluxos de trabalho](/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#scheduled-events)".

{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@3.1" or currentVersion == "github-ae@next" %}
### `permissões`

Você pode modificar as permissões padrão concedidas ao `GITHUB_TOKEN`, adicionando ou removendo o acesso conforme necessário, para que você permita apenas o acesso mínimo necessário. Para obter mais informações, consulte "[Autenticação em um fluxo de trabalho](/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token)".

Você pode usar as permissões de `` como uma chave de nível superior, para aplicar a todos os trabalhos do fluxo de trabalho ou em trabalhos específicos. Ao adicionar a chave das `permissões` em um trabalho específico, todas as ações e comandos de execução dentro desse trabalho que usam o `GITHUB_TOKEN` ganham os direitos de acesso que você especificar.  Para obter mais informações, consulte [`jobs.<job_id>.permissions`](#jobsjob_idpermissions).

{% data reusables.github-actions.github-token-available-permissions %}
{% data reusables.github-actions.forked-write-permission %}

#### Exemplo

Este exemplo mostra as permissões que estão sendo definidas para o `GITHUB_TOKEN` que será aplicado a todos os trabalhos do fluxo de trabalho. É concedido acesso de leitura a todas as permissões.

```yaml
name: "My workflow"

on: [ push ]

permissions: read-all

jobs:
  ...
```
{% endif %}

### `env`

Um `mapa` das variáveis de ambiente que estão disponíveis para as etapas de todos os trabalhos do fluxo de trabalho. Também é possível definir variáveis de ambiente que estão disponíveis apenas para as etapas de um único trabalho ou para uma única etapa. Para obter mais informações, consulte [`jobs.<job_id>.env`](#jobsjob_idenv) e [`jobs.<job_id>.steps[*].env`](#jobsjob_idstepsenv).

{% data reusables.repositories.actions-env-var-note %}

#### Exemplo

```yaml
env:
  SERVER: production
```

### `padrões`

Um `mapa` das configurações-padrão que serão aplicadas a todos os trabalhos do fluxo de trabalho. Você também pode definir as configurações-padrão disponíveis para um trabalho. Para obter mais informações, consulte [`jobs.<job_id>.defaults`](#jobsjob_iddefaults).

{% data reusables.github-actions.defaults-override %}

### `defaults.run`

Você pode fornecer opções-padrão de `shell` e `working-directory` para todas as etapas de [`executar`](#jobsjob_idstepsrun) em um fluxo de trabalho. Você também pode definir as configurações-padrão para `execução` apenas disponíveis para um trabalho. Para obter mais informações, consulte [`jobs.<job_id>.defaults.run`](#jobsjob_iddefaultsrun). Você não pode usar contextos ou expressões nesta palavra-chave.

{% data reusables.github-actions.defaults-override %}

#### Exemplo

```yaml
defaults:
  run:
    shell: bash
    working-directory: scripts
```

{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@3.0" or currentVersion == "github-ae@next" %}
### `concorrência`

{% data reusables.actions.concurrency-beta %}

A moeda garante que apenas um único trabalho ou fluxo de trabalho que usa o mesmo grupo de concorrência seja executado de cada vez. Um grupo de concorrência pode ser qualquer string ou expressão. A expressão só pode usar o contexto `github`. Para obter mais informações sobre expressões, consulte "[Sintaxe de contexto e expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions)".

Você também pode especificar `concorrência` no nível do trabalho. Para obter mais informações, consulte [`jobs.<job_id>.concurrency`](/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idconcurrency).

{% data reusables.actions.actions-group-concurrency %}

{% endif %}
### `jobs`

A execução de um fluxo de trabalho consiste em um ou mais trabalhos. Por padrão, os trabalhos são executados paralelamente. Para executar trabalhos sequencialmente, você pode definir dependências em outros trabalhos usando a palavra-chave `jobs.<job_id>.needs`.

Cada trabalho é executado em um ambiente de executor especificado por `runs-on`.

Você pode executar quantos trabalhos desejar, desde que esteja dentro dos limites de uso do fluxo de trabalho. Para obter mais informações, consulte "[Limites de uso e cobrança](/actions/reference/usage-limits-billing-and-administration)" para executores hospedados em {% data variables.product.prodname_dotcom %} e "[Sobre executores auto-hospedados](/actions/hosting-your-own-runners/about-self-hosted-runners/#usage-limits)" para limites de uso de executores auto-hospedados.

Se você precisar encontrar o identificador exclusivo de um trabalho e execução em um fluxo de trabalho, você poderá usar a API {% data variables.product.prodname_dotcom %}. Para obter mais informações, consulte "[Trabalhos do fluxo de trabalho](/rest/reference/actions#workflow-jobs)".

### `jobs.<job_id>`

Cada trabalho deve ter um id associado. A chave `job_id` é uma string, e seu valor é um mapa dos dados de configuração do trabalho. Você deve substituir `<job_id>` por uma string exclusiva para o objeto `jobs`. `<job_id>` deve começar por uma letra ou `_`, além de conter somente caracteres alfanuméricos, `-` ou `_`.

#### Exemplo

```yaml
jobs:
  meu_primeiro_trabalho:
    name: meu primeiro trabalho
  meu_segundo_trabalho:
    name: meu segundo trabalho
```

### `jobs.<job_id>.name`

Nome do trabalho no {% data variables.product.prodname_dotcom %}.

### `jobs.<job_id>.needs`

Identifica todos os trabalhos a serem concluídos com êxito antes da execução deste trabalho. Esse código pode ser uma string ou array de strings. Se houver falha em um trabalho, todos os trabalhos que dependem dele serão ignorados, a menos que os trabalhos usem uma expressão condicional que faça o trabalho continuar.

#### Exemplo que exige que trabalhos dependentes sejam bem sucedidos

```yaml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

Neste exemplo, `job1` deve ser concluído com êxito antes do início de `job2`, e `job3` aguarda a conclusão de `job1` e `job2`.

Os trabalhos neste exemplo são executados sequencialmente:

1. `job1`
2. `job2`
3. `job3`

#### Exemplo que não exige que trabalhos dependentes sejam bem sucedidos

```yaml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    if: always()
    needs: [job1, job2]
```

Neste exemplo, `job3` usa a expressão condicional `always()` para que ela sempre seja executada depois de `job1` e `job2` terem sido concluídos, independentemente de terem sido bem sucedidos. Para obter mais informações, consulte "[sintaxe de contexto e expressão](/actions/reference/context-and-expression-syntax-for-github-actions#job-status-check-functions)".

### `jobs.<job_id>.runs-on`

**Obrigatório**. O tipo de máquina na qual se executa o trabalho. A máquina pode ser ou um executor hospedado em {% data variables.product.prodname_dotcom %} ou um executor auto-hospedado.

{% if currentVersion == "github-ae@latest" %}
#### {% data variables.actions.hosted_runner %}s

Se você usar um {% data variables.actions.hosted_runner %}, cada trabalho será executado em uma instância atualizada de um ambiente virtual especificado por `runs-on`.

##### Exemplo

```yaml
runs-on: [AE-runner-for-CI]
```

Para obter mais informações, consulte "[Sobre {% data variables.actions.hosted_runner %}s](/actions/using-github-hosted-runners/about-ae-hosted-runners)".

{% else %}
{% data reusables.actions.enterprise-github-hosted-runners %}

#### Runners hospedados no {% data variables.product.prodname_dotcom %}

Se você usar um executor hospedado no {% data variables.product.prodname_dotcom %}, cada trabalho será executado em uma nova instância de um ambiente virtual especificado por `runs-on`.

Os tipos de executor disponíveis para {% data variables.product.prodname_dotcom %} são:

{% data reusables.github-actions.supported-github-runners %}

{% data reusables.github-actions.macos-runner-preview %}

##### Exemplo

```yaml
runs-on: ubuntu-latest
```

Para obter mais informações, consulte "[Ambientes virtuais para executores hospedados em {% data variables.product.prodname_dotcom %}](/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners)".
{% endif %}

#### Executores auto-hospedados

{% data reusables.actions.ae-self-hosted-runners-notice %}

{% data reusables.github-actions.self-hosted-runner-labels-runs-on %}

##### Exemplo

```yaml
runs-on: [self-hosted, linux]
```

Para obter mais informações, consulte "[Sobre executores auto-hospedados](/github/automating-your-workflow-with-github-actions/about-self-hosted-runners)" e "[Usar executores auto-hospedados em um fluxo de trabalho](/github/automating-your-workflow-with-github-actions/using-self-hosted-runners-in-a-workflow)."

{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@3.1" or currentVersion == "github-ae@next" %}
### `jobs.<job_id>.permissions`

Você pode modificar as permissões padrão concedidas ao `GITHUB_TOKEN`, adicionando ou removendo o acesso conforme necessário, para que você permita apenas o acesso mínimo necessário. Para obter mais informações, consulte "[Autenticação em um fluxo de trabalho](/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token)".

Ao especificar a permissão de uma definição de trabalho, você pode configurar um conjunto diferente de permissões para o `GITHUB_TOKEN` para cada trabalho, se necessário. Como alternativa, você pode especificar as permissões para todas as tarefas do fluxo de trabalho. Para informações sobre como definir permissões no nível do fluxo de trabalho, consulte [`permissões`](#permissions).

{% data reusables.github-actions.github-token-available-permissions %}
{% data reusables.github-actions.forked-write-permission %}

#### Exemplo

Este exemplo mostra as permissões que estão sendo definidas para o `GITHUB_TOKEN` que só se aplicará ao trabalho denominado `stale`. O acesso de gravação é concedido para os escopos dos `problemas` e `pull-requests`. Todos os outros escopos não terão acesso.

```yaml
jobs:
  stale:
    runs-on: ubuntu-latest

    permissions:
      issues: write
      pull-requests: write

    steps:
      - uses: actions/stale@v3
```
{% endif %}

{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@3.0" or currentVersion == "github-ae@latest" %}
### `jobs.<job_id>.environment`

O ambiente ao qual o trabalho faz referência. Todas as regras de proteção do ambiente têm de ser aprovadas para que um trabalho que faça referência ao ambiente seja enviado a um executor. Para obter mais informações, consulte "[Ambientes](/actions/reference/environments)".

Você pode fornecer o ambiente apenas como o `nome` do ambiente, ou como um objeto de ambiente com o `nome` e `url`. A URL é mapeada com `environment_url` na API de implantações. Para obter mais informações sobre a API de implantações, consulte "[Implantações](/rest/reference/repos#deployments)".

##### Exemplo de uso de um único nome de ambiente
{% raw %}
```yaml
ambiente: staging_environment
```
{% endraw %}

##### Exemplo de uso de nome de ambiente e URL

```yaml
environment:
  name: production_environment
  url: https://github.com
```

A URL pode ser uma expressão e pode usar qualquer contexto, exceto o contexto de `segredos`. Para obter mais informações sobre expressões, consulte "[Sintaxe de contexto e expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions)".

#### Exemplo
{% raw %}
```yaml
environment:
  name: production_environment
  url: ${{ steps.step_name.outputs.url_output }}
```
{% endraw %}
{% endif %}


{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@3.0" or currentVersion == "github-ae@next" %}
### `jobs.<job_id>.concurrency`

{% data reusables.actions.concurrency-beta %}

{% note %}

**Observação:** Quando a concorrência é especificada no nível do trabalho, não se garante a ordem para trabalhos ou execuções que são enfileiradas em 5 minutos uma da outra.

{% endnote %}

A moeda garante que apenas um único trabalho ou fluxo de trabalho que usa o mesmo grupo de concorrência seja executado de cada vez. Um grupo de concorrência pode ser qualquer string ou expressão. A expressão pode usar qualquer contexto, exceto para o contexto de `segredos`. Para obter mais informações sobre expressões, consulte "[Sintaxe de contexto e expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions)".

Você também pode especificar `concorrência` no nível do fluxo de trabalho. Para obter mais informações, consulte [`concorrência`](/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#concurrency).

{% data reusables.actions.actions-group-concurrency %}

{% endif %}
### `jobs.<job_id>.outputs`

Um `mapa` de saídas para um trabalho. As saídas de trabalho estão disponíveis para todos os trabalhos downstream que dependem deste trabalho. Para obter mais informações sobre a definição de dependências de trabalhos, consulte [`jobs.<job_id>.needs`](#jobsjob_idneeds).

As saídas de trabalho são strings e saídas de trabalho que contêm expressões são avaliadas no executor ao final de cada trabalho. As saídas que contêm segredos são eliminadas no executor e não são enviadas para {% data variables.product.prodname_actions %}.

Para usar as saídas de trabalho em um trabalho dependente, você poderá usar o contexto `needs`. Para obter mais informações, consulte "[Contexto e sintaxe de expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions#needs-context)".

#### Exemplo

{% raw %}
```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    # Map a step output to a job output
    outputs:
      output1: ${{ steps.step1.outputs.test }}
      output2: ${{ steps.step2.outputs.test }}
    steps:
      - id: step1
        run: echo "::set-output name=test::hello"
      - id: step2
        run: echo "::set-output name=test::world"
  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
      - run: echo ${{needs.job1.outputs.output1}} ${{needs.job1.outputs.output2}}
```
{% endraw %}

### `jobs.<job_id>.env`

Um `map` (mapa) das variáveis de ambiente que estão disponíveis para todos as etapas do trabalho. Também é possível definir variáveis de ambiente para todo o fluxo de trabalho ou uma etapa individual. Para obter mais informações, consulte [`env`](#env) e [`jobs.<job_id>.steps[*].env`](#jobsjob_idstepsenv).

{% data reusables.repositories.actions-env-var-note %}

#### Exemplo

```yaml
jobs:
  job1:
    env:
      FIRST_NAME: Mona
```

### `jobs.<job_id>.defaults`

Um `mapa` com as configurações- padrão que serão aplicadas a todas as etapas do trabalho. Você também pode definir as configurações-padrão para todo o fluxo de trabalho. Para obter mais informações, consulte [`padrão`](#defaults).

{% data reusables.github-actions.defaults-override %}

### `jobs.<job_id>.defaults.run`

Forneça o `shell` e `working-directory` para todas as etapas do trabalho `executar`. Não são permitidos contexto e expressão nesta seção.

Você pode fornecer as opções-padrão de `shell` e `working-directory` para todas as etapas de [`execução`](#jobsjob_idstepsrun) de um trabalho. Você também pode definir as configurações-padrão para `execução` para todo o fluxo de trabalho. Para obter mais informações, consulte [`jobs.defaults.run`](#defaultsrun). Você não pode usar contextos ou expressões nesta palavra-chave.

{% data reusables.github-actions.defaults-override %}

#### Exemplo

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    defaults:
      run:
        shell: bash
        working-directory: scripts
```

### `jobs.<job_id>.if`

Você pode usar a condicional `if` (se) para evitar que um trabalho seja executado a não ser que determinada condição seja atendida. Você pode usar qualquer contexto e expressão compatível para criar uma condicional.

{% data reusables.github-actions.expression-syntax-if %} Para obter mais informações, consulte "[Contexto e sintaxe de expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions)".

### `jobs.<job_id>.steps`

Trabalhos contêm sequências de tarefas chamadas `steps`. As etapas podem executar comandos, executar trabalhos de configuração ou executar ações no seu repositório, em repositórios públicos, ou ações publicadas em registros do Docker. Nem todas as etapas executam ações, mas todas as ações são executadas como etapas. Cada etapa é executada em seu próprio processo no ambiente do executor, tendo acesso ao espaço de trabalho e ao sistema de arquivos. Como as etapas são executadas em seus próprios processos, as alterações nas variáveis de ambiente não são preservadas entre as etapas. O {% data variables.product.prodname_dotcom %} fornece etapas integradas para configurar e concluir trabalhos.

Você pode executar quantas etapas quiser, desde que esteja dentro dos limites de uso do fluxo de trabalho. Para obter mais informações, consulte "[Limites de uso e cobrança](/actions/reference/usage-limits-billing-and-administration)" para executores hospedados em {% data variables.product.prodname_dotcom %} e "[Sobre executores auto-hospedados](/actions/hosting-your-own-runners/about-self-hosted-runners/#usage-limits)" para limites de uso de executores auto-hospedados.

#### Exemplo

{% raw %}
```yaml
name: Greeting from Mona

on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
      - name: Print a greeting
        env:
          MY_VAR: Hi there! My name is
          FIRST_NAME: Mona
          MIDDLE_NAME: The
          LAST_NAME: Octocat
        run: |
          echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```
{% endraw %}

### `jobs.<job_id>.steps[*].id`

Identificador exclusivo da etapa. Você pode usar `id` para fazer referência à etapa em contextos. Para obter mais informações, consulte "[Contexto e sintaxe de expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions)".

### `jobs.<job_id>.steps[*].if`

Você pode usar a condicional `if` (se) para evitar que uma etapa trabalho seja executada a não ser que determinada condição seja atendida. Você pode usar qualquer contexto e expressão compatível para criar uma condicional.

{% data reusables.github-actions.expression-syntax-if %} Para obter mais informações, consulte "[Contexto e sintaxe de expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions)".

#### Exemplo usando contextos

 Essa etapa somente é executada quando o tipo de evento é uma `pull_request` e a ação do evento é `unassigned` (não atribuída).

 ```yaml
steps:
  - name: My first step
    if: {% raw %}${{ github.event_name == 'pull_request' && github.event.action == 'unassigned' }}{% endraw %}
    run: echo This event is a pull request that had an assignee removed.
```

#### Exemplo usando funções de verificação de status

A função `my backup step` (minha etapa de backup) somente é executada quando houver falha em uma etapa anterior do trabalho. Para obter mais informações, consulte "[Contexto e sintaxe de expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions#job-status-check-functions)".

```yaml
steps:
  - name: My first step
    uses: monacorp/action-name@main
  - name: My backup step
    if: {% raw %}${{ failure() }}{% endraw %}
    uses: actions/heroku@1.0.0
```

### `jobs.<job_id>.steps[*].name`

Nome da etapa no {% data variables.product.prodname_dotcom %}.

### `jobs.<job_id>.steps[*].uses`

Seleciona uma ação para executar como parte de uma etapa no trabalho. A ação é uma unidade reutilizável de código. Você pode usar uma ação definida no mesmo repositório que o fluxo de trabalho, um repositório público ou em uma [imagem publicada de contêiner Docker](https://hub.docker.com/).

É altamente recomendável incluir a versão da ação que você está usando ao especificar um número de tag Docker, SHA ou ref do Git. Se você não especificar uma versão, ela poderá interromper seus fluxos de trabalho ou causar um comportamento inesperado quando o proprietário da ação publicar uma atualização.
- Usar o commit SHA de uma versão de ação lançada é a maneira mais garantida de obter estabilidade e segurança.
- Usar a versão principal da ação permite receber correções importantes e patches de segurança sem perder a compatibilidade. Fazer isso também garante o funcionamento contínuo do fluxo de trabalho.
- Usar o branch-padrão de uma ação pode ser conveniente, mas se alguém lançar uma nova versão principal com uma mudança significativa, seu fluxo de trabalho poderá ter problemas.

Algumas ações requerem entradas que devem ser definidas com a palavra-chave [`with`](#jobsjob_idstepswith) (com). Revise o arquivo README da ação para determinar as entradas obrigatórias.

Ações são arquivos JavaScript ou contêineres Docker. Se a ação em uso for um contêiner do Docker, você deverá executar o trabalho em um ambiente do Linux. Para obter mais detalhes, consulte [`runs-on`](#jobsjob_idruns-on).

#### Exemplo usando ações com versão

```yaml
steps:    
  # Reference a specific commit
  - uses: actions/setup-node@c46424eee26de4078d34105d3de3cc4992202b1e
  # Reference the major version of a release
  - uses: actions/setup-node@v1
  # Reference a minor version of a release
  - uses: actions/setup-node@v1.2
  # Reference a branch
  - uses: actions/setup-node@main
```

#### Exemplo usando uma ação pública

`{owner}/{repo}@{ref}`

Você pode especificar um branch, ref ou SHA em um repositório público {% data variables.product.prodname_dotcom %}.

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        # Uses the default branch of a public repository
        uses: actions/heroku@1.0.0
      - name: My second step
        # Uses a specific version tag of a public repository
        uses: actions/aws@v2.0.1
```

#### Exemplo usando uma ação pública em um subdiretório

`{owner}/{repo}/{path}@{ref}`

Subdiretório em um repositório público do {% data variables.product.prodname_dotcom %} em um branch, ref ou SHA específico.

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: actions/aws/ec2@main
```

#### Exemplo usando a ação no mesmo repositório que o fluxo de trabalho

`./path/to/dir`

Caminho para o diretório que contém a ação no repositório do seu fluxo de trabalho. Você deve reservar seu repositório antes de usar a ação.

```yaml
jobs:
  my_first_job:
    steps:
      - name: Check out repository
        uses: actions/checkout@v2
      - name: Use local my-action
        uses: ./.github/actions/my-action
```

#### Exemplo usando uma ação do Docker Hub

`docker://{image}:{tag}`

Imagem Docker publicada no [Docker Hub](https://hub.docker.com/).

```yaml
empregos:
  my_first_job:
    passos:
      - nome: Meu primeiro passo
        usa: docker://alpine:3.8
```

{% if currentVersion == "free-pro-team@latest" %}
##### Exemplo que utiliza {% data variables.product.prodname_registry %} {% data variables.product.prodname_container_registry %}

`docker://{host}/{image}:{tag}`

Uma imagem Docker em {% data variables.product.prodname_registry %} {% data variables.product.prodname_container_registry %}.

```yaml
jobs:
  meu_primeiro_trabalho:
    steps:
      - name: minha primeira etapa
        uses: docker://ghcr.io/OWNER/IMAGE_NAME
```
{% endif %}
##### Exemplo usando uma ação do registro público do Docker Hub

`docker://{host}/{image}:{tag}`

Imagem Docker em um registro público. Este exemplo usa o Registro de Contêiner do Google em `gcr.io`.

```yaml
jobs:
  meu_primeiro_trabalho:
    steps:
      - name: minha primeira etapa
        uses: docker://gcr.io/cloud-builders/gradle
```

#### Exemplo de uso de ação dentro de um repositório privado diferente do fluxo de trabalho

Seu fluxo de trabalho deve fazer checkout no repositório privado e referenciar a ação localmente. Generate a personal access token and add the token as an encrypted secret. Para obter mais informações, consulte "[Criar um token de acesso pessoal](/github/authenticating-to-github/creating-a-personal-access-token)" e "[Segredos criptografados](/actions/reference/encrypted-secrets)".

Replace `PERSONAL_ACCESS_TOKEN` in the example with the name of your secret.

{% raw %}
```yaml
jobs:
  my_first_job:
    steps:
      - name: Check out repository
        uses: actions/checkout@v2
        with:
          repository: octocat/my-private-repo
          ref: v1.0
          token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          path: ./.github/actions/my-private-repo
      - name: Run my action
        uses: ./.github/actions/my-private-repo/my-action
```
{% endraw %}

### `jobs.<job_id>.steps[*].run`

Executa programas de linha de comando usando o shell do sistema operacional. Se você não informar um `name`, o nome da etapa será configurado por padrão como o texto indicado no comando `run`.

Por padrão, os comandos run usam shells de não login. Você pode escolher um shell diferente e personalizar o shell usado para executar comandos. Para obter mais informações, consulte "[Usar um shell específico](#using-a-specific-shell)".

Cada palavra-chave `run` representa um novo processo e shell no ambiente do executor. Quando você fornece comandos de várias linhas, cada linha será executada no mesmo shell. Por exemplo:

* Um comando de linha única:

  ```yaml
  - name: Install Dependencies
    run: npm install
  ```

* Um comando de várias linhas:

  ```yaml
  - name: Clean install dependencies and build
    run: |
      npm ci
      npm run build
  ```

Com a palavra-chave `working-directory` (diretório de trabalho), é possível especificar o diretório de trabalho de onde o comando será executado.

```yaml
- name: Clean temp directory
  run: rm -rf *
  working-directory: ./temp
```

#### Usar um shell específico

Você pode anular as configurações padrão de shell no sistema operacional do executor usando a palavra-chave `shell`. É possível usar palavras-chave integradas a `shell` ou definir um conjunto personalizado de opções de shell.

| Plataforma compatível | Parâmetro `shell` | Descrição                                                                                                                                                                                                                                                                  | Comando executado internamente                  |
| --------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Todas                 | `bash`            | O shell padrão em plataformas que não sejam Windows como uma alternativa para `sh`. Ao especificar um shell bash no Windows, é utilizado o shell bash incluído no Git para Windows.                                                                                        | `bash --noprofile --norc -eo pipefail {0}`      |
| Todas                 | `pwsh`            | Powershell Core. O {% data variables.product.prodname_dotcom %} anexa a extensão `.ps1` ao nome do script.                                                                                                                                                                 | `pwsh -command ". '{0}'"`                       |
| Todas                 | `python`          | Executa o comando python.                                                                                                                                                                                                                                                  | `python {0}`                                    |
| Linux / macOS         | `sh`              | Comportamento alternativo para plataformas que não sejam Windows se nenhum shell for fornecido e o `bash` não for encontrado no caminho.                                                                                                                                   | `sh -e {0}`                                     |
| Windows               | `cmd`             | O {% data variables.product.prodname_dotcom %} anexa a extensão `.cmd` ao nome do script e a substitui por `{0}`.                                                                                                                                                          | `%ComSpec% /D /E:ON /V:OFF /S /C "CALL "{0}""`. |
| Windows               | `pwsh`            | Essa é a shell padrão usada no Windows. Powershell Core. O {% data variables.product.prodname_dotcom %} anexa a extensão `.ps1` ao nome do script. Se o seu executor do Windows auto-hospedado não tiver o _PowerShell Core_ instalado, será usado o _PowerShell Desktop_. | `pwsh -command ". '{0}'"`.                      |
| Windows               | `powershell`      | O PowerShell Desktop. O {% data variables.product.prodname_dotcom %} anexa a extensão `.ps1` ao nome do script.                                                                                                                                                            | `powershell -command ". '{0}'"`.                |

#### Exemplo de execução de um script usando bash:

```yaml
steps:
  - name: Display the path
    run: echo $PATH
    shell: bash
```

#### Exemplo de execução de um script usando Windows `cmd`

```yaml
steps:
  - name: Display the path
    run: echo %PATH%
    shell: cmd
```

#### Exemplo de execução de um script usando PowerShell Core

```yaml
steps:
  - name: Display the path
    run: echo ${env:PATH}
    shell: pwsh
```

#### Exemplo: Usar o PowerShell Desktop para executar um script

```yaml
steps:
  - name: Display the path
    run: echo ${env:PATH}
    shell: powershell
```

#### Exemplo de execução de um script python

```yaml
steps:
  - name: Display the path
    run: |
      import os
      print(os.environ['PATH'])
    shell: python
```

#### Shell personalizado

Você pode usar o valor `shell` em um string modelo usando `command […options] {0} [..more_options]`. O {% data variables.product.prodname_dotcom %} interpreta a primeira palavra da string delimitada por um espaço em branco como o comando e insere o nome do arquivo para o script temporário em `{0}`.

Por exemplo:

```yaml
steps:
  - name: Display the environment variables and their values
    run: |
      print %ENV
    shell: perl {0}
```

O comando usado, `perl` neste exemplo, deve ser instalado no executor.


{% if currentVersion == "github-ae@latest" %}Para instruções instruções sobre como ter certeza de que o seu {% data variables.actions.hosted_runner %} tem o software necessário instalado, consulte "[Criar imagens personalizadas](/actions/using-github-hosted-runners/creating-custom-images)".
{% else %}
Para informações sobre o software incluído nos executores hospedados no GitHub, consulte "[Especificações para os executores hospedados no GitHub](/actions/reference/specifications-for-github-hosted-runners#supported-software)."
{% endif %}

#### Preferências de ação de erro e códigos de saída

Para palavras-chave de shell integradas, fornecemos os seguintes padrões usados por executores hospedados no {% data variables.product.prodname_dotcom %}. Você deve seguir estas diretrizes quando executar scripts shell.

- `bash`/`sh`:
  - Comportamento de falha rápido que usa `set -eo pipefail`: Padrão para `bash` e `shell` embutido. Também é o padrão quando você não der opção em plataformas que não sejam Windows.
  - Você pode cancelar o fail-fast e assumir o controle fornecendo uma string de modelo para as opções do shell. Por exemplo, `bash {0}`.
  - Shells do tipo sh saem com o código de saída do último comando executado em um script, que também é o comportamento padrão das ações. O executor relatará o status da etapa como falha/êxito com base nesse código de saída.

- `powershell`/`pwsh`
  - Comportamento fail-fast quando possível. Para shell integrado `pwsh` e `powershell`, precederemos `$ErrorActionPreference = 'stop'` para conteúdos de script.
  - Vincularemos `if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit $LASTEXITCODE }` a scripts powershell para que os status da ação reflitam o código de saída mais recente do script.
  - Os usuários podem sempre optar por não usar o shell integrado e fornecer uma opção personalizada, como: `pwsh -File {0}` ou `powershell -Command "& '{0}'"`, dependendo da situação.

- `cmd`
  - Parece não haver uma forma de optar totalmente por um comportamento fail-fast que não seja gravar seu script para verificar cada código de erro e reagir de acordo. Como não podemos fornecer esse comportamento por padrão, você precisa gravá-lo em seu script.
  - `cmd.exe` sairá com o nível de erro do último programa que executou e retornará o código de erro para o executor. Este comportamento é internamente consistente o padrão de comportamento anterior `sh` e `pwsh`, e é o padrão `cmd.exe`; portanto, ele fica intacto.

### `jobs.<job_id>.steps[*].with`

Um `map` (mapa) dos parâmetros de entrada definidos pela ação. Cada parâmetro de entrada é um par chave/valor. Parâmetros de entrada são definidos como variáveis de ambiente. A variável é precedida por `INPUT_` e convertida em letras maiúsculas.

#### Exemplo

Define os três parâmetros de entrada (`first_name`, `middle_name` e `last_name`) definidos pela ação `hello_world`. Essas variáveis de entrada estarão acessíveis para a ação `hello-world` como variáveis de ambiente `INPUT_FIRST_NAME`, `INPUT_MIDDLE_NAME` e `INPUT_LAST_NAME`.

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: actions/hello_world@main
        with:
          first_name: Mona
          middle_name: The
          last_name: Octocat      
```

### `jobs.<job_id>.steps[*].with.args`

Uma `string` que define as entradas para um contêiner Docker. O {% data variables.product.prodname_dotcom %} entrega os `args` ao `ENTRYPOINT` do contêiner quando o contêiner inicia. Um `array de strings` não é compatível com esse parâmetro.

#### Exemplo

{% raw %}
```yaml
steps:
  - name: Explain why this job ran
    uses: monacorp/action-name@main
    with:
      entrypoint: /bin/echo
      args: The ${{ github.event_name }} event triggered this step.
```
{% endraw %}

`args` são usados em substituição à instrução `CMD` em um `Dockerfile`. Se você usar `CMD` no `Dockerfile`, use as diretrizes ordenadas por preferência:

1. Documente os argumentos necessários no README das ações e omita-os da instrução `CMD`.
1. Use padrões que permitam o uso da ação sem especificação de `args`.
1. Se a ação expõe um sinalizador `--help` ou similar, use isso como padrão para que a ação se documente automaticamente.

### `jobs.<job_id>.steps[*].with.entrypoint`

Anula o `ENTRYPOINT` Docker no `Dockerfile` ou define-o caso ainda não tenha sido especificado. Diferentemente da instrução Docker `ENTRYPOINT` que tem um formulário shell e exec, a palavra-chave `entrypoint` aceita apena uma única string que define o executável.

#### Exemplo

```yaml
steps:
  - name: Run a custom command
    uses: monacorp/action-name@main
    with:
      entrypoint: /a/different/executable
```

A palavra-chave `entrypoint` é para ser usada com ações de contêiner Docker, mas você também pode usá-la com ações JavaScript que não definem nenhuma entrada.

### `jobs.<job_id>.steps[*].env`

Define variáveis de ambiente para etapas a serem usadas no ambiente do executor. Também é possível definir variáveis de ambiente para todo o fluxo de trabalho ou para um trabalho. Para obter mais informações, consulte [`env`](#env) e [`jobs.<job_id>.env`](#jobsjob_idenv).

{% data reusables.repositories.actions-env-var-note %}

Ações públicas podem especificar variáveis de ambiente esperadas no arquivo LEIAME. Se você está configurando um segredo em uma variável de ambiente, use o contexto `secrets`. Para obter mais informações, consulte "[Usar variáveis de ambiente](/actions/automating-your-workflow-with-github-actions/using-environment-variables)e "[Sintaxe de contexto e expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions)".

#### Exemplo

{% raw %}
```yaml
steps:
 - name: minha primeira ação
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    FIRST_NAME: Mona
    LAST_NAME: Octocat
```
{% endraw %}

### `jobs.<job_id>.steps[*].continue-on-error`

Impede a falha de um trabalho se uma etapa não funcionar. Defina `true` (verdadeiro) para permitir que um trabalho aconteça quando essa etapa falhar.

### `jobs.<job_id>.steps[*].timeout-minutes`

Número máximo de minutos para executar a etapa antes de interromper o processo.

### `jobs.<job_id>.timeout-minutes`

Número máximo de minutos para permitir a execução de um trabalho o antes que o {% data variables.product.prodname_dotcom %} o cancele automaticamente. Padrão: 360

### `jobs.<job_id>.strategy`

Estratégias criam matrizes de compilação para os trabalhos. Você pode definir variações diferentes variações nas quais executar os trabalhos.

### `jobs.<job_id>.strategy.matrix`

Você pode definir uma matriz de diferentes configurações de trabalho. Uma matriz permite que você crie vários trabalhos que realizam a substituição de variável em uma definição de trabalho único. Por exemplo, você pode usar uma matriz para criar trabalhos para mais de uma versão compatível de uma linguagem de programação, sistema operacional ou ferramenta. Uma matriz reutiliza a configuração do trabalho e cria trabalho para cada matriz que você configurar.

{% data reusables.github-actions.usage-matrix-limits %}

Cada opção que você define na `matriz` tem uma chave e um valor. As chaves que você define tornam-se propriedades no contexto da `matriz` e você pode fazer referência à propriedade em outras áreas do seu arquivo de fluxo de trabalho. Por exemplo, se você definir a chave `os` que contém um array de sistemas operacionais, você poderá usar a propriedade `matrix.os` como o valor da palavra-chave `runs-on` para criar um trabalho para cada sistema operacional. Para obter mais informações, consulte "[Contexto e sintaxe de expressão para {% data variables.product.prodname_actions %}](/actions/reference/context-and-expression-syntax-for-github-actions)".

A ordem que você define uma `matriz` importa. A primeira opção que você definir será a primeira que será executada no seu fluxo de trabalho.

#### Exemplo de execução com mais de uma versão do Node.js

Você pode especificar uma matriz ao fornecer um array para as opções de configuração. Por exemplo, se o executor for compatível com as versões 10, 12 e 14 do Node.js versões, você poderá especificar um array dessas versões na `matriz`.

Este exemplo cria uma matriz de três trabalhos, definindo a chave `nó` para um array de três versões do Node.js. Para usar a matriz, o exemplo define a propriedade do contexto `matrix.node` como o valor do parâmetro `setup-node` de entrada da ação `node-version`. Como resultado, três trabalhos serão executados, cada uma usando uma versão diferente do Node.js.

{% raw %}
```yaml
strategy:
  matrix:
    node: [10, 12, 14]
steps:
  # Configures the node version used on GitHub-hosted runners
  - uses: actions/setup-node@v2
    with:
      # The Node.js version to configure
      node-version: ${{ matrix.node }}
```
{% endraw %}

A ação setup-node `` é a forma recomendada de configurar uma versão do Node.js ao usar executores hospedados em {% data variables.product.prodname_dotcom %}. Para obter mais informações, consulte a ação [`setup-node`](https://github.com/actions/setup-node).

#### Exemplo de execução com mais de um sistema operacional

Você pode criar uma matriz para executar fluxos de trabalho em mais de um sistema operacional do executor. Você também pode especificar mais de uma configuração da matriz. Este exemplo cria uma matriz de 6 trabalhos:

- 2 sistemas operacionais especificados na array `os`
- 3 versões do Node.js especificadas na array do `nó`

{% data reusables.repositories.actions-matrix-builds-os %}

{% raw %}
```yaml
runs-on: ${{ matrix.os }}
strategy:
  matrix:
    os: [ubuntu-18.04, ubuntu-20.04]
    node: [10, 12, 14]
steps:
  - uses: actions/setup-node@v2
    with:
      node-version: ${{ matrix.node }}
```
{% endraw %}

{% if currentVersion == "github-ae@latest" %}Para encontrar opções de configuração suportadas para {% data variables.actions.hosted_runner %}s, consulte "[Especificações de software](/actions/using-github-hosted-runners/about-ae-hosted-runners#software-specifications)".
{% else %}Para encontrar opções de configuração compatíveis com executores hospedados em {% data variables.product.prodname_dotcom %}, consulte "[Ambientes virtuais para executores hospedados em {% data variables.product.prodname_dotcom %}](/actions/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners)."
{% endif %}

#### Exemplo de inclusão valores adicionais em combinações

Você pode adicionar opções de configurações para um trabalho de matriz de compilação existente. Por exemplo, se você quer usar uma versão específica do `npm` quando o trabalho que usa o `windows-latest` e a versão 8 do `nó` é executado, você pode usar `incluir` para especificar a opção adicional.

{% raw %}
```yaml
runs-on: ${{ matrix.os }}
strategy:
  matrix:
    os: [macos-latest, windows-latest, ubuntu-18.04]
    node: [8, 10, 12, 14]
    include:
      # includes a new variable of npm with a value of 6
      # for the matrix leg matching the os and version
      - os: windows-latest
        node: 8
        npm: 6
```
{% endraw %}

#### Exemplo de inclusão novas combinações

Você pode usar `incluir` para adicionar novos trabalhos a uma matriz de criação. Qualquer configuração sem correspondência de incluir será adicionadas à matriz. Por exemplo, se você quiser usar a versão 14 do `nó` para compilar em vários sistemas operacionais, mas quiser uma tarefa experimental extra usando o node 15 no Ubuntu, você poderá usar `incluir` para especificar essa tarefa adicional.

{% raw %}
```yaml
runs-on: ${{ matrix.os }}
strategy:
  matrix:
    node: [14]
    os: [macos-latest, windows-latest, ubuntu-18.04]
    include:
      - node: 15
        os: ubuntu-18.04
        experimental: true
```
{% endraw %}

#### Exemplo excluindo configurações de uma matriz

Você pode remover uma configuração específica definida na matriz de compilação usando a opção `exclude` (excluir). `exclude` remove um trabalho definido pela matriz de compilação. O número de trabalhos é o produto cruzado do número de sistemas operacionais (`os`) incluídos nos arrays fornecidos por você, menos quaisquer subtrações (`exclude`).

{% raw %}
```yaml
runs-on: ${{ matrix.os }}
strategy:
  matrix:
    os: [macos-latest, windows-latest, ubuntu-18.04]
    node: [8, 10, 12, 14]
    exclude:
      # excludes node 8 on macOS
      - os: macos-latest
        node: 8
```
{% endraw %}

{% note %}

**Observação:** Todas as combinações de `incluir` são processadas depois de `excluir`. Isso permite que você use `incluir` para voltar a adicionar combinações que foram excluídas anteriormente.

{% endnote %}

##### Usando variáveis de ambiente em uma matriz

Você pode adicionar variáveis de ambiente personalizadas para cada combinação de testes usando a chave `include`. Em seguida, você pode se referir às variáveis de ambiente personalizadas em um passo posterior.

{% data reusables.github-actions.matrix-variable-example %}

### `jobs.<job_id>.strategy.fail-fast`

Quando definido como `true`, o {% data variables.product.prodname_dotcom %} cancela todos os trabalhos em andamento em caso de falha de algum trabalho de  `matrix`. Padrão: `true`

### `jobs.<job_id>.strategy.max-parallel`

Número máximo de trabalhos que podem ser executados simultaneamente ao usar uma estratégia de trabalho de `matrix`. Por padrão, o {% data variables.product.prodname_dotcom %} maximizará o número de trabalhos executados em paralelo dependendo dos executores disponíveis nas máquinas virtuais hospedadas no {% data variables.product.prodname_dotcom %}.

```yaml
strategy:
  max-parallel: 2
```

### `jobs.<job_id>.continue-on-error`

Impede que ocorra falha na execução de um fluxo de trabalho quando ocorrer uma falha em um trabalho. Defina como `verdadeiro` para permitir que uma execução de um fluxo de trabalho passe quando este trabalho falhar.

#### Exemplo do impedimento de uma matriz falha específica de gerar uma falha na execução do fluxo de trabalho

Você pode permitir que as tarefas específicas em uma matriz de tarefas falhem sem que ocorra falha na execução do fluxo de trabalho. Por exemplo, se você deseja permitir apenas um trabalho experimental com o `nó` definido como `15` sem falhar a execução do fluxo de trabalho.

{% raw %}
```yaml
runs-on: ${{ matrix.os }}
continue-on-error: ${{ matrix.experimental }}
strategy:
  fail-fast: false
  matrix:
    node: [13, 14]
    os: [macos-latest, ubuntu-18.04]
    experimental: [false]
    include:
      - node: 15
        os: ubuntu-18.04
        experimental: true
```
{% endraw %}

### `jobs.<job_id>.container`

Contêiner para executar qualquer etapa em um trabalho que ainda não tenha especificado um contêiner. Se você tiver etapas que usam ações de script e de contêiner, as ações de contêiner serão executadas como contêineres irmãos na mesma rede e com as mesmas montagens de volume.

Se você não definir um `container`, todas as etapas serão executadas diretamente no host especificado por `runs-on`, a menos que uma etapa se refira a uma ação configurada para execução em um contêiner.

#### Exemplo

```yaml
jobs:
  my_job:
    container:
      image: node:14.16
      env:
        NODE_ENV: development
      ports:
        - 80
      volumes:
        - my_docker_volume:/volume_mount
      options: --cpus 1
```

Ao especificar somente uma imagem de contêiner, você pode omitir a palavra-chave `image`.

```yaml
jobs:
  my_job:
    container: node:14.16
```

### `jobs.<job_id>.container.image`

Imagem Docker a ser usada como contêiner para executar a ação. The value can be the Docker Hub image name or a {% if enterpriseServerVersions contains currentVersion and currentVersion ver_lt "enterprise-server@2.23" %}public{% endif %} registry name.

{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@2.22" or currentVersion == "github-ae@latest" %}

### `jobs.<job_id>.container.credentials`

{% data reusables.actions.registry-credentials %}

#### Exemplo

{% raw %}
```yaml
container:
  image: ghcr.io/owner/image
  credentials:
     username: ${{ github.actor }}
     password: ${{ secrets.ghcr_token }}
```
{% endraw %}
{% endif %}

### `jobs.<job_id>.container.env`

Define um `mapa` das variáveis de ambiente no contêiner.

### `jobs.<job_id>.container.ports`

Define um `array` de portas para expor no contêiner.

### `jobs.<job_id>.container.volumes`

Define um `array` de volumes para uso do contêiner. É possível usar volumes para compartilhar dados entre serviços ou outras etapas em um trabalho. Você pode especificar volumes de nome Docker, volumes Docker anônimos ou vincular montagens no host.

Para especificar um volume, especifique o caminho de origem e destino:

`<source>:<destinationPath>`.

`<source>` é um nome de volume ou caminho absoluto na máquina host, e `<destinationPath>` é um caminho absoluto no contêiner.

#### Exemplo

```yaml
volumes:
  - my_docker_volume:/volume_mount
  - /data/my_data
  - /source/directory:/destination/directory
```

### `jobs.<job_id>.container.options`

Opções adicionais de recursos do contêiner Docker. Para obter uma lista de opções, consulte "[opções `docker create`](https://docs.docker.com/engine/reference/commandline/create/#options)".

### `jobs.<job_id>.services`

{% data reusables.github-actions.docker-container-os-support %}

Usado para hospedar contêineres de serviço para um trabalho em um fluxo de trabalho. Contêineres de serviço são úteis para a criação de bancos de dados ou serviços armazenamento em cache como o Redis. O executor cria automaticamente uma rede do Docker e gerencia o ciclo de vida dos contêineres do serviço.

Se você configurar seu trabalho para ser executado em um contêiner, ou a sua etapa usar ações ao contêiner, você não precisará mapear as portas para acessar o serviço ou a ação. O Docker expõe automaticamente todas as portas entre os contêineres da mesma rede de ponte definida pelo usuário. Você pode fazer referência ao contêiner de serviço diretamente pelo seu nome de host. O nome do host é mapeado automaticamente com o nome da etiqueta que você configurar para o serviço no fluxo de trabalho.

Se você configurar a tarefa para executar diretamente na máquina do executor e sua etapa não usar uma ação de contêiner, você deverá mapear todas as portas de contêiner de serviço do Docker necessárias para o host do Docker (a máquina do executor). Você pode acessar o contêiner de serviço usando host local e a porta mapeada.

Para obter mais informações sobre as diferenças entre os contêineres de serviço de rede, consulte "[Sobre contêineres de serviço](/actions/automating-your-workflow-with-github-actions/about-service-containers)".

#### Exemplo de uso de host local

Este exemplo cria dois serviços: nginx e redis. Ao especificar a porta do host do Docker mas não a porta do contêiner, a porta do contêiner será atribuída aleatoriamente a uma porta livre. O {% data variables.product.prodname_dotcom %} define a porta de contêiner atribuída no contexto {% raw %}`${{job.services.<service_name>.ports}}`{% endraw %}. Neste exemplo, você pode acessar as portas do contêiner de serviço usando os contextos {% raw %}`${{ job.services.nginx.ports['8080'] }}`{% endraw %} e {% raw %}`${{ job.services.redis.ports['6379'] }}`{% endraw %}.

```yaml
serviços:
  nginx:
    imagem: nginx
    # Mapeia a porta 8080 no host do Docker com a porta 80 no contêiner nginx
    portas:
      - 8080:80
  redis:
    imagem: redis
    # Mapeia a porta  port 6379 TCP no host do Docker com uma porta livre aleatória no contêiner Redis
    portas:
      - 6379/tcp
```

### `jobs.<job_id>.services.<service_id>.image`

Imagem Docker a ser usada como contêiner de serviço para executar a ação. The value can be the Docker Hub image name or a {% if enterpriseServerVersions contains currentVersion and currentVersion ver_lt "enterprise-server@2.23" %}public{% endif %} registry name.

{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@2.22" or currentVersion == "github-ae@latest" %}

### `jobs.<job_id>.services.<service_id>.credentials`

{% data reusables.actions.registry-credentials %}

#### Exemplo

{% raw %}
```yaml
services:
  myservice1:
    image: ghcr.io/owner/myservice1
    credentials:
      username: ${{ github.actor }}
      password: ${{ secrets.ghcr_token }}
  myservice2:
    image: dockerhub_org/myservice2
    credentials:
      username: ${{ secrets.DOCKER_USER }}
      password: ${{ secrets.DOCKER_PASSWORD }}
```
{% endraw %}
{% endif %}

### `jobs.<job_id>.services.<service_id>.env`

Define um `maá` das variáveis de ambiente no contêiner do serviço.

### `jobs.<job_id>.services.<service_id>.ports`

Define um `array` de portas para expor no contêiner de serviço.

### `jobs.<job_id>.services.<service_id>.volumes`

Define um `array` de volumes para uso do contêiner de serviço. É possível usar volumes para compartilhar dados entre serviços ou outras etapas em um trabalho. Você pode especificar volumes de nome Docker, volumes Docker anônimos ou vincular montagens no host.

Para especificar um volume, especifique o caminho de origem e destino:

`<source>:<destinationPath>`.

`<source>` é um nome de volume ou caminho absoluto na máquina host, e `<destinationPath>` é um caminho absoluto no contêiner.

#### Exemplo

```yaml
volumes:
  - my_docker_volume:/volume_mount
  - /data/my_data
  - /source/directory:/destination/directory
```

### `jobs.<job_id>.services.<service_id>.options`

Opções adicionais de recursos do contêiner Docker. Para obter uma lista de opções, consulte "[opções `docker create`](https://docs.docker.com/engine/reference/commandline/create/#options)".

### Folha de consulta de filtro padrão

Você pode usar caracteres especiais nos filtros de caminhos, branches e tags.

- `*`: Corresponde a zero ou mais caracteres, mas não Corresponde ao caractere `/`. Por exemplo, `Octo*` corresponde a `Octocat`.
- `**`: Corresponde a zero ou mais de qualquer caractere.
- `?`: Corresponde a zero ou a um único caractere. Por exemplo, `Octoc?t` corresponde a `Octocat`.
- `+`: Corresponde a um ou mais dos caracteres anteriores.
- `[]` Corresponde a um caractere listado entre colchetes ou incluído nos intervalos. Os intervalos só podem incluir valores de `a-z`, `A-Z`, e `0-9`. Por exemplo, o intervalo`[0-9a-z]` corresponde a qualquer letra maiúscula ou minúscula. Por exemplo, `[CB]at` corresponde a `Cat` ou `Bat` e `[1-2]00` corresponde a `100` e `200`.
- `!` No início de um padrão faz com que ele anule padrões positivos anteriores. Não tem nenhum significado especial caso não seja o primeiro caractere.

Os caracteres `*`, `[` e `!` são caracteres especiais em YAML. Se você iniciar um padrão com `*`, `[` ou `!`, você deverá colocá-lo entre aspas.

```yaml
# Válido
- '**/README.md'

# Inválido - Cria um erro de análise que
# impede que o seu fluxo de trabalho seja executado.
- **/README.md
```

Para obter mais informações sobre a sintaxe de filtros de branches, tags e caminhos, consulte "[`on.<push|pull_request>.<branches|tags>`](#onpushpull_requestbranchestags)" e "[`on.<push|pull_request>.paths`](#onpushpull_requestpaths)".

#### Padrões para corresponder branches e tags

| Padrão                                                 | Descrição                                                                                                                                                                           | Exemplos de correspondências                                                                                          |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `feature/*`                                            | O caractere curinga `*` corresponde a qualquer caractere, mas não à barra (`/`).                                                                                                    | `feature/my-branch`<br/><br/>`feature/your-branch`                                                        |
| `feature/**`                                           | `**` correspondem a qualquer caractere, incluindo a barra (`/`) em nomes de branches e tags.                                                                                        | `feature/beta-a/my-branch`<br/><br/>`feature/your-branch`<br/><br/>`feature/mona/the/octocat` |
| `main`<br/><br/>`releases/mona-the-octcat` | Corresponde ao nome exato de um branch ou tag.                                                                                                                                      | `main`<br/><br/>`releases/mona-the-octocat`                                                               |
| `'*'`                                                  | Corresponde a todos os nomes de branches e tags que não contêm uma barra (`/`). O caractere `*` é um caractere especial em YAML. Ao inciar um padrão com `*`, você deve usar aspas. | `main`<br/><br/>`releases`                                                                                |
| `'**'`                                                 | Corresponde a todos os nomes de branches e tags. Esse é o comportamento padrão quando você não usa um filtro de `branches` ou `tags`.                                               | `all/the/branches`<br/><br/>`every/tag`                                                                   |
| `'*feature'`                                           | O caractere `*` é um caractere especial em YAML. Ao inciar um padrão com `*`, você deve usar aspas.                                                                                 | `mona-feature`<br/><br/>`feature`<br/><br/>`ver-10-feature`                                   |
| `v2*`                                                  | Corresponde aos nomes de branches e tags que iniciam com `v2`.                                                                                                                      | `v2`<br/><br/>`v2.0`<br/><br/>`v2.9`                                                          |
| `v[12].[0-9]+.[0-9]+`                                  | Corresponde a todas as tags de versão de branch semântica com a versão principal 1 ou 2                                                                                             | `v1.10.1`<br/><br/>`v2.0.0`                                                                               |

#### Padrões para corresponder a caminhos de arquivos

Padrões de caminhos devem corresponder ao caminho completo e iniciar a partir da raiz do repositório.

| Padrão                                                                  | Descrição das correspondências                                                                                                                                                                                         | Exemplos de correspondências                                                                                             |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `'*'`                                                                   | O caractere curinga `*` corresponde a qualquer caractere, mas não à barra (`/`). O caractere `*` é um caractere especial em YAML. Ao inciar um padrão com `*`, você deve usar aspas.                                   | `README.md`<br/><br/>`server.rb`                                                                             |
| `'*.jsx?'`                                                              | O caractere `?` corresponde a zero ou a um dos caracteres anteriores.                                                                                                                                                  | `page.js`<br/><br/>`page.jsx`                                                                                |
| `'**'`                                                                  | `**` corresponde a qualquer caractere incluindo a barra (`/`). Esse é o comportamento padrão quando você não usa um filtro de `path`.                                                                                  | `all/the/files.md`                                                                                                       |
| `'*.js'`                                                                | O caractere curinga `*` corresponde a qualquer caractere, mas não à barra (`/`). Corresponde a todos os arquivos `.js` na raiz do repositório.                                                                         | `app.js`<br/><br/>`index.js`                                                                                 |
| `'**.js'`                                                               | Corresponde a todos os arquivos `.js` no repositório.                                                                                                                                                                  | `index.js`<br/><br/>`js/index.js`<br/><br/>`src/js/app.js`                                       |
| `docs/*`                                                                | Todos os arquivos dentro da raiz do diretório `docs`, na raiz do repositório.                                                                                                                                          | `docs/README.md`<br/><br/>`docs/file.txt`                                                                    |
| `docs/**`                                                               | Qualquer arquivo no diretório `docs`, na raiz do repositório.                                                                                                                                                          | `docs/README.md`<br/><br/>`docs/mona/octocat.txt`                                                            |
| `docs/**/*.md`                                                          | Um arquivo com um sufixo `.md` em qualquer local do diretório `docs`.                                                                                                                                                  | `docs/README.md`<br/><br/>`docs/mona/hello-world.md`<br/><br/>`docs/a/markdown/file.md`          |
| `'**/docs/**'`                                                          | Qualquer arquivo no diretório `docs`, em qualquer local do repositório.                                                                                                                                                | `/docs/hello.md`<br/><br/>`dir/docs/my-file.txt`<br/><br/>`space/docs/plan/space.doc`            |
| `'**/README.md'`                                                        | Um arquivo README.md em qualquer local do repositório.                                                                                                                                                                 | `README.md`<br/><br/>`js/README.md`                                                                          |
| `'**/*src/**'`                                                          | Qualquer arquivo em uma pasta com o sufixo `src` em qualquer local do repositório.                                                                                                                                     | `a/src/app.js`<br/><br/>`my-src/code/js/app.js`                                                              |
| `'**/*-post.md'`                                                        | Um arquivo com o sufixo `-post.md` em qualquer local do repositório.                                                                                                                                                   | `my-post.md`<br/><br/>`path/their-post.md`                                                                   |
| `'**/migrate-*.sql'`                                                    | Um arquivo com o prefixo `migrate-` e sufixo `.sql` em qualquer local do repositório.                                                                                                                                  | `migrate-10909.sql`<br/><br/>`db/migrate-v1.0.sql`<br/><br/>`db/sept/migrate-v1.sql`             |
| `*.md`<br/><br/>`!README.md`                                | Usar um sinal de exclamação (`!`) na frente de um padrão o anula. Quando um arquivo corresponde a um padrão e também corresponde a um padrão negativo definido posteriormente no arquivo, o arquivo não será incluído. | `hello.md`<br/><br/>_Does not match_<br/><br/>`README.md`<br/><br/>`docs/hello.md` |
| `*.md`<br/><br/>`!README.md`<br/><br/>`README*` | Os padrões são verificados sequencialmente. Um padrão que anula um padrão anterior irá incluir caminhos de arquivos novamente.                                                                                         | `hello.md`<br/><br/>`README.md`<br/><br/>`README.doc`                                            |
