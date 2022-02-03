---
title: Sobre a varredura de segredo
intro: 'O {% data variables.product.product_name %} verifica repositórios em busca de tipos de segredos conhecidos a fim de impedir o uso fraudulento de segredos que sofreram commit acidentalmente.'
product: '{% data reusables.gated-features.secret-scanning %}'
miniTocMaxHeadingLevel: 3
redirect_from:
  - /github/administering-a-repository/about-token-scanning
  - /articles/about-token-scanning
  - /articles/about-token-scanning-for-private-repositories
  - /github/administering-a-repository/about-secret-scanning
  - /code-security/secret-security/about-secret-scanning
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: overview
topics:
  - Secret scanning
  - Advanced Security
---

{% data reusables.secret-scanning.beta %}
{% data reusables.secret-scanning.enterprise-enable-secret-scanning %}

Se o seu projeto se comunicar com um serviço externo, você pode usar um token ou uma chave privada para autenticação. Tokens e chaves privadas são exemplos de segredos que um provedor de serviços pode publicar. Se você marcar um segredo em um repositório, qualquer pessoa que tenha acesso de leitura ao repositório pode usar o segredo para acessar o serviço externo com seus privilégios. Recomendamos que você armazene segredos em um local dedicado e seguro fora do repositório do seu projeto.

{% data variables.product.prodname_secret_scanning_caps %} irá fazer a varredura de todo o seu histórico do Git em todos os branches presentes no seu repositório {% data variables.product.prodname_dotcom %} para obter quaisquer segredos. Os provedores de serviço podem ser associados com {% data variables.product.company_short %} para fornecer seus formatos de segredo para varredura. {% ifversion fpt or ghec %} Para obter mais informações, consulte "[Programa de parceiros de segredo de varredura](/developers/overview/secret-scanning-partner-program)".
{% endif %}

{% data reusables.secret-scanning.about-secret-scanning %}

{% ifversion fpt or ghec %}
## Sobre o {% data variables.product.prodname_secret_scanning %} para repositórios públicos

{% data variables.product.prodname_secret_scanning_caps %} é automaticamente habilitado nos repositórios públicos. Quando você faz push para um repositório público, o {% data variables.product.product_name %} verifica segredos no conteúdo dos commits. Se você alternar um repositório privado para público, o {% data variables.product.product_name %} verifica segredos em todo o repositório.

Quando o {% data variables.product.prodname_secret_scanning %} detecta um conjunto de credenciais, notificamos o provedor de serviço que emitiu o segredo. O provedor de serviço valida a credencial e decide se deve revogar o segredo, emitir um novo segredo ou entrar em contato com você diretamente, o que dependerá dos riscos associados a você ou ao provedor de serviço. Para uma visão geral de como trabalhamos com parceiros emissores de token, consulte "[Programa de verificação de segredos de parceiros](/developers/overview/secret-scanning-partner-program)".

### Lista de segredos compatíveis com repositórios públicos

O {% data variables.product.product_name %} atualmente verifica repositórios públicos para encontrar segredos emitidos pelos seguintes provedores de serviços.

{% data reusables.secret-scanning.partner-secret-list-public-repo %}

## Sobre o {% data variables.product.prodname_secret_scanning %} para repositórios privados
{% endif %}

{% ifversion ghes or ghae %}
## Sobre {% data variables.product.prodname_secret_scanning %} em {% data variables.product.product_name %}

{% data variables.product.prodname_secret_scanning_caps %} está disponível em todos os repositórios de propriedade da organização como parte de {% data variables.product.prodname_GH_advanced_security %}. Não está disponível em repositórios pertencentes a usuários.
{% endif %}

Se você é um administrador de repositório ou um proprietário de uma organização, você pode habilitar {% data variables.product.prodname_secret_scanning %} para {% ifversion fpt or ghec %} repositórios privados{% endif %} pertencentes a organizações. Você pode habilitar {% data variables.product.prodname_secret_scanning %} para todos os seus repositórios ou para todos os novos repositórios dentro da sua organização.{% ifversion fpt or ghec %} {% data variables.product.prodname_secret_scanning_caps %} não está disponível para repositórios privados pertencentes ao usuário.{% endif %} Para obter mais informações, consulte "[Gerenciar segurança e configurações de análise para o seu repositório](/github/administering-a-repository/managing-security-and-analysis-settings-for-your-repository)" e "[Gerenciar configurações de segurança e análise para a sua organização](/organizations/keeping-your-organization-secure/managing-security-and-analysis-settings-for-your-organization)."

{% ifversion fpt or ghes > 3.1 or ghae or ghec %}Você também pode definir padrões personalizados de {% data variables.product.prodname_secret_scanning %} que se aplicam somente ao seu repositório ou organização. Para obter mais informações, consulte "[Definir padrões personalizados para {% data variables.product.prodname_secret_scanning %}](/code-security/secret-security/defining-custom-patterns-for-secret-scanning)".{% endif %}

Quando você faz push dos commits para um repositório{% ifversion fpt or ghec %} privado{% endif %} com {% data variables.product.prodname_secret_scanning %} habilitado, {% data variables.product.prodname_dotcom %} verifica o conteúdo dos segredos dos commits.

Quando {% data variables.product.prodname_secret_scanning %} detecta um segredo em um{% ifversion fpt or ghec %} privado{% endif %} repositório, {% data variables.product.prodname_dotcom %} gera um alerta.

- O {% data variables.product.prodname_dotcom %} envia um alerta de email para os administradores do repositório e proprietários da organização.
{% ifversion fpt or ghes > 3.0 or ghae or ghec %}
- {% data variables.product.prodname_dotcom %} envia um alerta de e-mail para o contribuidor que fez o commit do segredo no repositório com um link para o alerta de {% data variables.product.prodname_secret_scanning %} relacionado. O autor do commit pode visualizar o alerta no repositório e resolver o alerta.
{% endif %}
- {% data variables.product.prodname_dotcom %} exibe um alerta no repositório.{% ifversion ghes = 3.0 %} Para obter mais informações, consulte "[Gerenciar alertas de {% data variables.product.prodname_secret_scanning %}](/github/administering-a-repository/managing-alerts-from-secret-scanning)".{% endif %}

{% ifversion fpt or ghes > 3.0 or ghae or ghec %}
Para obter mais informações sobre a visualização e resolução de alertas de {% data variables.product.prodname_secret_scanning %}, consulte "[Gerenciar alertas de {% data variables.product.prodname_secret_scanning %}](/github/administering-a-repository/managing-alerts-from-secret-scanning)."{% endif %}

Os administradores do repositório e proprietários da organização podem conceder acesso aos usuários aos alertas de {% data variables.product.prodname_secret_scanning %}. Para obter mais informações, consulte "[Gerenciar configurações de segurança e análise do repositório](/github/administering-a-repository/managing-security-and-analysis-settings-for-your-repository#granting-access-to-security-alerts)".

{% ifversion fpt or ghes > 3.0 or ghec %}
Para monitorar resultados de {% data variables.product.prodname_secret_scanning %} nos seus {% ifversion fpt or ghec %}repositórios {% endif %}privados{% ifversion ghes > 3.1 %} ou na sua organização{% endif %}, você pode usar a API de {% data variables.product.prodname_secret_scanning %}. Para obter mais informações sobre pontos de extremidade da API, consulte "[{% data variables.product.prodname_secret_scanning_caps %}](/rest/reference/secret-scanning)".{% endif %}

{% ifversion ghes or ghae %}
## Lista de segredos compatíveis{% else %}
### Lista de segredos cmpatíveis com repositórios privados
{% endif %}

{% data variables.product.prodname_dotcom %} atualmente faz a varredura de repositórios{% ifversion fpt or ghec %} privados{% endif %} para segredos emitidos pelos seguintes provedores de serviços.

{% data reusables.secret-scanning.partner-secret-list-private-repo %}

{% ifversion ghes < 3.2 or ghae %}
{% note %}

**Nota: o ** {% data variables.product.prodname_secret_scanning_caps %} atualmente não permite que você defina seus próprios padrões para detecção de segredos.

{% endnote %}
{% endif %}

## Leia mais

- "[Protegendo o seu repositório](/code-security/getting-started/securing-your-repository)"
- "[Manter a conta e os dados seguros](/github/authenticating-to-github/keeping-your-account-and-data-secure)"
