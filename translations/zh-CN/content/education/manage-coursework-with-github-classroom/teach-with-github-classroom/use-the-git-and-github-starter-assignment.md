---
title: 使用 Git 和 GitHub 起始作业
intro: '您可以使用 Git 和 {% data variables.product.company_short %} 起始作业，让学生全面了解 Git 和 {% data variables.product.company_short %} 基础知识。'
versions:
  free-pro-team: '*'
redirect_from:
  - /education/manage-coursework-with-github-classroom/use-the-git-and-github-starter-assignment
---

{% note %}

**注意：**Git 和 {% data variables.product.company_short %} 起始作业目前处于测试阶段，可能会更改。

{% endnote %}

Git 和 {% data variables.product.company_short %} 起始作业是一个预制课程，概括了 Git 和 {% data variables.product.company_short %} 的基础知识，并将学生与资源联系起来以了解更多关于具体主题的信息。

### 基本要求

{% data reusables.classroom.assignments-classroom-prerequisite %}

### 创建起始作业

#### 如果在课堂中没有现有作业

1. 登录 {% data variables.product.prodname_classroom_with_url %}。
2. 导航到教室。
3. 在 {% octicon "repo" aria-label="The repo icon" %} **作业** 选项卡中，单击 **Use starter assignment（使用起始作业）**。

<div class="procedural-image-wrapper">
  <img alt="创建第一次作业" class="procedural-image-wrapper" src="/assets/images/help/classroom/assignments-create-first-assignment.png">
</div>

#### 如果在课堂中已经有现有作业

1. 登录 {% data variables.product.prodname_classroom_with_url %}。
2. 导航到教室。
3. 在 {% octicon "repo" aria-label="The repo icon" %} **作业** 选项卡中，单击蓝色横幅上的链接。

<div class="procedural-image-wrapper">
  <img alt="“New assignment（新作业）”按钮" class="procedural-image-wrapper" src="/assets/images/help/classroom/assignments-click-new-starter-assignment-button.png">
</div>

### 设置作业的基本信息

将入门课程导入您的组织，命名您的作业，决定是否分配截止日期，并选择分配仓库的可见性。

- [导入作业](#importing-the-assignment)
- [指定作业名称](#naming-an-assignment)
- [分配作业的截止时间](#assigning-a-deadline-for-an-assignment)
- [选择作业类型](#choosing-an-assignment-type)
- [选择作业仓库的可见性](#choosing-a-visibility-for-assignment-repositories)

#### 导入作业

您首先需要将 Git 和 {% data variables.product.product_name %} 起始作业导入您的组织。

<div class="procedural-image-wrapper">
  <img alt="“导入作业”按钮" class="procedural-image-wrapper" src="/assets/images/help/classroom/assignments-import-starter-assignment.png">
</div>

#### 命名作业

对于个人作业，{% data variables.product.prodname_classroom %} 使用仓库前缀和学生的 {% data variables.product.product_name %} 用户名对仓库命名。 默认情况下，仓库前缀是作业标题。 例如，如果您对作业 "assignment-1" 命名，学生在 {% data variables.product.product_name %} 上的用户名是 @octocat，则 @octocat 的作业仓库的名称将是 `assignment-1-octocat`。

{% data reusables.classroom.assignments-type-a-title %}

#### 分配作业的截止时间

{% data reusables.classroom.assignments-guide-assign-a-deadline %}

#### 选择作业仓库的可见性

作业的仓库可以是公开或私有的。 如果您使用私有仓库，只有学生可以查看您提供的反馈。 在“Repository visibility（仓库可见性）”下，选择可见性。

完成后，单击 **Continue（继续）**。 {% data variables.product.prodname_classroom %} 将创建作业并将您带到作业页面。

<div class="procedural-image-wrapper">
  <img alt="“Continue（继续）”按钮" class="procedural-image-wrapper" src="/assets/images/help/classroom/assignments-click-continue-button.png">
</div>

### 邀请学生参加作业

{% data reusables.classroom.assignments-guide-invite-students-to-assignment %}

您可以在作业的 **All students（所有学生）**选项卡中查看学生是否已进入教室或提交作业。 {% data reusables.classroom.assignments-to-prevent-submission %}

<div class="procedural-image-wrapper">
  <img alt="个人作业" class="procedural-image-wrapper" src="/assets/images/help/classroom/assignment-individual-hero.png">
</div>

Git 和 {% data variables.product.company_short %} 起始作业只适用于个别学生，不适用于组。 一旦您创建作业，学生可以开始做作业。

### 后续步骤

- 根据课程定制其他作业。 更多信息请参阅“[创建个人作业](/education/manage-coursework-with-github-classroom/create-an-individual-assignment)”和“[创建小组作业](/education/manage-coursework-with-github-classroom/create-a-group-assignment)”。

### 延伸阅读

- "[在课堂和研究中使用 {% data variables.product.prodname_dotcom %}](/education/explore-the-benefits-of-teaching-and-learning-with-github-education/use-github-in-your-classroom-and-research)"
- "[将学习管理系统连接到 {% data variables.product.prodname_classroom %}](/education/manage-coursework-with-github-classroom/connect-a-learning-management-system-to-github-classroom)"
