
When using the `push` event, you can configure a workflow to run on specific branches or tags.

Use the `branches` filter when you want to include branch name patterns or when you want to both include and exclude branch names patterns. Use the `branches-ignore` filter when you only want to exclude branch name patterns. You cannot use both the `branches` and `branches-ignore` filters for the same event in a workflow.

Use the `tags` filter when you want to include tag name patterns or when you want to both include and exclude tag names patterns. Use the `tags-ignore` filter when you only want to exclude tag name patterns. You cannot use both the `tags` and `tags-ignore` filters for the same event in a workflow.

If you define only `tags`/`tag-ignore` or only `branches`/`branches-ignore`, the workflow won't run for events affecting the undefined Git ref. If you define neither  `tags`/`tag-ignore` or `branches`/`branches-ignore`, the workflow will run for events affecting either branches or tags. If you define both `branches`/`branches-ignore` and [`paths`](#onpushpull_requestpull_request_targetpathspaths-ignore), the workflow will only run when both filters are satisfied.

`branches`、`branches-ignore`、`tags` 和 `tags-ignore` 关键词接受使用 `*`、`**`、`+`、`?`、`!` 等字符匹配多个分支或标记名称的 glob 模式。 If a name contains any of these characters and you want a literal match, you need to *escape* each of these special characters with `\`. 有关 glob 模式的更多信息，请参阅“[过滤器模式备忘清单](/actions/using-workflows/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)”。

#### 示例：包括分支和标记

在 `branches` 和 `tags` 中定义的模式根据 Git ref 的名称进行评估。 For example, the following workflow would run whenever there is a `push` event to:

- A branch named `main` (`refs/heads/main`)
- A branch named `mona/octocat` (`refs/heads/mona/octocat`)
- A branch whose name starts with `releases/`, like `releases/10` (`refs/heads/releases/10`)
- A tag named `v2` (`refs/tags/v2`)
- A tag whose name starts with `v1.`, like `v1.9.1` (`refs/tags/v1.9.1`)

```yaml
on:
  push:
    # Sequence of patterns matched against refs/heads
    branches:    
      - main
      - 'mona/octocat'
      - 'releases/**'
    # Sequence of patterns matched against refs/tags
    tags:        
      - v2
      - v1.*
```

#### Example: Excluding branches and tags

When a pattern matches the `branches-ignore` or `tags-ignore` pattern, the workflow will not run. 在 `branches` 和 `tags` 中定义的模式根据 Git ref 的名称进行评估。 For example, the following workflow would run whenever there is a `push` event, unless the `push` event is to:

- A branch named `mona/octocat` (`refs/heads/mona/octocat`)
- A branch whose name matches `releases/**-alpha`, like `beta/3-alpha` (`refs/releases/beta/3-alpha`)
- A tag named `v2` (`refs/tags/v2`)
- A tag whose name starts with `v1.`, like `v1.9` (`refs/tags/v1.9`)

```yaml
on:
  push:
    # Sequence of patterns matched against refs/heads
    branches-ignore:    
      - 'mona/octocat'
      - 'releases/**-alpha'
    # Sequence of patterns matched against refs/tags
    tags-ignore:        
      - v2
      - v1.*
```

#### Example: Including and excluding branches and tags

You can't use `branches` and `branches-ignore` to filter the same event in a single workflow. Similarly, you can't use `tags` and `tags-ignore` to filter the same event in a single workflow. If you want to both include and exclude branch or tag patterns for a single event, use the `branches` or `tags` filter along with the `!` character to indicate which branches or tags should be excluded.

If you define a branch with the `!` character, you must also define at least one branch without the `!` character. If you only want to exclude branches, use `branches-ignore` instead. Similarly, if you define a tag with the `!` character, you must also define at least one tag without the `!` character. If you only want to exclude tags, use `tags-ignore` instead.

您定义模式事项的顺序。

- 肯定匹配后的匹配否定模式（前缀为 `!`）将排除 Git 引用。
- 否定匹配后的匹配肯定模式将再次包含 Git 引用。

以下工作流程将在到 `releases/10` 或 `releases/beta/mona` 的推送上运行，而不会在到 `releases/10-alpha` 或 `releases/beta/3-alpha` 的推送上运行，因为否定模式 `!releases/**-alpha` 后跟肯定模式。

```yaml
on:
  push:
    branches:
      - 'releases/**'
      - '!releases/**-alpha'
```
