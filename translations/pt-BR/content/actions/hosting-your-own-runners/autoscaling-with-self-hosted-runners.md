---
title: Redimensionamento automático com executores auto-hospedados
intro: Você pode dimensionar automaticamente seus executores auto-hospedados em resposta a eventos de webhooks.
versions:
  fpt: '*'
  ghec: '*'
  ghes: '>3.2'
type: overview
---

{% data reusables.actions.ae-self-hosted-runners-notice %}
{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## Sobre o dimensionamento automático

Você pode aumentar ou diminuir automaticamente o número de executores auto-hospedados no seu ambiente em resposta aos eventos do webhook que você recebe com uma determinada etiqueta. Por exemplo, você pode criar uma automação que adiciona um novo executor auto-hospedado cada vez que você receber um evento de webhook [`workflow_job`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_job) com a atividade [`queued`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_job), que notifica você de que um novo trabalho está pronto para processamento. A carga do webhook inclui dados da etiqueta. Portanto, você pode identificar o tipo de executor que a tarefa está solicitando. Uma vez terminado o trabalho, você pode criar uma automação que remove o executor em resposta à atividade de `workflow_job` [`concluída`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_job).

## Soluções de dimensionamento automático recomendadas

{% data variables.product.prodname_dotcom %} recomenda e faz parcerias estreitas com dois projetos de código aberto que você pode usar para dimensionar automaticamente os seus executores. Uma ou ambas as soluções podem ser adequadas, com base nas suas necessidades.

Os repositórios a seguir possuem instruções detalhadas para configurar esses dimensionadores automáticos:

- [actions-runner-controller/actions-runner-controller](https://github.com/actions-runner-controller/actions-runner-controller) - Um controlador do Kubernetes para executores auto-hospedados de {% data variables.product.prodname_actions %}.
- [philips-labs/terraform-aws-github-runner](https://github.com/philips-labs/terraform-aws-github-runner) - Um módulo do Terraform para executores de {% data variables.product.prodname_actions %} dimensionáveis no Amazon Web Services.

Cada solução tem certas especificações que podem ser importantes para considerar:

| **Funcionalidades**                                          | **actions-runner-controller**                                                                 | **terraform-aws-github-runner**                                                      |
|:------------------------------------------------------------ |:--------------------------------------------------------------------------------------------- |:------------------------------------------------------------------------------------ |
| Tempo de execução                                            | Kubernetes                                                                                    | VMs do Linux e do Windows                                                            |
| Nuvens compatíveis                                           | Azure, Amazon Web Services, Google Cloud Platform, nos locais                                 | Amazon Web Services                                                                  |
| Onde os executores podem ser dimensionados                   | Níveis de empresa, organização e repositório. Por etiqueta do executor e grupo de executores. | Níveis de organização e repositório. Por etiqueta do executor e grupo de executores. |
| Suporte a dimensionamento automático baseado baseado no pull | Sim                                                                                           | Não                                                                                  |

## Usaar executores efêmeros para dimensionamento automático

{% data variables.product.prodname_dotcom %} recomenda implementar o dimensionamento automático com executores auto-hospedados efêmeros. Nãose recomenda o dimensionamento automático com executores auto-hospedados persistentes. Em certos casos, {% data variables.product.prodname_dotcom %} não pode garantir que os trabalhos não sejam atribuídos a executores persistentes enquanto eles são desativados. Com executores efêmeros, é possível garantir iss, porque {% data variables.product.prodname_dotcom %} só atribui um trabalho a um executor.

Esta abordagem permite que você gerencie os seus executores como sistemas efêmeros, já que você pode usar automação para fornecer um ambiente limpo para cada trabalho. Isso ajuda a limitar a exposição de quaisquer recursos sensíveis de trabalhos anteriores e também ajuda a mitigar o risco de um executor comprometido receber novos trabalhos.

Para adicionar um executor efêmero ao seu ambiente, inclua o parâmetro `--ephemeral` ao registrar seu executor usando `config.sh`. Por exemplo:

```
$ ./config.sh --url https://github.com/octo-org --token example-token --ephemeral
```

O serviço {% data variables.product.prodname_actions %} irá cancelar o resgistro do runner automaticamente depois de ter processado um trabalho. Em seguida, você poderá criar a sua própria automação que limpa o runner depois que ele tiver seu registro cancelado.

{% note %}

**Observação:** Se um trabalho estiver etiquetado para um certo tipo de executor, mas nenhuma correspondência desse tipo estiver disponível, o trabalho não irá falhar imediatamente no momento da entrada na fila. Em vez disso, o trabalho permanecerá na fila até que o período de tempo limite de 24 horas expire.

{% endnote %}

## Usando webhooks para dimensionamento automático

Você pode criar seu próprio ambiente de dimensionamento automático usando cargas recebidas do webhook [`workflow_job`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_job). Este webhook está disponível no repositório, organização e níveis corporativos e a carga deste evento contém uma chave de `ação` que corresponde aos estágios do ciclo de vida do trabalho de um fluxo de trabalho. Por exemplo, quando as tarefas estão `queued`, `in_progress` e `completed`. Você deverá criar a sua própria automação de dimensionamento em resposta a estas cargas de webhook.

- Para obter mais informações sobre o webhook do `workflow_job`, consulte "[Eventos e cargas do webhook](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_job)".
- Para aprender como trabalhar com webhooks, consulte "[Criando webhooks](/developers/webhooks-and-events/webhooks/creating-webhooks)".

## Requisitos de autenticação

Você pode registrar e excluir executores auto-hospedados do repositório e organização usando [a API](/rest/reference/actions#self-hosted-runners). Para efetuar a autenticação na API, a implementação do seu dimensionamento automático pode usar um token de acesso ou um aplicativo de {% data variables.product.prodname_dotcom %}.

Seu token de acesso exigirá o seguinte escopo:

- Para repositórios privados, use um token de acesso com o escopo [`repo`](/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes).
- Para repositórios públicos, use um token de acesso com o escopo [`public_repo`](/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes).

Para efetuar a autenticação usando um aplicativo de {% data variables.product.prodname_dotcom %}, este deverá ter as seguintes permissões:
- Para repositórios, atribua a permissão de `administração`.
- Para organizações, atribua a permissão `organization_self_hosted_runners`.

Você pode registrar e excluir executores auto-hospedados da empresa usando [a API](/rest/reference/enterprise-admin#github-actions). Para efetuar a autenticação na API, sua implementação de dimensionamento automático pode usar um token de acesso.

Seu token de acesso irá exigir o escopo `manage_runners:enterprise`.
