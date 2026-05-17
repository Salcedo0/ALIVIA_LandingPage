import styles from './Stats.module.css';

const stats = [
  { target: 50, prefix: '+', suffix: '', label: 'Especialidades médicas' },
  { target: 100, prefix: '', suffix: '%', label: 'Colombiano' },
  { target: 30, prefix: '$', suffix: 'K', label: 'Desde por consulta' },
  { staticValue: 'CO', label: 'Cobertura nacional' },
];

export default function Stats() {
  return (
    <section className={styles.stats} id="numeros">
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div className={`${styles.stat} reveal`} key={stat.label}>
            <div
              className={styles.number}
              data-counter
              data-target={stat.target}
              data-prefix={stat.prefix}
              data-suffix={stat.suffix}
              data-static={stat.staticValue || undefined}
            >
              {stat.staticValue || `${stat.prefix || ''}0${stat.suffix || ''}`}
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
