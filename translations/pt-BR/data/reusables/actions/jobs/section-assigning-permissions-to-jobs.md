You can use `permissions` to modify the default permissions granted to the `GITHUB_TOKEN`, adding or removing access as required, so that you only allow the minimum required access. Para obter mais informações, consulte "[Autenticação em um fluxo de trabalho](/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token)".

Você pode usar as permissões de `` como uma chave de nível superior, para aplicar a todos os trabalhos do fluxo de trabalho ou em trabalhos específicos. Ao adicionar a chave das `permissões` em um trabalho específico, todas as ações e comandos de execução dentro desse trabalho que usam o `GITHUB_TOKEN` ganham os direitos de acesso que você especificar.  Para obter mais informações, consulte [`jobs.<job_id>.permissions`](/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idpermissions).

{% data reusables.github-actions.github-token-available-permissions %}
{% data reusables.github-actions.forked-write-permission %}

### Example: Assigning permissions to GITHUB_TOKEN

Este exemplo mostra as permissões que estão sendo definidas para o `GITHUB_TOKEN` que será aplicado a todos os trabalhos do fluxo de trabalho. É concedido acesso de leitura a todas as permissões.

```yaml
name: "My workflow"

on: [ push ]

permissions: read-all

jobs:
  ...
```
