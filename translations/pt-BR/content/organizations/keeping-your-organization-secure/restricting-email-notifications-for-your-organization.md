---
title: Restringir notificações de e-mail para sua organização
intro: 'Para evitar que as informações da organização sejam divulgadas para contas pessoais de e-mail, você pode restringir domínios em que os integrantes podem receber notificações de e-mail sobre a atividade da organização.'
product: '{% data reusables.gated-features.restrict-email-domain %}'
permissions: Organization owners can restrict email notifications for an organization.
redirect_from:
  - /articles/restricting-email-notifications-about-organization-activity-to-an-approved-email-domain/
  - /articles/restricting-email-notifications-to-an-approved-domain
  - /github/setting-up-and-managing-organizations-and-teams/restricting-email-notifications-to-an-approved-domain
  - /organizations/keeping-your-organization-secure/restricting-email-notifications-to-an-approved-domain
versions:
  free-pro-team: '*'
  enterprise-server: '>=3.2'
type: how_to
topics:
  - Enterprise
  - Notifications
  - Organizations
  - Policy
---

### Sobre restrições de e-mail

Quando as notificações de e-mail restritas são habilitadas em uma organização, os integrantes só podem usar um endereço de e-mail associado a um domínio verificado ou aprovado para receber as notificações de e-mail sobre a atividade da organização.

{% data reusables.enterprise-accounts.approved-domains-beta-note %}

Para obter mais informações, consulte "[Verificar ou aprovar um domínio para a sua organização](/organizations/managing-organization-settings/verifying-or-approving-a-domain-for-your-organization)".

{% data reusables.notifications.email-restrictions-verification %}

Os colaboradores externos não estão sujeitos às restrições de notificações por e-mail para domínios verificados ou aprovados. Para obter mais informações sobre colaboradores externos, consulte "[Níveis de permissão da organização](/organizations/managing-peoples-access-to-your-organization-with-roles/permission-levels-for-an-organization#outside-collaborators)".

Se sua organização pertence a uma conta corporativa os integrantes da organização poderão receber notificações de qualquer domínio verificado ou aprovado para a conta corporativa, Além de quaisquer domínios verificados ou aprovados para a organização. Para obter mais informações, consulte "[Verificar ou aprovar um domínio para sua conta corporativa](/github/setting-up-and-managing-your-enterprise/verifying-or-approving-a-domain-for-your-enterprise-account)".

### Restringir notificações de e-mail

Antes de restringir as notificações de e-mail para a sua organização, você deve verificar ou aprovar pelo menos um domínio para a organização ou o proprietário da empresa deve ter verificado ou aprovado pelo menos um domínio para a conta corporativa.

Para obter mais informações sobre verificações e aprovações de domínios para uma organização, consulte "[Verificar ou aprovar um domínio para a sua organização](/organizations/managing-organization-settings/verifying-or-approving-a-domain-for-your-organization)".

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.verified-domains %}
{% data reusables.organizations.restrict-email-notifications %}
6. Clique em **Salvar**.
