---
title: ワークフローをトリガーするイベント
intro: '{% data variables.product.product_name %} で特定のアクティビティが実行された時、スケジュールした時間、または {% data variables.product.product_name %} 外でイベントが発生した時にワークフローを実行できるよう設定できます。'
miniTocMaxHeadingLevel: 3
redirect_from:
  - /articles/events-that-trigger-workflows
  - /github/automating-your-workflow-with-github-actions/events-that-trigger-workflows
  - /actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows
  - /actions/reference/events-that-trigger-workflows
  - /actions/learn-github-actions/events-that-trigger-workflows
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
shortTitle: ワークフローをトリガーするイベント
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## About workflow triggers

Workflow triggers are events that cause a workflow to run. These events can be:

- Events that occur in your workflow's repository
- Events that occur outside of {% data variables.product.product_name %} and trigger a `repository_dispatch` event on {% data variables.product.product_name %}
- Scheduled times
- Manual

For example, you can configure your workflow to run when a push is made to the default branch of your repository, when a release is created, or when an issue is opened.

Workflow triggers are defined with the `on` key. 詳しい情報については、「[{% data variables.product.prodname_actions %} のワークフロー構文](/articles/workflow-syntax-for-github-actions#on)」を参照してください。

ワークフローの実行がトリガーされるには、以下のステップが生じます。

1. An event occurs on your repository. The event has an associated commit SHA and Git ref.
1. {% data variables.product.product_name %} searches the `.github/workflows` directory in your repository for workflow files that are present in the associated commit SHA or Git ref of the event.

1. A workflow run is triggered for any workflows that have `on:` values that match the triggering event. Some events also require the workflow file to be present on the default branch of the repository in order to run.

  Each workflow run will use the version of the workflow that is present in the associated commit SHA or Git ref of the event. ワークフローを実行すると、{% data variables.product.product_name %} はランナー環境において `GITHUB_SHA` (コミット SHA) および `GITHUB_REF` (Git ref) 環境変数を設定します。 詳しい情報については、「[環境変数の利用](/actions/automating-your-workflow-with-github-actions/using-environment-variables)」を参照してください。

### Triggering a workflow from a workflow

{% data reusables.github-actions.actions-do-not-trigger-workflows %} 詳しい情報については「[GITHUB_TOKENでの認証](/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)」を参照してください。

If you do want to trigger a workflow from within a workflow run, you can use a personal access token instead of `GITHUB_TOKEN` to trigger events that require a token. 個人アクセストークンを作成し、それをシークレットとして保存する必要があります。 {% data variables.product.prodname_actions %}の利用コストを最小化するために、再帰的あるいは意図しないワークフローの実行が生じないようにしてください。 For more information about creating a personal access token, see "[Creating a personal access token](/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)." For more information about storing a personal access token as a secret, see "[Creating and storing encrypted secrets](/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)."

For example, the following workflow uses a personal access token (stored as a secret called `MY_TOKEN`) to add a label to an issue via {% data variables.product.prodname_cli %}. Any workflows that run when a label is added will run once this step is performed.

```yaml
on:
  issues:
    types:
      - opened

jobs:
  label_issue:
    runs-on: ubuntu-latest
    steps:
      - env:
          GITHUB_TOKEN: {% raw %}${{ secrets.MY_TOKEN }}{% endraw %}
          ISSUE_URL: {% raw %}${{ github.event.issue.html_url }}{% endraw %}
        run: |
          gh issue edit $ISSUE_URL --add-label "triage"
```

Conversely, the following workflow uses `GITHUB_TOKEN` to add a label to an issue. It will not trigger any workflows that run when a label is added.

```yaml
on:
  issues:
    types:
      - opened

jobs:
  label_issue:
    runs-on: ubuntu-latest
    steps:
      - env:
          GITHUB_TOKEN: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
          ISSUE_URL: {% raw %}${{ github.event.issue.html_url }}{% endraw %}
        run: |
          gh issue edit $ISSUE_URL --add-label "triage"
```

## Using events to trigger workflows

Use the `on` key to specify what events trigger your workflow. For more information about events you can use, see "[Available events](#available-events)" below.

{% data reusables.github-actions.actions-on-examples %}

## Using event information

Information about the event that triggered a workflow run is available in the `github.event` context. The properties in the `github.event` context depend on the type of event that triggered the workflow. For example, a workflow triggered when an issue is labeled would have information about the issue and label.

### Viewing all properties of an event

Reference the webhook event documentation for common properties and example payloads. 詳しい情報については、「[webhook イベントとペイロード](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)」を参照してください。

You can also print the entire `github.event` context to see what properties are available for the event that triggered your workflow:

```yaml
jobs:
  print_context:
    runs-on: ubuntu-latest
    steps:
      - env:
          EVENT_CONTEXT: {% raw %}${{ toJSON(github.event) }}{% endraw %}
        run: |
          echo $EVENT_CONTEXT
```

### Accessing and using event properties

You can use the `github.event` context in your workflow. For example, the following workflow runs when a pull request that changes `package*.json`, `.github/CODEOWNERS`, or `.github/workflows/**` is opened. If the pull request author (`github.event.pull_request.user.login`) is not `octobot` or `dependabot[bot]`, then the workflow uses the {% data variables.product.prodname_cli %} to label and comment on the pull request (`github.event.pull_request.number`).

```yaml
on:
  pull_request:
    types:
      - opened
    paths:
      - '.github/workflows/**'
      - '.github/CODEOWNERS'
      - 'package*.json'

jobs:
  triage:
    if: >-
      github.event.pull_request.user.login != 'octobot' &&
      github.event.pull_request.user.login != 'dependabot[bot]'
    runs-on: ubuntu-latest
    steps:
      - name: "Comment about changes we can't accept"
        env:
          GITHUB_TOKEN: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
          PR: {% raw %}${{ github.event.pull_request.html_url }}{% endraw %}
        run: |
          gh pr edit $PR --add-label 'invalid'
          gh pr comment $PR --body 'It looks like you edited `package*.json`, `.github/CODEOWNERS`, or `.github/workflows/**`. We do not allow contributions to these files. Please review our [contributing guidelines](https://github.com/octo-org/octo-repo/blob/main/CONTRIBUTING.md) for what contributions are accepted.'
```

For more information about contexts, see "[Contexts](/actions/learn-github-actions/contexts)." For more information about event payloads, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)."

## Further controlling how your workflow will run

If you want more granular control than events, event activity types, or event filters provide, you can use conditionals{% ifversion fpt or ghae or ghes > 3.1 or ghec %} and environments{% endif %} to control whether individual jobs or steps in your workflow will run.

### Using conditionals

You can use conditionals to further control whether jobs or steps in your workflow will run. For example, if you want the workflow to run when a specific label is added to an issue, you can trigger on the `issues labeled` event activity type and use a conditional to check what label triggered the workflow. The following workflow will run when any label is added to an issue in the workflow's repository, but the `run_if_label_matches` job will only execute if the label is named `bug`.

```yaml
on:
  issues:
    types:
      - labeled

jobs:
  run_if_label_matches:
    if: github.event.label.name == 'bug'
    runs-on: ubuntu-latest
    steps:
      - run: echo 'The label was bug'
```

For more information, see "[Expressions](/actions/learn-github-actions/expressions)."

{% ifversion fpt or ghae or ghes > 3.1 or ghec %}
### Using environments to manually trigger workflow jobs

If you want to manually trigger a specific job in a workflow, you can use an environment that requires approval from a specific team or user. First, configure an environment with required reviewers. For more information, see "[Using environments for deployment](/actions/deployment/targeting-different-environments/using-environments-for-deployment)." Then, reference the environment name in a job in your workflow using the `environment:` key. Any job referencing the environment will not run until at least one reviewer approves the job.

For example, the following workflow will run whenever there is a push to main. The `build` job will always run. The `publish` job will only run after the `build` job successfully completes (due to `needs: [build]`) and after all of the rules (including required reviewers) for the environment called `production` pass (due to `environment: production`).

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: build
        echo 'building'

  publish:
    needs: [build]
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: publish
        echo 'publishing'
```

{% note %}

{% data reusables.gated-features.environments %}

{% endnote %}
{% endif %}

## Available events

Some events have multiple activity types. For these events, you can specify which activity types will trigger a workflow run. For more information about what each activity type means, see "[Webhook events and payloads](/developers/webhooks-and-events/webhook-events-and-payloads)." Note that not all webhook events trigger workflows.

{% ifversion fpt or ghec or ghes > 3.3 or ghae-issue-4968  %}
### `branch_protection_rule`

| webhook イベントのペイロード                                                                                                      | アクティビティタイプ                                             | `GITHUB_SHA`      | `GITHUB_REF` |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------- | ------------ |
| [`branch_protection_rule`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#branch_protection_rule) | - `created`<br/>- `edited`<br/>- `deleted` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#branch_protection_rule)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when branch protection rules in the workflow repository are changed. For more information about branch protection rules, see "[About protected branches](/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)." For information about the branch protection rule APIs, see "[BranchProtectionRule](/graphql/reference/objects#branchprotectionrule)" in the GraphQL API documentation or "[Branches](/rest/reference/branches)" in the REST API documentation.


For example, you can run a workflow when a branch protection rule has been `created` or `deleted`:

```yaml
on:
  branch_protection_rule:
    types: [created, deleted]
```

{% endif %}

### `check_run`

| webhook イベントのペイロード                                                                             | アクティビティタイプ                                                                                  | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------- | ------------ |
| [`check_run`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#check_run) | - `created`<br/>- `rerequested`<br/>- `completed`<br/>-`requested_action` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#check_run)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when activity related to a check run occurs. チェックの実行は、個別のテストであり、チェックスイートの一機能です。 For information, see "[Getting started with the Checks API](/rest/guides/getting-started-with-the-checks-api)." For information about the check run APIs, see "[CheckRun](/graphql/reference/objects#checkrun)" in the GraphQL API documentation or "[Checks](/rest/reference/checks#runs)" in the REST API documentation.

たとえば、チェック実行が `rerequested` または `completed` であったときにワークフローを実行できます。

```yaml
on:
  check_run:
    types: [rerequested, completed]
```

### `check_suite`

| webhook イベントのペイロード                                                                                 | アクティビティタイプ    | `GITHUB_SHA`      | `GITHUB_REF` |
| -------------------------------------------------------------------------------------------------- | ------------- | ----------------- | ------------ |
| [`check_suite`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#check_suite) | - `completed` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#check_suite)." Although only the `started` activity type is supported, specifying the activity type will keep your workflow specific if more activity types are added in the future. {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

{% note %}

**ノート:** 再帰的なワークフローを避けるために、このイベントは{% data variables.product.prodname_actions %}によってチェックスイートが生成されている場合にはワークフローをトリガーしません。

{% endnote %}

Runs your workflow when check suite activity occurs. A check suite is a collection of the check runs created for a specific commit. Check suites summarize the status and conclusion of the check runs that are in the suite. For information, see "[Getting started with the Checks API](/rest/guides/getting-started-with-the-checks-api)." For information about the check suite APIs, see "[CheckSuite](/graphql/reference/objects#checksuite)" in the GraphQL API documentation or "[Checks](/rest/reference/checks#suites)" in the REST API documentation.

For example, you can run a workflow when a check suite has been `completed`.

```yaml
on:
  check_suite:
    types: [completed]
```

### `create`

| webhook イベントのペイロード                                                                       | アクティビティタイプ | `GITHUB_SHA`           | `GITHUB_REF`   |
| ---------------------------------------------------------------------------------------- | ---------- | ---------------------- | -------------- |
| [`create`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#create) | n/a        | 直近でブランチまたはタグが作成されたコミット | 作成されたブランチまたはタグ |

{% note %}

**Note**: An event will not be created when you create more than three tags at once.

{% endnote %}

Runs your workflow when someone creates a Git reference (Git branch or tag) in the workflow's repository. For information about the APIs to create a Git reference, see "[createRef](/graphql/reference/mutations#createref)" in the GraphQL API documentation or "[Create a reference](/rest/reference/git#create-a-reference)" in the REST API documentation.

たとえば、`create` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  create
```

### `delete`

| webhook イベントのペイロード                                                                       | アクティビティタイプ | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------- | ---------- | ----------------- | ------------ |
| [`delete`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#delete) | n/a        | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% data reusables.github-actions.branch-requirement %}

{% note %}

**Note**: An event will not be created when you delete more than three tags at once.

{% endnote %}

Runs your workflow when someone deletes a Git reference (Git branch or tag) in the workflow's repository. For information about the APIs to delete a Git reference, see "[deleteRef](/graphql/reference/mutations#deleteref)" in the GraphQL API documentation or "[Delete a reference](/rest/reference/git#delete-a-reference)" in the REST API documentation.

たとえば、`delete` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  delete
```

### `deployment`

| webhook イベントのペイロード                                                                               | アクティビティタイプ | `GITHUB_SHA` | `GITHUB_REF`                                                      |
| ------------------------------------------------------------------------------------------------ | ---------- | ------------ | ----------------------------------------------------------------- |
| [`deployment`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#deployment) | n/a        | デプロイされるコミット  | Branch or tag to be deployed (empty if created with a commit SHA) |

Runs your workflow when someone creates a deployment in the workflow's repository. コミット SHA 付きで作成されたデプロイメントには Git ref がない場合があります。 For information about the APIs to create a deployment, see "[createDeployment](/graphql/reference/mutations#createdeployment)" in the GraphQL API documentation or "[Deployments](/rest/reference/repos#deployments)" in the REST API documentation.

たとえば、`deployment` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  deployment
```

### `deployment_status`

| webhook イベントのペイロード                                                                                             | アクティビティタイプ | `GITHUB_SHA` | `GITHUB_REF`                 |
| -------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ---------------------------- |
| [`deployment_status`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#deployment_status) | n/a        | デプロイされるコミット  | デプロイされるブランチまたはタグ (コミットの場合は空) |

{% note %}

**Note:** When a deployment status's state is set to `inactive`, a workflow run will not be triggered.

{% endnote %}

Runs your workflow when a third party provides a deployment status. コミット SHA 付きで作成されたデプロイメントには Git ref がない場合があります。 For information about the APIs to create a deployment status, see "[createDeploymentStatus](/graphql/reference/mutations#createdeploymentstatus)" in the GraphQL API documentation or "[Create a deployment status](/rest/reference/deployments#create-a-deployment-status)" in the REST API documentation.

たとえば、`deployment_status` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  deployment_status
```

{% ifversion fpt or ghec %}
### `ディスカッション`

| webhook イベントのペイロード                                                                             | アクティビティタイプ                                                                                                                                                                                                                                                                                              | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------ |
| [`ディスカッション`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#discussion) | - `created`<br/>- `edited`<br/>- `deleted`<br/>- `transferred`<br/>- `pinned`<br/>- `unpinned`<br/>- `labeled`<br/>- `unlabeled`<br/>- `locked`<br/>- `unlocked`<br/>- `category_changed`<br/> - `answered`<br/> - `unanswered` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#discussion)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

{% data reusables.webhooks.discussions-webhooks-beta %}

Runs your workflow when a discussion in the workflow's repository is created or modified. For activity related to comments on a discussion, use the [`discussion_comment`](#discussion_comment) event. For more information about discussions, see "[About discussions](/discussions/collaborating-with-your-community-using-discussions/about-discussions)." For information about the GraphQL API, see "[Discussion](/graphql/reference/objects#discussion)."

For example, you can run a workflow when a discussion has been `created`, `edited`, or `answered`.

```yaml
on:
  discussion:
    types: [created, edited, answered]
```

### `discussion_comment`

| webhook イベントのペイロード                                                                                     | アクティビティタイプ                                                        | `GITHUB_SHA`      | `GITHUB_REF` |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ----------------- | ------------ |
| [`discussion_comment`](/developers/webhooks-and-events/webhook-events-and-payloads#discussion_comment) | - `created`<br/>- `edited`<br/>- `deleted`<br/> | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#discussion_comment)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

{% data reusables.webhooks.discussions-webhooks-beta %}

Runs your workflow when a comment on a discussion in the workflow's repository is created or modified. For activity related to a discussion as opposed to comments on the discussion, use the [`discussion`](#discussion) event. For more information about discussions, see "[About discussions](/discussions/collaborating-with-your-community-using-discussions/about-discussions)." For information about the GraphQL API, see "[Discussion](/graphql/reference/objects#discussion)."

For example, you can run a workflow when a discussion comment has been `created` or `deleted`.

```yaml
on:
  discussion_comment:
    types: [created, deleted]
```

{% endif %}

### `フォーク`

| webhook イベントのペイロード                                                                   | アクティビティタイプ | `GITHUB_SHA`      | `GITHUB_REF` |
| ------------------------------------------------------------------------------------ | ---------- | ----------------- | ------------ |
| [`フォーク`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#fork) | n/a        | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when someone forks a repository. REST API の詳細については、「[フォークの作成](/rest/reference/repos#create-a-fork)」を参照してください。

たとえば、`fork` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  fork
```

### `gollum`

| webhook イベントのペイロード                                                                       | アクティビティタイプ | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------- | ---------- | ----------------- | ------------ |
| [`gollum`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#gollum) | n/a        | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when someone creates or updates a Wiki page. 詳細は「[ウィキについて](/communities/documenting-your-project-with-wikis/about-wikis)」を参照してください。

たとえば、`gollum` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  gollum
```

### `issue_comment`

| webhook イベントのペイロード                                                                           | アクティビティタイプ                                                        | `GITHUB_SHA`      | `GITHUB_REF` |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------- | ------------ |
| [`issue_comment`](/developers/webhooks-and-events/webhook-events-and-payloads#issue_comment) | - `created`<br/>- `edited`<br/>- `deleted`<br/> | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when an issue or pull request comment is created, edited, or deleted. For information about the issue comment APIs, see "[IssueComment](/graphql/reference/objects#issuecomment)" in the GraphQL API documentation or "[Issue comments](/developers/webhooks-and-events/webhook-events-and-payloads#issue_comment)" in the REST API documentation.

For example, you can run a workflow when an issue or pull request comment has been `created` or `deleted`.

```yaml
on:
  issue_comment:
    types: [created, deleted]
```

#### `issue_comment` on issues only or pull requests only

`issue_comment`イベントは、IssueやPull Requestにコメントされたときに生じます。 You can use the `github.event.issue.pull_request` property in a conditional to take different action depending on whether the triggering object was an issue or pull request.

For example, this workflow will run the `pr_commented` job only if the `issue_comment` event originated from a pull request. It will run the `issue_commented` job only if the `issue_comment` event originated from an issue.

```yaml
on: issue_comment

jobs:
  pr_commented:
    # This job only runs for pull request comments
    name: PR comment
    if: {% raw %}${{ github.event.issue.pull_request }}{% endraw %}
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo A comment on PR $NUMBER
        env:
          NUMBER: {% raw %}${{ github.event.issue.number }}{% endraw %}

  issue_commented:
    # This job only runs for issue comments
    name: Issue comment
    if: {% raw %}${{ !github.event.issue.pull_request }}{% endraw %}
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo A comment on issue $NUMBER
        env:
          NUMBER: {% raw %}${{ github.event.issue.number }}{% endraw %}
```

### `issues`

| webhook イベントのペイロード                                                                       | アクティビティタイプ                                                                                                                                                                                                                                                                                                                                                             | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------ |
| [`issues`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#issues) | - `opened`<br/>- `edited`<br/>- `deleted`<br/>- `transferred`<br/>- `pinned`<br/>- `unpinned`<br/>- `closed`<br/>- `reopened`<br/>- `assigned`<br/>- `unassigned`<br/>- `labeled`<br/>- `unlabeled`<br/>- `locked`<br/>- `unlocked`<br/>- `milestoned`<br/> - `demilestoned` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#issues)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when an issue in the workflow's repository is created or modified. For activity related to comments in an issue, use the [`issue_comment`](#issue_comment) event. Issue に関する詳しい情報については「[Issue について](/issues/tracking-your-work-with-issues/about-issues)」を参照してください。 For information about the issue APIs, see "[Issue](/graphql/reference/objects#issue)" in the GraphQL API documentation or "[Issues](/rest/reference/issues)" in the REST API documentation.

たとえば、Issue が `opened`、`edited`、または `milestoned` だったときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  issues:
    types: [opened, edited, milestoned]
```

### `ラベル`

| webhook イベントのペイロード                                                                   | アクティビティタイプ                                                        | `GITHUB_SHA`      | `GITHUB_REF` |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ----------------- | ------------ |
| [`ラベル`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#label) | - `created`<br/>- `edited`<br/>- `deleted`<br/> | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#label)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when a label in your workflow's repository is created or modified. For more information about labels, see "[Managing labels](/issues/using-labels-and-milestones-to-track-work/managing-labels)." For information about the label APIs, see "[Label](/graphql/reference/objects#label)" in the GraphQL API documentation or "[Labels](/rest/reference/issues#labels)" in the REST API documentation.

If you want to run your workflow when a label is added to or removed from an issue, pull request, or discussion, use the `labeled` or `unlabeled` activity types for the [`issues`](#issues), [`pull_request`](#pull_request), [`pull_request_target`](#pull_request_target), or [`discussion`](#discussion) events instead.

たとえば、ラベルが `created` または `deleted` だったときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  label:
    types: [created, deleted]
```

### `マイルストーン`

| webhook イベントのペイロード                                                                           | アクティビティタイプ                                                                                                  | `GITHUB_SHA`      | `GITHUB_REF` |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------- | ------------ |
| [`マイルストーン`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#milestone) | - `created`<br/>- `closed`<br/>- `opened`<br/>- `edited`<br/>- `deleted`<br/> | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#milestone)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when a milestone in the workflow's repository is created or modified. For more information about milestones, see "[About milestones](/issues/using-labels-and-milestones-to-track-work/about-milestones)." For information about the milestone APIs, see "[Milestone](/graphql/reference/objects#milestone)" in the GraphQL API documentation or "[Milestones](/rest/reference/issues#milestones)" in the REST API documentation.

If you want to run your workflow when an issue is added to or removed from a milestone, use the `milestoned` or `demilestoned` activity types for the [`issues`](#issues) event instead.

たとえばマイルストーンが`opened`あるいは`deleted`になったときにワークフローを実行できます。

```yaml
on:
  milestone:
    types: [opened, deleted]
```

### `page_build`

| webhook イベントのペイロード                                                                               | アクティビティタイプ | `GITHUB_SHA`      | `GITHUB_REF` |
| ------------------------------------------------------------------------------------------------ | ---------- | ----------------- | ------------ |
| [`page_build`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#page_build) | n/a        | デフォルトブランチの直近のコミット | n/a          |

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when someone pushes to a branch that is the publishing source for {% data variables.product.prodname_pages %}, if {% data variables.product.prodname_pages %} is enabled for the repository. For more information about {% data variables.product.prodname_pages %} publishing sources, see "[Configuring a publishing source for your GitHub Pages site](/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source)." REST API の詳細については、「[ページ](/rest/reference/repos#pages)」を参照してください。

たとえば、`page_build` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  page_build
```

### `project`

| webhook イベントのペイロード                                                                         | アクティビティタイプ                                                                                                    | `GITHUB_SHA`      | `GITHUB_REF` |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------- | ------------ |
| [`project`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#project) | - `created`<br/>- `closed`<br/>- `reopened`<br/>- `edited`<br/>- `deleted`<br/> | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} The `edited` activity type refers to when a project board, not a column or card on the project board, is edited. For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#project)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

{% note %}

**Note**: This event only occurs for projects owned by the workflow's repository, not for organization-owned or user-owned projects or for projects owned by another repository.

{% endnote %}

{% ifversion fpt or ghec %}
{% note %}

**Note**: This event does not occur for projects (beta). For more information, see "[About projects (beta)](/issues/trying-out-the-new-projects-experience/about-projects)."

{% endnote %}
{% endif %}

Runs your workflow when a project board is created or modified. For activity related to cards or columns in a project board, use the [`project_card`](#project_card) or [`project_column`](#project_column) events instead. For more information about project boards, see "[About project boards](/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)." For information about the project board APIs, see "[Project](/graphql/reference/objects#project)" in the GraphQL API documentation or "[Projects](/rest/reference/projects)" in the REST API documentation.

たとえば、プロジェクトが `created` または `deleted` だったときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  project:
    types: [created, deleted]
```

### `project_card`

| webhook イベントのペイロード                                                                                   | アクティビティタイプ                                                                                                     | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------- | ------------ |
| [`project_card`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#project_card) | - `created`<br/>- `moved`<br/>- `converted` to an issue<br/>- `edited`<br/>- `deleted` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#project_card)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

{% note %}

**Note**: This event only occurs for projects owned by the workflow's repository, not for organization-owned or user-owned projects or for projects owned by another repository.

{% endnote %}

{% ifversion fpt or ghec %}
{% note %}

**Note**: This event does not occur for projects (beta). For more information, see "[About projects (beta)](/issues/trying-out-the-new-projects-experience/about-projects)."

{% endnote %}
{% endif %}

Runs your workflow when a card on a project board is created or modified. For activity related to project boards or columns in a project board, use the [`project`](#project) or [`project_column`](#project_column) event instead. For more information about project boards, see "[About project boards](/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)." For information about the project card APIs, see "[ProjectCard](/graphql/reference/objects#projectcard)" in the GraphQL API documentation or "[Project cards](/rest/reference/projects#cards)" in the REST API documentation.

For example, you can run a workflow when a project card has been `created` or `deleted`.

```yaml
on:
  project_card:
    types: [created, deleted]
```

### `project_column`

| webhook イベントのペイロード                                                                                       | アクティビティタイプ                                                                  | `GITHUB_SHA`      | `GITHUB_REF` |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------- | ------------ |
| [`project_column`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#project_column) | - `created`<br/>- `updated`<br/>- `moved`<br/>- `deleted` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#project_column)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

{% note %}

**Note**: This event only occurs for projects owned by the workflow's repository, not for organization-owned or user-owned projects or for projects owned by another repository.

{% endnote %}

{% ifversion fpt or ghec %}
{% note %}

**Note**: This event does not occur for projects (beta). For more information, see "[About projects (beta)](/issues/trying-out-the-new-projects-experience/about-projects)."

{% endnote %}
{% endif %}

Runs your workflow when a column on a project board is created or modified. For activity related to project boards or cards in a project board, use the [`project`](#project) or [`project_card`](#project_card) event instead. For more information about project boards, see "[About project boards](/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)." For information about the project column APIs, see "[Project Column](/graphql/reference/objects#projectcolumn)" in the GraphQL API documentation or "[Project columns](/rest/reference/projects#columns)" in the REST API documentation.

たとえば、プロジェクト列が `created` または `deleted` だったときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  project_column:
    types: [created, deleted]
```

### `public`

| webhook イベントのペイロード                                                                       | アクティビティタイプ | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------- | ---------- | ----------------- | ------------ |
| [`public`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#public) | n/a        | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when your workflow's repository changes from private to public. REST API の詳細については、「[リポジトリの編集](/rest/reference/repos#edit)」を参照してください。

たとえば、`public` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  public
```

### `pull_request`

| webhook イベントのペイロード                                                                                   | アクティビティタイプ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `GITHUB_SHA`                  | `GITHUB_REF`                           |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------------------------------- |
| [`pull_request`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#pull_request) | - `assigned`<br/>- `unassigned`<br/>- `labeled`<br/>- `unlabeled`<br/>- `opened`<br/>- `edited`<br/>- `closed`<br/>- `reopened`<br/>- `synchronize`<br/>- `converted_to_draft`<br/>- `ready_for_review`<br/>- `locked`<br/>- `unlocked` <br/>- `review_requested` <br/>- `review_request_removed`{% ifversion fpt or ghes > 3.0 or ghae or ghec %} <br/>- `auto_merge_enabled` <br/>- `auto_merge_disabled`{% endif %} | `GITHUB_REF` ブランチ上の直近のマージコミット | PR マージブランチ `refs/pull/:prNumber/merge` |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request)." By default, a workflow only runs when a `pull_request` event's activity type is `opened`, `synchronize`, or `reopened`. You can specify different activity types using the `types` keyword. 詳しい情報については、「[{% data variables.product.prodname_actions %}のワークフロー構文](/articles/workflow-syntax-for-github-actions#onevent_nametypes)」を参照してください。

{% endnote %}

{% note %}

**Note:** By default, only the `opened`, `synchronize`, and `reopened` activity types trigger workflows that run on the `pull_request` event. To trigger workflows by different activity types, use the `types` keyword.

{% endnote %}

{% note %}

**Note:** Workflows will not run on `pull_request` activity if the pull request has a merge conflict. The merge conflict must be resolved first.

Conversely, workflows with the `pull_request_target` event will run even if the pull request has a merge conflict. Before using the `pull_request_target` trigger, you should be aware of the security risks. For more information, see [`pull_request_target`](#pull_request_target).

{% endnote %}

Runs your workflow when activity on a pull request in the workflow's repository occurs. For example, if no activity types are specified, the workflow runs when a pull request is opened or reopened or when the head branch of the pull request is updated. For activity related to pull request reviews, pull request review comments, or pull request comments, use the [`pull_request_review`](#pull_request_review), [`pull_request_review_comment`](#pull_request_review_comment), or [`issue_comment`](#issue_comment) events instead. For information about the pull request APIs, see "[PullRequest](/graphql/reference/objects#pullrequest)" in the GraphQL API documentation or "[Pull requests](/rest/reference/pulls)" in the REST API documentation.

Note that `GITHUB_SHA` for this event is the last merge commit of the pull request merge branch. If you want to get the commit ID for the last commit to the head branch of the pull request, use `github.event.pull_request.head.sha` instead.

For example, you can run a workflow when a pull request has been opened or reopened.

```yaml
on:
  pull_request:
    types: [opened, reopened]
```

You can use the event context to further control when jobs in your workflow will run. For example, this workflow will run when a review is requested on a pull request, but the `specific_review_requested` job will only run when a review by `octo-team` is requested.

```yaml
on:
  pull_request:
    types: [review_requested]
jobs:
  specific_review_requested:
    runs-on: ubuntu-latest
    if: {% raw %}${{ github.event.requested_team.name == 'octo-team'}}{% endraw %}
    steps:
      - run: echo 'A review from octo-team was requested'
```

#### Running your workflow based on the head or base branch of a pull request

You can use the `branches` or `branches-ignore` filter to configure your workflow to only run on pull requests that target specific branches. For more information, see "[Workflow syntax for GitHub Actions](/actions/learn-github-actions/workflow-syntax-for-github-actions#onpull_requestpull_request_targetbranchesbranches-ignore)."

For example, this workflow will run when someone opens a pull request that targets a branch whose name starts with `releases/`:

```yaml
on:
  pull_request:
    types:
      - opened
    branches:    
      - 'releases/**'
```

{% note %}

**Note:** {% data reusables.github-actions.branch-paths-filter %} For example, the following workflow will only run when a pull request that includes a change to a JavaScript (`.js`) file is opened on a branch whose name starts with `releases/`:

```yaml
on:
  pull_request:
    types:
      - opened
    branches:    
      - 'releases/**'
    paths:
      - '**.js'
```

{% endnote %}

To run a job based on the pull request's head branch name (as opposed to the pull request's base branch name), use the `github.head_ref` context in a conditional. For example, this workflow will run whenever a pull request is opened, but the `run_if` job will only execute if the head of the pull request is a branch whose name starts with `releases/`:

```yaml
on:
  pull_request:
    types:
      - opened
jobs:
  run_if:
    if:  startsWith(github.head_ref, 'releases/')
    runs-on: ubuntu-latest
    steps:
      - run: echo "The head of this PR starts with 'releases/'"
```

#### Running your workflow based on files changed in a pull request

You can also configure your workflow to run when a pull request changes specific files. For more information, see "[Workflow syntax for GitHub Actions](/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore)."

For example, this workflow will run when a pull request includes a change to a JavaScript file (`.js`):

```yaml
on:
  pull_request:
    paths:
      - '**.js'
```

{% note %}

**Note:** {% data reusables.github-actions.branch-paths-filter %} For example, the following workflow will only run when a pull request that includes a change to a JavaScript (`.js`) file is opened on a branch whose name starts with `releases/`:

```yaml
on:
  pull_request:
    types:
      - opened
    branches:    
      - 'releases/**'
    paths:
      - '**.js'
```

{% endnote %}

{% data reusables.developer-site.pull_request_forked_repos_link %}

### `pull_request_comment` (use `issue_comment`)

To run your workflow when a comment on a pull request (not on a pull request's diff) is created, edited, or deleted, use the [`issue_comment`](#issue_comment) event. For activity related to pull request reviews or pull request review comments, use the [`pull_request_review`](#pull_request_review) or [`pull_request_review_comment`](#pull_request_review_comment) events.

### `pull_request_review`

| webhook イベントのペイロード                                                                                                 | アクティビティタイプ                                                 | `GITHUB_SHA`                  | `GITHUB_REF`                           |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ----------------------------- | -------------------------------------- |
| [`pull_request_review`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#pull_request_review) | - `submitted`<br/>- `edited`<br/>- `dismissed` | `GITHUB_REF` ブランチ上の直近のマージコミット | PR マージブランチ `refs/pull/:prNumber/merge` |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_review)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

Runs your workflow when a pull request review is submitted, edited, or dismissed. A pull request review is a group of pull request review comments in addition to a body comment and a state. For activity related to pull request review comments or pull request comments, use the [`pull_request_review_comment`](#pull_request_review_comment) or [`issue_comment`](#issue_comment) events instead. For information about the pull request review APIs, see "[PullRequestReview](/graphql/reference/objects#pullrequest)" in the GraphQL API documentation or "[Pull request reviews](/rest/reference/pulls#reviews)" in the REST API documentation.

たとえば、プルリクエストレビューが `edited` または `dismissed` だったときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  pull_request_review:
    types: [edited, dismissed]
```

#### Running a workflow when a pull request is approved

To run your workflow when a pull request has been approved, you can trigger your workflow with the `submitted` type of `pull_request_review` event, then check the review state with the `github.event.review.state` property. For example, this workflow will run whenever a pull request review is submitted, but the `approved` job will only run if the submitted review is an approving review:

```yaml
on:
  pull_request_review:
    types: [submitted]

jobs:
  approved:
    if: github.event.review.state == 'approved'
    runs-on: ubuntu-latest
    steps:
      - run: echo "This PR was approved"
```

{% data reusables.developer-site.pull_request_forked_repos_link %}

### `pull_request_review_comment`

| webhook イベントのペイロード                                                                                                                 | アクティビティタイプ                                             | `GITHUB_SHA`                  | `GITHUB_REF`                           |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------- | -------------------------------------- |
| [`pull_request_review_comment`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#pull_request_review_comment) | - `created`<br/>- `edited`<br/>- `deleted` | `GITHUB_REF` ブランチ上の直近のマージコミット | PR マージブランチ `refs/pull/:prNumber/merge` |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_review_comment)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

Runs your workflow when a pull request review comment is modified. A pull request review comment is a comment on a pull request's diff. For activity related to pull request reviews or pull request comments, use the [`pull_request_review`](#pull_request_review) or [`issue_comment`](#issue_comment) events instead. For information about the pull request review comment APIs, see "[PullRequestReviewComment](/graphql/reference/objects#pullrequestreviewcomment)" in the GraphQL API documentation or "[Review comments](/rest/reference/pulls#comments)" in the REST API documentation.

たとえば、プルリクエストレビューコメントが `created` または `deleted` だったときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  pull_request_review_comment:
    types: [created, deleted]
```

{% data reusables.developer-site.pull_request_forked_repos_link %}

### `pull_request_target`

| webhook イベントのペイロード                                                                                   | アクティビティタイプ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `GITHUB_SHA`       | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------ |
| [`pull_request`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#pull_request) | - `assigned`<br/>- `unassigned`<br/>- `labeled`<br/>- `unlabeled`<br/>- `opened`<br/>- `edited`<br/>- `closed`<br/>- `reopened`<br/>- `synchronize`<br/>- `converted_to_draft`<br/>- `ready_for_review`<br/>- `locked`<br/>- `unlocked` <br/>- `review_requested` <br/>- `review_request_removed`{% ifversion fpt or ghes > 3.0 or ghae or ghec %} <br/>- `auto_merge_enabled` <br/>- `auto_merge_disabled`{% endif %} | PR ベースブランチの直近のコミット | PR ベースブランチ   |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_target)." デフォルトでは、ワークフローは、`pull_request_target` のアクティビティタイプが `opened`、`synchronize`、または `reopened` のときにのみ実行されます。 他のアクティビティタイプについてもワークフローをトリガーするには、`types` キーワードを使用してください。 You can specify different activity types using the `types` keyword. 詳しい情報については、「[{% data variables.product.prodname_actions %}のワークフロー構文](/articles/workflow-syntax-for-github-actions#onevent_nametypes)」を参照してください。

{% endnote %}

{% note %}

**Note:** By default, only the `opened`, `synchronize`, and `reopened` activity types trigger workflows that run on the `pull_request` event. To trigger workflows by different activity types, use the `types` keyword.

{% endnote %}

Runs your workflow when activity on a pull request in the workflow's repository occurs. For example, if no activity types are specified, the workflow runs when a pull request is opened or reopened or when the head branch of the pull request is updated.

This event runs in the context of the base of the pull request, rather than in the context of the merge commit, as the `pull_request` event does. This prevents execution of unsafe code from the head of the pull request that could alter your repository or steal any secrets you use in your workflow. This event allows your workflow to do things like label or comment on pull requests from forks. Avoid using this event if you need to build or run code from the pull request.

{% warning %}

**Warning:** For workflows that are triggered by the `pull_request_target` event, the `GITHUB_TOKEN` is granted read/write repository permission unless the `permissions` key is specified and the workflow can access secrets, even when it is triggered from a fork. ワークフローはPull Requestのベースのコンテキストで実行されますが、このイベントでPull Requestから信頼できないコードをチェックアウトしたり、ビルドしたり、実行したりしないようにしなければなりません。 Additionally, any caches share the same scope as the base branch. To help prevent cache poisoning, you should not save the cache if there is a possibility that the cache contents were altered. 詳細については、GitHub Security Lab Web サイトの「[GitHub Actions とワークフローを安全に保つ: pwn リクエストの防止](https://securitylab.github.com/research/github-actions-preventing-pwn-requests)」を参照してください。

{% endwarning %}

たとえば、プルリクエストが `assigned`、`opened`、`synchronize`、または `reopened` だったときにワークフローを実行できます。

```yaml
on:
  pull_request_target:
    types: [assigned, opened, synchronize, reopened]
```

#### Running your workflow based on the head or base branch of a pull request

You can use the `branches` or `branches-ignore` filter to configure your workflow to only run on pull requests that target specific branches. For more information, see "[Workflow syntax for GitHub Actions](/actions/learn-github-actions/workflow-syntax-for-github-actions#onpull_requestpull_request_targetbranchesbranches-ignore)."

For example, this workflow will run when someone opens a pull request that targets a branch whose name starts with `releases/`:

```yaml
on:
  pull_request_target:
    types:
      - opened
    branches:    
      - 'releases/**'
```

{% note %}

**Note:** {% data reusables.github-actions.branch-paths-filter %} For example, the following workflow will only run when a pull request that includes a change to a JavaScript (`.js`) file is opened on a branch whose name starts with `releases/`:

```yaml
on:
  pull_request_target:
    types:
      - opened
    branches:    
      - 'releases/**'
    paths:
      - '**.js'
```

{% endnote %}

To run a job based on the pull request's head branch name (as opposed to the pull request's base branch name), use the `github.head_ref` context in a conditional. For example, this workflow will run whenever a pull request is opened, but the `run_if` job will only execute if the head of the pull request is a branch whose name starts with `releases/`:

```yaml
on:
  pull_request:
    types:
      - opened
jobs:
  run_if:
    if:  startsWith(github.head_ref, 'releases/')
    runs-on: ubuntu-latest
    steps:
      - run: echo "The head of this PR starts with 'releases/'"
```

#### Running your workflow based on files changed in a pull request

You can use the `paths` or `paths-ignore` filter to configure your workflow to run when a pull request changes specific files. For more information, see "[Workflow syntax for GitHub Actions](/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore)."

For example, this workflow will run when a pull request includes a change to a JavaScript file (`.js`):

```yaml
on:
  pull_request_target:
    paths:
      - '**.js'
```

{% note %}

**Note:** {% data reusables.github-actions.branch-paths-filter %} For example, the following workflow will only run when a pull request that includes a change to a JavaScript (`.js`) file is opened on a branch whose name starts with `releases/`:

```yaml
on:
  pull_request_target:
    types:
      - opened
    branches:    
      - 'releases/**'
    paths:
      - '**.js'
```

{% endnote %}

### `プッシュ`

| webhook イベントのペイロード                                                                   | アクティビティタイプ | `GITHUB_SHA`                                  | `GITHUB_REF` |
| ------------------------------------------------------------------------------------ | ---------- | --------------------------------------------- | ------------ |
| [`プッシュ`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#push) | n/a        | プッシュされたコミット、ただし (デフォルトブランチの際に) ブランチを削除する場合を除く | 更新された ref    |

{% note %}

**ノート：** GitHub Actionsが利用できるwebhookのペイロードには、`commit`オブジェクト中の`added`、`removed`、`modified`属性は含まれません。 You can retrieve the full commit object using the API. For information, see "[Commit](/graphql/reference/objects#commit)" in the GraphQL API documentation or "[Get a commit](/rest/reference/commits#get-a-commit)" in the REST API documentation.

{% endnote %}

{% note %}

**Note**: An event will not be created when you push more than three tags at once.

{% endnote %}

Runs your workflow when you push a commit or tag.

たとえば、`push` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  push
```

#### Running your workflow only when a push to specific branches occurs

You can use the `branches` or `branches-ignore` filter to configure your workflow to only run when specific branches are pushed. For more information, see "[Workflow syntax for GitHub Actions](/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushbranchestagsbranches-ignoretags-ignore)."

For example, this workflow will run when someone pushes to `main` or to a branch that starts with `releases/`.

```yaml
on:
  push:
    branches:    
      - 'main'
      - 'releases/**'
```

{% note %}

**Note:** {% data reusables.github-actions.branch-paths-filter %} For example, the following workflow will only run when a push that includes a change to a JavaScript (`.js`) file is made to a branch whose name starts with `releases/`:

```yaml
on:
  push:
    types:
      - opened
    branches:    
      - 'releases/**'
    paths:
      - '**.js'
```

{% endnote %}

#### Running your workflow only when a push of specific tags occurs

You can use the `tags` or `tags-ignore` filter to configure your workflow to only run when specific tags or are pushed. For more information, see "[Workflow syntax for GitHub Actions](/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushbranchestagsbranches-ignoretags-ignore)."

For example, this workflow will run when someone pushes a tag that starts with `v1.`.

```yaml
on:
  push:
    tags:        
      - v1.**
```

#### Running your workflow only when a push affects specific files

You can use the `paths` or `paths-ignore` filter to configure your workflow to run when a push to specific files occurs. For more information, see "[Workflow syntax for GitHub Actions](/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore)."

For example, this workflow will run when someone pushes a change to a JavaScript file (`.js`):

```yaml
on:
  push:
    paths:
      - '**.js'
```

{% note %}

**Note:** {% data reusables.github-actions.branch-paths-filter %} For example, the following workflow will only run when a push that includes a change to a JavaScript (`.js`) file is made to a branch whose name starts with `releases/`:

```yaml
on:
  push:
    types:
      - opened
    branches:    
      - 'releases/**'
    paths:
      - '**.js'
```

{% endnote %}

### `registry_package`

| webhook イベントのペイロード                                                                                  | アクティビティタイプ                          | `GITHUB_SHA`    | `GITHUB_REF`          |
| --------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------- | --------------------- |
| [`registry_package`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#package) | - `published`<br/>- `updated` | 公開されたパッケージのコミット | 公開されたパッケージのブランチもしくはタグ |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#registry_package)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when activity related to {% data variables.product.prodname_registry %} occurs in your repository. For more information, see "[{% data variables.product.prodname_registry %} Documentation](/packages)."

たとえば、パッケージが`published`されたときにワークフローを実行できます。

```yaml
on:
  registry_package:
    types: [published]
```

### `リリース`

| webhook イベントのペイロード                                                                      | アクティビティタイプ                                                                                                                                                      | `GITHUB_SHA`       | `GITHUB_REF` |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------ |
| [`リリース`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#release) | - `published` <br/>- `unpublished` <br/>- `created` <br/>- `edited` <br/>- `deleted` <br/>- `prereleased`<br/> - `released` | リリースのタグが付いた直近のコミット | リリースのタグ      |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#release)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% note %}

**Note:** Workflows are not triggered for the `created`, `edited`, or `deleted` activity types for draft releases. When you create your release through the {% data variables.product.product_name %} browser UI, your release may automatically be saved as a draft.

{% endnote %}

{% note %}

**注釈:** `prereleased` タイプは、ドラフトリリースから公開されたプレリリースではトリガーされませんが、`published` タイプはトリガーされます。 安定版*および*プレリリースの公開時にワークフローを実行する場合は、`released` および `prereleased` ではなく `published` にサブスクライブします。

{% endnote %}

Runs your workflow when release activity in your repository occurs. For information about the release APIs, see "[Release](/graphql/reference/objects#release)" in the GraphQL API documentation or "[Releases](/rest/reference/repos#releases)" in the REST API documentation.

たとえば、リリースが `published` だったときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  release:
    types: [published]
```

### `repository_dispatch`

| webhook イベントのペイロード                                                                                               | アクティビティタイプ | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------------------------------- | ---------- | ----------------- | ------------ |
| [repository_dispatch](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#repository_dispatch) | カスタム       | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% data reusables.github-actions.branch-requirement %}

You can use the {% data variables.product.product_name %} API to trigger a webhook event called [`repository_dispatch`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#repository_dispatch) when you want to trigger a workflow for activity that happens outside of {% data variables.product.product_name %}. 詳細については、「[リポジトリディスパッチ イベントの作成](/rest/reference/repos#create-a-repository-dispatch-event)」を参照してください。

When you make a request to create a `repository_dispatch` event, you must specify an `event_type` to describe the activity type. By default, all `repository_dispatch`  activity types trigger a workflow to run. You can use the `types` keyword to limit your workflow to run when a specific `event_type` value is sent in the `repository_dispatch` webhook payload.

```yaml
on:
  repository_dispatch:
    types: [on-demand-test]
```

Any data that you send through the `client_payload` parameter will be available in the `github.event` context in your workflow. For example, if you send this request body when you create a repository dispatch event:

```json
{
  "event_type": "test_result",
  "client_payload": {
    "passed": false,
    "message": "Error: timeout"
  }
}
```

then you can access the payload in a workflow like this:

```yaml
on:
  repository_dispatch:
    types: [test_result]

jobs:
  run_if_failure:
    if: {% raw %}${{ !github.event.client_payload.passed }}{% endraw %}
    runs-on: ubuntu-latest
    steps:
      - env:
          MESSAGE: {% raw %}${{ github.event.client_payload.message }}{% endraw %}
        run: echo $MESSAGE
```

### `スケジュール`

| webhook イベントのペイロード | アクティビティタイプ | `GITHUB_SHA`      | `GITHUB_REF`                                                                                                                                                                                                                                                                          |
| ------------------ | ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| n/a                | n/a        | デフォルトブランチの直近のコミット | デフォルトブランチ | スケジュールしたワークフローを実行するよう設定したとき。 スケジュールしたワークフローは、[POSIX クーロン構文](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)を使用します。 詳しい情報については、「[イベントでワークフローをトリガーする](/articles/configuring-a-workflow/#triggering-a-workflow-with-events)」を参照してください。 |

{% data reusables.actions.schedule-delay %}

`schedule` イベントを使用すると、スケジュールされた時間にワークフローをトリガーできます。

{% data reusables.repositories.actions-scheduled-workflow-example %}

クーロン構文では、スペースで分けられた 5 つのフィールドがあり、各フィールドは時間の単位を表わします。

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
│ │ │ │ │
│ │ │ │ │
│ │ │ │ │
* * * * *
```

5 つのフィールドいずれにおいても、以下の演算子を使用できます:

| 演算子 | 説明         | サンプル                                                             |
| --- | ---------- | ---------------------------------------------------------------- |
| *   | 任意の値       | `15 * * * *` runs at every minute 15 of every hour of every day. |
| ,   | 値リストの区切り文字 | `2,10 4,5 * * *` 毎日、午前 4 時および午前 5 時の、2 分および 10 分に実行します。          |
| -   | 値の範囲       | `30 4-6 * * *` runs at minute 30 of the 4th, 5th, and 6th hour.  |
| /   | ステップ値      | `20/15 * * * *` 20 分から 59 分までの間で、15 分おきに実行します (20 分、35 分、50 分)。  |

{% note %}

**注釈:** {% data variables.product.prodname_actions %} は、非標準的構文　(`@yearly`、`@monthly`、`@weekly`、`@daily`、`@hourly`、`@reboot`) をサポートしていません。

{% endnote %}

[crontab guru](https://crontab.guru/) を使うと、クーロン構文の生成および実行時間の確認に役立ちます。 また、クーロン構文の生成を支援するため、[crontab guru のサンプル](https://crontab.guru/examples.html)リストもあります。

ワークフロー内のクーロン構文を最後に修正したユーザには、スケジュールされたワークフローの通知が送られます。 For more information, see "[Notifications for workflow runs](/actions/guides/about-continuous-integration#notifications-for-workflow-runs)."

### `ステータス`

| webhook イベントのペイロード                                                                      | アクティビティタイプ | `GITHUB_SHA`      | `GITHUB_REF` |
| --------------------------------------------------------------------------------------- | ---------- | ----------------- | ------------ |
| [`ステータス`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#status) | n/a        | デフォルトブランチの直近のコミット | n/a          |

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when the status of a Git commit changes. For example, commits can be marked as `error`, `failure`, `pending`, or `success`. If you want to provide more details about the status change, you may want to use the [`check_run`](#check_run) event. For information about the commit status APIs, see "[Status](/graphql/reference/objects#statue)" in the GraphQL API documentation or "[Statuses](/rest/reference/commits#commit-statuses)" in the REST API documentation.

たとえば、`status` イベントが発生したときにワークフローを実行する例は、次のとおりです。

```yaml
on:
  status
```

If you want to run a job in your workflow based on the new commit state, you can use the `github.event.state` context. For example, the following workflow triggers when a commit status changes, but the `if_error_or_failure` job only runs if the new commit state is `error` or `failure`.

```yaml
on:
  status
jobs:
  if_error_or_failure:
    runs-on: ubuntu-latest
    if: >-
      github.event.state == 'error' ||
      github.event.state == 'failure'
    steps:
      - env:
          DESCRIPTION: {% raw %}${{ github.event.description }}{% endraw %}
        run: |
          echo The status is error or failed: $DESCRIPTION
```

### `Watch`

| webhook イベントのペイロード                                                                     | アクティビティタイプ  | `GITHUB_SHA`      | `GITHUB_REF` |
| -------------------------------------------------------------------------------------- | ----------- | ----------------- | ------------ |
| [`Watch`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#watch) | - `started` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} Although only the `started` activity type is supported, specifying the activity type will keep your workflow specific if more activity types are added in the future. For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#watch)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

Runs your workflow when the workflow's repository is starred. For information about the pull request APIs, see "[addStar](/graphql/reference/mutations#addstar)" in the GraphQL API documentation or "[Starring](/rest/reference/activity#starring)" in the REST API documentation.

For example, you can run a workflow when someone stars a repository, which is the `started` activity type for a watch event.

```yaml
on:
  watch:
    types: [started]
```

{% ifversion fpt or ghes > 3.3 or ghae-issue-4757 or ghec %}

### `workflow_call`

| webhook イベントのペイロード          | アクティビティタイプ | `GITHUB_SHA`                | `GITHUB_REF`                |
| --------------------------- | ---------- | --------------------------- | --------------------------- |
| Same as the caller workflow | n/a        | Same as the caller workflow | Same as the caller workflow |

`workflow_call` is used to indicate that a workflow can be called by another workflow. When a workflow is triggered with the `workflow_call` event, the event playload in the called workflow is the same event payload from the calling workflow. For more information see, "[Reusing workflows](/actions/learn-github-actions/reusing-workflows)."

The example below only runs the workflow when it's called from another workflow:

```yaml
on: workflow_call
```

{% endif %}

### `workflow_dispatch`

| webhook イベントのペイロード                                                                                           | アクティビティタイプ | `GITHUB_SHA`               | `GITHUB_REF`    |
| ------------------------------------------------------------------------------------------------------------ | ---------- | -------------------------- | --------------- |
| [workflow_dispatch](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#workflow_dispatch) | n/a        | `GITHUB_REF` ブランチ上の直近のコミット | ディスパッチを受信したブランチ |

To manually trigger a workflow, use the `workflow_dispatch` event. You can manually trigger a workflow run using the {% data variables.product.product_name %} API, {% data variables.product.prodname_cli %}, or {% data variables.product.product_name %} browser interface. 詳しい情報については、「[ワークフローを手動で実行する](/actions/managing-workflow-runs/manually-running-a-workflow)」を参照してください。

```yaml
on: workflow_dispatch
```

#### Providing inputs

カスタム定義の入力プロパティ、デフォルトの入力値、イベントに必要な入力をワークフローで直接設定できます。 When you trigger the event, you can provide the `ref` and any `inputs`. ワークフローが実行されると、`github.event.inputs` コンテキストの入力値にアクセスできます。 詳細については、「[コンテキスト](/actions/learn-github-actions/contexts)」を参照してください。

{% ifversion fpt or ghec or ghes > 3.3 or ghae-issue-5511 %}
This example defines inputs called `logLevel`, `tags`, and `environment`. You pass values for these inputs to the workflow when you run it. This workflow then prints the values to the log, using the `github.event.inputs.logLevel`, `github.event.inputs.tags`, and  `github.event.inputs.environment` context properties.

{% raw %}
```yaml
on: 
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'     
        required: true
        default: 'warning' 
        type: choice
        options:
        - info
        - warning
        - debug 
      tags:
        description: 'Test scenario tags'
        required: false 
        type: boolean
      environment:
        description: 'Environment to run tests against'
        type: environment
        required: true 

jobs:
  log-the-inputs:
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "Log level: $LEVEL"
          echo "Tags: $TAGS"
          echo "Environment: $ENVIRONMENT"
        env:
          LEVEL: ${{ github.event.inputs.logLevel }}
          TAGS: ${{ github.event.inputs.tags }}
          ENVIRONMENT: ${{ github.event.inputs.environment }}
```
{% endraw %}

If you run this workflow from a browser you must enter values for the required inputs manually before the workflow will run.

![Entering inputs for a workflow](/assets/images/help/images/workflow-dispatch-inputs.png)

You can also pass inputs when you run a workflow from a script, or by using {% data variables.product.prodname_cli %}. 例:

```
gh workflow run run-tests.yml -f logLevel=warning -f tags=false -f environment=staging
```

For more information, see the {% data variables.product.prodname_cli %} information in "[Manually running a workflow](/actions/managing-workflow-runs/manually-running-a-workflow)."


{% else %}
この例では、 `name`と`home`の入力を定義し、`github.event.inputs.name`および`github.event.inputs.home`コンテキストを使用してそれらを出力します。 `home`が提供されなければ、デフォルト値の'The Octoverse'が出力されます。

```yaml
name: Manually triggered workflow
on:
  workflow_dispatch:
    inputs:
      name:
        description: 'Person to greet'
        required: true
        default: 'Mona the Octocat'
      home:
        description: 'location'
        required: false
        default: 'The Octoverse'

jobs:
  say_hello:
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo Hello $NAME!
          echo -in $HOME
        env:
          NAME: {% raw %}${{ github.event.inputs.name }}{% endraw %}
          HOME: {% raw %}${{ github.event.inputs.home }}{% endraw %}
```
{% endif %}

### `workflow_run`

| webhook イベントのペイロード                                                                                   | アクティビティタイプ                            | `GITHUB_SHA`      | `GITHUB_REF` |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------------- | ------------ |
| [`workflow_run`](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads/#workflow_run) | - `completed`<br/>- `requested` | デフォルトブランチの直近のコミット | デフォルトブランチ    |

{% note %}

**Note**: {% data reusables.developer-site.multiple_activity_types %} The `requested` activity type does no occur when a workflow is re-run. For information about each activity type, see "[Webhook events and payloads](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_run)." {% data reusables.developer-site.limit_workflow_to_activity_types %}

{% endnote %}

{% data reusables.github-actions.branch-requirement %}

{% note %}

**Note:** You can't use `workflow_run` to chain together more than three levels of workflows. For example, if you attempt to trigger five workflows (named `B` to `F`) to run sequentially after an initial workflow `A` has run (that is: `A` → `B` → `C` → `D` → `E` → `F`), workflows `E` and `F` will not be run.

{% endnote %}

This event occurs when a workflow run is requested or completed. It allows you to execute a workflow based on execution or completion of another workflow. `workflow_run`イベントによってStarされたワークフローは、以前のワークフローができなくても、シークレットや書き込みトークンにアクセスできます。 これは、以前のワークフローが意図的に権限を与えられていない場合に役立ちますが、権限を与えられたアクションは後のワークフローで行わなければなりません。

この例では、ワークフローは個別の「Run Tests」ワークフローの完了後に実行されるように設定されています。

```yaml
on:
  workflow_run:
    workflows: [Run Tests]
    types:
      - completed
```

If you specify multiple `workflows` for the `workflow_run` event, only one of the workflows needs to run. For example, a workflow with the following trigger will run whenever the "Staging" workflow or the "Lab" workflow completes.

```yaml
on:
  workflow_run:
    workflows: [Staging, Lab]
    types:
      - completed
```

#### Running a workflow based on the conclusion of another workflow

A workflow run is triggered regardless of the conclusion of the previous workflow. If you want to run a job or step based on the result of the triggering workflow, you can use a conditional with the `github.event.workflow_run.conclusion` property. For example, this workflow will run whenever a workflow named "Build" completes, but the `on-success` job will only run if the "Build" workflow succeeded, and the `on-failure` job will only run if the "Build" workflow failed:

```yaml
on:
  workflow_run:
    workflows: [Build]
    types: [completed]

jobs:
  on-success:
    runs-on: ubuntu-latest
    if: {% raw %}${{ github.event.workflow_run.conclusion == 'success' }}{% endraw %}
    steps:
      - run: echo 'The triggering workflow passed'
  on-failure:
    runs-on: ubuntu-latest
    if: {% raw %}${{ github.event.workflow_run.conclusion == 'failure' }}{% endraw %}
    steps:
      - run: echo 'The triggering workflow failed'
```

#### Limiting your workflow to run based on branches

You can use the `branches` or `branches-ignore` filter to specify what branches the triggering workflow must run on in order to trigger your workflow. For more information, see "[Workflow syntax for GitHub Actions](/actions/learn-github-actions/workflow-syntax-for-github-actions#onworkflow_runbranchesbranches-ignore)." For example, a workflow with the following trigger will only run when the workflow named `Build` runs on a branch named `canary`.

```yaml
on:
  workflow_run:
    workflows: [Build]
    types: [requested]
    branches: [canary]
```

#### Using data from the triggering workflow

You can access the [`workflow_run` event payload](/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_run) that corresponds to the workflow that triggered your workflow. For example, if your triggering workflow generates artifacts, a workflow triggered with the `workflow_run` event can access these artifacts.

The following workflow uploads data as an artifact. (In this simplified example, the data is the pull request number.)

```yaml
name: Upload data

on:
  pull_request:

jobs:
  upload:
    runs-on: ubuntu-latest

    steps:        
      - name: Save PR number
        env:
          PR_NUMBER: {% raw %}${{ github.event.number }}{% endraw %}
        run: |
          mkdir -p ./pr
          echo $PR_NUMBER > ./pr/pr_number
      - uses: actions/upload-artifact@v2
        with:
          name: pr_number
          path: pr/
```

When a run of the above workflow completes, it triggers a run of the following workflow. The following workflow uses the `github.event.workflow_run` context and the {% data variables.product.product_name %} REST API to download the artifact that was uploaded by the above workflow, unzips the downloaded artifact, and comments on the pull request whose number was uploaded as an artifact.

```yaml
name: Use the data

on:
  workflow_run:
    workflows: [Upload data]
    types:
      - completed

jobs:
  download:
    runs-on: ubuntu-latest
    steps:
      - name: 'Download artifact'
        uses: actions/github-script@v5
        with:
          script: |
            let allArtifacts = await github.rest.actions.listWorkflowRunArtifacts({
               owner: context.repo.owner,
               repo: context.repo.repo,
               run_id: context.payload.workflow_run.id,
            });
            let matchArtifact = allArtifacts.data.artifacts.filter((artifact) => {
              return artifact.name == "pr_number"
            })[0];
            let download = await github.rest.actions.downloadArtifact({
               owner: context.repo.owner,
               repo: context.repo.repo,
               artifact_id: matchArtifact.id,
               archive_format: 'zip',
            });
            let fs = require('fs');
            fs.writeFileSync(`${process.env.GITHUB_WORKSPACE}/pr_number.zip`, Buffer.from(download.data));

      - name: 'Unzip artifact'
        run: unzip pr_number.zip

      - name: 'Comment on PR'
        uses: actions/github-script@v5
        with:
          github-token: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
          script: |
            let fs = require('fs');
            let issue_number = Number(fs.readFileSync('./pr_number'));
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: issue_number,
              body: 'Thank you for the PR!'
            });
```
