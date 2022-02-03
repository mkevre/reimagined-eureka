### JVMのバージョンとアーキテクチャの指定

The starter workflow sets up the `PATH` to contain OpenJDK 8 for the x64 platform. 異なるバージョンのJavaを使いたい場合、あるいは異なるアーキテクチャ（`x64`あるいは`x86`）をターゲットとしたい場合には、`setup-java`アクションを使って異なるJavaランタイム環境を選択できます。

たとえば、x64プラットフォーム上でAdoptiumが提供するJDKのバージョン11を使うには、`setup-java`アクションを使って`java-version`、`distribution`、`architecture` パラメータを`'11'`、`'adopt'`、`x64`に設定できます。

{% raw %}
```yaml{:copy}
steps:
  - uses: actions/checkout@v2
  - name: Set up JDK 11 for x64
    uses: actions/setup-java@v2
    with:
      java-version: '11'
      distribution: 'adopt'
      architecture: x64
```
{% endraw %}

詳しい情報については[`setup-java`](https://github.com/actions/setup-java)アクションを参照してください。
