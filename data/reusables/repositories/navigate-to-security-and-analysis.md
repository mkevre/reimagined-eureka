{% ifversion fpt or ghec or ghes > 3.3 or ghae-issue-5658 %}
1. In the "Security" section of the sidebar, click **{% octicon "shield-lock" aria-label="The shield-lock icon" %} Security & analysis**.
{% elsif ghes < 3.4 or ghae %}
1. In the left sidebar, click **Security & analysis**.
  !["Security & analysis" tab in repository settings](/assets/images/help/repository/security-and-analysis-tab.png)
{% endif %}
