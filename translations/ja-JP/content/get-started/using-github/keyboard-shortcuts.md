---
title: キーボードショートカット
intro: '{% data variables.product.prodname_dotcom %} のほぼすべてのページには、アクションを速く実行するためのキーボードショートカットがあります。'
redirect_from:
  - /articles/using-keyboard-shortcuts
  - /categories/75/articles
  - /categories/keyboard-shortcuts
  - /articles/keyboard-shortcuts
  - /github/getting-started-with-github/keyboard-shortcuts
  - /github/getting-started-with-github/using-github/keyboard-shortcuts
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
---

## キーボードショートカットについて

Typing <kbd>?</kbd> on {% data variables.product.prodname_dotcom %} brings up a dialog box that lists the keyboard shortcuts available for that page. マウスを使用して移動しなくても、これらのキーボードショートカットを使用して、サイト全体でアクションを実行できます。

{% if keyboard-shortcut-accessibility-setting %}
You can disable character key shortcuts, while still allowing shortcuts that use modifier keys, in your accessibility settings. For more information, see "[Managing accessibility settings](/account-and-profile/setting-up-and-managing-your-github-user-account/managing-user-account-settings/managing-accessibility-settings)."{% endif %}

以下は利用可能なキーボードショートカットのリストです:
{% if command-palette %}
The {% data variables.product.prodname_command_palette %} also gives you quick access to a wide range of actions, without the need to remember keyboard shortcuts. For more information, see "[{% data variables.product.prodname_command_palette %}](/get-started/using-github/github-command-palette)."{% endif %}

## サイト全体のショートカット

| キーボードショートカット                  | 説明                                                                                                                                                                                                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>s</kbd> または <kbd>/</kbd> | 検索バーにフォーカスします。 詳細は「[{% data variables.product.company_short %} での検索について](/search-github/getting-started-with-searching-on-github/about-searching-on-github)」を参照してください。                                                                                                           |
| <kbd>g</kbd> <kbd>n</kbd>     | 通知に移動します。 詳しい情報については、{% ifversion fpt or ghes or ghae or ghec %}「[通知について](/github/managing-subscriptions-and-notifications-on-github/about-notifications){% else %}「[通知について](/github/receiving-notifications-about-activity-on-github/about-notifications){% endif %}」を参照してください。 |
| <kbd>esc</kbd>                | ユーザ、Issue、またはプルリクエストのホバーカードにフォーカスすると、ホバーカードが閉じ、ホバーカードが含まれている要素に再フォーカスします                                                                                                                                                                                                         |

{% if command-palette %}

<kbd>control</kbd><kbd>k</kbd> or <kbd>command</kbd><kbd>k</kbd> | Opens the {% data variables.product.prodname_command_palette %}. If you are editing Markdown text, open the command palette with <kbd>Ctl</kbd><kbd>alt</kbd><kbd>k</kbd> or <kbd>⌘</kbd><kbd>option</kbd><kbd>k</kbd>. For more information, see "[{% data variables.product.prodname_command_palette %}](/get-started/using-github/github-command-palette)."{% endif %}

## リポジトリ

| キーボードショートカット              | 説明                                                                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>g</kbd> <kbd>c</kbd> | [**Code**] タブに移動します                                                                                                                                                                                                           |
| <kbd>g</kbd> <kbd>i</kbd> | [**Issues**] タブに移動します。 詳細は「[Issue について](/articles/about-issues)」を参照してください。                                                                                                                                                    |
| <kbd>g</kbd> <kbd>p</kbd> | [**Pull requests**] タブに移動します。 詳しい情報については、「[プルリクエストについて](/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)」を参照してください。"{% ifversion fpt or ghes or ghec %}
| <kbd>g</kbd> <kbd>a</kbd> | [**Actions**] タブに移動します。 詳しい情報については、「[アクションについて](/actions/getting-started-with-github-actions/about-github-actions)」を参照してください。{% endif %}
| <kbd>g</kbd> <kbd>b</kbd> | [**Projects**] タブに移動します。 詳細は「[プロジェクトボードについて](/articles/about-project-boards)」を参照してください。                                                                                                                                       |
| <kbd>g</kbd> <kbd>w</kbd> | [**Wiki**] タブに移動します。 For more information, see "[About wikis](/communities/documenting-your-project-with-wikis/about-wikis)."{% ifversion fpt or ghec %}
| <kbd>g</kbd> <kbd>g</kbd> | Go to the **Discussions** tab. For more information, see "[About discussions](/discussions/collaborating-with-your-community-using-discussions/about-discussions)."{% endif %}

## ソースコード編集

| キーボードショートカット                                                    | 説明                                                                                                                                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |{% ifversion fpt or ghec %}
| <kbd>から実行されます。</kbd>                                            | Opens a repository or pull request in the web-based editor. For more information, see "[Web-based editor](/codespaces/developing-in-codespaces/web-based-editor)."{% endif %}
| <kbd>control b</kbd> または <kbd>command b</kbd>                   | 太字テキストの Markdown 書式を挿入します                                                                                                                                                     |
| <kbd>control i</kbd> または <kbd>command i</kbd>                   | イタリック体のテキストの Markdown 書式を挿入します                                                                                                                                                |
| <kbd>control k</kbd> または <kbd>command k</kbd>                   | Inserts Markdown formatting for creating a link{% ifversion fpt or ghec or ghae or ghes > 3.3 %}
| <kbd>control shift 7</kbd> or <kbd>command shift 7</kbd>        | Inserts Markdown formatting for an ordered list                                                                                                                               |
| <kbd>control shift 8</kbd> or <kbd>command shift 8</kbd>        | Inserts Markdown formatting for an unordered list                                                                                                                             |
| <kbd>control shift .</kbd> or <kbd>command shift.</kbd>         | Inserts Markdown formatting for a quote{% endif %}
| <kbd>e</kbd>                                                    | [**Edit file**] タブでソースコードファイルを開きます                                                                                                                                            |
| <kbd>control f</kbd> または <kbd>command f</kbd>                   | ファイルエディタで検索を開始します                                                                                                                                                             |
| <kbd>control g</kbd> または <kbd>command g</kbd>                   | 次を検索します                                                                                                                                                                       |
| <kbd>control shift g</kbd> or <kbd>command shift g</kbd>        | 前を検索します                                                                                                                                                                       |
| <kbd>control shift f</kbd> or <kbd>command option f</kbd>       | 置き換えます                                                                                                                                                                        |
| <kbd>control shift r</kbd> or <kbd>command shift option f</kbd> | すべてを置き換えます                                                                                                                                                                    |
| <kbd>alt g</kbd>                                                | 行にジャンプします                                                                                                                                                                     |
| <kbd>control z</kbd> または <kbd>command z</kbd>                   | 元に戻します                                                                                                                                                                        |
| <kbd>control y</kbd> または <kbd>command y</kbd>                   | やり直します                                                                                                                                                                        |
| <kbd>command shift p</kbd>                                      | [**Edit file**] タブと [**Preview changes**] タブを切り替えます                                                                                                                           |
| <kbd>control s</kbd> or <kbd>command s</kbd>                    | Write a commit message                                                                                                                                                        |

その他のキーボードショートカットについては、[CodeMirror ドキュメント](https://codemirror.net/doc/manual.html#commands)を参照してください。

## ソースコード閲覧

| キーボードショートカット | 説明                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| <kbd>t</kbd> | ファイルファインダーを起動します                                                                                                   |
| <kbd>l</kbd> | コード内の行にジャンプします                                                                                                     |
| <kbd>w</kbd> | 新しいブランチまたはタグに切り替えます                                                                                                |
| <kbd>y</kbd> | URL を正規の形式に展開します。 詳細は「[ファイルにパーマリンクを張る](/articles/getting-permanent-links-to-files)」を参照してください。                      |
| <kbd>i</kbd> | 差分に関するコメントを表示または非表示にします。 詳細は「[プルリクエストの差分についてコメントする](/articles/commenting-on-the-diff-of-a-pull-request)」を参照してください。 |
| <kbd>a</kbd> | diff の注釈を表示または非表示にします                                                                                              |
| <kbd>b</kbd> | blame ビューを開きます。 詳細は「[ファイル内の変更を追跡する](/articles/tracing-changes-in-a-file)」を参照してください。                                |

## コメント

| キーボードショートカット                                              | 説明                                                                                                                                                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>control b</kbd> または <kbd>command b</kbd>             | 太字テキストの Markdown 書式を挿入します                                                                                                                                                                       |
| <kbd>control i</kbd> または <kbd>command i</kbd>             | Inserts Markdown formatting for italicizing text{% ifversion fpt or ghae or ghes > 3.1 or ghec %}
| <kbd>control e</kbd> or <kbd>command e</kbd>              | Inserts Markdown formatting for code or a command within a line{% endif %}
| <kbd>control k</kbd> または <kbd>command k</kbd>             | リンクを作成するための Markdown 書式を挿入します                                                                                                                                                                   |
| <kbd>control shift p</kbd> または <kbd>command shift p</kbd> | Toggles between the **Write** and **Preview** comment tabs{% ifversion fpt or ghae or ghes > 3.2 or ghec %}
| <kbd>control shift 7</kbd> or <kbd>command shift 7</kbd>  | Inserts Markdown formatting for an ordered list                                                                                                                                                 |
| <kbd>control shift 8</kbd> or <kbd>command shift 8</kbd>  | Inserts Markdown formatting for an unordered list{% endif %}
| <kbd>control enter</kbd> or <kbd>command enter</kbd>      | コメントをサブミットします                                                                                                                                                                                   |
| <kbd>control .</kbd>、次に <kbd>control [返信テンプレート番号]</kbd>   | 返信テンプレートメニューを開き、コメントフィールドに返信テンプレートを自動入力します。 詳細は「[返信テンプレートについて](/articles/about-saved-replies)」を参照してください。{% ifversion fpt or ghae or ghes > 3.2 or ghec %}
| <kbd>control shift .</kbd> or <kbd>command shift.</kbd>   | Inserts Markdown formatting for a quote{% endif %}{% ifversion fpt or ghec %}
| <kbd>control g</kbd> または <kbd>command g</kbd>             | 提案を挿入します。 詳細は「[プルリクエストで提案された変更をレビューする](/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)」を参照してください。 
{% endif %}
| <kbd>r</kbd>                                              | 返信で選択したテキストを引用します。 詳細は「[基本的な書き方とフォーマットの構文](/articles/basic-writing-and-formatting-syntax)」を参照してください。                                                                                            |

## Issue およびプルリクエストのリスト

| キーボードショートカット                                  | 説明                                                                                                                                                                                                          |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>c</kbd>                                  | Issueの作成                                                                                                                                                                                                    |
| <kbd>control /</kbd> または <kbd>command /</kbd> | Issue またはプルリクエストの検索バーにカーソルを合わせます。 For more information, see "[Filtering and searching issues and pull requests](/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests)."| |
| <kbd>u</kbd>                                  | 作者によりフィルタリングします                                                                                                                                                                                             |
| <kbd>l</kbd>                                  | ラベルによりフィルタリグするか、ラベルを編集します。 詳細は「[Issue およびプルリクエストをラベルでフィルタリングする](/articles/filtering-issues-and-pull-requests-by-labels)」を参照してください。                                                                          |
| <kbd>alt</kbd> およびクリック                        | ラベルによりフィルタリングすると同時に、ラベルを除外します。 詳細は「[Issue およびプルリクエストをラベルでフィルタリングする](/articles/filtering-issues-and-pull-requests-by-labels)」を参照してください。                                                                      |
| <kbd>m</kbd>                                  | マイルストーンによりフィルタリングするか、 マイルストーンを編集します。 詳細は「[Issue およびプルリクエストをマイルストーンでフィルタリングする](/articles/filtering-issues-and-pull-requests-by-labels)」を参照してください。                                                            |
| <kbd>a</kbd>                                  | アサインされた人によりフィルタリングするか、 アサインされた人を編集します。 詳細は「[Issue およびプルリクエストをアサインされた人でフィルタリングする](/articles/filtering-issues-and-pull-requests-by-assignees)」を参照してください。                                                      |
| <kbd>o</kbd> または <kbd>enter</kbd>             | Issue を開きます                                                                                                                                                                                                 |

## Issue およびプルリクエスト
| キーボードショートカット                                                  | 説明                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>q</kbd>                                                  | レビュー担当者にリクエストします。 詳細は「[Pull Request レビューをリクエストする](/articles/requesting-a-pull-request-review/)」を参照してください。                                                                                                                                                                                                                                                                                                  |
| <kbd>m</kbd>                                                  | マイルストーンを設定します。 詳細は「[Issue およびプルリクエストにマイルストーンを関連付ける](/articles/associating-milestones-with-issues-and-pull-requests)」を参照してください。                                                                                                                                                                                                                                                                             |
| <kbd>l</kbd>                                                  | ラベルを適用します。 詳細は「[Issue およびプルリクエストにラベルを適用する](/articles/applying-labels-to-issues-and-pull-requests)」を参照してください。                                                                                                                                                                                                                                                                                               |
| <kbd>a</kbd>                                                  | アサインされた人を設定します。 詳細は「[{% data variables.product.company_short %} の他のユーザに Issue およびプルリクエストをアサインする](/articles/assigning-issues-and-pull-requests-to-other-github-users/)」を参照してください。                                                                                                                                                                                                                           |
| <kbd>cmd + shift + p</kbd> または <kbd>control + shift + p</kbd> | Toggles between the **Write** and **Preview** tabs{% ifversion fpt or ghec %}
| <kbd>alt</kbd> およびクリック                                        | When creating an issue from a task list, open the new issue form in the current tab by holding <kbd>alt</kbd> and clicking the {% octicon "issue-opened" aria-label="The issue opened icon" %} in the upper-right corner of the task. 詳しい情報については[タスクリストについて](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)を参照してください。                                                            |
| <kbd>shift</kbd> and click                                    | When creating an issue from a task list, open the new issue form in a new tab by holding <kbd>shift</kbd> and clicking the {% octicon "issue-opened" aria-label="The issue opened icon" %} in the upper-right corner of the task. 詳しい情報については[タスクリストについて](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)を参照してください。                                                                |
| <kbd>command</kbd> or <kbd>control + shift</kbd> and click    | When creating an issue from a task list, open the new issue form in the new window by holding <kbd>command</kbd> or <kbd>control + shift</kbd> and clicking the {% octicon "issue-opened" aria-label="The issue opened icon" %} in the upper-right corner of the task. For more information, see "[About task lists](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)."{% endif %}

## プルリクエストの変更

| キーボードショートカット                    | 説明                                                                                                                                                                                                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>c</kbd>                    | プルリクエスト内のコミットのリストを開きます                                                                                                                                                                                                                             |
| <kbd>t</kbd>                    | プルリクエストで変更されたファイルのリストを開きます                                                                                                                                                                                                                         |
| <kbd>j</kbd>                    | リストで選択を下に移動します                                                                                                                                                                                                                                     |
| <kbd>k</kbd>                    | リストで選択を上に移動します                                                                                                                                                                                                                                     |
| <kbd>cmd + shift + enter </kbd> | プルリクエストの差分にコメントを 1 つ追加します                                                                                                                                                                                                                          |
| <kbd>alt</kbd> およびクリック          | `alt` を押しながら、[**Show outdated**] または [**Hide outdated**] をクリックして、期限切れのレビューコメントをすべて折りたたむか展開するかを切り替えます。|{% ifversion fpt or ghes or ghae or ghec %}
| クリック後、<kbd>shift</kbd> およびクリック  | プルリクエストの複数行にコメントするには、行番号をクリックし、<kbd>shift</kbd> を押したまま、別の行番号をクリックします。 詳しい情報については、「[プルリクエストへコメントする](/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request)」を参照してください。
{% endif %}

## プロジェクトボード

### 列を移動する

| キーボードショートカット                                                                                            | 説明                |
| ------------------------------------------------------------------------------------------------------- | ----------------- |
| <kbd>enter</kbd> または <kbd>space</kbd>                                                                   | フォーカスされた列を動かし始めます |
| <kbd>escape</kbd>                                                                                       | 進行中の移動をキャンセルします   |
| <kbd>enter</kbd>                                                                                        | 進行中の移動を完了します      |
| <kbd>←</kbd> または <kbd>h</kbd>                                                                           | 左に列を移動します         |
| <kbd>command + ←</kbd> または <kbd>command + h</kbd> または <kbd>control + ←</kbd> または <kbd>control + h</kbd> | 左端に列を移動します        |
| <kbd>→</kbd> または <kbd>l</kbd>                                                                           | 右に列を移動します         |
| <kbd>command + →</kbd> または <kbd>command + l</kbd> または <kbd>control + →</kbd> または <kbd>control + l</kbd> | 右端に列を移動します        |

### カードを移動する

| キーボードショートカット                                                                                                                            | 説明                  |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <kbd>enter</kbd> または <kbd>space</kbd>                                                                                                   | フォーカスされたカードを動かし始めます |
| <kbd>escape</kbd>                                                                                                                       | 進行中の移動をキャンセルします     |
| <kbd>enter</kbd>                                                                                                                        | 進行中の移動を完了します        |
| <kbd>↓</kbd> または <kbd>j</kbd>                                                                                                           | カードを下に移動します         |
| <kbd>command + ↓</kbd> または <kbd>command + j</kbd> または <kbd>control + ↓</kbd> または <kbd>control + j</kbd>                                 | カードを列の一番下に移動します     |
| <kbd>↑</kbd> または <kbd>k</kbd>                                                                                                           | カードを上に移動します         |
| <kbd>command + ↑</kbd> または <kbd>command + k</kbd> または <kbd>control + ↑</kbd> または <kbd>control + k</kbd>                                 | カードを列の一番上に移動します     |
| <kbd>←</kbd> または <kbd>h</kbd>                                                                                                           | カードを左側の列の一番下に移動します  |
| <kbd>shift + ←</kbd> または <kbd>shift + h</kbd>                                                                                           | カードを左側の列の一番上に移動します  |
| <kbd>command + ←</kbd> または <kbd>command + h</kbd> または <kbd>control + ←</kbd> または <kbd>control + h</kbd>                                 | カードを一番左の列の一番下に移動します |
| <kbd>command + shift + ←</kbd> または <kbd>command + shift + h</kbd> または <kbd>control + shift + ←</kbd> または <kbd>control + shift + h</kbd> | カードを一番左の列の一番上に移動します |
| <kbd>→</kbd>                                                                                                                            | カードを右側の列の一番下に移動します  |
| <kbd>shift + →</kbd> または <kbd>shift + l</kbd>                                                                                           | カードを右側の列の一番上に移動します  |
| <kbd>command + →</kbd> または <kbd>command + l</kbd> または <kbd>control + →</kbd> または <kbd>control + l</kbd>                                 | カードを一番右の列の一番下に移動します |
| <kbd>command + shift + →</kbd> または <kbd>command + shift + l</kbd> または <kbd>control + shift + →</kbd> または <kbd>control + shift + l</kbd> | カードを一番右の列の一番下に移動します |

### カードをプレビューする

| キーボードショートカット   | 説明               |
| -------------- | ---------------- |
| <kbd>esc</kbd> | カードのプレビューペインを閉じる |

{% ifversion fpt or ghec %}
## {% data variables.product.prodname_actions %}

| キーボードショートカット                                               | 説明                                   |
| ---------------------------------------------------------- | ------------------------------------ |
| <kbd>command + space </kbd> または <kbd>control + space</kbd> | ワークフローエディターで、ワークフローファイルに対する提案を取得します。 |
| <kbd>g</kbd> <kbd>f</kbd>                                  | ワークフローファイルに移動します                     |
| <kbd>shift + t</kbd> または <kbd>T</kbd>                      | ログのタイムスタンプを切り替えます                    |
| <kbd>shift + f</kbd> または <kbd>F</kbd>                      | フルスクリーン表示を切り替えます                     |
| <kbd>esc</kbd>                                             | フルスクリーン表示を終了します                      |

{% endif %}

## 通知
{% ifversion fpt or ghes or ghae or ghec %}
| キーボードショートカット         | 説明           |
| -------------------- | ------------ |
| <kbd>e</kbd>         | 完了済としてマークします |
| <kbd>shift + u</kbd> | 未読としてマークします  |
| <kbd>shift + i</kbd> | 既読としてマークします  |
| <kbd>shift + m</kbd> | サブスクライブ解除します |

{% else %}

| キーボードショートカット                                   | 説明           |
| ---------------------------------------------- | ------------ |
| <kbd>e</kbd> または <kbd>I</kbd> または <kbd>y</kbd> | 既読としてマークします  |
| <kbd>shift + m</kbd>                           | スレッドをミュートします |
{% endif %}

## ネットワークグラフ

| キーボードショートカット                                  | 説明           |
| --------------------------------------------- | ------------ |
| <kbd>←</kbd> または <kbd>h</kbd>                 | 左にスクロールします   |
| <kbd>→</kbd> または <kbd>l</kbd>                 | 右にスクロールします   |
| <kbd>↑</kbd> または <kbd>k</kbd>                 | 上にスクロールします   |
| <kbd>↓</kbd> または <kbd>j</kbd>                 | 下にスクロールします   |
| <kbd>shift + ←</kbd> または <kbd>shift + h</kbd> | 左端までスクロールします |
| <kbd>shift + →</kbd> または <kbd>shift + l</kbd> | 右端までスクロールします |
| <kbd>shift + ↑</kbd> または <kbd>shift + k</kbd> | 上端までスクロールします |
| <kbd>shift + ↓</kbd> または <kbd>shift + j</kbd> | 下端までスクロールします |
