import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import handImage from '../../assets/hand.png';
import PhoneMockup from './PhoneMockup.jsx';
import styles from './MockupSection.module.css';

export default function MockupSection() {
  const sectionRef = useRef(null);
  const cinematicRef = useRef(null);
  const pinRef = useRef(null);
  const handRef = useRef(null);
  const introPhoneRef = useRef(null);
  const introFloatRef = useRef(null);
  const logoRef = useRef(null);
  const appRef = useRef(null);
  const finalStageRef = useRef(null);
  const finalPhoneRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(handRef.current, { autoAlpha: 0 });
        gsap.set(introPhoneRef.current, { autoAlpha: 0 });
        gsap.set(finalStageRef.current, { autoAlpha: 1, pointerEvents: 'auto' });
        gsap.set(textRef.current, { autoAlpha: 1, x: 0 });
        return;
      }

      gsap.set(introPhoneRef.current, { y: '60vh', scale: 0.85, autoAlpha: 1 });
      gsap.set(handRef.current, { y: '40%', autoAlpha: 1 });
      gsap.set(logoRef.current, { autoAlpha: 1 });
      gsap.set(appRef.current, { autoAlpha: 0 });
      gsap.set(finalStageRef.current, { autoAlpha: 0, pointerEvents: 'none' });
      gsap.set(textRef.current, { autoAlpha: 0, x: -48 });

      const introLevitation = gsap.to(introFloatRef.current, {
        y: -12,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true,
      });

      const finalLevitation = gsap.to(finalPhoneRef.current, {
        y: -14,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: cinematicRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress >= 0.4 && self.progress < 0.7) {
              introLevitation.play();
            } else {
              introLevitation.pause(0);
            }

            if (self.progress >= 0.7) finalLevitation.play();
            else finalLevitation.pause();
          },
          onLeave: () => finalLevitation.play(),
          onLeaveBack: () => {
            introLevitation.pause(0);
            finalLevitation.pause();
          },
        },
      });

      timeline
        // Fase 1: mano y teléfono entran desde abajo.
        .to(introPhoneRef.current, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }, 0)
        .to(handRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' }, 0)

        // Fase 2: la mano desaparece y el teléfono queda flotando.
        .to(handRef.current, { y: '120%', autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, 0.4)
        .to(introPhoneRef.current, { y: -20, duration: 0.3, ease: 'sine.inOut' }, 0.4)

        // Fase 3: entra el mockup real y se habilita la interacción.
        .to(logoRef.current, { autoAlpha: 0, duration: 0.08, ease: 'power1.in' }, 0.7)
        .to(appRef.current, { autoAlpha: 1, duration: 0.1, ease: 'power1.out' }, 0.76)
        .to(introPhoneRef.current, { autoAlpha: 0, scale: 1.08, duration: 0.18, ease: 'power2.out' }, 0.78)
        .to(
          finalStageRef.current,
          { autoAlpha: 1, pointerEvents: 'auto', duration: 0.18, ease: 'power2.out' },
          0.8,
        )
        .to(textRef.current, { autoAlpha: 1, x: 0, duration: 0.16, ease: 'power2.out' }, 0.84)
        .to({}, { duration: 0.01 }, 1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="mockup-section" ref={sectionRef}>
      <div className={styles.cinematic} ref={cinematicRef}>
        <div className={styles.pin} ref={pinRef}>
          <div className={styles.stage}>
            <img className={styles.handImage} src={handImage} alt="" ref={handRef} aria-hidden="true" />

            <div className={styles.cinematicPhoneWrap} ref={introPhoneRef} aria-hidden="true">
              <div className={styles.cinematicPhone} ref={introFloatRef}>
                <div className={styles.cinematicScreen}>
                  <div className={styles.cinematicLogo} ref={logoRef}>
                    <svg
                      className={styles.logoSvg}
                      viewBox="0 0 200 60"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="ALIVIA logo"
                    >
                      <text
                        x="100"
                        y="42"
                        textAnchor="middle"
                        fontFamily="var(--font-sans)"
                        fontSize="36"
                        fontWeight="800"
                        fill="var(--color-surface)"
                        letterSpacing="2"
                      >
                        ALIV
                        <tspan fill="var(--color-accent)">I</tspan>
                        A
                      </text>
                    </svg>
                  </div>

                  <div className={styles.cinematicApp} ref={appRef}>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle cx="30" cy="30" r="26" stroke="var(--color-accent)" strokeWidth="3" />
                      <path
                        d="M20 30L27 37L40 22"
                        stroke="var(--color-accent)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.finalStage} ref={finalStageRef}>
              <div className={styles.sideText} ref={textRef}>
                <h2>Vistazo al futuro de la salud en Colombia</h2>
              </div>
              <div className={styles.phoneDock} ref={finalPhoneRef}>
                <PhoneMockup showDetails={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
