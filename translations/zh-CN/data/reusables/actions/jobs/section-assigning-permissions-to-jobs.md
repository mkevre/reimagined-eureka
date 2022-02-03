You can use `permissions` to modify the default permissions granted to the `GITHUB_TOKEN`, adding or removing access as required, so that you only allow the minimum required access. 更多信息请参阅“[工作流程中的身份验证](/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token)。

您可以使用 `permissions` 作为顶级密钥，以应用于工作流程中的所有作业，或特定的作业。 当您在特定作业中添加 `permissions` 键时，该作业中的所有操作和运行命令使用 `GITHUB_TOKEN` 获取您指定的访问权限。  更多信息请参阅 [`jobs.<job_id>.permissions`](/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idpermissions)。

{% data reusables.github-actions.github-token-available-permissions %}
{% data reusables.github-actions.forked-write-permission %}

### Example: Assigning permissions to GITHUB_TOKEN

此示例显示为将要应用到工作流程中所有作业的 `GITHUB_TOKEN` 设置的权限。 所有权限都被授予读取权限。

```yaml
name: "My workflow"

on: [ push ]

permissions: read-all

jobs:
  ...
```
