import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

export function ScrollMotion() {
 const { pathname } = useLocation();
 useEffect(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealSelector = 'main .demo-wrap, main .pricing-faq > *, main .filter-bar, main .section-heading, main .feature-tile, main .split-copy, main .orbit-art, main .process-grid > div, main .principles > *, main .service-item, main .pricing-card, main .work-item, main .detail-list > div, main .service-benefits > div, main .tool-pills > span, main .tool-logos > span, main .final-cta > *, main .contact-copy > *, main .contact-form, main .prose > *, .footer-top > *';
  const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
  const visuals = Array.from(document.querySelectorAll<HTMLElement>('.hero .hero-workspace, .orbit-center'));
  const header = document.querySelector('header');
  const progress = document.querySelector<HTMLElement>('.reading-progress');
  let frame = 0;
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('motion-visible');
    observer.unobserve(entry.target);
   });
  }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
  const configure = () => {
   observer.disconnect();
   elements.forEach(element => {
    element.classList.remove('motion-pending', 'motion-visible');
    element.style.removeProperty('--reveal-delay');
    if (media.matches) return;
    const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
    element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 3) * 80}ms`);
    element.classList.add('motion-pending');
    observer.observe(element);
   });
   if (media.matches) visuals.forEach(element => element.style.removeProperty('--scroll-drift'));
  };
  const updateScroll = () => {
   frame = 0;
   const range = document.documentElement.scrollHeight - window.innerHeight;
   progress?.style.setProperty('--reading-progress', `${range > 0 ? window.scrollY / range : 0}`);
   header?.classList.toggle('header-scrolled', window.scrollY > 24);
   if (media.matches) return;
   visuals.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    element.style.setProperty('--scroll-drift', `${Math.max(-16, Math.min(16, (window.innerHeight / 2 - rect.top - rect.height / 2) * .035))}px`);
   });
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };
  const hoverSelector = '.feature-tile, .pricing-card, .work-preview';
  let tilted: HTMLElement | undefined;
  const resetTilt = () => {
   tilted?.style.removeProperty('--tilt-x');
   tilted?.style.removeProperty('--tilt-y');
   tilted = undefined;
  };
  const onPointerMove = (event: PointerEvent) => {
   if (media.matches || event.pointerType !== 'mouse') return;
   const card = event.target instanceof Element ? event.target.closest<HTMLElement>(hoverSelector) : null;
   if (card !== tilted) resetTilt();
   if (!card) return;
   tilted = card;
   const rect = card.getBoundingClientRect();
   card.style.setProperty('--tilt-x', `${(0.5 - (event.clientY - rect.top) / rect.height) * 4}deg`);
   card.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - 0.5) * 4}deg`);
  };
  const onPreference = () => { resetTilt(); configure(); onScroll(); };
  configure();
  updateScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', resetTilt);
  media.addEventListener('change', onPreference);
  return () => {
   cancelAnimationFrame(frame);
   observer.disconnect();
   resetTilt();
   window.removeEventListener('scroll', onScroll);
   window.removeEventListener('resize', onScroll);
   document.removeEventListener('pointermove', onPointerMove);
   document.removeEventListener('pointerleave', resetTilt);
   media.removeEventListener('change', onPreference);
   elements.forEach(element => element.classList.remove('motion-pending', 'motion-visible'));
  };
 }, [pathname]);
 return <div className="reading-progress" aria-hidden="true"/>;
}
