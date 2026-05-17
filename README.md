# ALIVIA Landing Page

Landing page moderna para ALIVIA, una plataforma de salud digital hecha para Colombia, lo construi para hacer un showcase de lo que podria llegar a ser la aplicacion en caso de que las personas interesadas en construirla con novanest acepten el proyecto, todo es early version, en pre produccion, cualquier cambio lo estare actualizando en git.




El sitio está construido con React + Vite, CSS Modules, variables CSS globales, GSAP ScrollTrigger y Lenis.

### Desarollado por Juan Andres Salcedo - estudiante de ingenieria de sistemas en EAFIT

## Screenshots

### Desktop

![ALIVIA landing desktop](./docs/screenshots/main.png)

### mas imagenes

![ALIVIA landing mobile](./docs/screenshots/otras.png)

### mockup section

![ALIVIA landing mobile](./docs/screenshots/mockup.png)


## Stack

- React
- Vite
- CSS Modules
- CSS custom properties en `src/styles/variables.css`
- GSAP + ScrollTrigger
- `@studio-freight/lenis`

## Project Structure

```txt
src/
├── assets/
│   ├── hand.png
│   └── video.mp4
├── components/
│   ├── CTAFinal/
│   ├── Hero/
│   ├── MissionVision/
│   ├── MockupSection/
│   ├── Navbar/
│   ├── Stats/
│   └── ValueProps/
├── styles/
│   └── variables.css
├── App.jsx
└── main.jsx
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Hero Background Toggle

The footer includes a small hidden-style toggle that switches the hero background between:

- `video`: uses `src/assets/video.mp4`
- `placeholder`: uses the original animated CSS gradient

The selected mode is stored in `localStorage` under:

```txt
aliviaHeroMode
```
