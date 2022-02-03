---
title: Dependabot
intro: 'Com a API de segredos do {% data variables.product.prodname_dependabot %}, você pode gerenciar e controlar segredos de {% data variables.product.prodname_dependabot %} para uma organização ou repositório.'
versions:
  fpt: '*'
  ghes: '>=3.4'
  ghec: '*'
topics:
  - API
miniTocMaxHeadingLevel: 3
---

A API de segredos {% data variables.product.prodname_dependabot %} permite criar, atualizar, excluir e recuperar informações sobre segredos criptografados. {% data reusables.actions.about-secrets %} Para obter mais informações, consulte "[Gerenciar segredos criptografados para o dependabot](/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/managing-encrypted-secrets-for-dependabot)."

{% data reusables.actions.actions-authentication %} {% data variables.product.prodname_github_apps %} deve ter a permissão `dependabot_secrets` para usar esta API. Os usuários autenticados devem ter acesso de colaborador em um repositório para criar, atualizar ou ler segredos.

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'secrets' %}{% include rest_operation %}{% endif %}
{% endfor %}
