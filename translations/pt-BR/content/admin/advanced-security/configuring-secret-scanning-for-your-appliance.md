---
title: Configurar a varredura de segredo para o seu dispositivo
shortTitle: Configurar a varredura de segredo
intro: 'Você pode habilitar, configurar e desabilitar {% data variables.product.prodname_secret_scanning %} para {% data variables.product.product_location %}. {% data variables.product.prodname_secret_scanning_caps %} permite aos usuários fazer a varredura de códigos para os segredos que se confirmaram acidentalmente.'
product: '{% data reusables.gated-features.secret-scanning %}'
miniTocMaxHeadingLevel: 3
redirect_from:
  - /admin/configuration/configuring-secret-scanning-for-your-appliance
versions:
  ghes: '*'
type: how_to
topics:
  - Advanced Security
  - Enterprise
  - Secret scanning
  - Security
---

{% data reusables.secret-scanning.beta %}

## Sobre o {% data variables.product.prodname_secret_scanning %}

{% data reusables.secret-scanning.about-secret-scanning %} Para obter mais informações, consulte "[Sobre {% data variables.product.prodname_secret_scanning %}](/github/administering-a-repository/about-secret-scanning).

## Verificando se a sua licença inclui {% data variables.product.prodname_GH_advanced_security %}

{% data reusables.advanced-security.check-for-ghas-license %}

## Pré-requisitos para {% data variables.product.prodname_secret_scanning %}


- É necessário habilitar o sinalizador de CPU das [SSSE3](https://www.intel.com/content/dam/www/public/us/en/documents/manuals/64-ia-32-architectures-optimization-manual.pdf#G3.1106470) (Extensões SIMD de Streaming Suplementar 3) no VM/KVM que executa {% data variables.product.product_location %}.

- Uma licença para {% data variables.product.prodname_GH_advanced_security %}{% ifversion ghes > 3.0 %} (consulte "[Sobre cobrança para {% data variables.product.prodname_GH_advanced_security %}](/billing/managing-billing-for-github-advanced-security/about-billing-for-github-advanced-security)"){% endif %}

- {% data variables.product.prodname_secret_scanning_caps %} habilitado no console de gerenciamento (consulte "[Habilitando {% data variables.product.prodname_GH_advanced_security %} para a sua empresa](/admin/advanced-security/enabling-github-advanced-security-for-your-enterprise)")

### Verificar suporte para o sinalizador SSSE3 nos seus vCPUs

O conjunto de instruções das SSSE3 é necessário porque o {% data variables.product.prodname_secret_scanning %} alavanca o padrão acelerado de hardware que corresponde para encontrar possíveis credenciais confirmadas com os seus repositórios de {% data variables.product.prodname_dotcom %}. SSSE3 está habilitado para a maioria das CPUs modernas. Você pode verificar se o SSSE3 está habilitado para oa vCPUs disponíveis para sua instância de {% data variables.product.prodname_ghe_server %}.

1. Conecte ao shell administrativo para sua instância de {% data variables.product.prodname_ghe_server %}. Para obter mais informações, consulte "[Acessar o shell administrativo (SSH)](/admin/configuration/accessing-the-administrative-shell-ssh)".
2. Insira o seguinte comando:

   ```shell
   grep -iE '^flags.*ssse3' /proc/cpuinfo >/dev/null | echo $?
   ```

   Se ele retornar o valor `0`, significa que o sinalizador SSSE3 está disponível e habilitado. Agora você pode habilitar {% data variables.product.prodname_secret_scanning %} para {% data variables.product.product_location %}. Para obter mais informações, consulte "[Habilitar {% data variables.product.prodname_secret_scanning %}](#enabling-secret-scanning)" abaixo.

   Se isso não retornar `0`, SSSE3 não está habilitado no seu VM/KVM. Você precisa consultar a documentação do hardware/hipervisor sobre como habilitar o sinalizador ou disponibilizá-lo para VMs convidados.

## Habilitar {% data variables.product.prodname_secret_scanning %}

{% data reusables.enterprise_management_console.enable-disable-security-features %}

{% data reusables.enterprise_site_admin_settings.access-settings %}
{% data reusables.enterprise_site_admin_settings.management-console %}
{% data reusables.enterprise_management_console.advanced-security-tab %}
1. Em "{% ifversion ghes < 3.2 %}{% data variables.product.prodname_advanced_security %}{% else %}Segurança{% endif %}", clique em **{% data variables.product.prodname_secret_scanning_caps %}**. ![Caixa de seleção para habilitar ou desabilitar {% data variables.product.prodname_secret_scanning %}](/assets/images/enterprise/management-console/enable-secret-scanning-checkbox.png)
{% data reusables.enterprise_management_console.save-settings %}

## Desabilitar {% data variables.product.prodname_secret_scanning %}

{% data reusables.enterprise_management_console.enable-disable-security-features %}

{% data reusables.enterprise_site_admin_settings.access-settings %}
{% data reusables.enterprise_site_admin_settings.management-console %}
{% data reusables.enterprise_management_console.advanced-security-tab %}
1. Em "{% ifversion ghes < 3.2 %}{% data variables.product.prodname_advanced_security %}{% else %}Segurança{% endif %}", desmarque **{% data variables.product.prodname_secret_scanning_caps %}**. ![Caixa de seleção para habilitar ou desabilitar {% data variables.product.prodname_secret_scanning %}](/assets/images/enterprise/management-console/secret-scanning-disable.png)
{% data reusables.enterprise_management_console.save-settings %}
