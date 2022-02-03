---
title: Keyboard shortcuts
intro: 'Nearly every page on {% data variables.product.prodname_dotcom %} has a keyboard shortcut to perform actions faster.'
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
## About keyboard shortcuts

Typing <kbd>?</kbd> on {% data variables.product.prodname_dotcom %} brings up a dialog box that lists the keyboard shortcuts available for that page. You can use these keyboard shortcuts to perform actions across the site without using your mouse to navigate.

{% if keyboard-shortcut-accessibility-setting %}
You can disable character key shortcuts, while still allowing shortcuts that use modifier keys, in your accessibility settings. For more information, see "[Managing accessibility settings](/account-and-profile/setting-up-and-managing-your-github-user-account/managing-user-account-settings/managing-accessibility-settings)."{% endif %}

Below is a list of some of the available keyboard shortcuts.
{% if command-palette %}
The {% data variables.product.prodname_command_palette %} also gives you quick access to a wide range of actions, without the need to remember keyboard shortcuts. For more information, see "[{% data variables.product.prodname_command_palette %}](/get-started/using-github/github-command-palette)."{% endif %}

## Site wide shortcuts

| Keyboard shortcut | Description
|-----------|------------
|<kbd>S</kbd> or <kbd>/</kbd> | Focus the search bar. For more information, see "[About searching on {% data variables.product.company_short %}](/search-github/getting-started-with-searching-on-github/about-searching-on-github)."
|<kbd>G</kbd> <kbd>N</kbd> | Go to your notifications. For more information, see {% ifversion fpt or ghes or ghae or ghec %}"[About notifications](/github/managing-subscriptions-and-notifications-on-github/about-notifications){% else %}"[About notifications](/github/receiving-notifications-about-activity-on-github/about-notifications){% endif %}."
|<kbd>Esc</kbd> | When focused on a user, issue, or pull request hovercard, closes the hovercard and refocuses on the element the hovercard is in
{% if command-palette %}|<kbd>Command</kbd>+<kbd>K</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>K</kbd> (Windows/Linux) | Opens the {% data variables.product.prodname_command_palette %}. If you are editing Markdown text, open the command palette with <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>K</kbd> or <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>K</kbd>. For more information, see "[{% data variables.product.prodname_command_palette %}](/get-started/using-github/github-command-palette)."{% endif %}

## Repositories

| Keyboard shortcut | Description
|-----------|------------
|<kbd>G</kbd> <kbd>C</kbd> | Go to the **Code** tab
|<kbd>G</kbd> <kbd>I</kbd> | Go to the **Issues** tab. For more information, see "[About issues](/articles/about-issues)."
|<kbd>G</kbd> <kbd>P</kbd> | Go to the **Pull requests** tab. For more information, see "[About pull requests](/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)."{% ifversion fpt or ghes or ghec %}
|<kbd>G</kbd> <kbd>A</kbd> | Go to the **Actions** tab. For more information, see "[About Actions](/actions/getting-started-with-github-actions/about-github-actions)."{% endif %}
|<kbd>G</kbd> <kbd>B</kbd> | Go to the **Projects** tab. For more information, see "[About project boards](/articles/about-project-boards)."
|<kbd>G</kbd> <kbd>W</kbd> | Go to the **Wiki** tab. For more information, see "[About wikis](/communities/documenting-your-project-with-wikis/about-wikis)."{% ifversion fpt or ghec %}
|<kbd>G</kbd> <kbd>G</kbd> | Go to the **Discussions** tab. For more information, see "[About discussions](/discussions/collaborating-with-your-community-using-discussions/about-discussions)."{% endif %}

## Source code editing

| Keyboard shortcut | Description
|-----------|------------{% ifversion fpt or ghec %}
|<kbd>.</kbd> | Opens a repository or pull request in the web-based editor. For more information, see "[Web-based editor](/codespaces/developing-in-codespaces/web-based-editor)."{% endif %}
|<kbd>Command</kbd>+<kbd>B</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>B</kbd> (Windows/Linux) | Inserts Markdown formatting for bolding text
|<kbd>Command</kbd>+<kbd>I</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>I</kbd> (Windows/Linux) | Inserts Markdown formatting for italicizing text
|<kbd>Command</kbd>+<kbd>K</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>K</kbd> (Windows/Linux) | Inserts Markdown formatting for creating a link{% ifversion fpt or ghec or ghae or ghes > 3.3 %}
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> (Windows/Linux) | Inserts Markdown formatting for an ordered list
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>8</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>8</kbd> (Windows/Linux) | Inserts Markdown formatting for an unordered list
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> (Windows/Linux) | Inserts Markdown formatting for a quote{% endif %}
|<kbd>E</kbd> | Open source code file in the **Edit file** tab
|<kbd>Command</kbd>+<kbd>F</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>F</kbd> (Windows/Linux) | Start searching in file editor
|<kbd>Command</kbd>+<kbd>G</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>G</kbd> (Windows/Linux) | Find next
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> (Windows/Linux) | Find previous
|<kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>F</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> (Windows/Linux) | Replace
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>Option</kbd>+<kbd>F</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> (Windows/Linux) | Replace all
|<kbd>Alt</kbd>+<kbd>G</kbd> | Jump to line
|<kbd>Command</kbd>+<kbd>Z</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Z</kbd> (Windows/Linux) | Undo
|<kbd>Command</kbd>+<kbd>Y</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Y</kbd> (Windows/Linux) | Redo
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> | Toggles between the **Edit file** and **Preview changes** tabs
|<kbd>Command</kbd>+<kbd>S</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>S</kbd> (Windows/Linux) | Write a commit message

For more keyboard shortcuts, see the [CodeMirror documentation](https://codemirror.net/doc/manual.html#commands).

## Source code browsing

| Keyboard shortcut | Description
|-----------|------------
|<kbd>T</kbd> | Activates the file finder
|<kbd>L</kbd> | Jump to a line in your code
|<kbd>W</kbd> | Switch to a new branch or tag
|<kbd>Y</kbd> | Expand a URL to its canonical form. For more information, see "[Getting permanent links to files](/articles/getting-permanent-links-to-files)."
|<kbd>I</kbd> | Show or hide comments on diffs. For more information, see "[Commenting on the diff of a pull request](/articles/commenting-on-the-diff-of-a-pull-request)."
|<kbd>A</kbd> | Show or hide annotations on diffs
|<kbd>B</kbd> | Open blame view. For more information, see "[Tracing changes in a file](/articles/tracing-changes-in-a-file)."

## Comments

| Keyboard shortcut | Description
|-----------|------------
|<kbd>Command</kbd>+<kbd>B</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>B</kbd> (Windows/Linux) | Inserts Markdown formatting for bolding text
|<kbd>Command</kbd>+<kbd>I</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>I</kbd> (Windows/Linux) | Inserts Markdown formatting for italicizing text{% ifversion fpt or ghae or ghes > 3.1 or ghec %}
|<kbd>Command</kbd>+<kbd>E</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>E</kbd> (Windows/Linux) | Inserts Markdown formatting for code or a command within a line{% endif %}
|<kbd>Command</kbd>+<kbd>K</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>K</kbd> (Windows/Linux) | Inserts Markdown formatting for creating a link
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows/Linux) | Toggles between the **Write** and **Preview** comment tabs{% ifversion fpt or ghae or ghes > 3.2 or ghec %}
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> (Windows/Linux) | Inserts Markdown formatting for an ordered list
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>8</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>8</kbd> (Windows/Linux) | Inserts Markdown formatting for an unordered list{% endif %}
|<kbd>Command</kbd>+<kbd>Enter</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows/Linux) | Submits a comment
|<kbd>Ctrl</kbd>+<kbd>.</kbd> and then <kbd>Ctrl</kbd>+<kbd>[saved reply number]</kbd> | Opens saved replies menu and then autofills comment field with a saved reply. For more information, see "[About saved replies](/articles/about-saved-replies)."{% ifversion fpt or ghae or ghes > 3.2 or ghec %}
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> (Windows/Linux) | Inserts Markdown formatting for a quote{% endif %}{% ifversion fpt or ghec %}
|<kbd>Command</kbd>+<kbd>G</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>G</kbd> (Windows/Linux) | Insert a suggestion. For more information, see "[Reviewing proposed changes in a pull request](/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)." |{% endif %}
|<kbd>R</kbd> | Quote the selected text in your reply. For more information, see "[Basic writing and formatting syntax](/articles/basic-writing-and-formatting-syntax#quoting-text)." |

## Issue and pull request lists

| Keyboard shortcut | Description
|-----------|------------
|<kbd>C</kbd> | Create an issue
|<kbd>Command</kbd>+<kbd>/</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>/</kbd> (Windows/Linux) | Focus your cursor on the issues or pull requests search bar. For more information, see "[Filtering and searching issues and pull requests](/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests)."||
|<kbd>U</kbd> | Filter by author
|<kbd>L</kbd> | Filter by or edit labels. For more information, see "[Filtering issues and pull requests by labels](/articles/filtering-issues-and-pull-requests-by-labels)."
|<kbd>Alt</kbd> and click | While filtering by labels, exclude labels. For more information, see "[Filtering issues and pull requests by labels](/articles/filtering-issues-and-pull-requests-by-labels)."
|<kbd>M</kbd> | Filter by or edit milestones. For more information, see "[Filtering issues and pull requests by milestone](/articles/filtering-issues-and-pull-requests-by-milestone)."
|<kbd>A</kbd> | Filter by or edit assignee. For more information, see "[Filtering issues and pull requests by assignees](/articles/filtering-issues-and-pull-requests-by-assignees)."
|<kbd>O</kbd> or <kbd>Enter</kbd> | Open issue

## Issues and pull requests
| Keyboard shortcut | Description
|-----------|------------
|<kbd>Q</kbd> | Request a reviewer. For more information, see "[Requesting a pull request review](/articles/requesting-a-pull-request-review/)."
|<kbd>M</kbd> | Set a milestone. For more information, see "[Associating milestones with issues and pull requests](/articles/associating-milestones-with-issues-and-pull-requests/)."
|<kbd>L</kbd> | Apply a label. For more information, see "[Applying labels to issues and pull requests](/articles/applying-labels-to-issues-and-pull-requests/)."
|<kbd>A</kbd> | Set an assignee. For more information, see "[Assigning issues and pull requests to other {% data variables.product.company_short %} users](/articles/assigning-issues-and-pull-requests-to-other-github-users/)."
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows/Linux) | Toggles between the **Write** and **Preview** tabs{% ifversion fpt or ghec %}
|<kbd>Alt</kbd> and click | When creating an issue from a task list, open the new issue form in the current tab by holding <kbd>Alt</kbd> and clicking the {% octicon "issue-opened" aria-label="The issue opened icon" %} in the upper-right corner of the task. For more information, see "[About task lists](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)."
|<kbd>Shift</kbd> and click | When creating an issue from a task list, open the new issue form in a new tab by holding <kbd>Shift</kbd> and clicking the {% octicon "issue-opened" aria-label="The issue opened icon" %} in the upper-right corner of the task. For more information, see "[About task lists](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)."
|<kbd>Command</kbd> and click (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd> and click (Windows/Linux) | When creating an issue from a task list, open the new issue form in the new window by holding <kbd>Command</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd> and clicking the {% octicon "issue-opened" aria-label="The issue opened icon" %} in the upper-right corner of the task. For more information, see "[About task lists](/issues/tracking-your-work-with-issues/creating-issues/about-task-lists)."{% endif %}

## Changes in pull requests

| Keyboard shortcut | Description
|-----------|------------
|<kbd>C</kbd> | Open the list of commits in the pull request
|<kbd>T</kbd> | Open the list of changed files in the pull request
|<kbd>J</kbd> | Move selection down in the list
|<kbd>K</kbd> | Move selection up in the list
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>Enter</kbd> | Add a single comment on a pull request diff |
|<kbd>Alt</kbd> and click | Toggle between collapsing and expanding all outdated review comments in a pull request by holding down <kbd>Alt</kbd> and clicking **Show outdated** or **Hide outdated**.|{% ifversion fpt or ghes or ghae or ghec %}
|Click, then <kbd>Shift</kbd> and click | Comment on multiple lines of a pull request by clicking a line number, holding <kbd>Shift</kbd>, then clicking another line number. For more information, see "[Commenting on a pull request](/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request)."|{% endif %}

## Project boards

### Moving a column

| Keyboard shortcut | Description
|-----------|------------
|<kbd>Enter</kbd> or <kbd>Space</kbd> | Start moving the focused column
|<kbd>Esc</kbd> | Cancel the move in progress
|<kbd>Enter</kbd> | Complete the move in progress
|<kbd>←</kbd> or <kbd>H</kbd> | Move column to the left
|<kbd>Command</kbd>+<kbd>←</kbd> or <kbd>Command</kbd>+<kbd>H</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>←</kbd> or <kbd>Ctrl</kbd>+<kbd>H</kbd> (Windows/Linux) | Move column to the leftmost position
|<kbd>→</kbd> or <kbd>L</kbd> | Move column to the right
|<kbd>Command</kbd>+<kbd>→</kbd> or <kbd>Command</kbd>+<kbd>L</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>→</kbd> or <kbd>Ctrl</kbd>+<kbd>L</kbd> (Windows/Linux) | Move column to the rightmost position

### Moving a card

| Keyboard shortcut | Description
|-----------|------------
|<kbd>Enter</kbd> or <kbd>Space</kbd> | Start moving the focused card
|<kbd>Esc</kbd> | Cancel the move in progress
|<kbd>Enter</kbd> | Complete the move in progress
|<kbd>↓</kbd> or <kbd>J</kbd> | Move card down
|<kbd>Command</kbd>+<kbd>↓</kbd> or <kbd>Command</kbd>+<kbd>J</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>↓</kbd> or <kbd>Ctrl</kbd>+<kbd>J</kbd> (Windows/Linux) | Move card to the bottom of the column
|<kbd>↑</kbd> or <kbd>K</kbd> | Move card up
|<kbd>Command</kbd>+<kbd>↑</kbd> or <kbd>Command</kbd>+<kbd>K</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>↑</kbd> or <kbd>Ctrl</kbd>+<kbd>K</kbd> (Windows/Linux) | Move card to the top of the column
|<kbd>←</kbd> or <kbd>H</kbd> | Move card to the bottom of the column on the left
|<kbd>Shift</kbd>+<kbd>←</kbd> or <kbd>Shift</kbd>+<kbd>H</kbd> | Move card to the top of the column on the left
|<kbd>Command</kbd>+<kbd>←</kbd> or <kbd>Command</kbd>+<kbd>H</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>←</kbd> or <kbd>Ctrl</kbd>+<kbd>H</kbd> (Windows/Linux) | Move card to the bottom of the leftmost column
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd> or <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd> (Windows/Linux) | Move card to the top of the leftmost column
|<kbd>→</kbd> | Move card to the bottom of the column on the right
|<kbd>Shift</kbd>+<kbd>→</kbd> or <kbd>Shift</kbd>+<kbd>L</kbd> | Move card to the top of the column on the right
|<kbd>Command</kbd>+<kbd>→</kbd> or <kbd>Command</kbd>+<kbd>L</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>→</kbd> or <kbd>Ctrl</kbd>+<kbd>L</kbd> (Windows/Linux) | Move card to the bottom of the rightmost column
|<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>→</kbd> or <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>→</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> (Windows/Linux) | Move card to the bottom of the rightmost column

### Previewing a card

| Keyboard shortcut | Description
|-----------|------------
|<kbd>Esc</kbd> | Close the card preview pane

{% ifversion fpt or ghec %}
## {% data variables.product.prodname_actions %}

| Keyboard shortcut | Description
|-----------|------------
|<kbd>Command</kbd>+<kbd>Space </kbd> (Mac) or </br> <kbd>Ctrl</kbd>+<kbd>Space</kbd> (Windows/Linux) | In the workflow editor, get suggestions for your workflow file.
|<kbd>G</kbd> <kbd>F</kbd> | Go to the workflow file
|<kbd>Shift</kbd>+<kbd>T</kbd> or <kbd>T</kbd> | Toggle timestamps in logs
|<kbd>Shift</kbd>+<kbd>F</kbd> or <kbd>F</kbd> | Toggle full-screen logs
|<kbd>Esc</kbd> | Exit full-screen logs

{% endif %}

## Notifications

{% ifversion fpt or ghes or ghae or ghec %}
| Keyboard shortcut | Description
|-----------|------------
|<kbd>E</kbd> | Mark as done
|<kbd>Shift</kbd>+<kbd>U</kbd>| Mark as unread
|<kbd>Shift</kbd>+<kbd>I</kbd>| Mark as read
|<kbd>Shift</kbd>+<kbd>M</kbd> | Unsubscribe

{% else %}

| Keyboard shortcut | Description
|-----------|------------
|<kbd>E</kbd> or <kbd>I</kbd> or <kbd>Y</kbd> | Mark as read
|<kbd>Shift</kbd>+<kbd>M</kbd> | Mute thread
{% endif %}

## Network graph

| Keyboard shortcut | Description
|-----------|------------
|<kbd>←</kbd> or <kbd>H</kbd> | Scroll left
|<kbd>→</kbd> or <kbd>L</kbd> | Scroll right
|<kbd>↑</kbd> or <kbd>K</kbd> | Scroll up
|<kbd>↓</kbd> or <kbd>J</kbd> | Scroll down
|<kbd>Shift</kbd>+<kbd>←</kbd> (Mac) or </br> <kbd>Shift</kbd>+<kbd>H</kbd> (Windows/Linux) | Scroll all the way left
|<kbd>Shift</kbd>+<kbd>→</kbd> (Mac) or </br> <kbd>Shift</kbd>+<kbd>L</kbd> (Windows/Linux) | Scroll all the way right
|<kbd>Shift</kbd>+<kbd>↑</kbd> (Mac) or </br> <kbd>Shift</kbd>+<kbd>K</kbd> (Windows/Linux) | Scroll all the way up
|<kbd>Shift</kbd>+<kbd>↓</kbd> (Mac) or </br> <kbd>Shift</kbd>+<kbd>J</kbd> (Windows/Linux) | Scroll all the way down
