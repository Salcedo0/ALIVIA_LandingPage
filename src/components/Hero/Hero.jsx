import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../../assets/video.mp4';
import styles from './Hero.module.css';

export default function Hero({ mode = 'video' }) {
  const heroRef = useRef(null);
  const videoWrapRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(videoWrapRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <header className={styles.hero} id="hero" ref={heroRef}>
      <div className={styles.videoWrap} ref={videoWrapRef}>
        {mode === 'video' ? (
          <video className={styles.video} autoPlay muted loop playsInline preload="metadata">
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.chip}>Hecho para Colombia</span>
        <h1 className={styles.headline}>
          El futuro de la salud <em>ya llegó</em>
        </h1>
        <p className={styles.subtitle}>
          Conectamos pacientes con especialistas en todo el país. Prevención,
          telemedicina y acceso real a la salud.
        </p>
        <a href="#mockup-section" className={styles.cta}>
          Ver la plataforma <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.arrow} />
      </div>
    </header>
  );
}
