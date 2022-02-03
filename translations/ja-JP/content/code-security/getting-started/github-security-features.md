---
title: GitHubのセキュリティ機能
intro: '{% data variables.product.prodname_dotcom %}のセキュリティ機能の概要。'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: overview
topics:
  - Repositories
  - Dependencies
  - Vulnerabilities
  - Advanced Security
---

## {% data variables.product.prodname_dotcom %}のセキュリティ機能について

{% data variables.product.prodname_dotcom %}は、リポジトリ内及びOrganizationに渡ってコードとシークレットをセキュアに保つのに役立つ機能があります。 {% data reusables.advanced-security.security-feature-availability %}

{% data variables.product.prodname_advisory_database %}には、表示、検索、フィルタできる精選されたセキュリティ脆弱性のリストが含まれます。 {% data reusables.security-advisory.link-browsing-advisory-db %}

{% ifversion fpt or ghes or ghae-issue-4864 or ghec %}
## すべてのリポジトリで使用可能
{% endif %}
{% ifversion fpt or ghes > 3.0 or ghae or ghec %}
### セキュリティポリシー

リポジトリで見つけたセキュリティの脆弱性を、ユーザが内密に報告しやすくします。 詳しい情報については「[リポジトリにセキュリティポリシーを追加する](/code-security/getting-started/adding-a-security-policy-to-your-repository)」を参照してください。
{% endif %}

{% ifversion fpt or ghec %}
### セキュリティアドバイザリ

リポジトリのコードのセキュリティの脆弱性について、非公開で議論して修正します。 その後、セキュリティアドバイザリを公開して、コミュニティに脆弱性を警告し、アップグレードするようコミュニティメンバーに促すことができます。 詳しい情報については「[{% data variables.product.prodname_security_advisories %}について](/github/managing-security-vulnerabilities/about-github-security-advisories)」を参照してください。

{% endif %}
{% ifversion fpt or ghec or ghes > 3.2 %}

### {% data variables.product.prodname_dependabot_alerts %} およびセキュリティアップデート

セキュリティの脆弱性を含むことを把握している依存関係に関するアラートを表示し、プルリクエストを自動的に生成してこれらの依存関係を更新するかどうかを選択します。 詳しい情報については、「[脆弱性のある依存関係に対するアラートについて](/github/managing-security-vulnerabilities/about-alerts-for-vulnerable-dependencies)」 および「[{% data variables.product.prodname_dependabot_security_updates %} について](/github/managing-security-vulnerabilities/about-dependabot-security-updates)」を参照してください。
{% endif %}

{% ifversion ghes < 3.3 or ghae-issue-4864 %}
### {% data variables.product.prodname_dependabot_alerts %}

{% data reusables.dependabot.dependabot-alerts-beta %}

セキュリティの脆弱性を含むことを把握している依存関係に関するアラートを表示し、それらのアラートを管理します。 詳しい情報については、「[脆弱性のある依存関係に対するアラートについて](/github/managing-security-vulnerabilities/about-alerts-for-vulnerable-dependencies)」を参照してください。
{% endif %}

{% ifversion fpt or ghec or ghes > 3.2 %}
### {% data variables.product.prodname_dependabot %} バージョンアップデート

{% data variables.product.prodname_dependabot %}を使って、依存関係を最新に保つためのPull Requestを自動的に発行してください。 これは、依存関係の古いバージョンの公開を減らすために役立ちます。 新しいバージョンを使用すると、セキュリティの脆弱性が発見された場合にパッチの適用が容易になり、さらに脆弱性のある依存関係を更新するため {% data variables.product.prodname_dependabot_security_updates %} がプルリクエストを発行することも容易になります。 詳しい情報については、「[{% data variables.product.prodname_dependabot_version_updates %} について](/github/administering-a-repository/about-dependabot-version-updates)」を参照してください。
{% endif %}

{% ifversion fpt or ghes or ghae-issue-4864 or ghec %}
### 依存関係グラフ
依存関係グラフを使うと、自分のリポジトリが依存しているエコシステムやパッケージ、そして自分のリポジトリに依存しているリポジトリやパッケージを調べることができます。

依存関係グラフは、リポジトリの [**Insights**] タブにあります。 詳しい情報については、「[依存関係グラフについて](/github/visualizing-repository-data-with-graphs/about-the-dependency-graph)」を参照してください。
{% endif %}

## Available with {% data variables.product.prodname_GH_advanced_security %}

{% data reusables.advanced-security.ghas-availability %}

### {% data variables.product.prodname_code_scanning_capc %}

新しいコードまたは変更されたコードのセキュリティの脆弱性とコーディングエラーを自動的に検出します。 潜在的な問題が強調表示され、あわせて詳細情報も確認できるため、デフォルトのブランチにマージする前にコードを修正できます。 詳しい情報については、「[コードスキャニングについて](/github/finding-security-vulnerabilities-and-errors-in-your-code/about-code-scanning)」を参照してください。

### {% data variables.product.prodname_secret_scanning_caps %}

Automatically detect tokens or credentials that have been checked into a repository. {% ifversion fpt or ghec %}For secrets identified in public repositories, the service is informed that the secret may be compromised.{% endif %}
{%- ifversion ghec or ghes or ghae %}
{% ifversion ghec %}For private repositories, you can view {% elsif ghes or ghae %}View {% endif %}any secrets that {% data variables.product.company_short %} has found in your code. You should treat tokens or credentials that have been checked into the repository as compromised.{% endif %} For more information, see "[About secret scanning](/github/administering-a-repository/about-secret-scanning)."

{% ifversion fpt or ghes > 3.1 or ghae-issue-4864 or ghec %}
### 依存関係のレビュー

Pull Requestをマージする前に、依存関係に対する変更の影響を詳細に示し、脆弱なバージョンがあればその詳細を確認できます。 詳しい情報については「[依存関係のレビュー](/code-security/supply-chain-security/about-dependency-review)」を参照してください。
{% endif %}

## 参考リンク
- "[{% data variables.product.prodname_dotcom %}の製品](/github/getting-started-with-github/githubs-products)"
- 「[{% data variables.product.prodname_dotcom %}言語サポート](/github/getting-started-with-github/github-language-support)」
