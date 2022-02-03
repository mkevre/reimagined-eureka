Use `on.<event_name>.types` to define the type of activity that will trigger a workflow run. 大多数 GitHub 事件由多种活动触发。  For example, the `label` is triggered when a label is `created`, `edited`, or `deleted`. 通过 `types` 关键词可缩小触发工作流程运行的活动类型的范围。 如果只有一种活动类型可触发 web 挂钩事件，就没有必要使用 `types` 关键词。

您可以使用事件 `types` 的数组。 有关每个事件及其活动类型的更多信息，请参阅“[触发工作流程的事件](/actions/using-workflows/events-that-trigger-workflows#available-events)”。

```yaml
on:
  label:
    types: [created, edited]
```
