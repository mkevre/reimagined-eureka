---
title: Viewing and updating support tickets
intro: 'You can view your support tickets{% ifversion ghes or ghec %}, collaborate with colleagues on tickets,{% endif %} and respond to {% data variables.contact.github_support %} using the {% data variables.contact.support_portal %}.'
shortTitle: Managing your tickets
versions:
  fpt: '*'
  ghec: '*'
  ghes: '*'
topics:
  - Support
---

## About ticket management

{% data reusables.support.zendesk-old-tickets %}

You can use the [GitHub Support Portal](https://support.github.com/) to view current and past support tickets and respond to {% data variables.contact.github_support %}.

{% ifversion ghes or ghec %}
{% data reusables.enterprise-accounts.support-entitlements %}
{% endif %}

## Viewing your support tickets

{% data reusables.support.view-open-tickets %}
1. Under the text box, you can read the comment history. The most recent response is at the top. ![Screenshot of support ticket comment history, with the most recent response at the top.](/assets/images/help/support/support-recent-response.png)

## Updating support tickets

{% data reusables.support.view-open-tickets %}
1. Optionally, if the issue is resolved, under the text box, click **Close ticket**. ![Screenshot showing location of the "Close ticket" button.](/assets/images/help/support/close-ticket.png)
1. To respond to GitHub Support and add a new comment to the ticket, type your response in the text box. ![Screenshot of the "Add a comment" text field.](/assets/images/help/support/new-comment-field.png)
1. To add your comment to the ticket, click **Comment**. ![Screenshot of the "Comment" button.](/assets/images/help/support/add-comment.png)

{% ifversion ghec or ghes %}
## Collaborating on support tickets

You can collaborate with your colleagues on support tickets using the support portal. Owners, billing managers, and other enterprise members with support entitlements can view tickets associated with an enterprise account or an organization managed by an enterprise account. 詳しい情報については「[Enterpriseのサポート資格の管理](/enterprise-cloud@latest/admin/user-management/managing-users-in-your-enterprise/managing-support-entitlements-for-your-enterprise)」を参照してください。

In addition to viewing tickets, you can also add comments to support tickets if your email address is copied on the ticket or if the person who opened the ticket used an email address with a domain that is verified for the enterprise account or organization managed by an enterprise account. For more information about verifying a domain, see "[Verifying or approving a domain for your enterprise](/enterprise-cloud@latest/admin/configuration/configuring-your-enterprise/verifying-or-approving-a-domain-for-your-enterprise)" and "[Verifying or approving a domain for your organization](/enterprise-cloud@latest/organizations/managing-organization-settings/verifying-or-approving-a-domain-for-your-organization)."

{% endif %}

## 参考リンク

- "[About GitHub Support](/support/learning-about-github-support/about-github-support)"
