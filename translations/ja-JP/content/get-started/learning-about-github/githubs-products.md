---
title: GitHub の製品
intro: '{% data variables.product.prodname_dotcom %} の商品と価格プランの概要。'
redirect_from:
  - /articles/github-s-products
  - /articles/githubs-products
  - /github/getting-started-with-github/githubs-products
  - /github/getting-started-with-github/learning-about-github/githubs-products
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Accounts
  - CLI
  - Mobile
  - Desktop
  - Security
---

## About {% data variables.product.prodname_dotcom %}'s products

{% data variables.product.prodname_dotcom %} offers free and paid products for storing and collaborating on code. Some products apply only to user accounts, while other plans apply only to organization and enterprise accounts. For more information about accounts, see "[Types of {% data variables.product.prodname_dotcom %} accounts](/get-started/learning-about-github/types-of-github-accounts)."

各製品の料金と機能の全リストは <{% data variables.product.pricing_url %}> に掲載されています。 {% data reusables.products.product-roadmap %}

When you read {% data variables.product.prodname_docs %}, make sure to select the version that reflects your product. For more information, see "[About versions of {% data variables.product.prodname_docs %}](/get-started/learning-about-github/about-versions-of-github-docs)."

## ユーザアカウント用の{% data variables.product.prodname_free_user %}

ユーザアカウント用の{% data variables.product.prodname_free_team %}では、完全な機能セットを持つ無制限のパブリックリポジトリ上で無制限のコラボレータと、そして限定された機能セットを持つ無制限のプライベートリポジトリ上で作業ができます。

{% data variables.product.prodname_free_user %}では、ユーザアカウントには以下が含まれます。
- {% data variables.product.prodname_gcf %}
- {% data variables.product.prodname_dependabot_alerts %}
- 2 要素認証の強制
- 2,000 {% data variables.product.prodname_actions %} 分
- 500MBの{% data variables.product.prodname_registry %}ストレージ

## {% data variables.product.prodname_pro %}

ユーザアカウント用の{% data variables.product.prodname_free_user %}で利用できる機能に加え、{% data variables.product.prodname_pro %}には以下が含まれます。
- メールでの{% data variables.contact.github_support %}
- 3,000 {% data variables.product.prodname_actions %} 分
- 2GBの{% data variables.product.prodname_registry %}ストレージ
- プライベートリポジトリでの高度なツールとインサイト：
  - 必須のプルリクエストレビュー担当者
  - 複数のプルリクエストレビュー担当者
  - 保護されたブランチ
  - コードオーナー
  - 自動リンクされたリファレンス
  - {% data variables.product.prodname_pages %}
  - Wiki
  - リポジトリインサイトグラフ: パルス、コントリビューター、トラフィック、コミット、コード頻度、ネットワーク、およびフォーク

## Organization の {% data variables.product.prodname_free_team %}

Organizationの{% data variables.product.prodname_free_team %}では、完全な機能セットを持つ無制限のパブリックリポジトリ上で無制限のコラボレータ、あるいは限定された機能セットを持つ無制限のプライベートリポジトリで作業ができます。

ユーザアカウント用の{% data variables.product.prodname_free_user %}で利用できる機能に加えて、Organizationの{% data variables.product.prodname_free_team %}には以下が含まれます。
- {% data variables.product.prodname_gcf %}
- Team ディスカッション
- グループを管理するための Team アクセスコントロール
- 2,000 {% data variables.product.prodname_actions %} 分
- 500MBの{% data variables.product.prodname_registry %}ストレージ

## {% data variables.product.prodname_team %}

Organizationの{% data variables.product.prodname_free_team %}で利用できる機能に加えて、{% data variables.product.prodname_team %}には以下が含まれます。
- メールでの{% data variables.contact.github_support %}
- 3,000 {% data variables.product.prodname_actions %} 分
- 2GBの{% data variables.product.prodname_registry %}ストレージ
- プライベートリポジトリでの高度なツールとインサイト：
  - 必須のプルリクエストレビュー担当者
  - 複数のプルリクエストレビュー担当者
  - ドラフトプルリクエスト
  - Teamのプルリクエストレビュー担当者
  - 保護されたブランチ
  - コードオーナー
  - スケジュールされたリマインダー
  - {% data variables.product.prodname_pages %}
  - Wiki
  - リポジトリインサイトグラフ: パルス、コントリビューター、トラフィック、コミット、コード頻度、ネットワーク、およびフォーク
{% ifversion fpt or ghec %}
- The option to enable {% data variables.product.prodname_github_codespaces %}
  - Organization owners can enable {% data variables.product.prodname_github_codespaces %} for the organization by setting a spending limit and granting user permissions for members of their organization. For more information, see "[Enabling Codespaces for your organization](/codespaces/managing-codespaces-for-your-organization/enabling-codespaces-for-your-organization)."
{% endif %}

{% data reusables.github-actions.actions-billing %}

## {% data variables.product.prodname_enterprise %}

{% data variables.product.prodname_enterprise %} には、クラウドホストとセルフホストの 2 種類のデプロイメントオプションがあります。

{% data variables.product.prodname_team %} で利用可能な機能に加えて、{% data variables.product.prodname_enterprise %} には以下が含まれます。
- {% data variables.contact.enterprise_support %}
- 追加のセキュリティ、コンプライアンス、およびデプロイメントコントロール
- SAML シングルサインオンでの認証
- SAML または SCIM でのアクセスのプロビジョニング
- {% data variables.product.prodname_github_connect %}
- The option to purchase {% data variables.product.prodname_GH_advanced_security %}. 詳しい情報については、「[{% data variables.product.prodname_GH_advanced_security %} について](/github/getting-started-with-github/about-github-advanced-security)」を参照してください。

{% data variables.product.prodname_ghe_cloud %} には次も含まれます:
- {% data variables.contact.enterprise_support %}。 詳細は「<a href="/articles/github-enterprise-cloud-support" class="dotcom-only">{% data variables.product.prodname_ghe_cloud %} サポート</a>」および「<a href="/articles/github-enterprise-cloud-addendum" class="dotcom-only">{% data variables.product.prodname_ghe_cloud %} 補遺</a>」を参照してください。
- 50,000 {% data variables.product.prodname_actions %} 分
- 50GBの{% data variables.product.prodname_registry %}ストレージ
- {% data variables.product.prodname_pages %} サイトのアクセス制御。 詳しい情報については、「<a href="/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site" class="dotcom-only">{% data variables.product.prodname_pages %} サイトの可視性を変更する</a>」を参照してください。
- 99.9% の月次稼働時間を保証するサービスレベルアグリーメント
- The option to configure your enterprise for {% data variables.product.prodname_emus %}, so you can provision and manage members with your identity provider and restrict your member's contributions to just your enterprise. For more information, see "[About {% data variables.product.prodname_emus %}](/enterprise-cloud@latest/admin/authentication/managing-your-enterprise-users-with-your-identity-provider/about-enterprise-managed-users)."
- エンタープライズアカウントで複数の {% data variables.product.prodname_dotcom_the_website %} Organization に対してポリシーと請求を一元管理するためのオプション。 詳細は「[Enterprise アカウントについて](/enterprise-cloud@latest/admin/overview/about-enterprise-accounts)」を参照してください。

{% data variables.product.prodname_ghe_cloud %} を評価するためのトライアルを設定できます。 詳しい情報については、「<a href="/articles/setting-up-a-trial-of-github-enterprise-cloud" class="dotcom-only">{% data variables.product.prodname_ghe_cloud %} のトライアルを設定する</a>」を参照してください。

[{% data variables.product.prodname_ghe_server %}](https://enterprise.github.com)の独自インスタンスのホストに関する詳しい情報については、{% data variables.contact.contact_enterprise_sales %}に連絡してください。 {% data reusables.enterprise_installation.request-a-trial %}
