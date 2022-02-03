---
title: Python のビルドとテスト
intro: Pythonプロジェクトのビルドとテストのための継続的インテグレーション（CI）ワークフローを作成できます。
redirect_from:
  - /actions/automating-your-workflow-with-github-actions/using-python-with-github-actions
  - /actions/language-and-framework-guides/using-python-with-github-actions
  - /actions/guides/building-and-testing-python
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: tutorial
hidden: true
topics:
  - CI
  - Python
shortTitle: Build & test Python
hasExperimentalAlternative: true
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## はじめに

このガイドは、Pythonパッケージのビルド、テスト、公開の方法を紹介します。

{% ifversion ghae %}
{% data reusables.actions.self-hosted-runners-software %}
{% else %} {% data variables.product.prodname_dotcom %} ホストランナーには、Python および PyPy などのソフトウェアがプリインストールされたツールキャッシュがあります。 自分では何もインストールする必要がありません！ 最新のソフトウェアと、Python および PyPy のプリインストールされたバージョンの完全なリストについては、「[{% data variables.product.prodname_dotcom %} ホストランナーの仕様](/actions/reference/specifications-for-github-hosted-runners/#supported-software)」を参照してください。
{% endif %}

## 必要な環境

YAMLと{% data variables.product.prodname_actions %}の構文に馴染んでいる必要があります。 詳しい情報については、「[{% data variables.product.prodname_actions %} を学ぶ](/actions/learn-github-actions)」を参照してください。

Python、PyPy、pipの基本的な理解をしておくことをおすすめします。 詳しい情報については、以下を参照してください。
- [Getting started with Python](https://www.python.org/about/gettingstarted/)
- [PyPy](https://pypy.org/)
- [Pip package manager](https://pypi.org/project/pip/)

{% data reusables.actions.enterprise-setup-prereq %}

## Using the Python starter workflow

{% data variables.product.prodname_dotcom %} provides a Python starter workflow that should work for most Python projects. This guide includes examples that you can use to customize the starter workflow. For more information, see the [Python starter workflow](https://github.com/actions/starter-workflows/blob/main/ci/python-package.yml).

To get started quickly, add the starter workflow to the `.github/workflows` directory of your repository.

{% raw %}
```yaml{:copy}
name: Python package

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.6", "3.7", "3.8", "3.9"]

    steps:
      - uses: actions/checkout@v2
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install flake8 pytest
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
      - name: Lint with flake8
        run: |
          # stop the build if there are Python syntax errors or undefined names
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
          # exit-zero はすべてのエラーを警告として扱う。 GitHub エディタの幅は 127 文字
          flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
      - name: Test with pytest
        run: |
          pytest
```
{% endraw %}

## Pythonのバージョンの指定

{% data variables.product.prodname_dotcom %}ホストランナー上でPythonもしくはPyPyのプリインストールされたバージョンを使うには、`setup-python`アクションを使ってください。 このアクションは各ランナーのツールキャッシュから指定されたバージョンのPythonもしくはPyPyを見つけ、必要なバイナリを`PATH`に追加します。設定されたバイナリは、ジョブでそれ以降永続化されます。 特定のバージョンの Python がツールキャッシュにプリインストールされていない場合、`setup-python` アクションは [`python-versions`](https://github.com/actions/python-versions) リポジトリから適切なバージョンをダウンロードして設定します。

`setup-action`の利用は、{% data variables.product.prodname_actions %}でPythonを使うための推奨される方法です。 これは、そうすることで様々なランナーや様々なバージョンのPythonで一貫した振る舞いが保証されるためです。 セルフホストランナーを使っている場合は、Pythonをインストールして`PATH`に追加しなければなりません。 詳しい情報については、[`setup-python`アクション](https://github.com/marketplace/actions/setup-python)を参照してください。

以下の表は、各{% data variables.product.prodname_dotcom %}ホストランナー内でのツールキャッシュの場所です。

|                    | Ubuntu                          | Mac                                      | Windows                                    |
| ------------------ | ------------------------------- | ---------------------------------------- | ------------------------------------------ |
| **ツールキャッシュディレクトリ** | `/opt/hostedtoolcache/*`        | `/Users/runner/hostedtoolcache/*`        | `C:\hostedtoolcache\windows\*`         |
| **Pythonツールキャッシュ** | `/opt/hostedtoolcache/Python/*` | `/Users/runner/hostedtoolcache/Python/*` | `C:\hostedtoolcache\windows\Python\*` |
| **PyPyツールキャッシュ**   | `/opt/hostedtoolcache/PyPy/*`   | `/Users/runner/hostedtoolcache/PyPy/*`   | `C:\hostedtoolcache\windows\PyPy\*`   |

セルフホストランナーを使用している場合は、`setup-python` アクションを使用して依存関係を管理するようにランナーを設定できます。 詳しい情報については、`setup-python` の README にある「[セルフホストランナーで setup-python を使用する](https://github.com/actions/setup-python#using-setup-python-with-a-self-hosted-runner)」を参照してください。

{% data variables.product.prodname_dotcom %}は、セマンティックバージョン構文をサポートしています。 詳しい情報については「[セマンティックバージョンの利用](https://docs.npmjs.com/about-semantic-versioning#using-semantic-versioning-to-specify-update-types-your-package-can-accept)」及び「[セマンティックバージョンの仕様](https://semver.org/)」を参照してください。

### Pythonの複数バージョンの利用

{% raw %}
```yaml{:copy}
name: Python package

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest
    strategy:
      # python-version内のPyPyのバージョンが利用できる。
      # For example, pypy2 and pypy3
      matrix:
        python-version: ["2.7", "3.6", "3.7", "3.8", "3.9"]

    steps:
      - uses: actions/checkout@v2
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      # You can test your matrix by printing the current Python version
      - name: Display Python version
        run: python -c "import sys; print(sys.version)"
```
{% endraw %}

### 　特定のバージョンのPythonの利用

Pythonの特定バージョンを設定することができます。 たとえば3.8が利用できます。 あるいは、最新のマイナーリリースを取得するためにセマンティックバージョン構文を使うこともできます。 以下の例では、Python 3の最新のマイナーリリースを使います。

{% raw %}
```yaml{:copy}
name: Python package

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Set up Python 3.x
        uses: actions/setup-python@v2
        with:
          # セマンティックバージョン範囲の構文または Python バージョンの正確なバージョン
          python-version: '3.x'
          # Optional - x64 or x86 architecture, defaults to x64
          architecture: 'x64'
      # 現在の Python バージョンを出力してマトリックスをテスト可能
      - name: Display Python version
        run: python -c "import sys; print(sys.version)"
```
{% endraw %}

### バージョンの除外

使用できないPythonのバージョンを指定すると、`setup-python`は`##[error]Version 3.4 with arch x64 not found`といったエラーで失敗します。 このエラーメッセージには、利用できるバージョンが含まれます。

実行したくないPythonの環境があるなら、ワークフロー中で`exclude`キーワードを使うこともできます。 詳しい情報については、「[{% data variables.product.prodname_actions %} のワークフロー構文](/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategy)」を参照してください。

{% raw %}
```yaml{:copy}
name: Python package

on: [push]

jobs:
  build:

    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        python-version: ["3.6", "3.7", "3.8", "3.9", pypy2, pypy3]
        exclude:
          - os: macos-latest
            python-version: "3.6"
          - os: windows-latest
            python-version: "3.6"
```
{% endraw %}

### デフォルトバージョンのPythonの利用

依存関係を明示的にしやすくなるので、ワークフロー中で使うPythonのバージョンの設定には`setup-python`を使うことをおすすめします。 `setup-python`を使わない場合、いずれかのシェルで`python`を呼ぶと`PATH`に設定されたデフォルトバージョンのPythonが使われます。 デフォルトバージョンのPythonは、{% data variables.product.prodname_dotcom %}ホストランナーによって様々なので、予想外の変更が生じたり、期待しているよりも古いバージョンが使われたりするかもしれません。

| {% data variables.product.prodname_dotcom %}ホストランナー | 説明                                                                                                                                                                                                               |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ubuntu                                              | Ubuntuランナーでは`/usr/bin/python`及び`/usr/bin/python3`の下に複数バージョンのシステムPythonがあります。 {% data variables.product.prodname_dotcom %}がツールキャッシュにインストールしエチルバージョンに加えて、UbuntuにパッケージングされているバージョンのPythonがあります。                     |
| Windows                                             | ツールキャッシュにあるPythonのバージョンを除けば、WindowsにはシステムPythonに相当するバージョンは含まれていません。 他のランナーとの一貫した動作を保ち、`setup-python`アクションなしですぐにPythonが使えるようにするため、{% data variables.product.prodname_dotcom %}はツールキャッシュからいくつかのバージョンを`PATH`に追加します。 |
| macOS                                               | macOSランナーには、ツールキャッシュ内のバージョンに加えて、複数バージョンのシステムPythonがインストールされています。 システムのPythonバージョンは`/usr/local/Cellar/python/*`mディレクトリにあります。                                                                                      |

## 依存関係のインストール

{% data variables.product.prodname_dotcom %}ホストランナーには、パッケージマネージャーのpipがインストールされています。 コードのビルドとテストに先立って、pipを使ってパッケージレジストリのPyPIから依存関係をインストールできます。 たとえば以下のYAMLは`pip`パッケージインストーラーと`setuptools`及び`wheel`パッケージのインストールやアップグレードを行います。

{% data variables.product.prodname_dotcom %}ホストランナーを使用する場合、依存関係をキャッシュしてワークフローの実行を高速化することもできます。 詳しい情報については、「<a href="/actions/guides/caching-dependencies-to-speed-up-workflows" class="dotcom-only">ワークフローを高速化するための依存関係のキャッシュ</a>」を参照してください。

{% raw %}
```yaml{:copy}
steps:
- uses: actions/checkout@v2
- name: Set up Python
  uses: actions/setup-python@v2
  with:
    python-version: '3.x'
- name: Install dependencies
  run: python -m pip install --upgrade pip setuptools wheel
```
{% endraw %}

### Requirementsファイル

`pip`をアップデートした後、次の典型的なステップは*requirements.txt*からの依存関係のインストールです。 For more information, see [pip](https://pip.pypa.io/en/stable/cli/pip_install/#example-requirements-file).

{% raw %}
```yaml{:copy}
steps:
- uses: actions/checkout@v2
- name: Set up Python
  uses: actions/setup-python@v2
  with:
    python-version: '3.x'
- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    pip install -r requirements.txt
```
{% endraw %}

### 依存関係のキャッシング

When using {% data variables.product.prodname_dotcom %}-hosted runners, you can cache and restore the dependencies using the [`setup-python` action](https://github.com/actions/setup-python).

The following example caches dependencies for pip.

```yaml{:copy}
steps:
- uses: actions/checkout@v2
- uses: actions/setup-python@v2
  with:
    python-version: '3.9'
    cache: 'pip'
- run: pip install -r requirements.txt
- run: pip test
```

By default, the `setup-python` action searches for the dependency file (`requirements.txt` for pip or `Pipfile.lock` for pipenv) in the whole repository. For more information, see "<a href="/actions/guides/caching-dependencies-to-speed-up-workflows" class="dotcom-only">Caching packages dependencies</a>" in the `setup-python` actions README.

If you have a custom requirement or need finer controls for caching, you can use the [`cache` action](https://github.com/marketplace/actions/cache). ランナーのオペレーティングシステムによって、pipは依存関係を様々な場所にキャッシュします。 The path you'll need to cache may differ from the Ubuntu example above, depending on the operating system you use. For more information, see [Python caching examples](https://github.com/actions/cache/blob/main/examples.md#python---pip) in the `cache` action repository.

## コードのテスト

ローカルで使うのと同じコマンドを、コードのビルドとテストに使えます。

### pytest及びpytest-covでのテスト

以下の例では、`pytest`及び`pytest-cov`をインストールあるいはアップグレードします。 そしてテストが実行され、JUnit形式で出力が行われ、一方でコードカバレッジの結果がCoberturaに出力されます。 詳しい情報については[JUnit](https://junit.org/junit5/)及び[Cobertura](https://cobertura.github.io/cobertura/)を参照してください。

{% raw %}
```yaml{:copy}
steps:
- uses: actions/checkout@v2
- name: Set up Python
  uses: actions/setup-python@v2
  with:
    python-version: '3.x'
- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    pip install -r requirements.txt
- name: Test with pytest
  run: |
    pip install pytest
    pip install pytest-cov
    pytest tests.py --doctest-modules --junitxml=junit/test-results.xml --cov=com --cov-report=xml --cov-report=html
```
{% endraw %}

### Flake8を使ったコードのlint

以下の例は、`flake8`をインストールもしくはアップグレードし、それを使ってすべてのファイルをlintします。 詳しい情報については[Flake8](http://flake8.pycqa.org/en/latest/)を参照してください。

{% raw %}
```yaml{:copy}
steps:
- uses: actions/checkout@v2
- name: Set up Python
  uses: actions/setup-python@v2
  with:
    python-version: '3.x'
- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    pip install -r requirements.txt
- name: Lint with flake8
  run: |
    pip install flake8
    flake8 .
  continue-on-error: true
```
{% endraw %}

The linting step has `continue-on-error: true` set. This will keep the workflow from failing if the linting step doesn't succeed. Once you've addressed all of the linting errors, you can remove this option so the workflow will catch new issues.

### toxでのテストの実行

{% data variables.product.prodname_actions %}では、toxでテストを実行し、その処理を複数のジョブに分散できます。 toxを起動する際には、特定のバージョンを指定するのではなく、`-e py`オプションを使って`PATH`中のPythonのバージョンを選択しなければなりません。 詳しい情報については [tox](https://tox.readthedocs.io/en/latest/)を参照してください。

{% raw %}
```yaml{:copy}
name: Python package

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest
    strategy:
      matrix:
        python: ["3.7", "3.8", "3.9"]

    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python }}
      - name: Install tox and any other packages
        run: pip install tox
      - name: Run tox
        # Run tox using the version of Python in `PATH`
        run: tox -e py
```
{% endraw %}

## 成果物としてのワークフローのデータのパッケージ化

ワークフローの完了後に、成果物をアップロードして見ることができます。 たとえば、ログファイル、コアダンプ、テスト結果、スクリーンショットを保存する必要があるかもしれません。 詳しい情報については「[成果物を利用してワークフローのデータを永続化する](/github/automating-your-workflow-with-github-actions/persisting-workflow-data-using-artifacts)」を参照してください。

以下の例は、`upload-artifact`アクションを使って`pytest`の実行によるテスト結果をアーカイブする方法を示しています。 詳しい情報については[`upload-artifact`アクション](https://github.com/actions/upload-artifact)を参照してください。

{% raw %}
```yaml{:copy}
name: Python package

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.6", "3.7", "3.8", "3.9"]

    steps:
      - uses: actions/checkout@v2
      - name: Setup Python # Set Python version
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      # Install pip and pytest
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install pytest
      - name: Test with pytest
        run: pytest tests.py --doctest-modules --junitxml=junit/test-results-${{ matrix.python-version }}.xml
      - name: Upload pytest test results
        uses: actions/upload-artifact@v2
        with:
          name: pytest-results-${{ matrix.python-version }}
          path: junit/test-results-${{ matrix.python-version }}.xml
        # Use always() to always run this step to publish test results when there are test failures
        if: ${{ always() }}
```
{% endraw %}

## パッケージレジストリへの公開

You can configure your workflow to publish your Python package to a package registry once your CI tests pass. This section demonstrates how you can use {% data variables.product.prodname_actions %} to upload your package to PyPI each time you [publish a release](/github/administering-a-repository/managing-releases-in-a-repository).

For this example, you will need to create two [PyPI API tokens](https://pypi.org/help/#apitoken). You can use secrets to store the access tokens or credentials needed to publish your package. 詳しい情報については、「[暗号化されたシークレットの作成と利用](/github/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)」を参照してください。

```yaml{:copy}
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Upload Python Package

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.x'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install build
      - name: Build package
        run: python -m build
      - name: Publish package
        uses: pypa/gh-action-pypi-publish@27b31702a0e7fc50959f5ad993c78deac1bdfc29
        with:
          user: __token__
          password: {% raw %}${{ secrets.PYPI_API_TOKEN }}{% endraw %}
```

For more information about the starter workflow, see [`python-publish`](https://github.com/actions/starter-workflows/blob/main/ci/python-publish.yml).
