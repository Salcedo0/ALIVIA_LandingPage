import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import ValueProps from './components/ValueProps/ValueProps.jsx';
import MissionVision from './components/MissionVision/MissionVision.jsx';
import MockupSection from './components/MockupSection/MockupSection.jsx';
import Stats from './components/Stats/Stats.jsx';
import CTAFinal from './components/CTAFinal/CTAFinal.jsx';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatCounterValue(element, value) {
  const prefix = element.dataset.prefix || '';
  const suffix = element.dataset.suffix || '';
  element.textContent = `${prefix}${Math.round(value)}${suffix}`;
}

export default function App() {
  const [heroMode, setHeroMode] = useState(() => {
    if (typeof window === 'undefined') return 'video';
    return window.localStorage.getItem('aliviaHeroMode') || 'video';
  });

  const toggleHeroMode = () => {
    setHeroMode((currentMode) => {
      const nextMode = currentMode === 'video' ? 'placeholder' : 'video';
      window.localStorage.setItem('aliviaHeroMode', nextMode);
      return nextMode;
    });
  };

  useEffect(() => {
    const reduceMotion = prefersReducedMotion();
    gsap.registerPlugin(ScrollTrigger);

    let lenis = null;
    let lenisRaf = null;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      lenis.on('scroll', ScrollTrigger.update);
      lenisRaf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
      window.__aliviaLenis = lenis;
    }

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -20 });
      } else {
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.reveal', { opacity: 1, y: 0, x: 0 });
        document.querySelectorAll('[data-counter]').forEach((element) => {
          if (element.dataset.static) return;
          formatCounterValue(element, Number(element.dataset.target || 0));
        });
        return;
      }

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      gsap.fromTo(
        '[data-value-card]',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '[data-value-grid]',
            start: 'top 80%',
          },
        },
      );

      gsap.fromTo(
        '[data-mission-left]',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-mission-section]', start: 'top 70%' },
        },
      );

      gsap.fromTo(
        '[data-mission-right]',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-mission-section]', start: 'top 70%' },
        },
      );

      document.querySelectorAll('[data-counter]').forEach((element) => {
        if (element.dataset.static) return;

        const target = Number(element.dataset.target || 0);
        const counter = { value: 0 };

        ScrollTrigger.create({
          trigger: element,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => formatCounterValue(element, counter.value),
            });
          },
        });
      });
    });

    const refreshScrollTrigger = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshScrollTrigger);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', refreshScrollTrigger);
      ctx.revert();

      if (lenis && lenisRaf) {
        gsap.ticker.remove(lenisRaf);
        lenis.destroy();
        delete window.__aliviaLenis;
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero mode={heroMode} />
        <ValueProps />
        <MissionVision />
        <MockupSection />
        <Stats />
        <CTAFinal heroMode={heroMode} onToggleHeroMode={toggleHeroMode} />
      </main>
    </>
  );
}
