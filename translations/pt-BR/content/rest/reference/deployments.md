---
title: Implantações
intro: 'A API de implantação permite que você crie e exclua chaves de implantação, implantações e ambientes de implantação.'
allowTitleToDifferFromFilename: true
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - API
miniTocMaxHeadingLevel: 3
---

As implantações são solicitações para implantar um ref específico (branch, SHA, tag). O GitHub envia um [ evento de `implantação`](/developers/webhooks-and-events/webhook-events-and-payloads#deployment) pelo qual os serviços externos podem ouvir e atuar quando novas implantações são criadas. As implantações permitem que os desenvolvedores e as organizações construam ferramentas associadas em torno de implantações sem ter que se preocupar com os detalhes de implementação da entrega de diferentes tipos de aplicativos (p. ex., web, nativo).

Os status de implantação externos permitem marcar implantações com `error`, `failure`, `pending`, `in_progress`, `queued` ou `success` afirmar que os sistemas que estão escutando os eventos [`deployment_status`](/developers/webhooks-and-events/webhook-events-and-payloads#deployment_status) podem consumir.

Os status de implantação também podem incluir uma `descrição` opcional e `log_url`, que são altamente recomendados porque tornam o status de implantação mais útil. O `log_url` é a URL completa para a saída de implantação e a `descrição` é um resumo de alto nível do que aconteceu com a implantação.

O GitHub envia os eventos de `implantação` e `deployment_status` quando novas implantações de status de implantação são criadas. Esses eventos permitem que as integrações de terceiros recebam resposta para solicitações de implantação e atualizem o status de implantação conforme o progresso é feito.

Abaixo está um diagrama de sequência sobre para como essas interações funcionariam.

```
+---------+             +--------+            +-----------+        +-------------+
| Tooling |             | GitHub |            | 3rd Party |        | Your Server |
+---------+             +--------+            +-----------+        +-------------+
     |                      |                       |                     |
     |  Create Deployment   |                       |                     |
     |--------------------->|                       |                     |
     |                      |                       |                     |
     |  Deployment Created  |                       |                     |
     |<---------------------|                       |                     |
     |                      |                       |                     |
     |                      |   Deployment Event    |                     |
     |                      |---------------------->|                     |
     |                      |                       |     SSH+Deploys     |
     |                      |                       |-------------------->|
     |                      |                       |                     |
     |                      |   Deployment Status   |                     |
     |                      |<----------------------|                     |
     |                      |                       |                     |
     |                      |                       |   Deploy Completed  |
     |                      |                       |<--------------------|
     |                      |                       |                     |
     |                      |   Deployment Status   |                     |
     |                      |<----------------------|                     |
     |                      |                       |                     |
```

Tenha em mente que o GitHub nunca terá acesso aos seus servidores. Cabe à sua integração de terceiros interagir com os eventos de implantação. Vários sistemas podem ouvir eventos de implantação, e cabe a cada um desses sistemas decidir se serão responsáveis por retirar o código dos seus servidores, criar código nativo, etc.

Observe que o `repo_deployment` [OAuth escopo](/developers/apps/scopes-for-oauth-apps) concede acesso direcionado a implantações e status **sem** conceder acesso ao código do repositório, enquanto os es escopos {% ifversion not ghae %}`public_repo` e{% endif %}`repositório` também concedem permissão para codificar.

### Implantações inativas

Ao definir o estado de uma implantação como `sucesso`, todas as implantações de ambiente de não produção e não transitórios anteriores no mesmo nome do ambiente irão tornar-se `inativas`. Para evitar isso, você pode definir `auto_inactive` como `falso` ao criar o status de implantação.

Você pode informar que um ambiente transitório não existe mais definindo seu `estado` como `inativo`.  Definir o `estado` como `inativo` mostra a implantação como `destruída` em {% data variables.product.prodname_dotcom %} e remove o acesso a ela.

{% for operation in currentRestOperations %}
  {% unless operation.subcategory %}{% include rest_operation %}{% endunless %}
{% endfor %}

## Status da implantação

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'statuses' %}{% include rest_operation %}{% endif %}
{% endfor %}

## Chaves de implantação

{% data reusables.repositories.deploy-keys %}

Chaves de implantação podem ser configuradas usando os seguintes pontos de extremidades da API ou usando o GitHub. Para saber como configurar as chaves de implantação no GitHub, consulte "[Gerenciar chaves de implantação](/developers/overview/managing-deploy-keys)".

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'keys' %}{% include rest_operation %}{% endif %}
{% endfor %}

{% ifversion fpt or ghes > 3.1 or ghae or ghec %}
## Ambientes

A API de Ambientes permite que você crie, configure e exclua ambientes. Para obter mais informações sobre ambientes, consulte "[Usando ambientes para implantação](/actions/deployment/using-environments-for-deployment)". Para gerenciar segredos de ambiente, consulte "[Segredos](/rest/reference/actions#secrets)".

{% data reusables.gated-features.environments %}

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'environments' %}{% include rest_operation %}{% endif %}
{% endfor %}
{% endif %}
