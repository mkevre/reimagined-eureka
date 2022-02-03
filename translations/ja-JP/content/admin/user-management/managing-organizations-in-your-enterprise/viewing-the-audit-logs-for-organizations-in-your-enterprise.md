---
title: Viewing the audit logs for organizations in your enterprise
intro: Enterprise オーナーは、Enterprise アカウントが所有するすべての Organization からのアクションが集約された Audit log を表示できます。
redirect_from:
  - /github/setting-up-and-managing-your-enterprise/managing-organizations-in-your-enterprise-account/viewing-the-audit-logs-for-organizations-in-your-enterprise-account
  - /articles/viewing-the-audit-logs-for-organizations-in-your-business-account
  - /articles/viewing-the-audit-logs-for-organizations-in-your-enterprise-account
  - /github/setting-up-and-managing-your-enterprise-account/viewing-the-audit-logs-for-organizations-in-your-enterprise-account
  - /github/setting-up-and-managing-your-enterprise/viewing-the-audit-logs-for-organizations-in-your-enterprise-account
versions:
  ghec: '*'
type: how_to
topics:
  - Auditing
  - Enterprise
  - Logging
  - Organizations
shortTitle: View organization audit logs
---

各 Audit log エントリには、次のようなイベントに関する適切な情報が表示されます:

- アクションが実行された Organization
- アクションを実行したユーザ
- アクションの対象となったリポジトリ
- 実行されたアクション
- アクションが実行された国
- アクションが発生した日時

Audit log で特定のイベントを検索したり、Audit log データをエクスポートしたりできます。 Audit log の検索と特定の Organization イベントの詳細については、「[Organization の Audit log をレビューする](/organizations/keeping-your-organization-secure/reviewing-the-audit-log-for-your-organization)」を参照してください。

You can also stream audit and Git events data from {% data variables.product.prodname_dotcom %} to an external data management system. For more information, see "[Streaming the audit logs for organizations in your enterprise account](/admin/user-management/managing-organizations-in-your-enterprise/streaming-the-audit-logs-for-organizations-in-your-enterprise-account)."

{% data reusables.enterprise-accounts.access-enterprise %}
{% data reusables.enterprise-accounts.settings-tab %}
{% data reusables.enterprise-accounts.audit-log-tab %}
