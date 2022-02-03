---
title: Exibir contribuições no perfil
intro: 'O seu perfil {% data variables.product.product_name %} mostra {% ifversion fpt or ghes or ghec %}os seus repositórios fixos, bem como{% endif %} um gráfico das contribuições do repositório ao longo do último ano.'
redirect_from:
  - /articles/viewing-contributions
  - /articles/viewing-contributions-on-your-profile-page
  - /articles/viewing-contributions-on-your-profile
  - /github/setting-up-and-managing-your-github-profile/viewing-contributions-on-your-profile
  - /github/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/viewing-contributions-on-your-profile
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Profiles
shortTitle: Ver contribuições
---

{% ifversion fpt or ghes or ghec %}Seu gráfico de contribuição mostra a atividade de repositórios públicos. {% endif %}Você pode optar por mostrar a atividade em {% ifversion fpt or ghes or ghec %}tanto em repositórios públicos quanto {% endif %}privados, com detalhes específicos da sua atividade em repositórios privados anonimizados. Para obter mais informações, consulte "[Mostrar ou ocultar contribuições privadas no perfil](/articles/publicizing-or-hiding-your-private-contributions-on-your-profile)".

{% note %}

**Observação:** Os commits só aparecerão no seu gráfico de contribuições se o endereço de e-mail que você usou para criar das submissões estiver conectado à sua conta em {% data variables.product.product_name %}. Para obter mais informações, consulte "[Por que minhas contribuições não aparecem no meu perfil?](/articles/why-are-my-contributions-not-showing-up-on-my-profile#your-local-git-commit-email-isnt-connected-to-your-account)"

{% endnote %}

## O que conta como contribuição

Na sua página de perfil, determinadas ações contam como contribuições:

- Fazer commit no branch `gh-pages` ou no branch padrão de um repositório
- Abrir um problema
- Abrir uma discussão
- Responder a uma discussão
- Propor uma pull request
- Enviar uma revisão de pull request{% ifversion ghes or ghae %}
- Fazer coautoria de commits no branch `gh-pages` ou no branch padrão do repositório{% endif %}

{% data reusables.pull_requests.pull_request_merges_and_contributions %}

## Repositórios populares

Esta seção exibe os repositórios com a maioria dos inspetores. {% ifversion fpt or ghes or ghec %}Uma vez que você [fixou repositórios no seu perfil](/articles/pinning-repositories-to-your-profile), esta seção mudará para "Repositórios fixoss".{% endif %}

![Repositórios populares](/assets/images/help/profile/profile_popular_repositories.png)

{% ifversion fpt or ghes or ghec %}

## Repositórios fixos

Esta seção exibe até seis repositórios públicos e pode incluir tanto repositórios pertencentes a você como aqueles com os quais você contribuiu. Para ver detalhes importantes sobre os repositórios que você escolheu retratar, cada repositório nesta seção inclui um resumo do trabalho que está sendo feito, o número de [estrelas](/articles/saving-repositories-with-stars/) que ele recebeu e a principal linguagem de programação usada nele. Para obter mais informações, consulte "[Fixar repositórios no seu perfil](/articles/pinning-repositories-to-your-profile)".

![Repositórios fixos](/assets/images/help/profile/profile_pinned_repositories.png)

{% endif %}

## Calendário de contribuições

O calendário de contribuições mostra sua atividade de contribuição.

### Exibir contribuições de horários específicos

- Clique no quadrado de um dia para mostrar as contribuições feitas durante esse período de 24 horas.
- Pressione *Shift* e clique no quadrado de outro data para mostrar as contribuições feitas durante esse período.

{% note %}

**Observação:** só é possível selecionar um intervalo de até um mês no calendário de contribuições. Se você selecionar um período maior, será exibido apenas um mês de contribuições.

{% endnote %}

![Gráfico de contribuição](/assets/images/help/profile/contributions_graph.png)

### Como são calculados os horários de evento de contribuição

Os registros de data e hora são calculados de forma diferente para commits e pull requests:
- Os **commits** usam as informações de fuso horário no registro de data e hora do commit. Para obter mais informações, consulte "[Solucionar problemas de commits na linha do tempo](/articles/troubleshooting-commits-on-your-timeline)".
- As **pull requests** e os **problemas** abertos no {% data variables.product.product_name %} usam o fuso horário do navegador. Os abertos pela API usam o registro de data e hora ou o fuso horário [especificado na chamada de API](https://developer.github.com/changes/2014-03-04-timezone-handling-changes).

## Visão geral de atividade

{% data reusables.profile.activity-overview-summary %} Para obter mais informações, consulte "[Exibir a visão geral das atividades no perfil](/articles/showing-an-overview-of-your-activity-on-your-profile)".

![Seção Visão geral de atividade no perfil](/assets/images/help/profile/activity-overview-section.png)

As organizações retratadas na visão geral da atividade são priorizadas de acordo com a forma como você está ativo na organização. Se você for integrante de uma organização e @mencioná-la na bio do perfil, essa organização será priorizada na visão geral da atividade. Para obter mais informações, consulte "[Mencionando pessoas e equipes](/articles/basic-writing-and-formatting-syntax/#mentioning-people-and-teams)” ou "[Adicionando uma biografia ao seu perfil](/articles/adding-a-bio-to-your-profile/)."

## Atividade de contribuição

A seção de atividade de contribuição contém uma linha do tempo detalhada do seu trabalho, incluindo commits feitos exclusivamente por você ou em coautoria, solicitações de pull que você propôs e problemas que você abriu. Para ver suas contribuições ao longo do tempo, clique em **Mostrar mais atividade** na parte inferior da atividade de contribuição ou clique no ano em que você está interessado em visualizar, no lado direito da página. Momentos importantes, como a data em que você ingressou na organização, propôs sua primeira pull request ou abriu um problema relevante, são realçados na atividade de contribuição. Se você não conseguir ver determinados eventos na sua linha do tempo, verifique se ainda tem acesso à organização ou ao repositório em que o evento aconteceu

![Filtro de hora de atividade de contribuição](/assets/images/help/profile/contributions_activity_time_filter.png)

{% ifversion fpt or ghes or ghae or ghec %}

## Exibir contribuições da {% data variables.product.prodname_enterprise %} no {% data variables.product.prodname_dotcom_the_website %}

Se você usar {% ifversion fpt or ghec %}{% data variables.product.prodname_ghe_server %}{% ifversion ghae %} ou {% data variables.product.prodname_ghe_managed %}{% endif %}{% else %}{% data variables.product.product_name %}{% endif %} e proprietário da sua empresa permiteir {% data variables.product.prodname_unified_contributions %}, você poderá enviar contribuições corporativas a partir do seu perfil de {% data variables.product.prodname_dotcom_the_website %}. Para obter mais informações, consulte "[Enviando contribuições corporativas para seu perfil de {% data variables.product.prodname_dotcom_the_website %}](/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/sending-enterprise-contributions-to-your-githubcom-profile)".

{% endif %}
