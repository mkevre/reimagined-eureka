---
title: Crear un sitio de Páginas de GitHub
intro: 'Puede crear un sitio de {% data variables.product.prodname_pages %} en un repositorio nuevo o existente.'
redirect_from:
  - /articles/creating-pages-manually
  - /articles/creating-project-pages-manually
  - /articles/creating-project-pages-from-the-command-line
  - /articles/creating-project-pages-using-the-command-line
  - /articles/creating-a-github-pages-site
  - /github/working-with-github-pages/creating-a-github-pages-site
product: '{% data reusables.gated-features.pages %}'
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
topics:
  - Pages
shortTitle: Crear un sitio de GitHub Pages
---

{% data reusables.pages.org-owners-can-restrict-pages-creation %}

## Crear un repositorio para tu sitio

{% data reusables.pages.new-or-existing-repo %}

{% data reusables.repositories.create_new %}
{% data reusables.repositories.owner-drop-down %}
{% data reusables.pages.create-repo-name %}
{% data reusables.repositories.choose-repo-visibility %}
{% data reusables.repositories.initialize-with-readme %}
{% data reusables.repositories.create-repo %}

## Crear tu sitio

{% data reusables.pages.must-have-repo-first %}

{% data reusables.pages.private_pages_are_public_warning %}

{% data reusables.pages.navigate-site-repo %}
{% data reusables.pages.decide-publishing-source %}
3. Si ya existe la fuente de publicación que elegiste, desplázate hasta la fuente de publicación. Si la fuente de publicación que elegiste no existe, crear la fuente de publicación.
4. En la raíz de la fuente de publicación, crea un archivo nuevo denominado `index.md` que contenga el contenido que quieras mostrar en la página principal de tu sitio.

  {% tip %}

  **Tip:** Si el archivo `index.html` está presente, este se utilizará en vez de `index.md`. Si ni `index.html` ni `index.md` están presentes, se utilizará `README.md`.

  {% endtip %}
{% data reusables.pages.configure-publishing-source %}
{% data reusables.repositories.sidebar-settings %}
{% data reusables.pages.sidebar-pages %}{% ifversion fpt or ghec %}
{% data reusables.pages.choose-visibility %}{% endif %}
{% data reusables.pages.visit-site %}
{% data reusables.pages.check-workflow-run %}

{% data reusables.pages.admin-must-push %}

## Pasos siguientes

Puedes agregar más páginas a tu sitio creando más archivos nuevos. Cada archivo estará disponible en tu sitio en la misma estructura de directorios que tu fuente de publicación. Por ejemplo, si la fuente de publicación para tu sitio de proyectos es la rama `gh-pages`, y creas un archivo nuevo denominado `/about/contact-us.md` en la rama `gh-pages`, el archivo estará disponible en {% ifversion fpt or ghec %}`https://<user>.github.io/<repository>/{% else %}`http(s)://<hostname>/pages/<username>/<repository>/{% endif %}about/contact-us.html`.

También puedes agregar un tema para personalizar la apariencia de tu sitio. Para obtener más información, consulta {% ifversion fpt or ghec %}"[Agregar un tema a tu sitio de {% data variables.product.prodname_pages %} con el selector de temas](/articles/adding-a-theme-to-your-github-pages-site-with-the-theme-chooser){% else %}"[Agregar un tema a tu sitio de {% data variables.product.prodname_pages %} con Jekyll](/articles/adding-a-theme-to-your-github-pages-site-using-jekyll){% endif %}".

Para personalizar aún más tu sitio, puedes usar Jekyll, un generador de sitio estático con soporte integrado para {% data variables.product.prodname_pages %}. Para obtener más información, consulta la sección "[Acerca de {% data variables.product.prodname_pages %} y de Jekyll](/articles/about-github-pages-and-jekyll)".

## Leer más

- "[Solucionar problemas de errores de construcción de Jekyll para sitios de {% data variables.product.prodname_pages %}](/articles/troubleshooting-jekyll-build-errors-for-github-pages-sites)"
- "[Crear y eliminar ramas dentro de tu repositorio](/articles/creating-and-deleting-branches-within-your-repository/)"
- "[Crear archivos nuevos](/articles/creating-new-files)"
