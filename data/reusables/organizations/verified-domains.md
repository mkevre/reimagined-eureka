{% ifversion fpt or ghec or ghes > 3.3 or ghae-issue-5658 %}
1. In the "Security" section of the sidebar, click **{% octicon "verified" aria-label="The verified icon" %} Verified and approved domains**.
{% elsif ghes < 3.4 or ghae %}
1. In the left sidebar, click **Verified & approved domains**.
!["Verified & approved domains" tab](/assets/images/help/organizations/verified-domains-button.png)
{% endif %}
