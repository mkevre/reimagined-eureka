---
title: Gerenciar usuários inativos
redirect_from:
  - /enterprise/admin/articles/dormant-users
  - /enterprise/admin/articles/viewing-dormant-users
  - /enterprise/admin/articles/determining-whether-a-user-account-is-dormant
  - /enterprise/admin/user-management/managing-dormant-users
  - /admin/user-management/managing-dormant-users
intro: '{% data reusables.enterprise-accounts.dormant-user-activity-threshold %}'
versions:
  ghec: '*'
  ghes: '*'
  ghae: '*'
type: how_to
topics:
  - Accounts
  - Enterprise
  - Licensing
---

{% data reusables.enterprise-accounts.dormant-user-activity %}

{% ifversion ghes or ghae%}
## Exibir usuários inativos

{% data reusables.enterprise-accounts.viewing-dormant-users %}

{% data reusables.enterprise_site_admin_settings.access-settings %}
3. Na barra lateral esquerda, clique em **Dormant users** (Usuários inativos). ![Dormant users tab](/assets/images/enterprise/site-admin-settings/dormant-users-tab.png){% ifversion ghes %}
4. Para suspender todos os usuários inativos nesta lista, na parte superior da página, clique em **Suspend all** (Suspender todos). ![Suspend all button](/assets/images/enterprise/site-admin-settings/suspend-all.png){% endif %}

## Determinar se uma conta de usuário está inativa

{% data reusables.enterprise_site_admin_settings.access-settings %}
{% data reusables.enterprise_site_admin_settings.search-user %}
{% data reusables.enterprise_site_admin_settings.click-user %}
5. Na seção **User info** (Informações de usuário), um ponto vermelho com a palavra "Inativo" indica que a conta do usuário está inativa, e um ponto verde com a palavra "Ativo" indica que a conta do usuário está ativa. ![Conta de usuário inativa](/assets/images/enterprise/stafftools/dormant-user.png) ![Conta de usuário ativa](/assets/images/enterprise/stafftools/active-user.png)

## Configurar o limite de inatividade

{% data reusables.enterprise_site_admin_settings.dormancy-threshold %}

{% data reusables.enterprise-accounts.access-enterprise %}
{% data reusables.enterprise-accounts.policies-tab %}
{% data reusables.enterprise-accounts.settings-tab %}
{% data reusables.enterprise-accounts.options-tab %}
4. Em "Dormancy threshold" (Limite de inatividade), use o menu suspenso e clique no limite de inatividade desejado.![Menu suspenso do limite de inatividade](/assets/images/enterprise/site-admin-settings/dormancy-threshold-menu.png)

{% endif %}

{% ifversion ghec %}

{% data reusables.enterprise-accounts.dormant-user-release-phase %}

{% warning %}

**Observação:** Durante o beta privado, as melhorias constantes no recurso de download de relatório podem limitar a sua disponibilidade.

{% endwarning %}

## Fazendo o download do relatório de usuários inativos da conta corporativa

{% data reusables.enterprise-accounts.access-enterprise %}
{% data reusables.enterprise-accounts.enterprise-accounts-compliance-tab %}
1. Para fazer o download do seu relatório de usuários inativos (beta) como um arquivo CSV, em "Outro", clique em {% octicon "download" aria-label="The Download icon" %} **Download**. ![Botão Baixar em "Outro" na página de conformidade](/assets/images/help/business-accounts/dormant-users-download-button.png)

{% endif %}
