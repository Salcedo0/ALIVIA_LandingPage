import styles from './ValueProps.module.css';

const valueProps = [
  {
    icon: 'access',
    title: 'Acceso real',
    text: 'Especialistas en tu ciudad o en línea, sin filas, sin esperas.',
  },
  {
    icon: 'prevention',
    title: 'Prevención primero',
    text: 'Contenido médico verificado y programas de seguimiento personalizados.',
  },
  {
    icon: 'country',
    title: 'Colombia primero',
    text: 'Diseñado para zonas urbanas y rurales. Donde estés, ALIVIA está.',
  },
];

export default function ValueProps() {
  return (
    <section className={styles.value} id="valor">
      <div className={styles.inner}>
        <h2 className={`${styles.title} reveal`}>
          ¿Por qué <em>ALIVIA</em>?
        </h2>
        <p className={`${styles.subtitle} reveal`}>
          Tres razones que cambian la forma en que Colombia accede a la salud.
        </p>

        <div className={styles.grid} data-value-grid>
          {valueProps.map((item) => (
            <article className={`${styles.card} reveal`} key={item.title} data-value-card>
              <span className={`${styles.icon} ${styles[item.icon]}`} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
