---
title: Adicionar colaboradores externos a repositórios em sua organização
intro: 'Um *colaborador externo* é uma pessoa que não é explicitamente um integrante da sua organização, mas que tem permissões de Gravação, Leitura ou de Administrador para um ou vários repositórios da organização.'
redirect_from:
  - /articles/adding-outside-collaborators-to-repositories-in-your-organization
  - /github/setting-up-and-managing-organizations-and-teams/adding-outside-collaborators-to-repositories-in-your-organization
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Organizations
  - Teams
shortTitle: Adicionar colaborador externo
permissions: People with admin access to a repository can add an outside collaborator to the repository.
---

## Sobre colaboradores externos

{% data reusables.organizations.outside-collaborators-use-seats %}

O proprietário da organização pode restringir a capacidade de convidar colaboradores. Para obter mais informações, consulte "[Configurar permissões para adicionar colaboradores externos](/articles/setting-permissions-for-adding-outside-collaborators)".

{% ifversion ghes %}
Antes de adicionar alguém como colaborador externo em um repositório, a pessoa deve ter uma conta de usuário em {% data variables.product.product_location %}. Se a empresa usa um sistema de autenticação externa, como SAML ou LDAP, a pessoa que você deseja adicionar deverá efetuar o login por meio desse sistema para criar uma conta. Se a pessoa não tiver acesso ao sistema de autenticação e a autenticação integrada estiver habilitada para a sua empresa, um administrador do site poderá criar uma conta de usuário para a pessoa. Para obter mais informações, consulte "[Usar autenticação integrada](/admin/authentication/authenticating-users-for-your-github-enterprise-server-instance/using-built-in-authentication#inviting-users)".
{% endif %}

{% ifversion not ghae %}
Se sua organização [exigir que integrantes e colaboradores externos usem a autenticação de dois fatores](/articles/requiring-two-factor-authentication-in-your-organization), eles deverão habilitar a autenticação de dois fatores antes de aceitar seu convite para colaborar no repositório de uma organização.
{% endif %}

{% data reusables.organizations.outside_collaborator_forks %}

{% ifversion fpt %}
Para apoiar ainda mais as habilidades de colaboração da sua equipe, você pode fazer a atualização para {% data variables.product.prodname_ghe_cloud %}, que inclui funcionalidades como branches protegidos e proprietários de códigos em repositórios privados. {% data reusables.enterprise.link-to-ghec-trial %}
{% endif %}

## Adicionando colaboradores externos a um repositório

{% data reusables.repositories.navigate-to-repo %}
{% data reusables.repositories.sidebar-settings %}
{% ifversion fpt or ghec %}
{% data reusables.repositories.navigate-to-manage-access %}
{% data reusables.organizations.invite-teams-or-people %}
5. No campo de pesquisa, comece a digitar o nome da pessoa que deseja convidar e, em seguida, clique em um nome na lista de correspondências. ![Campo de pesquisa para digitar o nome de uma pessoa para convidar para o repositório](/assets/images/help/repository/manage-access-invite-search-field.png)
6. Em "Escolher uma função", selecione as permissões a serem concedidas à pessoa e, em seguida, clique em **Adicionar NOME ao REPOSITÓRIO**. ![Selecionar permissões para a pessoa](/assets/images/help/repository/manage-access-invite-choose-role-add.png)
{% else %}
5. Na barra lateral esquerda, clique em **Collaborators & teams** (Colaboradores e equipes). ![Barra lateral de configurações do repositório com destaque para Collaborators & teams (Colaboradores e equipes)](/assets/images/help/repository/org-repo-settings-collaborators-and-teams.png)
6. Em "Collaborators" (Colaboradores), digite o nome da pessoa à qual deseja conceder acesso ao repositório e clique em **Add collaborator** (Adicionar colaborador). ![A seção Collaborators (Colaboradores) com o nome de usuário Octocat inserido no campo de pesquisa](/assets/images/help/repository/org-repo-collaborators-find-name.png)
7. Ao lado do nome do novo colaborador, escolha o nível de permissão apropriado: *Gravação*, *Leitura* ou *Administrador*. ![O selecionador de permissões do repositório](/assets/images/help/repository/org-repo-collaborators-choose-permissions.png)
{% endif %}
