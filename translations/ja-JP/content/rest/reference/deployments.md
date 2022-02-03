---
title: デプロイメント
intro: 'The deployments API allows you to create and delete deploy keys, deployments, and deployment environments.'
allowTitleToDifferFromFilename: true
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - API
miniTocMaxHeadingLevel: 3
---

デプロイメントとは、特定の ref (ブランチ、SHA、タグ) を配備するためるリクエストです。 GitHub は、 外部サーバーがリッスンでき、新しいデプロイメントが作成されたときに実行される [`deployment` イベント](/developers/webhooks-and-events/webhook-events-and-payloads#deployment)をディスバッチします。 デプロイメントにより、開発者や Organization はデプロイメントを中心として、さまざまな種類のアプリケーション (ウェブ、ネイティブなど) を提供するための実装に関する詳細を気にすることなく、疎結合ツールを構築できます。

デプロイメントのステータスを使用すると、外部サービスがデプロイメントに `error`、`failure`、`pending`、`in_progress`、`queued`、`success` ステータスを付けることができ、[`deployment_status` イベント](/developers/webhooks-and-events/webhook-events-and-payloads#deployment_status)をリッスンするシステムがその情報を使用できます。

デプロイメントのステータスには、オプションとして `description` と `log_url` を含めることもできます。これによりデプロイメントのステータスがより有用なものになるので、非常におすすめです。 `log_url` はデプロイメントの出力の完全な URL で、`description` はデプロイメントで発生したことの概要を示すものです。

GitHub は、新しいデプロイメント、デプロイメントのステータスが作成されたときに、`deployment` イベント、`deployment_status` イベントをディスパッチします。 これらのイベントにより、サードパーティのインテグレーションがデプロイメントのリクエストに対する応答を受けとり、進展があるたびにステータスを更新できます。

以下は、これらの相互作用がどのように機能するかを示す簡単なシーケンス図です。

```
+---------+             +--------+            +-----------+        +-------------+
| Tooling |             | GitHub |            | 3rd Party |        | Your Server |
+---------+             +--------+            +-----------+        +-------------+
     |                      |                       |                     |
     |  Create Deployment   |                       |                     |
     |--------------------->|                       |                     |
     |                      |                       |                     |
     |  Deployment Created  |                       |                     |
     |<---------------------|                       |                     |
     |                      |                       |                     |
     |                      |   Deployment Event    |                     |
     |                      |---------------------->|                     |
     |                      |                       |     SSH+Deploys     |
     |                      |                       |-------------------->|
     |                      |                       |                     |
     |                      |   Deployment Status   |                     |
     |                      |<----------------------|                     |
     |                      |                       |                     |
     |                      |                       |   Deploy Completed  |
     |                      |                       |<--------------------|
     |                      |                       |                     |
     |                      |   Deployment Status   |                     |
     |                      |<----------------------|                     |
     |                      |                       |                     |
```

GitHub は、あなたのサーバーに実際にアクセスすることはないということは覚えておきましょう。 デプロイメントイベントとやり取りするかどうかは、サードパーティインテグレーション次第です。 複数のシステムがデプロイメントイベントをリッスンできます。コードをサーバーにプッシュする、ネイティブコードを構築するなどを行うかどうかは、それぞれのシステムが決めることができます。

Note that the `repo_deployment` [OAuth scope](/developers/apps/scopes-for-oauth-apps) grants targeted access to deployments and deployment statuses **without** granting access to repository code, while the {% ifversion not ghae %}`public_repo` and{% endif %}`repo` scopes grant permission to code as well.

### 非アクティブのデプロイメント

When you set the state of a deployment to `success`, then all prior non-transient, non-production environment deployments in the same repository with the same environment name will become `inactive`. これを回避するには、デプロイメントのステータスを作成する前に、`auto_inactive` を `false` に設定します。

`state` を `inactive` に設定することで、一時的な環境が存在しなくなったことを伝えることができます。  `state` を `inactive` に設定すると、{% data variables.product.prodname_dotcom %} でデプロイメントが `destroyed` と表示され、アクセス権が削除されます。

{% for operation in currentRestOperations %}
  {% unless operation.subcategory %}{% include rest_operation %}{% endunless %}
{% endfor %}

## デプロイメントステータス

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'statuses' %}{% include rest_operation %}{% endif %}
{% endfor %}

## デプロイキー

{% data reusables.repositories.deploy-keys %}

デプロイキーは、以下の API エンドポイントを使用するか、GitHub を使用することでセットアップできます。 GitHub でデプロイキーを設定する方法については、「[デプロイキーを管理する](/developers/overview/managing-deploy-keys)」を参照してください。

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'keys' %}{% include rest_operation %}{% endif %}
{% endfor %}

{% ifversion fpt or ghes > 3.1 or ghae or ghec %}
## 環境

Environments APIを使うと、環境を作成、設定、削除できます。 For more information about environments, see "[Using environments for deployment](/actions/deployment/using-environments-for-deployment)." 環境のシークレットの管理については「[シークレット](/rest/reference/actions#secrets)」を参照してください。

{% data reusables.gated-features.environments %}

{% for operation in currentRestOperations %}
  {% if operation.subcategory == 'environments' %}{% include rest_operation %}{% endif %}
{% endfor %}
{% endif %}
