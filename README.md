Next shop

## TODO

- Roles estan votados por todo el code
- Remover la logica de enviar a cloudinarylike a service

# Next.js

Proporciona una forma de manejar el cache del lado del cliente a través de la técnica de "Client-Side Rendering" (CSR) y "Static Site Generation" (SSG) según cómo configures tus páginas.

## Client-Side Rendering (CSR):

Cuando utilizas CSR en Next.js, el cliente solicita y renderiza los datos en el navegador después de que la página principal se haya cargado. Esto significa que los datos pueden ser almacenados en caché en el navegador del usuario utilizando las capacidades de almacenamiento local (como localStorage o sessionStorage) o bibliotecas de caché de terceros.

## Static Site Generation (SSG):

Si configuras tu página para utilizar SSG, Next.js genera el HTML estático durante la compilación, lo que significa que cada solicitud del navegador obtiene la misma página HTML. Esto puede resultar en un alto rendimiento y caché de contenido completo en el lado del cliente.

## Incremental Static Generation (ISG):

Next.js también admite ISG, que es una combinación de SSG y CSR. Con ISG, puedes generar páginas estáticas en tiempo de compilación y luego permitir que se actualicen de forma incremental en el lado del cliente a medida que se generen nuevos datos. Esto puede ser útil para manejar datos que cambian con el tiempo sin forzar una recarga completa de la página.
