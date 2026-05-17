import styles from './CTAFinal.module.css';

export default function CTAFinal({ heroMode, onToggleHeroMode }) {
  return (
    <section className={styles.finalCta} id="contacto">
      <div className={styles.inner}>
        <h2 className="reveal">
          ¿Listos para construir <em>esto juntos</em>?
        </h2>
        <p className="reveal">
          Hagamos de ALIVIA la plataforma de salud que Colombia necesita.
        </p>
        <div className={`${styles.buttons} reveal`}>
          <a
            href="mailto:hola@alivia.health?subject=Trabajemos%20juntos%20en%20ALIVIA"
            className={styles.primary}
          >
            Hablemos
          </a>
          <a href="#hero" className={styles.outline}>
            Descargar propuesta
          </a>
        </div>
        <div className={styles.footerMeta}>
          <div className={styles.footerLine}>
            ALIVIA © 2026 · Construido con propósito por Nova-Nest © 2026
          </div>
          <button
            className={styles.heroToggle}
            type="button"
            onClick={onToggleHeroMode}
            aria-label={`Cambiar hero a versión ${
              heroMode === 'video' ? 'placeholder' : 'video'
            }`}
            title={`Hero actual: ${heroMode === 'video' ? 'video' : 'placeholder'}`}
          >
            {heroMode === 'video' ? 'V' : 'P'}
          </button>
        </div>
      </div>
    </section>
  );
}
