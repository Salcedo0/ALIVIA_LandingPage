import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const links = [
  { href: '#valor', label: 'Por qué ALIVIA' },
  { href: '#mision', label: 'Misión' },
  { href: '#mockup-section', label: 'Plataforma' },
  { href: '#numeros', label: 'Números' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY || window.pageYOffset;

    const updateNavbar = () => {
      const y = window.scrollY || window.pageYOffset;
      setIsScrolled(y > 60);
      setIsHidden(y > lastScroll && y > 200);
      lastScroll = y;
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    return () => window.removeEventListener('scroll', updateNavbar);
  }, []);

  return (
    <nav
      className={[
        styles.navbar,
        isScrolled ? styles.scrolled : '',
        isHidden ? styles.hidden : '',
      ].join(' ')}
      aria-label="Navegación principal"
    >
      <a href="#hero" className={styles.logo} aria-label="ALIVIA inicio">
        ALIV<span>I</span>A
      </a>

      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <a href="#contacto" className={styles.cta}>
        Hablemos
      </a>
    </nav>
  );
}
