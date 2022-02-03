---
title: Metrics
intro: 'The repository metrics API allows you to retrieve community profile, statistics, and traffic for your repository.'
allowTitleToDifferFromFilename: true
redirect_from:
  - /rest/reference/repository-metrics
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - API
miniTocMaxHeadingLevel: 3
---

{% for operation in currentRestOperations %}
  {% unless operation.subcategory %}{% include rest_operation %}{% endunless %}
{% endfor %}

{% ifversion fpt or ghec %}
## 社区

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'community' %}{% include rest_operation %}{% endif %}
{% endfor %}

{% endif %}

## 统计

仓库统计 API 允许您获取 {% data variables.product.product_name %} 用于可视化不同类型仓库活动的数据。

### 谈一谈缓存

计算仓库统计信息是一项昂贵的操作，所以我们尽可能返回缓存的数据。  如果您查询仓库的统计信息时，数据尚未缓存，您将会收到 `202` 响应；同时触发后台作业以开始编译这些统计信息。 稍等片刻，待作业完成，然后再次提交请求。 如果作业已完成，该请求将返回 `200` 响应，响应正文中包含统计信息。

仓库统计信息由仓库默认分支的 SHA 缓存；推送到默认分支将重置统计信息缓存。

### 统计排除某些类型的提交

API 公开的统计信息与[各种仓库图](/github/visualizing-repository-data-with-graphs/about-repository-graphs)显示的统计信息相匹配。

总结：
- 所有统计信息都排除合并提交。
- 参与者统计信息还排除空提交。

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'statistics' %}{% include rest_operation %}{% endif %}
{% endfor %}

{% ifversion fpt or ghec %}
## 流量

对于您具有推送权限的仓库，流量 API 提供对仓库图中所示信息的访问权限。 更多信息请参阅“<a href="/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository" class="dotcom-only">查看仓库的流量</a>”。

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'traffic' %}{% include rest_operation %}{% endif %}
{% endfor %}
{% endif %}
