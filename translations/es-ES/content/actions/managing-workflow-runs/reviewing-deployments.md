---
title: Revisar los despliegues
intro: Puedes aprobar o rechazar jobs que estén esperando una revisión.
product: '{% data reusables.gated-features.environments %}'
versions:
  fpt: '*'
  ghes: '>=3.1'
  ghae: '*'
  ghec: '*'
---


## Acerca de las revisiones requeridas en los flujos de trabajo

Los jobs que referencian un ambiente configurado con revisores requeridos esperarán por una aprobación antes de comenzar. Mientras que un job espera su revisión, tendrá un estado de "Waiting". Si un job no se aprueba dentro de 30 días, la ejecución del flujo de trabajo se cancelará automáticamente.

Para obtener más información sobre los ambientes y aprobaciones requeridos, consulta la sección"[Utilizar ambientes para despliegue](/actions/deployment/using-environments-for-deployment)".{% ifversion fpt or ghae or ghes > 3.1 or ghec %} Para obtener información sobre cómo revisar los despliegues con la API de REST, consulta la sección "[Ejecuciones de flujo de trabajo](/rest/reference/actions#workflow-runs)".{% endif %}

## Aprobar o rechazar un job

1. Navega a la ejecución de flujo de trabajo que requiere revisión. Para obtener más información acerca de navegar a una ejecución de flujo de trabajo, consulta la sección "[Visualizar el historial de la ejecución del flujo de trabajo](/actions/managing-workflow-runs/viewing-workflow-run-history)".
2. Da clic en **Revisar despliegues**. ![Revisar despliegues](/assets/images/actions-review-deployments.png)
3. Selecciona el(los) ambiente(s) para aprobar o rechazar. Opcionalmente, deja un comentario. ![Aprobar despliegues](/assets/images/actions-approve-deployments.png)
4. Aprueba o rechaza:
   - Para aprobar el job, da clic en **Aprobar y desplegar**. Una vez que el job se apruebe (y que cualquier otra regla de protección del ambiente haya pasado), el job procederá. En este punto, el job puede acceder a cualquier secreto que esté almacenado en el ambiente.
   - Para rechazar el job, da clic en **Rechazar**. Si se rechaza un job, el flujo de trabajo fallará.
