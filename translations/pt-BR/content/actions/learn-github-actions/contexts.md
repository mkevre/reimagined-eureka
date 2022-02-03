---
title: Contextos
shortTitle: Contextos
intro: Você pode acessar as informações de contexto nos fluxos de trabalho e nas ações.
redirect_from:
  - /articles/contexts-and-expression-syntax-for-github-actions
  - /github/automating-your-workflow-with-github-actions/contexts-and-expression-syntax-for-github-actions
  - /actions/automating-your-workflow-with-github-actions/contexts-and-expression-syntax-for-github-actions
  - /actions/reference/contexts-and-expression-syntax-for-github-actions
  - /actions/reference/context-and-expression-syntax-for-github-actions
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
miniTocMaxHeadingLevel: 3
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## Sobre os contextos

Os contextos são uma forma de acessar informações sobre execuções de fluxo de trabalho, ambientes dos executores, trabalhos e etapas. Cada contexto é um objeto que contém propriedades, que podem ser strings ou outros objetos.

{% data reusables.actions.context-contents %} Por exemplo, o contexto `matriz` só é povoado para trabalhos em uma matriz[matriz de construção](/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix).

Você pode acessar contextos usando a sintaxe da expressão. Para obter mais informações, consulte "[Expressões](/actions/learn-github-actions/expressions)".

{% raw %}
`${{ <context> }}`
{% endraw %}

{% data reusables.github-actions.context-injection-warning %}

| Nome do contexto | Tipo     | Descrição                                                                                                                                                                          |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `github`         | `objeto` | Informações sobre a execução do fluxo de trabalho. Para obter mais informações, consulte [contexto `github`](#github-context).                                                     |
| `env`            | `objeto` | Contém variáveis de ambiente definidas em um fluxo de trabalho, trabalho ou etapa. Para obter mais informações, consulte o contexto [`env`](#env-context).                         |
| `trabalho`       | `objeto` | Informações sobre o trabalho atualmente em execução. Para obter mais informações, consulte [contexto `trabalho`](#job-context).                                                    |
| `steps`          | `objeto` | Informações sobre as etapas que foram executadas no trabalho atual. Para obter mais informações, consulte [contexto `etapas`](#steps-context).                                     |
| `runner`         | `objeto` | Informações sobre o executor do trabalho atual. Para obter mais informações, consulte [`runner` context](#runner-context).                                                         |
| `secrets`        | `objeto` | Contém nomes e valores de segredos que estão disponíveis para a execução de um fluxo de trabalho. Para obter mais informações, consulte o contexto [`segredos`](#secrets-context). |
| `strategy`       | `objeto` | Informações sobre a estratégia de execução da matriz para o trabalho atual. Para obter mais informações, consulte o contexto [`estratégia`](#strategy-context).                    |
| `matrix`         | `objeto` | Contém as propriedades da matriz definidas no fluxo de trabalho que se aplicam ao trabalho atual. Para obter mais informações, consulte o contexto [`matriz`](#matrix-context).    |
| `needs`          | `objeto` | Contém os resultados de todos os trabalhos que são definidos como uma dependência do trabalho atual. Para obter mais informações, consulte o contexto [`needs`](#needs-context).   |
{%- ifversion fpt or ghec or ghes > 3.3 or ghae-issue-4757 %}
| `entradas` | `objeto` | Contém a entrada de um fluxo de trabalho reutilizável. Para obter mais informações, consulte o contexto [`entradas`](#inputs-context). |{% endif %}

Como parte de uma expressão, você pode acessar informações de contexto usando uma das duas sintaxes.

- Sintaxe de índice: `github['sha']`;
- Sintaxe de propriedade de desreferência: `github.sha`

Para usar a sintaxe de propriedade de desreferência, o nome da propriedade deve:

- começar com `a-Z` ou `_`;
- ser seguido por `a-Z` `0-9` `-` ou `_`.

### Determinar quando usar contextos

{% data reusables.github-actions.using-context-or-environment-variables %}

### Disponibilidade do contexto

Contextos diferentes estão disponíveis durante a execução de um fluxo de trabalho. Por exemplo, o contexto de `segredos` só pode ser usado em certos lugares dentro de um trabalho.

Além disso, algumas funções só podem ser utilizadas em determinados lugares. Por exemplo, a função `hashFiles` não está disponível em qualquer lugar.

A tabela a seguir indica onde cada contexto e função especial pode ser utilizado dentro de um fluxo de trabalho. A menos que esteja listado abaixo, uma função pode ser usada em qualquer lugar. |{% ifversion fpt or ghes > 3.3 or ghae-issue-4757 or ghec %}
| Chave de fluxo de trabalho | Contexto                   | Funções especiais          |
| -------------------------- | -------------------------- | -------------------------- |
| <code>concorrência</code>  | <code>github, entradas</code>  |                            |
| <code>env</code>  | <code>github, segredos, entradas</code>  |                            |
| <code>jobs.&lt;job_id&gt;.concurrency</code>  | <code>github, necessidades, estratégia, matriz, entradas</code>  |                            |
| <code>jobs.&lt;job_id&gt;.container</code>  | <code>github, necessidades, estratégia, matriz, entradas</code>  |                            |
| <code>jobs.&lt;job_id&gt;.container.credentials</code>  | <code>github, necessidades, estratégia, matrix, env, segredos, entradas</code>  |                            |
| <code>jobs.&lt;job_id&gt;.container.env.&lt;env_id&gt;</code> | <code>github, necessidades, estratégia, matrix, trabalho, executor, env, segredos, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.continue-on-error</code> | <code>github, necessidades, estratégia, matriz, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.defaults.run</code> | <code>github, necessidades, estratégia, matriz, env, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.env</code> | <code>github, necessidades, estratégia, matriz, segredos, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.environment</code> | <code>github, necessidades, estratégia, matriz, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.environment.url</code> | <code>github, necessidades, estratégia, matriz, trabalho, executor, env, etapas, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.if</code> | <code>github, necessidades, entradas</code> | <code>always, cancelled, success, failure</code> |
| <code>jobs.&lt;job_id&gt;.name</code> | <code>github, necessidades, estratégia, matriz, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.outputs.&lt;output_id&gt;</code> | <code>github, necessidades, estratégia, matriz, trabalho, executor, env, segredos, etapas, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.runs-on</code> | <code>github, necessidades, estratégia, matriz, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.secrets.&lt;secrets_id&gt;</code> | <code>github, necessidades, segredos</code> |                            |
| <code>jobs.&lt;job_id&gt;.services</code> | <code>github, necessidades, estratégia, matriz, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.services.&lt;service_id&gt;.credentials</code> | <code>github, necessidades, estratégia, matrix, env, segredos, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.services.&lt;service_id&gt;.env.&lt;env_id&gt;</code> | <code>github, necessidades, estratégia, matrix, trabalho, executor, env, segredos, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.steps.continue-on-error</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.env</code> | <code>github, necessidades, estratégia, matriz, trabalho, executor, env, segredos, etapas, entradas</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.if</code> | <code>github, necessidades, estratégia, matriz, trabalho, executor, env, etapas, entradas</code> | <code>always, cancelled, success, failure, hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.name</code> | <code>github, necessidades, estratégia, matriz, trabalho, executor, env, segredos, etapas, entradas</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.run</code> | <code>github, necessidades, estratégia, matriz, trabalho, executor, env, segredos, etapas, entradas</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.timeout-minutes</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.with</code> | <code>github, necessidades, estratégia, matriz, trabalho, executor, env, segredos, etapas, entradas</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.working-directory</code> | <code>github, necessidades, estratégia, matriz, trabalho, executor, env, segredos, etapas, entradas</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.strategy</code> | <code>github, necessidades, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.timeout-minutes</code> | <code>github, necessidades, estratégia, matriz, entradas</code> |                            |
| <code>jobs.&lt;job_id&gt;.with.&lt;with_id&gt;</code> | <code>github, needs</code> |                            |
| <code>on.workflow_call.inputs.&lt;inputs_id&gt;.default</code> | <code>github</code> |                            |
| <code>on.workflow_call.outputs.&lt;output_id&gt;.value</code> | <code>github, jobs, inputs</code> |                            |
{% else %}
| Caminho                     | Contexto                    | Funções especiais           |
| --------------------------- | --------------------------- | --------------------------- |
| <code>concorrência</code>  | <code>github</code>  |                             |
| <code>env</code>  | <code>github, secrets</code>  |                             |
| <code>jobs.&lt;job_id&gt;.concurrency</code>  | <code>github, needs, strategy, matrix</code>  |                             |
| <code>jobs.&lt;job_id&gt;.container</code>  | <code>github, needs, strategy, matrix</code>  |                             |
| <code>jobs.&lt;job_id&gt;.container.credentials</code>  | <code>github, needs, strategy, matrix, env, secrets</code>  |                             |
| <code>jobs.&lt;job_id&gt;.container.env.&lt;env_id&gt;</code>  | <code>github, needs, strategy, matrix, job, runner, env, secrets</code>  |                             |
| <code>jobs.&lt;job_id&gt;.continue-on-error</code>  | <code>github, needs, strategy, matrix</code>  |                             |
| <code>jobs.&lt;job_id&gt;.defaults.run</code>  | <code>github, needs, strategy, matrix, env</code>  |                             |
| <code>jobs.&lt;job_id&gt;.env</code>  | <code>github, needs, strategy, matrix, secrets</code>  |                             |
| <code>jobs.&lt;job_id&gt;.environment</code>  | <code>github, needs, strategy, matrix</code>  |                             |
| <code>jobs.&lt;job_id&gt;.environment.url</code>  | <code>github, needs, strategy, matrix, job, runner, env, steps</code>  |                             |
| <code>jobs.&lt;job_id&gt;.if</code>  | <code>github, needs</code>  | <code>always, cancelled, success, failure</code>  |
| <code>jobs.&lt;job_id&gt;.name</code>  | <code>github, needs, strategy, matrix</code>  |                             |
| <code>jobs.&lt;job_id&gt;.outputs.&lt;output_id&gt;</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> |                             |
| <code>jobs.&lt;job_id&gt;.runs-on</code> | <code>github, needs, strategy, matrix</code> |                             |
| <code>jobs.&lt;job_id&gt;.services</code> | <code>github, needs, strategy, matrix</code> |                             |
| <code>jobs.&lt;job_id&gt;.services.&lt;service_id&gt;.credentials</code> | <code>github, needs, strategy, matrix, env, secrets</code> |                             |
| <code>jobs.&lt;job_id&gt;.services.&lt;service_id&gt;.env.&lt;env_id&gt;</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets</code> |                             |
| <code>jobs.&lt;job_id&gt;.steps.continue-on-error</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.env</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.if</code> | <code>github, needs, strategy, matrix, job, runner, env, steps</code> | <code>always, cancelled, success, failure, hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.name</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.run</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.timeout-minutes</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.with</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.steps.working-directory</code> | <code>github, needs, strategy, matrix, job, runner, env, secrets, steps</code> | <code>hashFiles</code> |
| <code>jobs.&lt;job_id&gt;.strategy</code> | <code>github, needs</code> |                             |
| <code>jobs.&lt;job_id&gt;.timeout-minutes</code> | <code>github, needs, strategy, matrix</code> |                             |
{% endif %}

### Exemplo: imprimir informações de contexto no registro

Você pode imprimir o conteúdo de contextos no registro para depuração. A função [`toJSON` ](/actions/learn-github-actions/expressions#tojson) é necessária para imprimir objetos do JSON no registro.

{% data reusables.github-actions.github-context-warning %}

{% raw %}
```yaml{:copy}
name: Context testing
on: push

jobs:
  dump_contexts_to_log:
    runs-on: ubuntu-latest
    steps:
      - name: Dump GitHub context
        id: github_context_step
        run: echo '${{ toJSON(github) }}'
      - name: Dump job context
        run: echo '${{ toJSON(job) }}'
      - name: Dump steps context
        run: echo '${{ toJSON(steps) }}'
      - name: Dump runner context
        run: echo '${{ toJSON(runner) }}'
      - name: Dump strategy context
        run: echo '${{ toJSON(strategy) }}'
      - name: Dump matrix context
        run: echo '${{ toJSON(matrix) }}'
```
{% endraw %}

## Contexto `github`

O contexto `github` context contém informações sobre a execução do fluxo de trabalho e sobre o evento que a acionou. Você também pode ler a maioria dos dados do `github` em variáveis de ambiente. Para obter mais informações sobre as variáveis de ambiente, consulte "[Usando variáveis de ambiente](/actions/automating-your-workflow-with-github-actions/using-environment-variables)".

{% data reusables.github-actions.github-context-warning %}
{% data reusables.github-actions.context-injection-warning %}

| Nome da propriedade        | Tipo     | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `github`                   | `objeto` | Contexto de nível mais alto disponível em qualquer trabalho ou etapa de um fluxo de trabalho. Este objeto contém todas as propriedades listadas abaixo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `github.action`            | `string` | O nome da ação atualmente em execução ou o [`id`](/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsid) de uma etapa. {% data variables.product.prodname_dotcom %} remove caracteres especiais e usa o nome `__run` quando a etapa atual executa um script sem um `id`. Se você usar a mesma ação mais de uma vez no mesmo trabalho, o nome incluirá um sufixo com o número da sequência com o sublinhado antes dele. Por exemplo, o primeiro script que você executar terá o nome `__run` e o segundo script será denominado `__run_2`. Da mesma forma, a segunda invocação de `actions/checkout` será `actionscheckout2`.                                                                              |
| `github.action_path`       | `string` | O caminho onde uma ação está localizada. Esta propriedade só é compatível com ações compostas. Você pode usar este caminho para acessar arquivos localizados no mesmo repositório da ação.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `github.action_ref`        | `string` | Para uma etapa executando uma ação, este é o ref da ação que está sendo executada. Por exemplo, `v2`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `github.action_repository` | `string` | Para uma etpa que executa uma ação, este é o nome do proprietário e do repositório da ação. Por exemplo, `actions/checkout`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `github.actor`             | `string` | O nome de usuário que iniciou a execução do fluxo de trabalho.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `github.api_url`           | `string` | A URL da API REST de {% data variables.product.prodname_dotcom %}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `github.base_ref`          | `string` | `base_ref` ou branch alvo da pull request em uma execução de fluxo de trabalho. Esta propriedade só está disponível quando o evento que aciona a execução de um fluxo de trabalho for `pull_request` ou `pull_request_target`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `github.env`               | `string` | Caminho no executor para o arquivo que define variáveis de ambiente dos comandos do fluxo de trabalho. Este arquivo é único para a etapa atual e é um arquivo diferente para cada etapa de um trabalho. Para obter mais informações, consulte "[Comandos do fluxo de trabalho para {% data variables.product.prodname_actions %}](/actions/learn-github-actions/workflow-commands-for-github-actions#setting-an-environment-variable)".                                                                                                                                                                                                                                                                                                |
| `github.event`             | `objeto` | Carga de evento de webhook completa. Você pode acessar as propriedades individuais do evento usando este contexto. Este objeto é idêntico à carga do webhook do evento que acionou a execução do fluxo de trabalho e é diferente para cada evento. Os webhooks para cada evento de {% data variables.product.prodname_actions %} que está vinculado em "[Eventos que acionam fluxos de trabalho](/articles/events-that-trigger-workflows/)". Por exemplo, para uma execução do fluxo de trabalho acionada por um evento [`push`](/actions/using-workflows/events-that-trigger-workflows#push), esse objeto contém o conteúdo da [carga do webhook de push](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push). |
| `github.event_name`        | `string` | Nome do evento que acionou a execução do fluxo de trabalho.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `github.event_path`        | `string` | O caminho para o arquivo no executor que contém a carga completa do webhook do evento.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `github.graphql_url`       | `string` | A URL da API do GraphQL de {% data variables.product.prodname_dotcom %}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `github.head_ref`          | `string` | `head_ref` ou branch de origem da pull request em uma execução de fluxo de trabalho. Esta propriedade só está disponível quando o evento que aciona a execução de um fluxo de trabalho for `pull_request` ou `pull_request_target`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `github.job`               | `string` | O [`job_id`](/actions/reference/workflow-syntax-for-github-actions#jobsjob_id) do trabalho atual.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `github.ref`               | `string` | Branch ou ref tag que acionou a execução do fluxo de trabalho. Para branches, este é o formato `refs/heads/<branch_name>` e, para tags, é `refs/tags/<tag_name>`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
{%- ifversion fpt or ghec or ghes > 3.3 or ghae-issue-5338 %}
| `github.ref_name` | `string` | {% data reusables.actions.ref_name-description %} | | `github.ref_protected` | `string` | {% data reusables.actions.ref_protected-description %} | | `github.ref_type` | `string` | {% data reusables.actions.ref_type-description %}
{%- endif %}
| `github.path` | `string` | Caminho no executor no arquivo que define as variáveis do `PATH` do sistema a partir de comandos do fluxo de trabalho. Este arquivo é único para a etapa atual e é um arquivo diferente para cada etapa de um trabalho. Para obter mais informações, consulte "[Comandos do fluxo de trabalho para {% data variables.product.prodname_actions %}](/actions/learn-github-actions/workflow-commands-for-github-actions#adding-a-system-path)." | | `github.repository` | `string` | O proprietário e o nome do repositório. Por exemplo, `Codertocat/Hello-World`. | | `github.repository_owner` | `string` | O nome do proprietário do repositório. Por exemplo, `Codertocat`. | | `github.repositoryUrl` | `string` | A URL do Git para o repositório. Por exemplo, `git://github.com/codertocat/hello-world.git`. | | `github.retention_days` | `string` | O número de dias que os registros e artefatos da execução do fluxo de trabalho são mantidos. | | `github.run_id` | `string` | {% data reusables.github-actions.run_id_description %} | | `github.run_number` | `string` | {% data reusables.github-actions.run_number_description %} | | `github.run_attempt` | `string` | O úmero único para cada tentativa de uma execução de fluxo de trabalho particular em um repositório. Este número começa em 1 para a primeira tentativa de execução do fluxo de trabalho e aumenta a cada nova execução. | | `github.server_url` | `string` | A URL do servidor do GitHub. Por exemplo: `https://github.com`. | | `github.sha` | `string` | O SHA do commit que acionou a execução do fluxo de trabalho. | | `github.token` | `string` | Um token para efetuar a autenticação em nome do aplicativo instalado no seu repositório. Isso é funcionalmente equivalente ao segredo `GITHUB_TOKEN`. Para obter mais informações, consulte "[Autenticação automática de tokens](/actions/security-guides/automatic-token-authentication)". | | `github.workflow` | `string` | O nome do fluxo de trabalho. Se o fluxo de trabalho não determina um `name` (nome), o valor desta propriedade é o caminho completo do arquivo do fluxo de trabalho no repositório. | | `github.workspace` | `string` | O diretório de trabalho padrão no executor para as etapas e a localidade padrão do seu repositório ao usar a ação [`checkout`](https://github.com/actions/checkout). |

### Exemplo de conteúdo do contexto `github`

O contexto a seguir é de um fluxo de trabalho executado pelo evento `push`. O objeto `evento` neste exemplo foi truncado porque é idêntico ao conteúdo da carga do webhook de [`push`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push).

{% data reusables.actions.context-example-note %}

```json
{
  "token": "***",
  "job": "dump_contexts_to_log",
  "ref": "refs/heads/my_branch",
  "sha": "c27d339ee6075c1f744c5d4b200f7901aad2c369",
  "repository": "octocat/hello-world",
  "repository_owner": "octocat",
  "repositoryUrl": "git://github.com/octocat/hello-world.git",
  "run_id": "1536140711",
  "run_number": "314",
  "retention_days": "90",
  "run_attempt": "1",
  "actor": "octocat",
  "workflow": "Context testing",
  "head_ref": "",
  "base_ref": "",
  "event_name": "push",
  "event": {
    ...
  },
  "server_url": "https://github.com",
  "api_url": "https://api.github.com",
  "graphql_url": "https://api.github.com/graphql",
  "ref_name": "my_branch",
  "ref_protected": false,
  "ref_type": "branch",
  "secret_source": "Actions",
  "workspace": "/home/runner/work/hello-world/hello-world",
  "action": "github_step",
  "event_path": "/home/runner/work/_temp/_github_workflow/event.json",
  "action_repository": "",
  "action_ref": "",
  "path": "/home/runner/work/_temp/_runner_file_commands/add_path_b037e7b5-1c88-48e2-bf78-eaaab5e02602",
  "env": "/home/runner/work/_temp/_runner_file_commands/set_env_b037e7b5-1c88-48e2-bf78-eaaab5e02602"
}
```

### Exemplo de uso do contexto `github`

Este fluxo de trabalho de exemplo usa o contexto `github.event_name` para executar um trabalho somente se a execução do fluxo de trabalho for acionada pelo evento `pull_request`.

```yaml{:copy}
name: Run CI
on: [push, pull_request]

jobs:
  normal_ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run normal CI
        run: ./run-tests

  pull_request_ci:
    runs-on: ubuntu-latest
    if: {% raw %}${{ github.event_name == 'pull_request' }}{% endraw %}
    steps:
      - uses: actions/checkout@v2
      - name: Run PR CI
        run: ./run-additional-pr-ci
```

## Contexto `env`

O contexto `env` contém variáveis de ambiente que foram definidas em um fluxo de trabalho, trabalho ou etapa. Para obter mais informações sobre como configurar variáveis de ambiente em seu fluxo de trabalho, consulte "[Sintaxe do fluxo de trabalho para {% data variables.product.prodname_actions %}](/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#env)".

A sintaxe de contexto `env` permite que você use o valor de uma variável de ambiente no seu arquivo de fluxo de trabalho. Você pode usar o contexto `env` no valor de qualquer chave em uma etapa, exceto para as chaves `id` e `uses`. Para obter mais informações sobre a sintaxe da etapa, consulte "[Sintaxe do fluxo de trabalho para o {% data variables.product.prodname_actions %}](/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idsteps)".

Se você desejar usar o valor de uma variável de ambiente dentro de um executor, use o método normal do sistema operacional do executor para ler as variáveis de ambiente.

| Nome da propriedade    | Tipo     | Descrição                                                                                                                                                             |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                  | `objeto` | Esse contexto altera cada etapa em um trabalho. Você pode acessar esse contexto em qualquer etapa de um trabalho. Este objeto contém as propriedades listadas abaixo. |
| `env.<env_name>` | `string` | O valor de uma variável de ambiente específica.                                                                                                                       |

### Conteúdo do exemplo do contexto `env`

O conteúdo do contexto `env` é um mapeamento de nomes de variáveis de ambiente com os seus valores. O conteúdo do contexto pode mudar dependendo de onde é usado na execução do fluxo de trabalho.

```json
{
  "first_name": "Mona",
  "super_duper_var": "totally_awesome"
}
```

### Exemplo de uso do contexto `env`

Este exemplo de fluxo de trabalho mostra como o contexto `env` pode ser configurado no fluxo de trabalho, níveis de trabalho e de etapas, bem como usar o contexto em etapas.

{% data reusables.repositories.actions-env-var-note %}

{% raw %}
```yaml{:copy}
name: Hi Mascot
on: push
env:
  mascot: Mona
  super_duper_var: totally_awesome

jobs:
  windows_job:
    runs-on: windows-latest
    steps:
      - run: echo 'Hi ${{ env.mascot }}'  # Hi Mona
      - run: echo 'Hi ${{ env.mascot }}'  # Hi Octocat
        env:
          mascot: Octocat
  linux_job:
    runs-on: ubuntu-latest
    env:
      mascot: Tux
    steps:
      - run: echo 'Hi ${{ env.mascot }}'  # Hi Tux
```
{% endraw %}

## Contexto `trabalho`

O contexto `job` (trabalho) contém informações sobre o trabalho atualmente em execução.

| Nome da propriedade                       | Tipo     | Descrição                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trabalho`                                | `objeto` | Esse contexto altera cada trabalho em uma execução de fluxo de trabalho. Você pode acessar esse contexto em qualquer etapa de um trabalho. Este objeto contém todas as propriedades listadas abaixo.                                                                         |
| `job.container`                           | `objeto` | Informações sobre o contêiner do trabalho. Para obter mais informações sobre contêineres, consulte "[Sintaxe de fluxo de trabalho para o {% data variables.product.prodname_actions %}](/articles/workflow-syntax-for-github-actions#jobsjob_idcontainer)".                  |
| `job.container.id`                        | `string` | O ID do contêiner.                                                                                                                                                                                                                                                           |
| `job.container.network`                   | `string` | O ID da rede do contêiner. O executor cria a rede usada por todos os contêineres em um trabalho.                                                                                                                                                                             |
| `job.services`                            | `objeto` | Contêineres de serviços criados para um trabalho. Para obter mais informações sobre contêineres de serviço, consulte "[Sintaxe de fluxo de trabalho para o {% data variables.product.prodname_actions %}](/articles/workflow-syntax-for-github-actions#jobsjob_idservices)". |
| `job.services.<service_id>.id`      | `string` | O ID do contêiner de serviço.                                                                                                                                                                                                                                                |
| `job.services.<service_id>.network` | `string` | O ID da rede de contêiner de serviço. O executor cria a rede usada por todos os contêineres em um trabalho.                                                                                                                                                                  |
| `job.services.<service_id>.ports`   | `objeto` | As portas expostas do contêiner de serviço.                                                                                                                                                                                                                                  |
| `job.status`                              | `string` | Status atual do trabalho. Possíveis valores são `success`, `failure` ou `cancelled`.                                                                                                                                                                                         |

### Exemplo de conteúdo do contexto `trabalho`

Este exemplo `contexto do job` usa um contêiner de serviço do PostgreSQL com portas mapeadas. Se não houver contêineres ou contêineres de serviço usados em um trabalho, o contexto `trabalho` só conterá a propriedade `status`.

```json
{
  "status": "success",
  "container": {
    "network": "github_network_53269bd575974817b43f4733536b200c"
  },
  "services": {
    "postgres": {
      "id": "60972d9aa486605e66b0dad4abb638dc3d9116f566579e418166eedb8abb9105",
      "ports": {
        "5432": "49153"
      },
      "network": "github_network_53269bd575974817b43f4733536b200c"
    }
  }
}
```

### Exemplo de uso do contexto `trabalho`

Este exemplo de fluxo de trabalho configura um contêiner de serviço do PostgreSQL e mapeia automaticamente a porta 5432 do recipiente de serviço com uma porta disponível escolhida aleatoriamente no host. O contexto `job` é usado para acessar o número da porta atribuída no host.

{% raw %}
```yaml{:copy}
name: PostgreSQL Service Example
on: push
jobs:
  postgres-job:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres
        env:
          POSTGRES_PASSWORD: postgres
        options: --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5
        ports:
          # Maps TCP port 5432 in the service container to a randomly chosen available port on the host.
          - 5432

    steps:
      - uses: actions/checkout@v2
      - run: pg_isready -h localhost -p ${{ job.services.postgres.ports[5432] }}
      - run: ./run-tests
```
{% endraw %}

## Contexto `etapas`

O contexto `etapas` contém informações sobre as etapas do trabalho atual que possuem um [`id`](/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsid) especificado e já executado.

| Nome da propriedade                                 | Tipo     | Descrição                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `steps`                                             | `objeto` | Esse contexto altera cada etapa em um trabalho. Você pode acessar esse contexto em qualquer etapa de um trabalho. Este objeto contém todas as propriedades listadas abaixo.                                                                                                                                                                                                  |
| `steps.<step_id>.outputs`                     | `objeto` | Conjunto de saídas definidas para a etapa. For more information, see "[Metadata syntax for {% data variables.product.prodname_actions %}](/articles/metadata-syntax-for-github-actions#outputs-for-docker-container-and-javascript-actions)."                                                                                                                                |
| `steps.<step_id>.conclusion`                  | `string` | O resultado de uma etapa concluída após [`continue-on-error`](/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error) ser aplicado. Os valores possíveis são: `sucesso`, `falha`, `cancelado`ou `ignorado`. Quando ocorre uma falha na etapa de `continue-on-error`, o `resultado` será `falha`, mas a conclusão `final` será `sucesso`.     |
| `steps.<step_id>.outcome`                     | `string` | O resultado de uma etapa concluída antes de [`continue-on-error`](/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error) ser aplicado. Os valores possíveis são: `sucesso`, `falha`, `cancelado`ou `ignorado`. Quando ocorre uma falha na etapa de `continue-on-error`, o `resultado` será `falha`, mas a conclusão `final` será `sucesso`. |
| `steps.<step_id>.outputs.<output_name>` | `string` | Valor de uma saída específica.                                                                                                                                                                                                                                                                                                                                               |

### Exemplo de conteúdo do contexto `etapas`

Este exemplo `passo` contexto mostra duas etapas anteriores que tinham um [`id`](/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsid) especificado. O `id` da primeira etapa era denominado `checkout` e o segundo, `generate_number`. A etapa `generate_number` tinha uma saída denominada `random_number`.

```yaml
{
  "checkout": {
    "outputs": {},
    "outcome": "success",
    "conclusion": "success"
  },
  "generate_number": {
    "outputs": {
      "random_number": "1"
    },
    "outcome": "success",
    "conclusion": "success"
  }
}
```

### Exemplo de uso do contexto de `etapas`

Este exemplo de fluxo de trabalho gera um número aleatório como saída em uma etapa e uma etapa posterior usa o contexto `etapas` para ler o valor dessa saída.

{% raw %}
```yaml{:copy}
name: Generate random failure
on: push
jobs:
  randomly-failing-job:
    runs-on: ubuntu-latest
    steps:
      - id: checkout
        uses: actions/checkout@v2
      - name: Generate 0 or 1
        id: generate_number
        run:  echo "::set-output name=random_number::$(($RANDOM % 2))"
      - name: Pass or fail
        run: |
          if [[ ${{ steps.generate_number.outputs.random_number }} == 0 ]]; then exit 0; else exit 1; fi
```
{% endraw %}

## Contexto do `executor`

O contexto do `executor` contém informações sobre o executor que está executando o trabalho atual.

| Nome da propriedade | Tipo     | Descrição                                                                                                                                                       |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runner`            | `objeto` | Esse contexto altera cada trabalho em uma execução de fluxo de trabalho. Este objeto contém todas as propriedades listadas abaixo.                              |
| `runner.name`       | `string` | {% data reusables.actions.runner-name-description %}
| `runner.os`         | `string` | {% data reusables.actions.runner-os-description %} |{% if actions-runner-arch-envvars %}
| `runner.arch`       | `string` | {% data reusables.actions.runner-arch-description %} 
{% endif %}
| `runner.temp`       | `string` | {% data reusables.actions.runner-temp-directory-description %}
| `runner.tool_cache` | `string` | {% ifversion ghae %}{% data reusables.actions.self-hosted-runners-software %} {% else %} {% data reusables.actions.runner-tool-cache-description %} {% endif %}
{%- comment %}
A propriedade `runner.workspace` não é documentada propositalmente. É uma propriedade antecipada das ações que agora não é relevante para os usuários, em comparação com `github.workspace`. É mantido por uma questão de compatibilidade. | `runner.workspace` | `string` | |
{%- endcomment %}

### Exemplo de conteúdo do contexto do `executor`

O contexto de exemplo a seguir é de um executor do Linux hospedado em {% data variables.product.prodname_dotcom %}.

```yaml
{
  "os": "Linux",
  "arch": "X64",
  "name": "GitHub Actions 2",
  "tool_cache": "/opt/hostedtoolcache",
  "temp": "/home/runner/work/_temp"
  {%- comment %}
  # The `runner.workspace` property is purposefully not documented. É uma propriedade antecipada das ações que agora não é relevante para os usuários, em comparação com `github.workspace`. É mantido por uma questão de compatibilidade.
  "workspace": "/home/runner/work/hello-world"
  {%- endcomment %}
}
```

### Exemplo de uso do contexto do contexto do `executor`

Este exemplo de fluxo de trabalho usa o contexto `executor` para definir o caminho para o diretório temporário e gravar registros e se, o fluxo de trabalho falhar, ele irá fazer o uplad dos registros como artefatos.

{% raw %}
```yaml{:copy}
name: Build
on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build with logs
        run: |
          mkdir ${{ runner.temp }}/build_logs
          ./build.sh --log-path ${{ runner.temp }}/build_logs
      - name: Upload logs on fail
        if: ${{ failure() }}
        uses: actions/upload-artifact@v2
        with:
          name: Build failure logs
          path: ${{ runner.temp }}/build_logs
```
{% endraw %}

## contexto `segredos`

O contexto `segredos` contém os nomes e valores de segredos disponíveis para a execução de um fluxo de trabalho. O contexto `segredos` não está disponível para ações compostas. Para obter mais informações sobre segredos, consulte "[Segredos criptografados](/actions/security-guides/encrypted-secrets)".

`GITHUB_TOKEN` é um segredo que é criado automaticamente para cada execução de fluxo de trabalho, e é sempre incluído no contexto `segredos`. Para obter mais informações, consulte "[Autenticação automática de tokens](/actions/security-guides/automatic-token-authentication)".

{% data reusables.github-actions.secrets-redaction-warning %}

| Nome da propriedade           | Tipo     | Descrição                                                                                                                                                                                                    |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `secrets`                     | `objeto` | Esse contexto é o mesmo para cada trabalho em uma execução do fluxo de trabalho. Você pode acessar esse contexto em qualquer etapa de um trabalho. Este objeto contém todas as propriedades listadas abaixo. |
| `secrets.GITHUB_TOKEN`        | `string` | Token criado automaticamente para cada execução do fluxo de trabalho. Para obter mais informações, consulte "[Autenticação automática de tokens](/actions/security-guides/automatic-token-authentication)".  |
| `secrets.<secret_name>` | `string` | O valor de um segredo específico.                                                                                                                                                                            |

### Exemplo de conteúdo do contexto `segredo`

O conteúdo de exemplo do contexto dos `segredos` mostra o `GITHUB_TOKEN` automático, assim como outros dois segredos disponíveis para a execução do fluxo de trabalho.

```yaml
{
  "github_token": "***",
  "NPM_TOKEN": "***",
  "SUPERSECRET": "***"
}
```

### Exemplo de uso do contexto dos `segredos`

{% data reusables.github-actions.github_token-input-example %}

## Contexto `estratégia`

Para fluxos de trabalho com uma matriz de compilação, o contexto `estratégia` contém informações sobre a estratégia de execução da matriz para o trabalho atual.

| Nome da propriedade     | Tipo     | Descrição                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strategy`              | `objeto` | Esse contexto altera cada trabalho em uma execução de fluxo de trabalho. Você pode acessar este contexto a partir de qualquer trabalho ou etapa em um fluxo de trabalho. Este objeto contém todas as propriedades listadas abaixo.                                                                                                                      |
| `strategy.fail-fast`    | `string` | Quando `verdadeiro`, todos os trabalhos em andamento são cancelados se qualquer trabalho em uma matriz de compilação falhar. Para obter mais informações, consulte "[Sintaxe de fluxo de trabalho para o {% data variables.product.prodname_actions %}](/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategyfail-fast)". |
| `strategy.job-index`    | `string` | O índice do trabalho atual na matriz de compilação. **Observação:** Este número é um número baseado em zero. O primeiro índice do trabalho na matriz de compilação é `0`.                                                                                                                                                                               |
| `strategy.job-total`    | `string` | O número total de trabalhos na matriz de construção. **Observação:** Este número **não é** um número baseado em zero. Por exemplo, para uma matriz de construção com quatro trabalhos, o valor de `job-total de` é `4`.                                                                                                                                 |
| `strategy.max-parallel` | `string` | Número máximo de trabalhos que podem ser executados simultaneamente ao usar uma estratégia de trabalho de `matrix`. Para obter mais informações, consulte "[Sintaxe de fluxo de trabalho para o {% data variables.product.prodname_actions %}](/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategymax-parallel)".       |

### Exemplo de conteúdo do contexto `estratégia`

O conteúdo de exemplo a seguir do contexto `estratégia` é de uma matriz de construção com quatro trabalhos, e é tirada do trabalho final. Observe a diferença entre o número de `job-index` baseado em zero e o total de `job-job` que não é baseado em zero.

```yaml
{
  "fail-fast": true,
  "job-index": 3,
  "job-total": 4,
  "max-parallel": 4
}
```

### Exemplo de uso do contexto `estratégia`

Esse exemplo de fluxo de trabalho usa a propriedade `strategy.job-index` para definir um nome exclusivo para um arquivo de registro para cada trabalho em uma matriz de criação.

{% raw %}
```yaml{:copy}
name: Test matrix
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        test-group: [1, 2]
        node: [14, 16]
    steps:
      - uses: actions/checkout@v2
      - run: npm test > test-job-${{ strategy.job-index }}.txt
      - name: Upload logs
        uses: actions/upload-artifact@v2
        with:
          name: Build log for job ${{ strategy.job-index }}
          path: test-job-${{ strategy.job-index }}.txt
```
{% endraw %}

## Contexto `matriz`

Para fluxos de trabalho com uma matriz de construção, o contexto `matriz` contém as propriedades definidas no arquivo do fluxo de trabalho que se aplicam ao trabalho atual. Por exemplo, se você configurar uma matriz de construção com as chaves `os` e `nó`, o objeto do contexto `matriz` irá incluir as propriedades `os` e `nó` com os valores usados para o trabalho atual.

Não há propriedades padrão no contexto `matriz`, apenas as que são definidas no arquivo do fluxo de trabalho.

| Nome da propriedade            | Tipo     | Descrição                                                                                                                                                                                                                                                                                            |
| ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `matrix`                       | `objeto` | Esse contexto só está disponível para trabalhos em uma matriz de compilação e alterações para cada trabalho na execução de um fluxo de trabalho. Você pode acessar este contexto a partir de qualquer trabalho ou etapa em um fluxo de trabalho. Este objeto contém as propriedades listadas abaixo. |
| `matrix.<property_name>` | `string` | O valor da propriedade de uma matriz.                                                                                                                                                                                                                                                                |

### Exemplo de conteúdo do contexto `matriz`

O exemplo a seguir do contexto `matriz` é de um trabalho em uma matriz de construção que tem as propriedades de matriz `os` e `nó` definidas no fluxo de trabalho. O trabalho está executando a combinação matriz de um `ubuntu-latest` OS e do Node.js versão `16`.

```yaml
{
  "os": "ubuntu-latest",
  "node": 16
}
```

### Exemplo de uso do contexto `matriz`

Este exemplo de fluxo de trabalho cria uma matriz de compilação com as chaves `os` e `nós`. Ele usa a propriedade `matriz.os` para definir o tipo de executor para cada trabalho e usa a propriedade `matrix.node` para definir a versão do Node.js para cada trabalho.

{% raw %}
```yaml{:copy}
name: Test matrix
on: push

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [14, 16]
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node }}
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```
{% endraw %}

## Contexto `needs`

O contexto `needs` contém saídas de todos os trabalhos definidos como uma dependência do trabalho atual. Para obter mais informações sobre a definição de dependências de trabalho, consulte "[Sintaxe de fluxo de trabalho para {% data variables.product.prodname_actions %}](/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idneeds)".

| Nome da propriedade                                | Tipo     | Descrição                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `needs`                                            | `objeto` | Esse contexto só é preenchido para execuções de fluxo de trabalho com funções dependentes e as alterações para cada trabalho em uma execução de fluxo de trabalho. Você pode acessar este contexto a partir de qualquer trabalho ou etapa em um fluxo de trabalho. Este objeto contém todas as propriedades listadas abaixo. |
| `needs.<job_id>`                             | `objeto` | Um único trabalho do qual o trabalho atual depende.                                                                                                                                                                                                                                                                          |
| `needs.<job_id>.outputs`                     | `objeto` | O conjunto de saídas de um trabalho do qual o trabalho atual depende.                                                                                                                                                                                                                                                        |
| `needs.<job_id>.outputs.<output name>` | `string` | O valor de uma saída específica para um trabalho do qual o trabalho atual depende.                                                                                                                                                                                                                                           |
| `needs.<job_id>.result`                      | `string` | O resultado de um trabalho do qual depende o trabalho atual. Os valores possíveis são: `sucesso`, `falha`, `cancelado`ou `ignorado`.                                                                                                                                                                                         |

### Exemplo de conteúdo do contexto `needs`

O conteúdo de exemplo a seguir do contexto `needs` mostra informações para dois trabalhos dos quais o trabalho atual depende.

```yaml
{
  "build": {
    "result": "success",
    "outputs": {
      "build_id": "ABC123"
    }
  },
  "deploy": {
    "result": "failure",
    "outputs": {}
  }
}
```

### Exemplo de uso do contexto `needs`

This example workflow has three jobs: a `build` job that does a build, a `deploy` job that requires the `build` job, and a `debug` job that requires both the `build` and `deploy` jobs and runs only if there is a failure in the workflow. The `deploy` job also uses the `needs` context to access an output from the `build` job.

{% raw %}
```yaml{:copy}
name: Build and deploy
on: push

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      build_id: ${{ steps.build_step.outputs.build_id }}
    steps:
      - uses: actions/checkout@v2
      - name: Build
        id: build_step
        run: |
          ./build
          echo "::set-output name=build_id::$BUILD_ID" 
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: ./deploy --build ${{ needs.build.outputs.build_id }}
  debug:
    needs: [build, deploy]
    runs-on: ubuntu-latest
    if: ${{ failure() }}
    steps:
      - uses: actions/checkout@v2
      - run: ./debug
```
{% endraw %}

{% ifversion fpt or ghec or ghes > 3.3 or ghae-issue-4757 %}
## Contexto `entradas`

O contexto `entrada` contém propriedades de entrada passada para um fluxo de trabalho reutilizável. The input names and types are defined in the [`workflow_call` event configuration](/actions/learn-github-actions/events-that-trigger-workflows#workflow-reuse-events) of a reusable workflow, and the input values are passed from [`jobs.<job_id>.with`](/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idwith) in an external workflow that calls the reusable workflow.

Não há propriedades padrão no contexto `entradas`, apenas aquelas definidas no arquivo de fluxo de trabalho reutilizável.

Para obter mais informações, consulte "[Reutilizando fluxos de trabalho](/actions/learn-github-actions/reusing-workflows)".

| Nome da propriedade   | Tipo                               | Descrição                                                                                                                                                                                                                                                                     |
| --------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputs`              | `objeto`                           | Este contexto só está disponível em um [fluxo de trabalho reutilizável](/actions/learn-github-actions/reusing-workflows). Você pode acessar este contexto a partir de qualquer trabalho ou etapa em um fluxo de trabalho. Este objeto contém as propriedades listadas abaixo. |
| `inputs.<name>` | `string` ou `número` ou `booleano` | Cada valor de entrada é passado de um fluxo de trabalho externo.                                                                                                                                                                                                              |

### Exemplo de conteúdo do contexto `entradas`

O conteúdo de exemplo das `entradas` contexto é de um trabalho em um fluxo de trabalho reutilizável que definiu as entradas de entrada do arquivo `build_id` e `deploy_target`.

```yaml
{
  "build_id": 123456768,
  "deploy_target": "deployment_sys_1a"
}
```

### Exemplo de uso do contexto `entradas`

This example reusable workflow uses the `inputs` context to get the values of the `build_id` and `deploy_target` inputs that were passed to the reusable workflow from the caller workflow.

{% raw %}
```yaml{:copy}
name: Reusable deploy workflow
on:
  workflow_call:
    inputs:
      build_id:
        required: true
        type: number
      deploy_target:
        required: true
        type: string

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy build to target
        run: deploy --build ${{ inputs.build_id }} --target ${{ inputs.deploy_target }}
```
{% endraw %}
{% endif %}
