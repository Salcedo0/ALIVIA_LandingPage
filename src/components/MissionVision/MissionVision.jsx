import styles from './MissionVision.module.css';

export default function MissionVision() {
  return (
    <section className={styles.mission} id="mision" data-mission-section>
      <div className={styles.inner}>
        <div className={`${styles.column} reveal`} data-mission-left>
          <span className={styles.label}>Misión</span>
          <p>
            Democratizar el acceso a la salud preventiva para millones de
            colombianos, sin importar dónde estén.
          </p>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={`${styles.column} reveal`} data-mission-right>
          <span className={styles.label}>Visión</span>
          <p>
            Ser el ecosistema digital de salud más accesible e integral de
            Latinoamérica.
          </p>
        </div>
      </div>
    </section>
  );
}
