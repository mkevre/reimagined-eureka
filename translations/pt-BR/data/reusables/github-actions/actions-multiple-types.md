If you specify activity types or filters for an event and your workflow triggers on multiple events, you must configure each event separately. Você deve anexar dois pontos (`:`) a todos os eventos, incluindo eventos sem configuração.

For example, a workflow with the following `on` value will run when:

- A label is created
- A push is made to the `main` branch in the repository
- A push is made to a {% data variables.product.prodname_pages %}-enabled branch

```yaml
on:
  label:
    types:
      - created
  push:
    branches:
      - main
  page_build:
```
