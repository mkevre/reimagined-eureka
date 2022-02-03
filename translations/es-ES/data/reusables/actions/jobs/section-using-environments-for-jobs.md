Use `jobs.<job_id>.environment` to define the environment that the job references. Todas las reglas de protección del ambiente deben pasar antes de que un job que referencie dicho ambiente se envie a un ejecutor. Para obtener más información, consulta la sección "[Utilizar ambientes para despliegue](/actions/deployment/using-environments-for-deployment)".

Puedes proporcionar el ambiente como solo el `name` de éste, o como un objeto de ambiente con el `name` y `url`. La URL mapea hacia `environment_url` en la API de despliegues. Para obtener más información sobre la API de despliegues, consulta la sección "[Despliegues](/rest/reference/repos#deployments)".

### Example: Using a single environment name
{% raw %}
```yaml
environment: staging_environment
```
{% endraw %}

### Example: Using environment name and URL

```yaml
environment:
  name: production_environment
  url: https://github.com
```

La URL puede ser una expresión y puede utilizar cualquier contexto, excepto el de [`secrets`](/actions/learn-github-actions/contexts#contexts). Para obtener más información sobre las expresiones, consulta la sección "[Expresiones](/actions/learn-github-actions/expressions)".

### Example: Using output as URL
{% raw %}
```yaml
environment:
  name: production_environment
  url: ${{ steps.step_id.outputs.url_output }}
```
{% endraw %}
