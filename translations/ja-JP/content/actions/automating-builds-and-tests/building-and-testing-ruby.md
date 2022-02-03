---
title: Rubyでのビルドとテスト
intro: Rubyプロジェクトのビルドとテストのための継続的インテグレーション（CI）ワークフローを作成できます。
redirect_from:
  - /actions/guides/building-and-testing-ruby
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: tutorial
topics:
  - CI
  - Ruby
shortTitle: Build & test Ruby
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## はじめに

このガイドでは、Rubyアプリケーションのビルドとテストを行う継続的インテグレーション（CI）ワークフローの作成方法を紹介します。 CIテストにパスしたなら、コードをデプロイしたりgemを公開したりすることになるでしょう。

## 必要な環境

Ruby、YAML、ワークフローの設定オプションと、ワークフローファイルの作成方法についての基本的な知識を持っておくことをおすすめします。 詳しい情報については、以下を参照してください。

- [{% data variables.product.prodname_actions %}を学ぶ](/actions/learn-github-actions)
- [20分のRuby](https://www.ruby-lang.org/en/documentation/quickstart/)

## Using the Ruby starter workflow

{% data variables.product.prodname_dotcom %} provides a Ruby starter workflow that will work for most Ruby projects. For more information, see the [Ruby starter workflow](https://github.com/actions/starter-workflows/blob/master/ci/ruby.yml).

To get started quickly, add the starter workflow to the `.github/workflows` directory of your repository. 以下に示すワークフローは、リポジトリのデフォルトブランチが `main` であることを前提としています。

```yaml
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Ruby

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Set up Ruby
        uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
        with:
          ruby-version: 2.6
      - name: Install dependencies
        run: bundle install
      - name: Run tests
        run: bundle exec rake
```

## Rubyのバージョンの指定

Rubyのバージョンを指定する最も簡単な方法は、GitHub上でRuby Organizationが提供している`ruby/setup-ruby`アクションを使うことです。 このアクションは、ワークフロー中の各ジョブの実行時に、`PATH`にサポートされているRubyのバージョンを追加します。 詳しい情報については[`ruby/setup-ruby`](https://github.com/ruby/setup-ruby)を参照してください。

Ruby の `ruby/setup-ruby` アクションの使用は、GitHub Actions で Ruby を使用する際に推奨されている方法です。これは、そうすることで Ruby のさまざまなランナーやバージョン間で一貫した振る舞いが保証されるためです。

`setup-ruby`アクションはRubyのバージョンを入力として取り、ランナー上でそのバージョンを設定します。

{% raw %}
```yaml
steps:
- uses: actions/checkout@v2
- uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
  with:
    ruby-version: 2.6 # Not needed with a .ruby-version file
- run: bundle install
- run: bundle exec rake
```
{% endraw %}

あるいは、リポジトリのルートに`.ruby-version`ファイルをチェックインすれば、このファイルで定義されたバージョンを`setup-ruby`が使います。

## 複数のバージョンの Ruby でのテスト

複数バージョンのRubyでワークフローを実行するように、マトリクス戦略を追加できます。 たとえば、バージョン2.7、2.6、2.5の最新のパッチリリースでコードをテストできます。 この'x'はワイルドカードキャラクターで、そのバージョンで利用できる最新のパッチリリースにマッチします。

{% raw %}
```yaml
strategy:
  matrix:
    ruby-version: [2.7.x, 2.6.x, 2.5.x]
```
{% endraw %}

`ruby-version`配列で指定されたRubyの各バージョンに対して、同じステップを実行するジョブが作成されます。 現在のジョブのバージョンにアクセスするのには、{% raw %}`${{ matrix.ruby-version }}`{% endraw %}コンテキストが使われます。 For more information about matrix strategies and contexts, see "[Workflow syntax for {% data variables.product.prodname_actions %}](/actions/learn-github-actions/workflow-syntax-for-github-actions)" and "[Contexts](/actions/learn-github-actions/contexts)."

マトリクス戦略を持つ更新された完全なワークフローは、以下のようになるでしょう。

```yaml
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Ruby CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        ruby-version: [2.7.x, 2.6.x, 2.5.x]

    steps:
      - uses: actions/checkout@v2
      - name: {% raw %}Set up Ruby ${{ matrix.ruby-version }}{% endraw %}
        uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
        with:
          ruby-version: {% raw %}${{ matrix.ruby-version }}{% endraw %}
      - name: Install dependencies
        run: bundle install
      - name: Run tests
        run: bundle exec rake
```

## Bundlerでの依存関係のインストール

`setup-ruby` アクションは自動的にbundlerをインストールします。 バージョンは、`gemfile.lock`ファイルで決定されます。 ロックファイルにバージョンがなければ、互換性のある最新のバージョンがインストールされます。

{% raw %}
```yaml
steps:
- uses: actions/checkout@v2
- uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
  with:
    ruby-version: 2.6
- run: bundle install
```
{% endraw %}

### 依存関係のキャッシング

{% data variables.product.prodname_dotcom %}ホストランナーを使っているなら、`setup-ruby`は実行間でのgemのキャッシュを自動的に処理する方法を提供します。

キャッシングを有効にするには、以下の設定をしてください。

{% raw %}
```yaml
steps:
- uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
    with:
      bundler-cache: true
```
{% endraw %}

これで、gemを`vendor/cache`にインストールするようbundlerが設定されます。 ワークフローの実行が成功するたびに、このフォルダーはアクションによってキャッシュされ、それ以降のワークフローの実行の際に再ダウンロードされます。 キャッシュのキーとしては、gemfile.lockのハッシュとRubyのバージョンが使われます。 新しいgemをインストールしたり、バージョンを変更したりすると、キャッシュは無効になり、bundlerは新しくインストールを行います。

**setup-rubyを使わないキャッシング**

キャッシュをさらに制御するには、{% data variables.product.prodname_dotcom %}ホストランナーを使っているなら、`actions/cache`アクションを直接使うことができます。 詳しい情報については、「<a href="/actions/guides/caching-dependencies-to-speed-up-workflows" class="dotcom-only">ワークフローを高速化するための依存関係のキャッシュ</a>」を参照してください。

{% raw %}
```yaml
steps:
- uses: actions/cache@v2
  with:
    path: vendor/bundle
    key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
    restore-keys: |
      ${{ runner.os }}-gems-
- name: Bundle install
  run: |
    bundle config path vendor/bundle
    bundle install --jobs 4 --retry 3
```
{% endraw %}

マトリクスビルドを使っているなら、キャッシュのキーにマトリクスの変数を含めたくなるでしょう。 たとえば様々なRubyのバージョン(`matrix.ruby-version`) と、様々なオペレーティングシステム(`matrix.os`)のマトリクス戦略を持っているなら、ワークフローのステップは以下のようになるでしょう。

{% raw %}
```yaml
steps:
- uses: actions/cache@v2
  with:
    path: vendor/bundle
    key: bundle-use-ruby-${{ matrix.os }}-${{ matrix.ruby-version }}-${{ hashFiles('**/Gemfile.lock') }}
    restore-keys: |
      bundle-use-ruby-${{ matrix.os }}-${{ matrix.ruby-version }}-
- name: Bundle install
  run: |
    bundle config path vendor/bundle
    bundle install --jobs 4 --retry 3
```
{% endraw %}

## コードのマトリクステスト

以下の例のマトリクスは、すべての安定リリースとヘッドバージョンのMRI、JRuby、TruffleRubyをUbuntu及びmacOSでテストします。

```yaml
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Matrix Testing

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: {% raw %}${{ matrix.os }}-latest{% endraw %}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu, macos]
        ruby: [2.5, 2.6, 2.7, head, debug, jruby, jruby-head, truffleruby, truffleruby-head]
    continue-on-error: {% raw %}${{ endsWith(matrix.ruby, 'head') || matrix.ruby == 'debug' }}{% endraw %}
    steps:
      - uses: actions/checkout@v2
      - uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
        with:
          ruby-version: {% raw %}${{ matrix.ruby }}{% endraw %}
      - run: bundle install
      - run: bundle exec rake
```

## コードの文法チェック

以下の例は`rubocop`をインストールし、それを使ってすべてのファイルの文法チェックを行います。 詳しい情報については[ Rubocop](https://github.com/rubocop-hq/rubocop)を参照してください。 特定の文法チェックルールを決めるために、[ Rubocopを設定](https://docs.rubocop.org/rubocop/configuration.html)できます。

```yaml
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Linting

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
        with:
          ruby-version: 2.6
      - run: bundle install
      - name: Rubocop
        run: rubocop
```

## gemの公開

CIテストにパスしたなら、Rubyパッケージを任意のパッケージレジストリに公開するようにワークフローを設定できます。

パッケージを公開するのに必要なアクセストークンやクレデンシャルは、リポジトリシークレットを使って保存できます。 以下の例は、パッケージを作成して`GitHub Package Registry`及び`RubyGems`に公開します。

```yaml
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Ruby Gem

on:
  # Manually publish
  workflow_dispatch:
  # Alternatively, publish whenever changes are merged to the `main` branch.
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    name: Build + Publish
    runs-on: ubuntu-latest{% ifversion fpt or ghes > 3.1 or ghae or ghec %}
    permissions:
      packages: write
      contents: read{% endif %}

    steps:{% raw %}
      - uses: actions/checkout@v2
      - name: Set up Ruby 2.6
        uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
        with:
          ruby-version: 2.6
      - run: bundle install

      - name: Publish to GPR
        run: |
          mkdir -p $HOME/.gem
          touch $HOME/.gem/credentials
          chmod 0600 $HOME/.gem/credentials
          printf -- "---\n:github: ${GEM_HOST_API_KEY}\n" > $HOME/.gem/credentials
          gem build *.gemspec
          gem push --KEY github --host https://rubygems.pkg.github.com/${OWNER} *.gem
        env:
          GEM_HOST_API_KEY: "Bearer ${{secrets.GITHUB_TOKEN}}"
          OWNER: ${{ github.repository_owner }}

      - name: Publish to RubyGems
        run: |
          mkdir -p $HOME/.gem
          touch $HOME/.gem/credentials
          chmod 0600 $HOME/.gem/credentials
          printf -- "---\n:rubygems_api_key: ${GEM_HOST_API_KEY}\n" > $HOME/.gem/credentials
          gem build *.gemspec
          gem push *.gem
        env:
          GEM_HOST_API_KEY: "${{secrets.RUBYGEMS_AUTH_TOKEN}}"{% endraw %}
```
