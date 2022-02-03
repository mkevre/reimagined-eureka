---
title: Protegendo a sua organização
intro: 'Você pode usar uma série de funcionalidades de {% data variables.product.prodname_dotcom %} para ajudar a manter a sua organização protegida.'
permissions: Organization owners can configure organization security settings.
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: how_to
topics:
  - Organizations
  - Dependencies
  - Vulnerabilities
  - Advanced Security
shortTitle: Proteger a sua organização
---

## Introdução
Este guia mostra como configurar os recursos de segurança de uma organização. As necessidades de segurança da sua organização são únicas e pode ser que você não precise habilitar todas as funcionalidades de segurança. Para obter mais informações, consulte "[Funcionalidades de segurança de {% data variables.product.prodname_dotcom %}](/code-security/getting-started/github-security-features)".

{% data reusables.advanced-security.security-feature-availability %}

## Gerenciando o acesso à sua organização

Você pode usar as funções para controlar as ações que as pessoas podem tomar na sua organização. {% if security-managers %}Por exemplo, você pode atribuir o papel de gerente de segurança a uma equipe para que possam gerenciar configurações de segurança em toda a sua organização, assim como acesso de leitura a todos os repositórios.{% endif %} Para obter mais informações, consulte "[Funçõesem uma organização](/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization)".

{% ifversion fpt or ghes > 3.0 or ghec %}

## Criando uma política de segurança padrão

Você pode criar uma política de segurança padrão que será exibida em qualquer repositório público da organização que não tenha sua própria política de segurança. Para obter mais informações, consulte "[Criando um arquivo padrão de integridade da comunidade](/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)."

{% endif %}

{% ifversion fpt or ghes > 2.22 or ghae-issue-4864 or ghec %}
## Gerenciar {% data variables.product.prodname_dependabot_alerts %} e o gráfico de dependências

{% ifversion fpt or ghec %}Por padrão, {% data variables.product.prodname_dotcom %} detecta vulnerabilidades nos repositórios públicos, gera {% data variables.product.prodname_dependabot_alerts %} e um gráfico de dependência. Você pode habilitar ou desabilitar {% data variables.product.prodname_dependabot_alerts %} e o gráfico de dependência de todos os repositórios privados da sua organização.

1. Clique na sua foto de perfil e clique em **Organizações**.
2. Clique em **Configurações** ao lado da sua organização.
3. Clique em **Segurança & análise**.
4. Clique em **Habilitar todos** ou **Desabilitar todos** ao lado do recurso que você deseja gerenciar.
5. Opcionalmente, selecione **Habilitar automaticamente para novos repositórios**.
{% endif %}

{% data reusables.dependabot.dependabot-alerts-beta %}
{% data reusables.dependabot.dependabot-alerts-dependency-graph-enterprise %}

Para obter mais informações, consulte "[Sobre alertas para dependências vulneráveis](/code-security/supply-chain-security/about-alerts-for-vulnerable-dependencies)," "[Explorar as dependências de um repositório](/code-security/supply-chain-security/exploring-the-dependencies-of-a-repository#enabling-and-disabling-the-dependency-graph-for-a-private-repository) e "[Gerenciar configurações de segurança e análise para sua organização](/organizations/keeping-your-organization-secure/managing-security-and-analysis-settings-for-your-organization)".
{% endif %}

{% ifversion fpt or ghes > 3.1 or ghae-issue-4864 or ghec %}

## Gerenciando revisão de dependências

A revisão de dependências é um recurso de {% data variables.product.prodname_advanced_security %} que permite visualizar alterações de dependência em pull requests antes de serem mesclados nos seus repositórios. Para obter mais informações, consulte "[Sobre a revisão de dependências](/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review)".

{% ifversion fpt or ghec %}A revisão de Dependência já está habilitada para todos os repositórios públicos. {% ifversion fpt %}As organizações que usam {% data variables.product.prodname_ghe_cloud %} com {% data variables.product.prodname_advanced_security %} podem habilitar a revisão de dependências adicionalmente para repositórios privados e internos. Para obter mais informações, consulte a [documentação de {% data variables.product.prodname_ghe_cloud %}](/enterprise-cloud@latest/code-security/getting-started/securing-your-organization#managing-dependency-review). {% endif %}{% endif %}{% ifversion ghec %}Para repositórios privados e internos pertencentes a uma organização, você pode habilitar a revisão de dependência, habilitando o gráfico de dependências e habilitando {% data variables.product.prodname_advanced_security %} (veja abaixo).
{% elsif ghes or ghae %}A revisão de dependência está disponível quando o gráfico de dependências estiver habilitado para {% data variables.product.product_location %} e você habilitar {% data variables.product.prodname_advanced_security %} para a organização (veja abaixo).{% endif %}

{% endif %}

{% ifversion fpt or ghec or ghes > 3.2 %}
## Gerenciar {% data variables.product.prodname_dependabot_security_updates %}

Para qualquer repositório que usar {% data variables.product.prodname_dependabot_alerts %}, você pode habilitar {% data variables.product.prodname_dependabot_security_updates %} para abrir pull requests com atualizações de segurança quando forem detectadas vulnerabilidades. Você também pode habilitar ou desabilitar {% data variables.product.prodname_dependabot_security_updates %} para todos os repositórios da sua organização.

1. Clique na sua foto de perfil e clique em **Organizações**.
2. Clique em **Configurações** ao lado da sua organização.
3. Clique em **Segurança & análise**.
4. Clique em **Habilitar todos** ou **Desabilitar todos** ao lado de {% data variables.product.prodname_dependabot_security_updates %}.
5. Opcionalmente, selecione **Habilitar automaticamente para novos repositórios**.

Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_dependabot_security_updates %}](/code-security/supply-chain-security/about-dependabot-security-updates)" e "[Gerenciar configurações de segurança e análise para a sua organização](/organizations/keeping-your-organization-secure/managing-security-and-analysis-settings-for-your-organization)".

## Gerenciar {% data variables.product.prodname_dependabot_version_updates %}

Você pode habilitar {% data variables.product.prodname_dependabot %} para aumentar automaticamente os pull requests para manter suas dependências atualizadas. Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_dependabot_version_updates %}](/code-security/supply-chain-security/about-dependabot-version-updates)".

Para habilitar {% data variables.product.prodname_dependabot_version_updates %}, você deve criar um arquivo de configuração *dependabot.yml*. Para obter mais informações, consulte "[Habilitando e desabilitando as atualizações da versão de {% data variables.product.prodname_dependabot %}](/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/enabling-and-disabling-dependabot-version-updates)".

{% endif %}

{% ifversion ghes > 2.22 or ghae or ghec %}
## Gerenciar {% data variables.product.prodname_GH_advanced_security %}

{% ifversion ghes > 2.22 or ghec %}
Se a sua organização {% ifversion ghec %}é propriedade de uma empresa essa{% else %}empresa{% endif %} tem uma licença de {% data variables.product.prodname_advanced_security %}, você pode habilitar ou desabilitar funcionalidades de {% data variables.product.prodname_advanced_security %}.
{% elsif ghae %}
Você pode habilitar ou desabilitar funcionalidades de {% data variables.product.prodname_advanced_security %}.
{% endif %}

1. Clique na sua foto de perfil e clique em **Organizações**.
2. Clique em **Configurações** ao lado da sua organização.
3. Clique em **Segurança & análise**.
4. Clique em **Habilitar todos** ou **Desabilitar todos** ao lado de {% data variables.product.prodname_GH_advanced_security %}.
5. Opcionalmente, selecione **Habilitar automaticamente para novos repositórios privados**.

Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_GH_advanced_security %}](/github/getting-started-with-github/about-github-advanced-security)" e "[Gerenciar configurações de segurança e análise para a sua organização](/organizations/keeping-your-organization-secure/managing-security-and-analysis-settings-for-your-organization)".
{% endif %}

{% ifversion fpt or ghes > 2.22 or ghae or ghec %}
## Configurar o {% data variables.product.prodname_secret_scanning %}

{% data variables.product.prodname_secret_scanning_caps %} é um recurso de {% data variables.product.prodname_advanced_security %} que digitaliza repositórios com relação aos segredos que são armazenados de forma insegura.

{% ifversion fpt or ghec %}{% data variables.product.prodname_secret_scanning_caps %} já está habilitado para todos os repositórios públicos. As organizações que usam {% data variables.product.prodname_ghe_cloud %} com {% data variables.product.prodname_advanced_security %} podem adicionalmente habilitar {% data variables.product.prodname_secret_scanning %} para repositórios privados e internos.{% endif %} {% ifversion fpt %}Para obter mais informações, consulte a [documentação de {% data variables.product.prodname_ghe_cloud %}](/enterprise-cloud@latest/code-security/getting-started/securing-your-organization#configuring-secret-scanning). {% endif %}

{% ifversion ghes or ghae %}{% data variables.product.prodname_secret_scanning_caps %} está disponível se a sua empresa usa {% data variables.product.prodname_advanced_security %}.{% endif %}

{% ifversion not fpt %}
Você pode habilitar ou desabilitar {% data variables.product.prodname_secret_scanning %} para todos os repositórios na sua organização com {% data variables.product.prodname_advanced_security %} habilitado.

1. Clique na sua foto de perfil e clique em **Organizações**.
2. Clique em **Configurações** ao lado da sua organização.
3. Clique em **Segurança & análise**.
4. Clique **Habilitar todos** ou **Desabilitar todos ** ao lado de {% data variables.product.prodname_secret_scanning_caps %} (somente repositórios de {% data variables.product.prodname_GH_advanced_security %}).
5. Opcionalmente, selecione **Habilitar automaticamente para repositórios privados adicionados a {% data variables.product.prodname_advanced_security %}**.

Para obter mais informações, consulte "[Gerenciar configurações de segurança e análise para sua organização](/organizations/keeping-your-organization-secure/managing-security-and-analysis-settings-for-your-organization)".
{% endif %}

{% endif %}

## Configurar o {% data variables.product.prodname_code_scanning %};

{% data variables.product.prodname_code_scanning_capc %} é um recurso de {% data variables.product.prodname_advanced_security %} que digitaliza código para vulnerabilidades e erros de segurança

{% ifversion fpt or ghec %}{% data variables.product.prodname_code_scanning_capc %} já disponível para todos os repositórios públicos. As organizações que usam {% data variables.product.prodname_ghe_cloud %} com {% data variables.product.prodname_advanced_security %} podem adicionalmente usar {% data variables.product.prodname_code_scanning %} para repositórios privados ou internos.{% else %}{% data variables.product.prodname_code_scanning_capc %} está disponível se sua empresa usar {% data variables.product.prodname_advanced_security %}.{% endif %}

{% data variables.product.prodname_code_scanning_capc %} está configurado no nível do repositório. Para obter mais informações, consulte "[Configurar {% data variables.product.prodname_code_scanning %} para um repositório](/code-security/secure-coding/setting-up-code-scanning-for-a-repository)".

## Próximas etapas
{% ifversion fpt or ghes > 3.1 or ghec %}Você pode visualizar, filtrar e organizar alertas de segurança em repositórios pertencentes à sua organização na visão geral de segurança. Para obter mais informações, consulte "[Sobre a visão geral de segurança](/code-security/security-overview/about-the-security-overview)".{% endif %}

Você pode visualizar e gerenciar alertas de funcionalidades de segurança para resolver dependências e vulnerabilidades no seu código. Para obter mais informações, consulte {% ifversion fpt or ghes > 2.22 or ghec %} "[Visualizar e atualizar as dependências vulneráveis no seu repositório](/code-security/supply-chain-security/viewing-and-updating-vulnerable-dependencies-in-your-repository),"{% endif %} {% ifversion fpt or ghec or ghes > 3.2 %}"[Gerenciar pull requests para atualizações de dependência](/code-security/supply-chain-security/managing-pull-requests-for-dependency-updates)," {% endif %}"[Gernciar {% data variables.product.prodname_code_scanning %} para o seu repositório](/code-security/secure-coding/managing-code-scanning-alerts-for-your-repository)," e "[Gerenciar alertas de {% data variables.product.prodname_secret_scanning %}](/code-security/secret-security/managing-alerts-from-secret-scanning)."

{% ifversion fpt or ghec %}Se você tiver uma vulnerabilidade de segurança, você poderá criar uma consultoria de segurança para discutir em privado e corrigir a vulnerabilidade. Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_security_advisories %}](/code-security/security-advisories/about-github-security-advisories)" e " "[Criar uma consultoria de segurança](/code-security/security-advisories/creating-a-security-advisory)".
{% endif %}
