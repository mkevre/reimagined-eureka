---
title: Colaboradores
intro: 'A API dos colaboradores permite que você adicione, convide e remova os colaboradores de um repositório.'
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

{% for operation in currentRestOperations %}
  {% unless operation.subcategory %}{% include rest_operation %}{% endunless %}
{% endfor %}

## Convites

A API de Convites do Repositório permite que usuários ou serviços externos convidem outros usuários para colaborar em um repositório. Os usuários convidados (ou serviços externos em nome dos usuários convidados) podem optar por aceitar ou recusar os convites.

Observe que o [Escopo OAuth](/developers/apps/scopes-for-oauth-apps) `repo:invite` concede acesso direcionado aos convites **sem** conceder também acesso ao código do repositório. enquanto o escopo `repo` concede permissão ao código e aos convites convites.

### Convidar um usuário para um repositório

Use o ponto de extremidade da API para adicionar um colaborador. Para obter mais informações, consulte "[Adicionar um colaborador de repositório](/rest/reference/collaborators#add-a-repository-collaborator)".

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'invitations' %}{% include rest_operation %}{% endif %}
{% endfor %}
