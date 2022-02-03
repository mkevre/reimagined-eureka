---
title: Sobre a visão geral de segurança
intro: 'Você pode visualizar, filtrar e classificar alertas de segurança para repositórios pertencentes à sua organização ou equipe em um só lugar: a página de Visão Geral de Segurança.'
permissions: Organization owners and security managers can access the security overview for organizations. Members of a team can see the security overview for repositories that the team has admin privileges for.
product: '{% data reusables.gated-features.security-center %}'
redirect_from:
  - /code-security/security-overview/exploring-security-alerts
versions:
  fpt: '*'
  ghae: issue-4554
  ghes: '>3.1'
  ghec: '*'
type: how_to
topics:
  - Security overview
  - Advanced Security
  - Alerts
  - Dependabot
  - Dependencies
  - Organizations
  - Teams
shortTitle: Sobre a visão geral de segurança
---

{% data reusables.security-center.beta %}

## Sobre a visão geral de segurança

Você pode usar a visão geral de segurança para uma visão de alto nível do status de segurança da sua organização ou para identificar repositórios problemáticos que exigem intervenção.

- A nível da organização, a visão geral de segurança exibe informações de segurança agregadas e específicas para repositórios pertencentes à sua organização. You can also filter information per security feature.
- No nível da equipe, a visão geral de segurança exibe informações de segurança específicas para repositórios para os quais a equipe tem privilégios de administrador. Para obter mais informações, consulte "[Gerenciando o acesso da equipe ao repositório de uma organização](/organizations/managing-access-to-your-organizations-repositories/managing-team-access-to-an-organization-repository)".
- No nível do repositório, a visão geral de segurança mostra quais recursos de segurança são habilitados para o repositório e oferece a opção de configurar todos os recursos de segurança disponíveis que não estejam em uso atualmente.

A visão geral de segurança indica se {% ifversion fpt or ghes > 3.1 or ghec %}os recursos de segurança{% endif %}{% ifversion ghae %}{% data variables.product.prodname_GH_advanced_security %}{% endif %} estão habilitados para os repositórios pertencentes à sua organização e consolida os alertas para cada recurso.{% ifversion fpt or ghes > 3.1 or ghec %} As funcionalidades de segurança incluem funcionalidaes de {% data variables.product.prodname_GH_advanced_security %} como, por exemplo, {% data variables.product.prodname_code_scanning %} e {% data variables.product.prodname_secret_scanning %}, bem como {% data variables.product.prodname_dependabot_alerts %}.{% endif %} Para obter mais informações sobre as funcionalidades de {% data variables.product.prodname_GH_advanced_security %} conuslte "[Sobre {% data variables.product.prodname_GH_advanced_security %}](/get-started/learning-about-github/about-github-advanced-security)."{% ifversion fpt or ghes > 3.1 or ghec %} Para obter mais informações sobre {% data variables.product.prodname_dependabot_alerts %}, consulte "[Sobre alertas para dependências de vulnerabilidade](/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/about-alerts-for-vulnerable-dependencies#dependabot-alerts-for-vulnerable-dependencies)."{% endif %}

Para obter mais informações sobre como proteger seu código nos níveis do repositório e da organização, consulte "[Protegendo seu repositório](/code-security/getting-started/securing-your-repository)" e "[Protegendo sua organização](/code-security/getting-started/securing-your-organization)".

A equipe de segurança de aplicativos da sua empresa pode usar a visão geral de segurança para análises amplas e específicas do status de segurança da sua organização. Por exemplo, eles podem utilizar a página da visão geral de síntese para monitorar a adoção de funcionalidades pela sua organização ou por uma equipe específica enquanto você implementa{% data variables.product.prodname_GH_advanced_security %} na sua empresa ou revisar todos os alertas de um tipo e gravidade específicos em todos os repositórios da sua organização.

### Sobre filtragem e ordenação de alertas

No resumo da segurança, é possível visualizar, ordenar e filtrar alertas para entender os riscos de segurança na sua organização e nos repositórios específicos. O resumo de segurança é altamente interativo e permite que você investigue categorias específicas de informações, baseado em qualificações, como nível de risco de alerta, tipo de alerta e habilitação de funcionamento. Você também pode aplicar vários filtros para focar em áreas de interesse mais estreitas. Por exemplo, você pode identificar repositórios privados que têm um número elevado de {% data variables.product.prodname_dependabot_alerts %} ou repositórios que não têm alertas {% data variables.product.prodname_code_scanning %}. Para obter mais informações, consulte "[Filtrando alertas na visão geral de segurança](/code-security/security-overview/filtering-alerts-in-the-security-overview)".

{% if security-overview-views %}

Na visão geral de segurança, tanto ao nível da organização como ao nível do repositório. existem visualizações dedicadas a recursos de segurança específicos, como alertas de digitalização de segredos e alertas de digitalização de código. Você pode usar essas visualizações para limitar sua análise para um conjunto específico de alertas e estreitar os resultados com uma variedade de filtros específicos para cada visualização. Por exemplo, na vista de alerta de digitalização de segredo, você pode usar o filtro do tipo `secredo` para visualizar somente alertas de digitalização de segredo para um segredo específico, como um Token de Acesso Pessoal do GitHub. No nível do repositório, é possível usar a visão geral de segurança para avaliar o status de segurança atual do repositório específico e configurar todos as funcionalidades adicionais de segurança que ainda não estão sendo usadas no repositório.

{% endif %}

![A visão geral de segurança de uma organização](/assets/images/help/organizations/security-overview.png)

Para cada repositório na visão de segurança, você verá ícones para cada tipo de recurso de segurança e quantos alertas existem de cada tipo. Se um recurso de segurança não estiver habilitado para um repositório, o ícone para esse recurso será cinza.

![Ícones na visão geral de segurança](/assets/images/help/organizations/security-overview-icons.png)

| Ícone                                                         | Significado                                                                                                                                                                                                                           |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| {% octicon "code-square" aria-label="Code scanning alerts" %} | Alertas de {% data variables.product.prodname_code_scanning_capc %}. Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_code_scanning %}](/code-security/secure-coding/about-code-scanning)         |
| {% octicon "key" aria-label="Secret scanning alerts" %}       | Alertas de {% data variables.product.prodname_secret_scanning_caps %}. Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_secret_scanning %}](/code-security/secret-security/about-secret-scanning) |
| {% octicon "hubot" aria-label="Dependabot alerts" %}          | {% data variables.product.prodname_dependabot_alerts %}. Para obter mais informações, consulte "[Sobre alertas para dependências vulneráveis](/code-security/supply-chain-security/about-alerts-for-vulnerable-dependencies)"       |
| {% octicon "check" aria-label="Check" %}                      | O recurso de segurança está habilitado, mas não envia alertas neste repositório.                                                                                                                                                      |
| {% octicon "x" aria-label="x" %}                              | O recurso de segurança não é compatível com este repositório.                                                                                                                                                                         |

Por padrão, os repositórios arquivados são excluídos da visão geral de segurança de uma organização. É possível aplicar filtros para visualizar repositórios arquivados na visão geral de segurança. Para obter mais informações, consulte "[Filtrando alertas na visão geral de segurança](/code-security/security-overview/filtering-alerts-in-the-security-overview)".

A visão geral de segurança exibe alertas ativos criados por funcionalidades de segurança. Se não houver alertas na visão geral de segurança de um repositório, as vulnerabilidades de segurança não detectadas ou erros de código ainda poderão existir.
