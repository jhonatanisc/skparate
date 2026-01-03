# skparate

**skparate** es un Web Component auxiliar para desarrollo.

Su objetivo es ayudarte a **visualizar, probar y documentar tus propios Web Components**
mientras los estás construyendo, sin depender de herramientas pesadas ni frameworks externos.

Es ideal como un *viewer* o *playground* ligero durante el desarrollo.

---

## ✨ ¿Qué hace?

- Renderiza un Web Component objetivo en una vista previa  
- Genera controles automáticamente a partir de una configuración  
- Muestra la documentación de propiedades  
- Permite copiar el HTML generado  
- Facilita probar distintos estados del componente en tiempo real  

---

## 🚀 Uso básico

Instala o importa la librería:

```js
import 'skparate';
```

Usa el componente en tu HTML de desarrollo:

```html
<skparate-viewer
  element="my-component"
  .config="${config}">
</skparate-viewer>
```

Donde `element` es el tag del Web Component que quieres probar  
y `config` define sus propiedades y valores posibles.

---

## ⚙️ Configuración

Ejemplo de configuración:

```js
const config = {
  props: [
    {
      name: 'title',
      type: 'String',
      default: 'Hola mundo',
      desc: 'Título principal del componente'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      default: false,
      desc: 'Deshabilita el componente'
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary'",
      default: 'primary',
      desc: 'Variante visual'
    }
  ]
};
```

---

## 🧭 Alcance del proyecto

skparate está pensado **exclusivamente como una herramienta de desarrollo**.

No pretende:
- reemplazar Storybook u otras herramientas complejas  
- manejar routing o estado global  
- usarse directamente en producción  

Su enfoque es ser **simple, embebible y rápido de usar** durante el desarrollo de Web Components.

---

## 🛠️ Tecnologías

- Web Components  
- Lit  
- JavaScript moderno (ESM)  

---

## 📌 Estado

Proyecto en etapa temprana.  
La API puede cambiar mientras se define el flujo ideal de desarrollo.

---

## 📄 Licencia

MIT
