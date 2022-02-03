---
title: Publicar paquetes Java con Gradle
intro: Puedes usar Gradle para publicar paquetes Java en un registro como parte de tu flujo de trabajo de integración continua (CI).
redirect_from:
  - /actions/language-and-framework-guides/publishing-java-packages-with-gradle
  - /actions/guides/publishing-java-packages-with-gradle
versions:
  fpt: '*'
  ghes: '*'
  ghae: '*'
  ghec: '*'
type: tutorial
topics:
  - Packaging
  - Publishing
  - Java
  - Gradle
shortTitle: Paquetes de Java con Gradle
---

{% data reusables.actions.enterprise-beta %}
{% data reusables.actions.enterprise-github-hosted-runners %}

## Introducción

{% data reusables.github-actions.publishing-java-packages-intro %}

## Prerrequisitos

Te recomendamos que tengas una comprensión básica de los archivos de flujo de trabajo y las opciones de configuración. Para obtener más información, consulta la sección "[Aprende sobre {% data variables.product.prodname_actions %}](/actions/learn-github-actions)".

Para obtener más información acerca de la creación de un flujo de trabajo de CI para tu proyecto Java con Gradle, consulta "[Construir y probar Java con Gradle](/actions/language-and-framework-guides/building-and-testing-java-with-gradle)".

También puede ser útil tener un entendimiento básico de lo siguiente:

- "[Trabajar con el registro de npm](/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)"
- "[Variables de ambiente](/actions/reference/environment-variables)"
- "[Secretos cifrados](/actions/reference/encrypted-secrets)"
- "[Autenticación en un flujo de trabajo](/actions/reference/authentication-in-a-workflow)"

## Acerca de la configuración del paquete

Los campos `groupId` y `artifactId` en la sección `MavenPublication` del archivo _build.gradle_ crean un identificador único para tu paquete que los registros usan para vincular tu paquete a un registro.  Esto es similar a los campos `groupId` y `artifactId` del archivo _pom.xml_ de Maven.  Para obtener más información, consulta "[Maven Publish Plugin](https://docs.gradle.org/current/userguide/publishing_maven.html)" en la documentación de Gradle.

El archivo _build.gradle_ también contiene la configuración de los repositorios de administración de distribución en los que Gradle publicará los paquetes. Cada repositorio debe tener un nombre, una URL de implementación y credenciales para la autenticación.

## Publicar paquetes en el repositorio central de Maven

Cada vez que creas un lanzamiento nuevo, puedes desencadenar un flujo de trabajo para publicar tu paquete. El flujo de trabajo en el ejemplo a continuación se ejecuta cuando el evento `lanzamiento` desencadena con tipo `creado`. El flujo de trabajo publica el paquete en el repositorio central de Maven si se pasan las pruebas de CI. Para obtener más información acerca del evento `release`, consulta "[Eventos que activan flujos de trabajo](/actions/reference/events-that-trigger-workflows#release)".

Puedes definir un nuevo repositorio de Maven en el bloque de publicación de tu archivo _build.gradle_ que apunta al repositorio de tu paquete.  Por ejemplo, si estás desplegando en el repositorio central de Maven a través del proyecto de alojamiento OSSRH, tu _build.gradle_ podría especificar un repositorio con el nombre `"OSSRH"`.

{% raw %}
```groovy{:copy}
plugins {
  ...
  id 'maven-publish'
}

publishing {
  ...

  repositories {
    maven {
      name = "OSSRH"
      url = "https://oss.sonatype.org/service/local/staging/deploy/maven2/"
      credentials {
        username = System.getenv("MAVEN_USERNAME")
        password = System.getenv("MAVEN_PASSWORD")
      }
    }
  }
}
```
{% endraw %}

Con esta configuración, puedes crear un flujo de trabajo que publique tu paquete en el repositorio central de Maven al ejecutar el comando `gradle publish`. En el paso de implementación, necesitarás establecer variables de entorno para el nombre de usuario y la contraseña o token que usas para autenticar en el repositorio de Maven. Para obtener más información, consulta "[Crear y usar secretos cifrados](/github/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)."

```yaml{:copy}
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Publish package to the Maven Central Repository
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Java
        uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      - name: Validate Gradle wrapper
        uses: gradle/wrapper-validation-action@e6e38bacfdf1a337459f332974bb2327a31aaf4b
      - name: Publish package
        uses: gradle/gradle-build-action@4137be6a8bf7d7133955359dbd952c0ca73b1021
        with:
          arguments: publish
        env:
          MAVEN_USERNAME: {% raw %}${{ secrets.OSSRH_USERNAME }}{% endraw %}
          MAVEN_PASSWORD: {% raw %}${{ secrets.OSSRH_TOKEN }}{% endraw %}
```

{% data reusables.github-actions.gradle-workflow-steps %}
1. Ejecuta la acción [`gradle/gradle-build-action`](https://github.com/gradle/gradle-build-action) con el argumento `publish` para publicar en el repositorio `OSSRH` de Maven. La variable de entorno `MAVEN_USERNAME` se establecerá con los contenidos de tu `OSSRH_USERNAME` secreto, y la variable de entorno `MAVEN_PASSWORD` se establecerá con los contenidos de tu `OSSRH_TOKEN` secreto.

   Para obtener más información acerca del uso de secretos en tu flujo de trabajo, consulta "[Crear y usar secretos cifrados](/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)".

## Sube paquetes al {% data variables.product.prodname_registry %}

Cada vez que creas un lanzamiento nuevo, puedes desencadenar un flujo de trabajo para publicar tu paquete. El flujo de trabajo en el ejemplo a continuación se ejecuta cuando el evento `lanzamiento` desencadena con tipo `creado`. El flujo de trabajo publica el paquete en el {% data variables.product.prodname_registry %} si se superan las pruebas de CI. Para obtener más información acerca del evento `release`, consulta "[Eventos que activan flujos de trabajo](/actions/reference/events-that-trigger-workflows#release)".

Puedes definir un nuevo repositorio de Maven en el bloque de publicación de tu _build.gradle_ que apunte a {% data variables.product.prodname_registry %}.  En esa configuración de repositorio, también puedes aprovechar las variables de entorno establecidas en tu ejecución de flujo de trabajo de CI.  Puedes usar la variable de entorno `GITHUB_ACTOR` como nombre de usuario y puedes establecer la variable de entorno `GITHUB_TOKEN` con tu `GITHUB_TOKEN` secreto.

{% data reusables.github-actions.github-token-permissions %}

Por ejemplo, si tu organización se llama "octocat" y tu repositorio se llama "hello-world", entonces la configuración {% data variables.product.prodname_registry %} en _build.gradle_ tendría un aspecto similar al ejemplo a continuación.

{% raw %}
```groovy{:copy}
plugins {
  ...
  id 'maven-publish'
}

publishing {
  ...

  repositories {
    maven {
      name = "GitHubPackages"
      url = "https://maven.pkg.github.com/octocat/hello-world"
      credentials {
        username = System.getenv("GITHUB_ACTOR")
        password = System.getenv("GITHUB_TOKEN")
      }
    }
  }
}
```
{% endraw %}

Con esta configuración, puedes crear un flujo de trabajo que publique tu paquete en el {% data variables.product.prodname_registry %} ejecutando el comando `gradle publish`.

```yaml{:copy}
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Publish package to GitHub Packages
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest {% ifversion fpt or ghes > 3.1 or ghae or ghec %}
    permissions: 
      contents: read
      packages: write {% endif %}
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      - name: Validate Gradle wrapper
        uses: gradle/wrapper-validation-action@e6e38bacfdf1a337459f332974bb2327a31aaf4b
      - name: Publish package
        uses: gradle/gradle-build-action@4137be6a8bf7d7133955359dbd952c0ca73b1021
        with:
          arguments: publish
        env:
          GITHUB_TOKEN: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
```

{% data reusables.github-actions.gradle-workflow-steps %}
1. Ejecuta la acción [`gradle/gradle-build-action`](https://github.com/gradle/gradle-build-action) con el argumento `publish` para publicar al {% data variables.product.prodname_registry %}. La variable de entorno `GITHUB_TOKEN` se establecerá con el contenido del `GITHUB_TOKEN` secreto. {% ifversion fpt or ghes > 3.1 or ghae or ghec %}La clave de `permissions` especifica el acceso que permitirá el secreto del `GITHUB_TOKEN`.{% endif %}

   Para obtener más información acerca del uso de secretos en tu flujo de trabajo, consulta "[Crear y usar secretos cifrados](/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)".

## Publicar paquetes en el repositorio central de Maven y {% data variables.product.prodname_registry %}

Puedes publicar tus paquetes en el repositorio central de Maven y {% data variables.product.prodname_registry %} al configurar cada uno de ellos en tu archivo _build.gradle_.

Asegúrate de que tu archivo _build.gradle_ incluya un repositorio para tu repositorio {% data variables.product.prodname_dotcom %} y para tu proveedor de repositorios centrales de Maven.

Por ejemplo, si implementas el repositorio central a través del proyecto de alojamiento OSSRH, es posible que desees especificarlo en un repositorio de administración de distribución con el `name` establecido en `OSSRH`. Si implementas para {% data variables.product.prodname_registry %}, es posible que desees especificarlo en un repositorio de administración de distribución con el `name` establecido en `GitHubPackages`.

Si tu organización se nombra como "octocat" y tu repositorio como "hello-world", entonces la configuración en _build.gradle_ se vería similar al siguiente ejmplo.

{% raw %}
```groovy{:copy}
plugins {
  ...
  id 'maven-publish'
}

publishing {
  ...

  repositories {
    maven {
      name = "OSSRH"
      url = "https://oss.sonatype.org/service/local/staging/deploy/maven2/"
      credentials {
        username = System.getenv("MAVEN_USERNAME")
        password = System.getenv("MAVEN_PASSWORD")
      }
    }
    maven {
      name = "GitHubPackages"
      url = "https://maven.pkg.github.com/octocat/hello-world"
      credentials {
        username = System.getenv("GITHUB_ACTOR")
        password = System.getenv("GITHUB_TOKEN")
      }
    }
  }
}
```
{% endraw %}

Con esta configuración, puedes crear un flujo de trabajo que publique tu paquete en el repositorio central de Maven y {% data variables.product.prodname_registry %} al ejecutar el comando `gradle publish`.

```yaml{:copy}
{% data reusables.actions.actions-not-certified-by-github-comment %}

name: Publish package to the Maven Central Repository and GitHub Packages
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest {% ifversion fpt or ghes > 3.1 or ghae or ghec %}
    permissions: 
      contents: read
      packages: write {% endif %}
    steps:
      - uses: actions/checkout@v2
      - name: Set up Java
        uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      - name: Validate Gradle wrapper
        uses: gradle/wrapper-validation-action@e6e38bacfdf1a337459f332974bb2327a31aaf4b
      - name: Publish package
        uses: gradle/gradle-build-action@4137be6a8bf7d7133955359dbd952c0ca73b1021
        with:
          arguments: publish
        env: {% raw %}
          MAVEN_USERNAME: ${{ secrets.OSSRH_USERNAME }}
          MAVEN_PASSWORD: ${{ secrets.OSSRH_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}{% endraw %}
```

{% data reusables.github-actions.gradle-workflow-steps %}
1. Ejecuta la acción [`gradle/gradle-build-action`](https://github.com/gradle/gradle-build-action) con el argumento `publish` para publicar en el repositorio `OSSRH` de Maven y en el {% data variables.product.prodname_registry %}. La variable de entorno `MAVEN_USERNAME` se establecerá con los contenidos de tu `OSSRH_USERNAME` secreto, y la variable de entorno `MAVEN_PASSWORD` se establecerá con los contenidos de tu `OSSRH_TOKEN` secreto. La variable de entorno `GITHUB_TOKEN` se establecerá con el contenido del `GITHUB_TOKEN` secreto. {% ifversion fpt or ghes > 3.1 or ghae or ghec %}La clave de `permissions` especifica el acceso que permitirá el secreto del `GITHUB_TOKEN`.{% endif %}

   Para obtener más información acerca del uso de secretos en tu flujo de trabajo, consulta "[Crear y usar secretos cifrados](/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)".
