---
title: Sobre o GitHub Connect
intro: '{% data variables.product.prodname_github_connect %} melhora {% data variables.product.product_name %} dando-lhe acesso a funcionalidades e fluxos de trabalho adicionais que dependem do poder de {% data variables.product.prodname_dotcom_the_website %}.'
versions:
  ghes: '*'
  ghae: '*'
type: overview
topics:
  - Enterprise
  - GitHub Connect
---

## Sobre o {% data variables.product.prodname_github_connect %}

{% data variables.product.prodname_github_connect %} melhora {% data variables.product.product_name %}, o que permite que {% data variables.product.product_location %} se beneficie do poder de {% data variables.product.prodname_dotcom_the_website %} de maneira limitada. Depois que você habilitar {% data variables.product.prodname_github_connect %}, você pode habilitar recursos e fluxos de trabalho adicionais que dependem de {% data variables.product.prodname_dotcom_the_website %} como, por exemplo, {% ifversion ghes or ghae-issue-4864 %}{% data variables.product.prodname_dependabot_alerts %} para vulnerabilidades de segurança que são monitoradas no {% data variables.product.prodname_advisory_database %}{% else %}, o que permite que os usuários usem ações com base na comunidade de {% data variables.product.prodname_dotcom_the_website %} nos seus arquivos de fluxo de trabalho{% endif %}.

{% data variables.product.prodname_github_connect %} não abre {% data variables.product.product_location %} para o público na internet. Nenhum dos dados privados da sua empresa está exposto os usuários de {% data variables.product.prodname_dotcom_the_website %}. Em vez disso, {% data variables.product.prodname_github_connect %} transmite apenas os dados limitados necessários para os recursos individuais que você optar por habilitar. A menos que você habilite a sincronização de licença, nenhum dado pessoal será transmitido por {% data variables.product.prodname_github_connect %}. Para obter mais informações sobre quais dados são transmitidos por {% data variables.product.prodname_github_connect %}, consulte "[Transmissão de dados para o {% data variables.product.prodname_github_connect %}](#data-transmission-for-github-connect)".

Habilitar {% data variables.product.prodname_github_connect %} não permitirá que usuários de {% data variables.product.prodname_dotcom_the_website %} façam alterações em {% data variables.product.product_name %}.

Para habilitar {% data variables.product.prodname_github_connect %}, você configura uma conexão entre {% data variables.product.product_location %} e uma conta de organização ou empresa em {% data variables.product.prodname_dotcom_the_website %} que usa {% data variables.product.prodname_ghe_cloud %}. Para obter mais informações, consulte "[Gerenciando {% data variables.product.prodname_github_connect %}](/admin/configuration/configuring-github-connect/managing-github-connect)".

Após habilitar a licença {% data variables.product.prodname_github_connect %}, você poderá habilitar funcionalidades como {% ifversion ghes %} a sincronização automática de licença de usuário e {% endif %}{% data variables.product.prodname_dependabot_alerts %}. Para obter mais informações sobre todas as funcionalidades disponíveis, consulte "[{% data variables.product.prodname_github_connect %} recursos](#github-connect-features)".

## Funcionalidades de {% data variables.product.prodname_github_connect %}

Após configurar a conexão entre {% data variables.product.product_location %} e {% data variables.product.prodname_ghe_cloud %}, você pode habilitar funcionalidades individuais de {% data variables.product.prodname_github_connect %} para a sua empresa.

| Funcionalidade                                                      | Descrição                                                                                                                                                                                                                                                                 | Mais informações                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |{% ifversion ghes %}
| Sincronização automática da licença do usuário                      | Gerencie o uso da licença entre as suas implantações de {% data variables.product.prodname_enterprise %} sincronizando automaticamente as licenças de usuários de {% data variables.product.product_location %} para {% data variables.product.prodname_ghe_cloud %}. | "[Habilitando a sincronização automática de licença de usuário para sua empresa](/admin/configuration/configuring-github-connect/enabling-automatic-user-license-sync-for-your-enterprise)"{% endif %}{% ifversion ghes or ghae-issue-4864 %}
| {% data variables.product.prodname_dependabot_alerts %}           | Permite aos usuários encontrar e corrigir vulnerabilidades nas dependências do código.                                                                                                                                                                                    | "[Habilitando o gráfico de dependências e {% data variables.product.prodname_dependabot_alerts %} para a sua empresa](/admin/configuration/configuring-github-connect/enabling-the-dependency-graph-and-dependabot-alerts-for-your-enterprise)"{% endif %}
| Ações de {% data variables.product.prodname_dotcom_the_website %} | Permitir que os usuários usem ações de {% data variables.product.prodname_dotcom_the_website %} em arquivos de fluxo de trabalho.                                                                                                                                       | "[Habilitando o acesso automático a ações de {% data variables.product.prodname_dotcom_the_website %} usando {% data variables.product.prodname_github_connect %}](/admin/github-actions/managing-access-to-actions-from-githubcom/enabling-automatic-access-to-githubcom-actions-using-github-connect)" |
| Pesquisa unificada                                                  | Permitir que os usuários incluam repositórios em {% data variables.product.prodname_dotcom_the_website %} nos seus resultados de pesquisa ao pesquisar em {% data variables.product.product_location %}.                                                              | "[Habilitando {% data variables.product.prodname_unified_search %} para a sua empresa](/admin/configuration/configuring-github-connect/enabling-unified-search-for-your-enterprise)"                                                                                                                       |
| Contribuições unificadas                                            | Permitir que os usuários incluam o número de contribuições anonimizadas pelo trabalho deles em {% data variables.product.product_location %} nos seus gráficos de contribuição em {% data variables.product.prodname_dotcom_the_website %}.                           | "[Habilitando {% data variables.product.prodname_unified_contributions %} para a sua empresa](/admin/configuration/configuring-github-connect/enabling-unified-contributions-for-your-enterprise)"                                                                                                         |

## Transmissão de dados para {% data variables.product.prodname_github_connect %}

Ao habilitar {% data variables.product.prodname_github_connect %} ou funcionalidades específicas de{% data variables.product.prodname_github_connect %}, um registro em {% data variables.product.prodname_ghe_cloud %} irá armazenar as seguintes informações sobre a conexão.
{% ifversion ghes %}
- A parte da chave pública da sua licença do {% data variables.product.prodname_ghe_server %};
- Um hash da sua licença do {% data variables.product.prodname_ghe_server %};
- O nome do cliente da sua licença do {% data variables.product.prodname_ghe_server %};
- A versão de {% data variables.product.product_location_enterprise %}{% endif %}
- O nome de host de {% data variables.product.product_location %};
- A conta da organização ou empresa em {% data variables.product.prodname_ghe_cloud %} que estiver conectada a {% data variables.product.product_location %}
- O token de autenticação usado pela {% data variables.product.product_location %} para fazer solicitações ao {% data variables.product.prodname_ghe_cloud %}.
- Se a Segurança de Camada de Transporte (TLS) estiver habilitada e configurada em {% data variables.product.product_location %}{% ifversion ghes %}
- As funcionalidades de {% data variables.product.prodname_github_connect %} que estão habilitadas em {% data variables.product.product_location %} e a data e hora da habilitação{% endif %}

{% data variables.product.prodname_github_connect %} sincroniza os dados de conexão acima entre {% data variables.product.product_location %} e {% data variables.product.prodname_ghe_cloud %} semanalmente, a partir do dia e tempo aproximado que {% data variables.product.prodname_github_connect %} foi habilitado.

{% note %}

**Observação:** Nenhum repositório, problema ou pull request foi transmitido por {% data variables.product.prodname_github_connect %}.

{% endnote %}

Os dados adicionais são transmitidos se você habilitar as funcionalidades individuais de {% data variables.product.prodname_github_connect %}.

| Funcionalidade                                                      | Dados                                                                                  | Para onde os dados são transmitidos?                                                                                                                                                                                                             | Onde os dados são usados?                                                                             |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |{% ifversion ghes %}
| Sincronização automática da licença do usuário                      | O ID de usuário de cada {% data variables.product.product_name %} e endereço de e-mail | De {% data variables.product.product_name %} para {% data variables.product.prodname_ghe_cloud %}                                                                                                                                              | {% data variables.product.prodname_ghe_cloud %} |{% endif %}{% ifversion ghes or ghae-issue-4864 %}
| {% data variables.product.prodname_dependabot_alerts %}           | Alertas de vulnerabilidade                                                             | De {% data variables.product.prodname_dotcom_the_website %} para {% data variables.product.product_name %}                                                                                                                                   | {% data variables.product.product_name%} 
{% endif %}
| Ações de {% data variables.product.prodname_dotcom_the_website %} | Nome da ação, ação (arquivo YAML de {% data variables.product.prodname_marketplace %}) | De {% data variables.product.prodname_dotcom_the_website %} para {% data variables.product.product_name %}<br><br>De {% data variables.product.product_name %} para {% data variables.product.prodname_dotcom_the_website %} | {% data variables.product.product_name %}
| Pesquisa unificada                                                  | Termos de pesquisa, resultados de pesquisa                                             | De {% data variables.product.prodname_dotcom_the_website %} para {% data variables.product.product_name %}<br><br>De {% data variables.product.product_name %} para {% data variables.product.prodname_dotcom_the_website %} | {% data variables.product.product_name %}
| Contribuições unificadas                                            | Contagens de contribuição                                                              | De {% data variables.product.product_name %} paraa {% data variables.product.prodname_dotcom_the_website %}                                                                                                                                  | {% data variables.product.prodname_dotcom_the_website %}

## Leia mais

- "[Contas corporativas](/graphql/guides/managing-enterprise-accounts)" na documentação da API do GraphQL
