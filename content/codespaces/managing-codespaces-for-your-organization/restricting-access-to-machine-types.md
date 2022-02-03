---
title: Restricting access to machine types
shortTitle: Machine type access
intro: 'You can set constraints on the types of machines users can choose when they create codespaces in your organization.'
product: '{% data reusables.gated-features.codespaces %}'
permissions: 'To manage access to machine types for the repositories in an organization, you must be an organization owner.'
versions:
  fpt: '*'
  ghec: '*'
type: how_to
topics:
  - Codespaces
---

## Overview

Typically, when you create a codespace you are offered a choice of specifications for the machine that will run your codespace. You can choose the machine type that best suits your needs. For more information, see "[Creating a codespace](/codespaces/developing-in-codespaces/creating-a-codespace#creating-a-codespace)." If you pay for using {% data variables.product.prodname_github_codespaces %} then your choice of machine type will affect how much your are billed. For more information about pricing, see "[About billing for Codespaces](/billing/managing-billing-for-github-codespaces/about-billing-for-codespaces)."

As an organization owner, you may want to configure constraints on the types of machine that are available. For example, if the work in your organization doesn't require significant compute power or storage space, you can remove the highly resourced machines from the list of options that people can choose from. You do this by defining one or more policies in the {% data variables.product.prodname_codespaces %} settings for your organization.

### Behavior when you set a machine type constraint

If there are existing codespaces that no longer conform to a policy you have defined, these codespaces will continue to operate until they time out. When the user attempts to resume the codespace they are shown a message telling them that the currenly selected machine type is no longer allowed for this organization and prompting them to choose an alternative machine type.

If you remove higher specification machine types that are required by the {% data variables.product.prodname_codespaces %} configuration for an individual repository in your organization, then it won't be possible to create a codespace for that repository. When someone attempts to create a codespace they will see a message telling them that there are no valid machine types available that meet the requirements of the repository's {% data variables.product.prodname_codespaces %} configuration.

{% note %}

**Note**: Anyone who can edit the `devcontainer.json` configuration file in a repository can set a minimum specification for machines that can be used for codespaces for that repository. For more information, see "[Setting a minimum specification for codespace machines](/codespaces/setting-up-your-project-for-codespaces/setting-a-minimum-specification-for-codespace-machines)."

{% endnote %}

If setting a policy for machine types prevents people from using {% data variables.product.prodname_codespaces %} for a particular repository there are two options:

* You can adjust your policies to specifically remove the restrictions from the affected repository.
* Anyone who has a codespace that they can no longer access, because of the new policy, can export their codespace to a branch. This branch will contain all of their changes from the codespace. They can then open a new codespace on this branch with a compliant machine type or work on this branch locally. For more information, see "[Exporting changes to a branch](/codespaces/troubleshooting/exporting-changes-to-a-branch)."

### Setting organization-wide and repository-specific policies

When you create a policy you choose whether it applies to all repositories in your organization, or only to specified repositories. If you set an organization-wide policy then any policies you set for individual repositories must fall within the restriction set at the organization level. Adding policies makes the choice of machine more, not less, restrictive.

For example, you could create an organization-wide policy that restricts the machine types to either 2 or 4 cores. You can then set a policy for Repository A that restricts it to just 2-core machines. Setting a policy for Repository A that restricted it to machines with 2, 4, or 8 cores would result in a choice of 2-core and 4-core machines only, because the organization-wide policy prevents access to 8-core machines.

If you add an organization-wide policy, you should set it to the largest choice of machine types that will be available for any repository in your organization. You can then add repository-specific policies to further restrict the choice.

## Adding a policy to limit the available machine types

{% data reusables.profile.access_org %}
{% data reusables.profile.org_settings %}
{% data reusables.organizations.click-codespaces %}
1. Under "Codespaces", click **Policy**.

   !["Policy" tab in left sidebar](/assets/images/help/organizations/codespaces-policy-sidebar.png)

1. On the "Codespace policies" page, click **Create Policy**.
1. Enter a name for your new policy.
1. Click **Add constraint** and choose **Machine types**.

   ![Add a constraint for machine types](/assets/images/help/codespaces/add-constraint-dropdown.png)

1. Click {% octicon "pencil" aria-label="The edit icon" %} to edit the constraint, then clear the selection of any machine types that you don't want to be available.

   ![Edit the machine type constraint](/assets/images/help/codespaces/edit-machine-constraint.png)

1. In the "Change policy target" area, click the dropdown button.
1. Choose either **All repositories** or **Selected repositories** to determine which repositories this policy will apply to.
1. If you chose **Selected repositories**:
   1. Click {% octicon "gear" aria-label="The settings icon" %}.

      ![Edit the settings for the policy](/assets/images/help/codespaces/policy-edit.png)

   1. Select the repositories you want this policy to apply to.
   1. At the bottom of the repository list, click **Select repositories**.

      ![Select repositories for this policy](/assets/images/help/codespaces/policy-select-repos.png)

1. Click **Save**.

## Editing a policy

1. Display the "Codespace policies" page. For more information, see "[Adding a policy to limit the available machine types](#adding-a-policy-to-limit-the-available-machine-types)."
1. Click the name of the policy you want to edit.
1. Make the required changes then click **Save**.

## Deleting a policy 

1. Display the "Codespace policies" page. For more information, see "[Adding a policy to limit the available machine types](#adding-a-policy-to-limit-the-available-machine-types)."
1. Click the delete button to the right of the policy you want to delete.

   ![The delete button for a policy](/assets/images/help/codespaces/policy-delete.png)

## Further reading

- "[Managing spending limits for Codespaces](/billing/managing-billing-for-github-codespaces/managing-spending-limits-for-codespaces)"