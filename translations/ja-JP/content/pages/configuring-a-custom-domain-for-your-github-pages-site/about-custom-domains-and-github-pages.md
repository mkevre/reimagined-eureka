---
title: カスタムドメインとGitHub Pagesについて
intro: '{% data variables.product.prodname_pages %} では、カスタムドメインを使用する、つまりサイトの URL を ''octocat.github.io'' などのデフォルトからあなたが所有するドメインに変更することができます。'
redirect_from:
  - /articles/about-custom-domains-for-github-pages-sites
  - /articles/about-supported-custom-domains
  - /articles/custom-domain-redirects-for-your-github-pages-site
  - /articles/about-custom-domains-and-github-pages
  - /github/working-with-github-pages/about-custom-domains-and-github-pages
product: '{% data reusables.gated-features.pages %}'
versions:
  fpt: '*'
  ghec: '*'
topics:
  - Pages
shortTitle: GitHub Pagesにおけるカスタムドメイン
---

## サポートされているカスタムドメイン

{% data variables.product.prodname_pages %} では、サブドメインとApexドメインの 2 種類のドメインを使用できます。 サポートされていないカスタムサブドメインのリストは、「[カスタムドメインと {% data variables.product.prodname_pages %} のトラブルシューティング](/articles/troubleshooting-custom-domains-and-github-pages/#custom-domain-names-that-are-unsupported)」を参照してください。

| サポートされているカスタムドメインの種類 | サンプル               |
| -------------------- | ------------------ |
| `www` サブドメイン         | `www.example.com`  |
| カスタムサブドメイン           | `blog.example.com` |
| Apex ドメイン            | `example.com`      |

サイトには、Apex及び`www`サブドメインのいずれか、あるいは両方の設定をセットアップできます。 Apexドメインに関する詳しい情報については「[{% data variables.product.prodname_pages %}サイトでのApexドメインの利用](#using-an-apex-domain-for-your-github-pages-site)」を参照してください。

Apex ドメインを使用している場合でも、`www` サブドメインを使用することをおすすめします。 Apexドメインで新しいサイトを作成する場合、サイトのコンテンツを提供する際に`www`サブドメインも利用できるように保護が自動的に試みられます。 `www`サブドメインを設定すれば、関連するApexドメインの保護が自動的に試みられます。 詳しい情報については、「[{% data variables.product.prodname_pages %} サイト用のカスタムドメインを管理する](/articles/managing-a-custom-domain-for-your-github-pages-site)」を参照してください。

ユーザまたは Organization サイトのカスタムドメインを設定すると、カスタムドメインを設定していないアカウントが所有するプロジェクトサイトの URL で、`<user>.github.io` または `<organization>.github.io` の部分がカスタムドメインによって置き換えられます。 たとえば、サイトのカスタムドメインが `www.octocat.com` で、`octo-project` というリポジトリから公開されているプロジェクトサイトにまだカスタムドメインを設定していない場合、そのリポジトリの {% data variables.product.prodname_pages %} サイトは、`www.octocat.com/octo-project` で公開されます。

## あなたの {% data variables.product.prodname_pages %} サイトにサブドメインを使用する

サブドメインは、URL のうちルートドメインの前の部分です。 サブドメインは、`www` に設定することも、あるいは `blog.example.com` のようにサイトの独自セクションに設定することもできます。

サブドメインは、DNS プロバイダを通じて `CNAME` レコードで設定されます。 詳しい情報については、「[{% data variables.product.prodname_pages %} サイト用のカスタムドメインを管理する](/articles/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)」を参照してください。

### `www` サブドメイン

サブドメインの種類として最もよく使われているのは、`www` サブドメインです。 たとえば、`www.example.com` には `www` サブドメインが含まれています。

`www` サブドメインは、カスタムドメインとして最も安定的です。{% data variables.product.product_name %} のサーバの IP アドレスが変更されても、`www` サブドメインは影響を受けないからです。

### カスタムサブドメイン

カスタムサブドメインは、標準の`www`形式を使わない種類のサブドメインです。 カスタムサブドメインは、サイトに 2 つの独自セクションを作成したい場合に最もよく使われます。 たとえば、`blog.example.com` というサイトを作成し、`www.example.com` から独自のセクションをカスタマイズできます。

## あなたの {% data variables.product.prodname_pages %} サイトに Apex ドメインを使用する

Apex ドメインは、`example.com` といったようにサブドメインを含まないカスタムドメインです。 Apex ドメインは、ベースドメイン、ベアドメイン、裸ドメイン、ルート Apex ドメイン、ゾーン Apex ドメインなどとも呼ばれます。

Apex ドメインは、DNS プロバイダを通じて、`A`、`ALIAS`、`ANAME` レコードで設定されます。 詳しい情報については、「[{% data variables.product.prodname_pages %} サイト用のカスタムドメインを管理する](/articles/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)」を参照してください。

{% data reusables.pages.www-and-apex-domain-recommendation %} 詳しい情報については、「[{% data variables.product.prodname_pages %} サイト用のカスタムドメインを管理する](/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site/#configuring-a-subdomain)」を参照してください。

## Securing the custom domain for your {% data variables.product.prodname_pages %} site

{% data reusables.pages.secure-your-domain %} For more information, see "[Verifying your custom domain for {% data variables.product.prodname_pages %}](/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)" and "[Managing a custom domain for your {% data variables.product.prodname_pages %} site](/articles/managing-a-custom-domain-for-your-github-pages-site)."

サイトが自動的に無効化される理由は、いくつかあります。

- {% data variables.product.prodname_pro %} から {% data variables.product.prodname_free_user %} へダウングレードすると、アカウント内のプライベートリポジトリから公開されている {% data variables.product.prodname_pages %} のサイトは公開されなくなります。 詳細は「[{% data variables.product.prodname_dotcom %} の支払いプランをダウングレードする](/articles/downgrading-your-github-billing-plan)」を参照してください。
- {% data variables.product.prodname_free_user %} を利用している個人アカウントへプライベートリポジトリを移譲した場合、そのリポジトリからは {% data variables.product.prodname_pages %} の機能を利用できなくなり、公開されている {% data variables.product.prodname_pages %} は公開されなくなります。 詳細は「[リポジトリを移譲する](/articles/transferring-a-repository)」を参照してください。

## 参考リンク

- [カスタムドメインと {% data variables.product.prodname_pages %} のトラブルシューティング](/articles/troubleshooting-custom-domains-and-github-pages)
