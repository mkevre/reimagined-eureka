---
title: Enviar dados ao suporte do GitHub
intro: 'Since {% data variables.contact.github_support %} doesn''t have access to your environment, we sometimes require some additional information from you.'
shortTitle: Providing data
versions:
  ghes: '*'
redirect_from:
  - /enterprise/admin/guides/installation/troubleshooting
  - /enterprise/admin/articles/support-bundles
  - /enterprise/admin/guides/enterprise-support/providing-data-to-github-enterprise-support
  - /enterprise/admin/enterprise-support/providing-data-to-github-support
  - /admin/enterprise-support/providing-data-to-github-support
  - /admin/enterprise-support/receiving-help-from-github-support/providing-data-to-github-support
topics:
  - Support
---

## About diagnostic files and support bundles

{% data variables.contact.github_support %} may ask you to provide additional data in the form of sanitized log files. There are three types of log file you may be asked to provide.

Diagnostic files contain information about a {% data variables.product.prodname_ghe_server %} instance's settings and environment, support bundles contain diagnostics and logs from the past two days, and extended support bundles also contain diagnostics and logs but from the past seven days.

## Criar e compartilhar arquivos de diagnóstico

Diagnostic files are an overview of a {% data variables.product.prodname_ghe_server %} instance's settings and environment that contains:

- Informações da licença do cliente, incluindo o nome da empresa, data de validade e número de licenças de usuário
- Números de versão e SHAs;
- Arquitetura de VMs;
- Nome de host, modo privado, configurações de SSL;
- Listagens de carga e processo;
- Configurações de rede;
- Método e detalhes de autenticação;
- Número de repositórios, usuários e outros dados de instalação.

Você pode baixar o diagnóstico da sua instância no {% data variables.enterprise.management_console %} ou executando o utilitário da linha de comando `ghe-diagnostics`.

### Criar um arquivo de diagnóstico no {% data variables.enterprise.management_console %}

Você pode usar esse método se não tiver sua chave SSH disponível no momento.

{% data reusables.enterprise_site_admin_settings.access-settings %}
{% data reusables.enterprise_site_admin_settings.management-console %}
{% data reusables.enterprise_management_console.type-management-console-password %}
{% data reusables.enterprise_management_console.support-link %}
5. Clique em **Download diagnostics info** (Baixar informações de diagnóstico).

### Criar um arquivo de diagnóstico usando SSH

Você pode usar esse método sem entrar no {% data variables.enterprise.management_console %}.

Use o utilitário da linha de comando [ghe-diagnostics](/enterprise/{{ currentVersion }}/admin/guides/installation/command-line-utilities#ghe-diagnostics) para recuperar o diagnóstico da sua instância.

```shell
$ ssh -p122 admin@<em>hostname</em> -- 'ghe-diagnostics' > diagnostics.txt
```

## Criar e compartilhar pacotes de suporte

Depois do envio da sua solicitação de suporte, podemos pedir que você compartilhe um pacote de suporte com a nossa equipe. O pacote de suporte é um arquivo tar compactado com gzip que inclui diagnósticos e logs importantes da sua instância, como:

- Logs relacionados à autenticação que podem ser úteis na solução de problemas de erros de autenticação, ou na configuração de LDAP, CAS ou SAML;
- Log do {% data variables.enterprise.management_console %};
- `github-logs/exceptions.log`: informações sobre 500 erros encontrados no site;
- `github-logs/audit.log`: logs de auditoria do {% data variables.product.prodname_ghe_server %};
- `babeld-logs/babeld.log`: logs de proxy do Git;
- `system-logs/haproxy.log`: logs de HAProxy;
- `elasticsearch-logs/github-enterprise.log`: logs de ElasticSearch;
- `configuration-logs/ghe-config.log`: logs de configuração do {% data variables.product.prodname_ghe_server %};
- `collectd/logs/collectd.log`: logs coletados;
- `mail-logs/mail.log`: logs de entrega de e-mail por SMTP;

Para obter mais informações, consulte "[Gerar logs de auditoria](/enterprise/{{ currentVersion }}/admin/guides/installation/audit-logging)".

Os pacotes de suporte incluem logs dos últimos dois dias. Para obter logs dos últimos sete dias, você pode baixar um pacote de suporte estendido. Para obter mais informações, consulte "[Criar e compartilhar pacotes de suporte estendidos](#creating-and-sharing-extended-support-bundles)".

{% tip %}

**Dica:** ao entrar em contato com o {% data variables.contact.github_support %}, você receberá um e-mail de confirmação com um link de referência do tíquete. Se o {% data variables.contact.github_support %} solicitar o upload de um pacote de suporte, você pode usar o link de referência do tíquete para fazer o upload requisitado.

{% endtip %}

### Criar um pacote de suporte no {% data variables.enterprise.management_console %}

Você pode usar essas etapas para criar e compartilhar um pacote de suporte se conseguir acessar o {% data variables.enterprise.management_console %} e se tiver acesso à internet.

{% data reusables.enterprise_site_admin_settings.access-settings %}
{% data reusables.enterprise_site_admin_settings.management-console %}
{% data reusables.enterprise_management_console.type-management-console-password %}
{% data reusables.enterprise_management_console.support-link %}
5. Clique em **Download support bundle** (Baixar pacote de suporte).
{% data reusables.enterprise_enterprise_support.sign-in-to-support %}
{% data reusables.enterprise_enterprise_support.upload-support-bundle %}

### Criar um pacote de suporte usando SSH

Você pode usar esses passos para criar e compartilhar um pacote de suporte se você tiver acesso de SSH ao {% data variables.product.product_location %} e tiver acesso à internet de saída.

{% data reusables.enterprise_enterprise_support.use_ghe_cluster_support_bundle %}

1. Baixe o pacote de suporte via SSH:
  ```shell
  $ ssh -p 122 admin@<em>hostname</em> -- 'ghe-support-bundle -o' > support-bundle.tgz
  ```
  Para obter mais informações sobre o comando `ghe-support-bundle`, consulte "[Utilitários da linha de comando](/enterprise/admin/guides/installation/command-line-utilities#ghe-support-bundle)".
{% data reusables.enterprise_enterprise_support.sign-in-to-support %}
{% data reusables.enterprise_enterprise_support.upload-support-bundle %}

### Carregar um pacote de suporte usando sua conta corporativa

{% data reusables.enterprise-accounts.access-enterprise-on-dotcom %}
{% data reusables.enterprise-accounts.settings-tab %}
3. Na barra lateral esquerda, clique em **Enterprise licensing** (Licenciamento Empresarial). ![Screenshot showing "Enterprise licensing" link in the enterprise account settings sidebar.](/assets/images/help/enterprises/enterprise-licensing-tab.png)
4. Em "Ajuda de {% data variables.product.prodname_enterprise %}", clique em **Fazer upload de um pacote de suporte**. ![Screenshot showing "Upload a support bundle link".](/assets/images/enterprise/support/upload-support-bundle.png)
5. Em "Selecione uma conta corporativa", selecione a conta associada ao pacote de suporte no menu suspenso. ![Screenshot showing the dropdown menu to select the support bundle's enterprise account.](/assets/images/enterprise/support/support-bundle-account.png)
6. Em "Fazer upload de um pacote de suporte para {% data variables.contact.enterprise_support %}", selecione seu pacote de suporte, clique **Escolher arquivo** ou arraste seu arquivo de pacote de suporte para **Escolher arquivo**. ![Screenshot showing the "Choose file" button to upload a support bundle file.](/assets/images/enterprise/support/choose-support-bundle-file.png)
7. Clique em **Fazer upload**.

### Fazer upload de um pacote de suporte usando SSH

Você pode fazer upload diretamente de um pacote de suporte para o nosso servidor nas seguintes situações:
- Você tem acesso de SSH a {% data variables.product.product_location %}.
- São permitidas conexões HTTPS de saída sobre a por meio da porta TCP 443 de {% data variables.product.product_location %} para _enterprise-bundles.github.com_ e _esbtoolsproduction.blob.core.windows.net_.

1. Faça upload do pacote para o nosso servidor de pacotes de suporte:
  ```shell
  $ ssh -p122 admin@<em>hostname</em> -- 'ghe-support-bundle -u'
  ```

## Criar e compartilhar pacotes de suporte estendidos

Os pacotes de suporte incluem logs dos últimos dois dias, enquanto os pacotes de suporte _estendidos_ incluem logs dos últimos sete dias. Se os eventos que o {% data variables.contact.github_support %} está investigando tiverem ocorrido há mais de dois dias, poderemos solicitar que você compartilhe um pacote de suporte estendido. Você precisará do acesso SSH para baixar um pacote estendido, e não é possível baixar um pacote estendido no {% data variables.enterprise.management_console %}.

Para evitar que fiquem grandes demais, os pacotes só têm logs que não passaram por rotação nem compactação. A rotação de arquivos de log no {% data variables.product.prodname_ghe_server %} acontece em várias frequências (diária ou semanalmente) para diferentes arquivos, dependendo das expectativas de tamanho dos logs.

### Criar um pacote de suporte estendido usando SSH

Você pode usar essas etapas para criar e compartilhar um pacote de suporte estendido se você tiver acesso de SSH ao {% data variables.product.product_location %} e tiver acesso à internet de saída.

1. Baixe o pacote de suporte estendido via SSH adicionando o sinalizador `-x` ao comando `ghe-support-bundle`:
  ```shell
  $ ssh -p 122 admin@<em>hostname</em> -- 'ghe-support-bundle -o -x' > support-bundle.tgz
  ```
{% data reusables.enterprise_enterprise_support.sign-in-to-support %}
{% data reusables.enterprise_enterprise_support.upload-support-bundle %}

### Fazer upload de um pacote de suporte estendido usando SSH

Você pode fazer upload diretamente de um pacote de suporte para o nosso servidor nas seguintes situações:
- Você tem acesso de SSH a {% data variables.product.product_location %}.
- São permitidas conexões HTTPS de saída sobre a por meio da porta TCP 443 de {% data variables.product.product_location %} para _enterprise-bundles.github.com_ e _esbtoolsproduction.blob.core.windows.net_.

1. Faça upload do pacote para o nosso servidor de pacotes de suporte:
  ```shell
  $ ssh -p122 admin@<em>hostname</em> -- 'ghe-support-bundle -u -x'
  ```

## Leia mais

- "[About GitHub Support](/support/learning-about-github-support/about-github-support)"
