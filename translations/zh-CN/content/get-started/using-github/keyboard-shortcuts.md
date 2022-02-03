---
title: 键盘快捷键
intro: '几乎 {% data variables.product.prodname_dotcom %} 上的每一页都有键盘快捷键，可以更快地执行操作。'
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

## 关于键盘快捷键

Typing <kbd>?</kbd> on {% data variables.product.prodname_dotcom %} brings up a dialog box that lists the keyboard shortcuts available for that page. 您可以使用这些键盘快捷键对站点执行操作，而无需使用鼠标导航。

{% if keyboard-shortcut-accessibility-setting %}
You can disable character key shortcuts, while still allowing shortcuts that use modifier keys, in your accessibility settings. For more information, see "[Managing accessibility settings](/account-and-profile/setting-up-and-managing-your-github-user-account/managing-user-account-settings/managing-accessibility-settings)."{% endif %}

下面是一些可用键盘快捷键的列表。
{% if command-palette %}
The {% data variables.product.prodname_command_palette %} also gives you quick access to a wide range of actions, without the need to remember keyboard shortcuts. For more information, see "[{% data variables.product.prodname_command_palette %}](/get-started/using-github/github-command-palette)."{% endif %}

## 站点快捷键

| 键盘快捷键                       | 描述                                                                                                                                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>s</kbd> 或 <kbd>/</kbd> | 聚焦于搜索栏。 更多信息请参阅“[关于在 {% data variables.product.company_short %} 上搜索](/search-github/getting-started-with-searching-on-github/about-searching-on-github)”。                                                                                                     |
| <kbd>g</kbd> <kbd>n</kbd>   | 转到您的通知。 更多信息请参阅{% ifversion fpt or ghes or ghae or ghec %}"[关于通知](/github/managing-subscriptions-and-notifications-on-github/about-notifications){% else %}“[关于通知](/github/receiving-notifications-about-activity-on-github/about-notifications){% endif %}”。 |
| <kbd>esc</kbd>              | 当聚焦于用户、议题或拉取请求悬停卡时，关闭悬停卡并重新聚焦于悬停卡所在的元素                                                                                                                                                                                                                        |

{% if command-palette %}

<kbd>control</kbd><kbd>k</kbd> or <kbd>command</kbd><kbd>k</kbd> | Opens the {% data variables.product.prodname_command_palette %}. If you are editing Markdown text, open the command palette with <kbd>Ctl</kbd><kbd>alt</kbd><kbd>k</kbd> or <kbd>⌘</kbd><kbd>option</kbd><kbd>k</kbd>. For more information, see "[{% data variables.product.prodname_command_palette %}](/get-started/using-github/github-command-palette)."{% endif %}

## 仓库

| 键盘快捷键                     | 描述                                                                                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>g</kbd> <kbd>c</kbd> | 转到 **Code（代码）**选项卡                                                                                                                                                                                                                          |
| <kbd>g</kbd> <kbd>i</kbd> | 转到 **Issues（议题）**选项卡。 更多信息请参阅“[关于议题](/articles/about-issues)”。                                                                                                                                                                              |
| <kbd>g</kbd> <kbd>p</kbd> | 转到 **Pull requests（拉取请求）**选项卡。 For more information, see "[About pull requests](/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)."{% ifversion fpt or ghes or ghec %}
| <kbd>g</kbd> <kbd>a</kbd> | 转到 **Actions（操作）**选项卡。 更多信息请参阅“[关于 Actions](/actions/getting-started-with-github-actions/about-github-actions)”。{% endif %}
| <kbd>g</kbd> <kbd>b</kbd> | 转到 **Projects（项目）**选项卡。 更多信息请参阅“[关于项目板](/articles/about-project-boards)”。                                                                                                                                                                   |
| <kbd>g</kbd> <kbd>w</kbd> | 转到 **Wiki** 选项卡。 更多信息请参阅“[关于 wiki](/communities/documenting-your-project-with-wikis/about-wikis)”。{% ifversion fpt or ghec %}
| <kbd>g</kbd> <kbd>g</kbd> | 转到 **Discussions（讨论）**选项卡。 更多信息请参阅“[关于讨论](/discussions/collaborating-with-your-community-using-discussions/about-discussions)”。{% endif %}

## 源代码编辑

| 键盘快捷键                                                           | 描述                                                                                                                                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |{% ifversion fpt or ghec %}
| <kbd>.</kbd>                                                    | Opens a repository or pull request in the web-based editor. For more information, see "[Web-based editor](/codespaces/developing-in-codespaces/web-based-editor)."{% endif %}
| <kbd>control b</kbd> 或 <kbd>command b</kbd>                     | 插入 Markdown 格式用于粗体文本                                                                                                                                                          |
| <kbd>control i</kbd> 或 <kbd>command i</kbd>                     | 插入 Markdown 格式用于斜体文本                                                                                                                                                          |
| <kbd>control k</kbd> 或 <kbd>command k</kbd>                     | Inserts Markdown formatting for creating a link{% ifversion fpt or ghec or ghae or ghes > 3.3 %}
| <kbd>control shift 7</kbd> or <kbd>command shift 7</kbd>        | Inserts Markdown formatting for an ordered list                                                                                                                               |
| <kbd>control shift 8</kbd> or <kbd>command shift 8</kbd>        | Inserts Markdown formatting for an unordered list                                                                                                                             |
| <kbd>control shift .</kbd> or <kbd>command shift.</kbd>         | Inserts Markdown formatting for a quote{% endif %}
| <kbd>e</kbd>                                                    | 在 **Edit file（编辑文件）**选项卡中打开源代码文件                                                                                                                                              |
| <kbd>control f</kbd> 或 <kbd>command f</kbd>                     | 开始在文件编辑器中搜索                                                                                                                                                                   |
| <kbd>control g</kbd> 或 <kbd>command g</kbd>                     | 查找下一个                                                                                                                                                                         |
| <kbd>control shift g</kbd> or <kbd>command shift g</kbd>        | 查找上一个                                                                                                                                                                         |
| <kbd>control shift f</kbd> or <kbd>command option f</kbd>       | 替换                                                                                                                                                                            |
| <kbd>control shift r</kbd> or <kbd>command shift option f</kbd> | 全部替换                                                                                                                                                                          |
| <kbd>alt g</kbd>                                                | 跳至行                                                                                                                                                                           |
| <kbd>control z</kbd> 或 <kbd>command z</kbd>                     | 撤消                                                                                                                                                                            |
| <kbd>control y</kbd> 或 <kbd>command y</kbd>                     | 重做                                                                                                                                                                            |
| <kbd>command shift p</kbd>                                      | 在 **Edit file（编辑文件）** 与 **Preview changes（预览更改）**选项卡之间切换                                                                                                                      |
| <kbd>control s</kbd> 或 <kbd>command s</kbd>                     | 填写提交消息                                                                                                                                                                        |

有关更多键盘快捷键，请参阅 [CodeMirror 文档](https://codemirror.net/doc/manual.html#commands)。

## 源代码浏览

| 键盘快捷键        | 描述                                                                                      |
| ------------ | --------------------------------------------------------------------------------------- |
| <kbd>t</kbd> | 激活文件查找器                                                                                 |
| <kbd>l</kbd> | 跳至代码中的某一行                                                                               |
| <kbd>w</kbd> | 切换到新分支或标记                                                                               |
| <kbd>y</kbd> | 将 URL 展开为其规范形式。 更多信息请参阅“[获取文件的永久链接](/articles/getting-permanent-links-to-files)”。       |
| <kbd>i</kbd> | 显示或隐藏有关差异的评论。 更多信息请参阅“[评论拉取请求的差异](/articles/commenting-on-the-diff-of-a-pull-request)”。 |
| <kbd>a</kbd> | 在差异上显示或隐藏注释                                                                             |
| <kbd>b</kbd> | 打开追溯视图。 更多信息请参阅“[跟踪文件中的更改](/articles/tracing-changes-in-a-file)”。                       |

## 评论

| 键盘快捷键                                                    | 描述                                                                                                                                                                           |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>control b</kbd> 或 <kbd>command b</kbd>              | 插入 Markdown 格式用于粗体文本                                                                                                                                                         |
| <kbd>control i</kbd> 或 <kbd>command i</kbd>              | 插入斜体文本的 Markdown 格式{% ifversion fpt or ghae or ghes > 3.1 or ghec %}
| <kbd>control e</kbd> 或 <kbd>command e</kbd>              | 在行内插入代码或命令的 Markdown 格式{% endif %}
| <kbd>control k</kbd> 或 <kbd>command k</kbd>              | 插入 Markdown 格式用于创建链接                                                                                                                                                         |
| <kbd>control shift p</kbd> 或 <kbd>command shift p</kbd>  | Toggles between the **Write** and **Preview** comment tabs{% ifversion fpt or ghae or ghes > 3.2 or ghec %}
| <kbd>control shift 7</kbd> or <kbd>command shift 7</kbd> | Inserts Markdown formatting for an ordered list                                                                                                                              |
| <kbd>control shift 8</kbd> or <kbd>command shift 8</kbd> | Inserts Markdown formatting for an unordered list{% endif %}
| <kbd>control enter</kbd> or <kbd>command enter</kbd>     | 提交评论                                                                                                                                                                         |
| <kbd>control .</kbd>，然后 <kbd>control [已保存回复编号]</kbd>     | 打开已保存回复菜单，然后使用已保存回复自动填写评论字段。 更多信息请参阅“[关于已保存回复](/articles/about-saved-replies)”。{% ifversion fpt or ghae or ghes > 3.2 or ghec %}
| <kbd>control shift .</kbd> or <kbd>command shift.</kbd>  | Inserts Markdown formatting for a quote{% endif %}{% ifversion fpt or ghec %}
| <kbd>control g</kbd> 或 <kbd>command g</kbd>              | 插入建议。 更多信息请参阅“[审查拉取请求中提议的更改](/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)”。 
{% endif %}
| <kbd>r</kbd>                                             | 在您的回复中引用所选的文本。 更多信息请参阅“[基本撰写和格式语法](/articles/basic-writing-and-formatting-syntax#quoting-text)”。                                                                             |

## 议题和拉取请求列表

| 键盘快捷键                                       | 描述                                                                                                                                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>c</kbd>                                | 创建议题                                                                                                                                                                                        |
| <kbd>control /</kbd> 或 <kbd>command /</kbd> | 将光标聚焦于议题或拉取请求搜索栏。 For more information, see "[Filtering and searching issues and pull requests](/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests)."| |
| <kbd>u</kbd>                                | 按作者过滤                                                                                                                                                                                       |
| <kbd>l</kbd>                                | 按标签过滤或编辑标签。 更多信息请参阅“[按标签过滤议题和拉取请求](/articles/filtering-issues-and-pull-requests-by-labels)”。                                                                                                |
| <kbd>alt</kbd> 并单击                          | 按标签过滤时，排除标签。 更多信息请参阅“[按标签过滤议题和拉取请求](/articles/filtering-issues-and-pull-requests-by-labels)”。                                                                                               |
| <kbd>m</kbd>                                | 按里程碑过滤或编辑里程碑。 更多信息请参阅“[按里程碑过滤议题和拉取请求](/articles/filtering-issues-and-pull-requests-by-milestone)”。                                                                                          |
| <kbd>a</kbd>                                | 按受理人过滤或编辑受理人。 更多信息请参阅“[按受理人过滤议题和拉取请求](/articles/filtering-issues-and-pull-requests-by-assignees)”。                                                                                          |
| <kbd>o</kbd> 或 <kbd>enter</kbd>             | 打开议题                                                                                                                                                                                        |

## 议题和拉取请求
| 键盘快捷键                                                       | 描述                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>q</kbd>                                                | 请求审查者。 更多信息请参阅“[申请拉取请求审查](/articles/requesting-a-pull-request-review/)”。                                                                                                                                                                                      |
| <kbd>m</kbd>                                                | 设置里程碑。 更多信息请参阅“[将里程碑与议题及拉取请求关联](/articles/associating-milestones-with-issues-and-pull-requests/)”。                                                                                                                                                            |
| <kbd>l</kbd>                                                | 应用标签。 更多信息请参阅“[应用标签到议题和拉取请求](/articles/applying-labels-to-issues-and-pull-requests/)”。                                                                                                                                                                        |
| <kbd>a</kbd>                                                | 设置受理人。 更多信息请参阅“[分配议题和拉取请求到其他 {% data variables.product.company_short %} 用户](/articles/assigning-issues-and-pull-requests-to-other-github-users/)”。                                                                                                            |
| <kbd>cmd + shift + p</kbd> 或 <kbd>control + shift + p</kbd> | 在 **Write（撰写）**和 **Preview（预览）**选项卡之间切换{% ifversion fpt or ghec %}
| <kbd>alt</kbd> 并单击                                          | 从任务列表创建议题时，按住 <kbd>alt</kbd> 并单击任务右上角的 {% octicon "issue-opened" aria-label="The issue opened icon" %} ，在当前选项卡中打开新议题表单。 更多信息请参阅“[关于任务列表](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)”。                                           |
| <kbd>shift</kbd> 并点击                                        | 从任务列表创建议题时，按住 <kbd>shift</kbd> 并单击任务右上角的 {% octicon "issue-opened" aria-label="The issue opened icon" %} ，在新选项卡中打开新议题表单。 更多信息请参阅“[关于任务列表](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)”。                                          |
| <kbd>command</kbd> 或 <kbd>control + shift</kbd> 并点击         | 从任务列表创建议题时，按住 <kbd>command</kbd> 或 <kbd>control + shift</kbd> 并单击任务右上角的 {% octicon "issue-opened" aria-label="The issue opened icon" %} ，在新窗口中打开新议题表单。 更多信息请参阅“[关于任务列表](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)”。{% endif %}

## 拉取请求中的更改

| 键盘快捷键                           | 描述                                                                                                                                                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>c</kbd>                    | 在拉取请求中打开提交列表                                                                                                                                                                                                |
| <kbd>t</kbd>                    | 在拉取请求中打开已更改文件列表                                                                                                                                                                                             |
| <kbd>j</kbd>                    | 将所选内容在列表中向下移动                                                                                                                                                                                               |
| <kbd>k</kbd>                    | 将所选内容在列表中向上移动                                                                                                                                                                                               |
| <kbd>cmd + shift + enter </kbd> | 添加一条有关拉取请求差异的评论                                                                                                                                                                                             |
| <kbd>alt</kbd> 并单击              | 通过按下 `alt` 并单击 **Show outdated（显示已过期）**或 **Hide outdated（隐藏已过期）**，在折叠和展开拉取请求中所有过期的审查评论之间切换。{% ifversion fpt or ghes or ghae or ghec %}
| 单击，然后按住 <kbd>shift</kbd> 并单击    | 单击一个行号，按住 <kbd>shift</kbd>，然后单击另一行号，便可对拉取请求的多行发表评论。 更多信息请参阅“[评论拉取请求](/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request)。”
{% endif %}

## 项目板

### 移动列

| 键盘快捷键                                                                                             | 描述          |
| ------------------------------------------------------------------------------------------------- | ----------- |
| <kbd>enter</kbd> 或 <kbd>space</kbd>                                                               | 开始移动聚焦的列    |
| <kbd>escape</kbd>                                                                                 | 取消正在进行的移动   |
| <kbd>enter</kbd>                                                                                  | 完成正在进行的移动   |
| <kbd>←</kbd> 或 <kbd>h</kbd>                                                                       | 向左移动列       |
| <kbd>command + ←</kbd> 或 <kbd>command + h</kbd> 或 <kbd>control + ←</kbd> 或 <kbd>control + h</kbd> | 将列移动到最左侧的位置 |
| <kbd>→</kbd> 或 <kbd>l</kbd>                                                                       | 向右移动列       |
| <kbd>command + →</kbd> 或 <kbd>command + l</kbd> 或 <kbd>control + →</kbd> 或 <kbd>control + l</kbd> | 将列移动到最右侧的位置 |

### 移动卡片

| 键盘快捷键                                                                                                                             | 描述            |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| <kbd>enter</kbd> 或 <kbd>space</kbd>                                                                                               | 开始移动聚焦的卡片     |
| <kbd>escape</kbd>                                                                                                                 | 取消正在进行的移动     |
| <kbd>enter</kbd>                                                                                                                  | 完成正在进行的移动     |
| <kbd>↓</kbd> 或 <kbd>j</kbd>                                                                                                       | 向下移动卡片        |
| <kbd>command + ↓</kbd> 或 <kbd>command + j</kbd> 或 <kbd>control + ↓</kbd> 或 <kbd>control + j</kbd>                                 | 将卡片移动到该列的底部   |
| <kbd>↑</kbd> 或 <kbd>k</kbd>                                                                                                       | 向上移动卡片        |
| <kbd>command + ↑</kbd> 或 <kbd>command + k</kbd> 或 <kbd>control + ↑</kbd> 或 <kbd>control + k</kbd>                                 | 将卡片移动到该列的顶部   |
| <kbd>←</kbd> 或 <kbd>h</kbd>                                                                                                       | 将卡片移动到左侧列的底部  |
| <kbd>shift + ←</kbd> 或 <kbd>shift + h</kbd>                                                                                       | 将卡片移动到左侧列的顶部  |
| <kbd>command + ←</kbd> 或 <kbd>command + h</kbd> 或 <kbd>control + ←</kbd> 或 <kbd>control + h</kbd>                                 | 将卡片移动到最左侧列的底部 |
| <kbd>command + shift + ←</kbd> 或 <kbd>command + shift + h</kbd> 或 <kbd>control + shift + ←</kbd> 或 <kbd>control + shift + h</kbd> | 将卡片移动到最左侧列的顶部 |
| <kbd>→</kbd>                                                                                                                      | 将卡片移动到右侧列的底部  |
| <kbd>shift + →</kbd> 或 <kbd>shift + l</kbd>                                                                                       | 将卡片移动到右侧列的顶部  |
| <kbd>command + →</kbd> 或 <kbd>command + l</kbd> 或 <kbd>control + →</kbd> 或 <kbd>control + l</kbd>                                 | 将卡片移动到最右侧列的底部 |
| <kbd>command + shift + →</kbd> 或 <kbd>command + shift + l</kbd> 或 <kbd>control + shift + →</kbd> 或 <kbd>control + shift + l</kbd> | 将卡片移动到最右侧列的底部 |

### 预览卡片

| 键盘快捷键          | 描述       |
| -------------- | -------- |
| <kbd>esc</kbd> | 关闭卡片预览窗格 |

{% ifversion fpt or ghec %}
## {% data variables.product.prodname_actions %}

| 键盘快捷键                                                    | 描述                      |
| -------------------------------------------------------- | ----------------------- |
| <kbd>command + space </kbd> 或 <kbd>control + space</kbd> | 在工作流程编辑器中，获取对工作流程文件的建议。 |
| <kbd>g</kbd> <kbd>f</kbd>                                | 转到工作流程文件                |
| <kbd>shift + t</kbd> 或 <kbd>T</kbd>                      | 切换日志中的时间戳               |
| <kbd>shift + f</kbd> 或 <kbd>F</kbd>                      | 切换全屏日志                  |
| <kbd>esc</kbd>                                           | 退出全屏日志                  |

{% endif %}

## 通知
{% ifversion fpt or ghes or ghae or ghec %}
| 键盘快捷键                | 描述    |
| -------------------- | ----- |
| <kbd>e</kbd>         | 标记为完成 |
| <kbd>shift + u</kbd> | 标记为未读 |
| <kbd>shift + i</kbd> | 标记为已读 |
| <kbd>shift + m</kbd> | 取消订阅  |

{% else %}

| 键盘快捷键                                    | 描述    |
| ---------------------------------------- | ----- |
| <kbd>e</kbd>、<kbd>I</kbd> 或 <kbd>y</kbd> | 标记为已读 |
| <kbd>shift + m</kbd>                     | 静音线程  |
{% endif %}

## 网络图

| 键盘快捷键                                       | 描述     |
| ------------------------------------------- | ------ |
| <kbd>←</kbd> 或 <kbd>h</kbd>                 | 向左滚动   |
| <kbd>→</kbd> 或 <kbd>l</kbd>                 | 向右滚动   |
| <kbd>↑</kbd> 或 <kbd>k</kbd>                 | 向上滚动   |
| <kbd>↓</kbd> 或 <kbd>j</kbd>                 | 向下滚动   |
| <kbd>shift + ←</kbd> 或 <kbd>shift + h</kbd> | 一直向左滚动 |
| <kbd>shift + →</kbd> 或 <kbd>shift + l</kbd> | 一直向右滚动 |
| <kbd>shift + ↑</kbd> 或 <kbd>shift + k</kbd> | 一直向上滚动 |
| <kbd>shift + ↓</kbd> 或 <kbd>shift + j</kbd> | 一直向下滚动 |
