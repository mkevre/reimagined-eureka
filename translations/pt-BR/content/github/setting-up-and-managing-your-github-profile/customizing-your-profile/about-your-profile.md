---
title: Sobre seu perfil
intro: 'Sua página de perfil conta a história do seu trabalho por meio de repositórios nos quais você está interessado, das contribuições que fez e das conversas que teve.'
redirect_from:
  - /articles/viewing-your-feeds/
  - /articles/profile-pages/
  - /articles/about-your-profile
  - /github/setting-up-and-managing-your-github-profile/about-your-profile
versions:
  free-pro-team: '*'
  enterprise-server: '*'
  github-ae: '*'
topics:
  - Profiles
---

Você pode adicionar informações pessoais sobre si mesmo na bio, como locais em que trabalhou anteriormente, os projetos com os quais contribuiu ou interesses que você tem que outras pessoas talvez gostem de saber. Para obter mais informações, consulte "[Adicionar uma bio ao seu perfil](/articles/personalizing-your-profile/#adding-a-bio-to-your-profile)".

{% if currentVersion == "free-pro-team@latest" or currentVersion ver_gt "enterprise-server@2.21" %}

{% data reusables.profile.profile-readme %}

![Arquivo README do perfil exibido no perfil](/assets/images/help/repository/profile-with-readme.png)

{% endif %}

As pessoas que visitam seu perfil veem uma linha do tempo da sua atividade de contribuição, como problemas e pull requests que abriu, commits que fez e pull requests que revisou. Você pode optar por exibir apenas contribuições públicas ou também incluir contribuições privadas e anônimas. Para obter mais informações, consulte "[Exibir contribuições na sua página de perfil](/articles/viewing-contributions-on-your-profile-page)" ou "[Mostrar ou ocultar contribuições privadas no perfil](/articles/publicizing-or-hiding-your-private-contributions-on-your-profile)".

As pessoas que visitam seu perfil também podem ver as informações a seguir.

- Repositórios e gists que você possui ou com os quais contribui. {% if currentVersion == "free-pro-team@latest" or enterpriseServerVersions contém currentVersion %}Você pode exibir o melhor trabalho fixando repositórios e gists no seu perfil. Para obter mais informações, consulte "[Fixar itens no seu perfil](/github/setting-up-and-managing-your-github-profile/pinning-items-to-your-profile)".{% endif %}
- Repositórios que você salvou com estrela. Para obter mais informações, consulte "[Salvar repositórios com estrelas](/articles/saving-repositories-with-stars/)."
- Uma visão geral da sua atividade em organizações, repositórios e equipes nos quais você está mais ativo. Para obter mais informações, consulte "[Exibir uma visão geral da sua atividade no seu perfil](/articles/showing-an-overview-of-your-activity-on-your-profile)."{% if currentVersion == "free-pro-team@latest" %}
- Selos que serão exibidos se você usar {% data variables.product.prodname_pro %} ou participar de programas como {% data variables.product.prodname_arctic_vault %}, {% data variables.product.prodname_sponsors %} ou do programa de desenvolvedor de {% data variables.product.company_short %}. Para obter mais informações, consulte "[Personalizar seu perfil](/github/setting-up-and-managing-your-github-profile/personalizing-your-profile#displaying-badges-on-your-profile)".{% endif %}

Você também pode definir um status no seu perfil para fornecer informações sobre a sua disponibilidade. Para obter mais informações, consulte "[Configurar um status](/articles/personalizing-your-profile/#setting-a-status)".

### Leia mais

- "[Como configurar minha foto de perfil?](/articles/how-do-i-set-up-my-profile-picture)"
- "[Mostrar ou ocultar contribuições privadas no perfil](/articles/publicizing-or-hiding-your-private-contributions-on-your-profile)"
- "[Exibir contribuições no perfil](/articles/viewing-contributions-on-your-profile)"
