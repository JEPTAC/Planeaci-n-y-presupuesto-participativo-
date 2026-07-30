# Dashboard público: porcentaje del presupuesto para participación ciudadana

Paquete estático para GitHub Pages.

## Propósito

Publicar de forma clara, accesible e interactiva el indicador:

**Porcentaje del presupuesto para el proceso de participación ciudadana**

## Datos utilizados

- Presupuesto definitivo municipal: $31.301.037.487
- Presupuesto directo para participación: $30.127.937
- Porcentaje exacto: 0,096252 %
- Porcentaje presentado con cuatro decimales: 0,0963 %
- Presentación ciudadana redondeada: 0,10 %
- Certificados: $30.127.937
- Comprometido: $27.679.937
- Obligaciones: $0
- Pagos: $0
- Corte: 31 de marzo de 2026

## Archivos

```text
index.html
assets/css/styles.css
assets/js/app.js
assets/img/escudo-san-pedro.svg
.nojekyll
README.md
```

## Características

- Diseño institucional y adaptable a celulares.
- Escudo municipal con archivo local de respaldo.
- Indicadores y contexto por cada $1.000.000.
- Fórmula exacta y reglas de redondeo.
- Escala ampliada de 0 % a 1 %.
- Explorador interactivo de etapas presupuestales.
- Tabla detallada.
- Metodología, exclusiones, glosario y preguntas frecuentes.
- Navegación accesible.
- Impresión optimizada para A4.
- Sin descarga de CSV, JSON ni datos tabulares.

## Publicación en GitHub Pages

1. Descomprima el paquete.
2. Copie todos los archivos en la raíz del repositorio o rama.
3. Publique desde `Settings > Pages > Deploy from a branch`.
4. Seleccione la rama y `/(root)`.

## Actualización de cifras

Cuando exista un nuevo corte, actualice:

- Valores en `index.html`.
- Objeto `stages` en `assets/js/app.js`.
- Fecha de corte y texto de interpretación.

El indicador debe recalcularse con la fórmula:

```text
Presupuesto definitivo del rubro de participación
÷ presupuesto definitivo municipal
× 100
```

## Publicidad de la información

Este dashboard es una herramienta explicativa para el Menú Participa. La ejecución
presupuestal completa debe conservarse en la sección institucional correspondiente
de transparencia, presupuesto o datos abiertos, conforme al esquema de publicación
adoptado por la entidad.
