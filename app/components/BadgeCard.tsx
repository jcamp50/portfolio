'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  animate,
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
  useDragControls,
} from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';

import type { MotionValue } from 'framer-motion';

// Replace with your assets
import headshot from '@/public/images/headshot.png'; // temp image
// import qr from '@/public/qr-contact.png';

type LinkItem = { label: string; href: string; newTab?: boolean };

const LINKS: LinkItem[] = [
  { label: 'GitHub', href: 'https://github.com/jordan-campbell', newTab: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/…', newTab: true },
  { label: 'Email', href: 'mailto:jordan@…' },
  { label: 'Resume', href: '/JordanCampbell-Resume.pdf', newTab: true },
];

const MAX_DEG = 14; // how much card rotation we consider
const MAX_PULL = 160; // px: hard limit for how far the card can be dragged
const MAX_SWING = 10; // deg: card’s own swing angle at MAX_PULL
const SWAY_MULT = 1.6; // how much more the lanyard rotates than the card
const MAX_STRETCH = 0.18; // +18% length at extreme (tweak to taste)

export default function BadgeCard() {
  const [flipped, setFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // drag constraints container
  const frameRef = useRef<HTMLDivElement | null>(null);

  // horizontal position of the clip+card system
  const x = useMotionValue(0);
  const dragControls = useDragControls();

  // card rotation (pendulum) from X — no spring here (instant angle)
  const pendulumAngle = useTransform(
    x,
    [MAX_PULL, 0, -MAX_PULL],
    [MAX_SWING, 0, -MAX_SWING]
  ) as MotionValue<number>;

  // resting snap you already have
  const restAngle = useMotionValue<number>(0);
  const cardRotate = useTransform(
    [pendulumAngle as MotionValue<number>, restAngle as MotionValue<number>],
    ([swing, rest]) => (swing as number) + (rest as number)
  );

  // LANYARD: rotate directly from the *final* card angle (no spring → no lag)
  const lanyardSway = useTransform(
    cardRotate as MotionValue<number>,
    (deg) => (deg as number) * -SWAY_MULT
  ) as MotionValue<number>;

  // LANYARD: stretch instantly from the *magnitude* of the same angle
  const lanyardStretch = useTransform(
    cardRotate as MotionValue<number>,
    (deg) => {
      const a = Math.min(Math.abs(deg as number), MAX_SWING);
      const t = a / MAX_SWING; // 0..1
      const eased = t * t; // gentle center, bigger edges
      return 1 + eased * MAX_STRETCH; // scaleY
    }
  ) as MotionValue<number>;

  // tiny vertical bob of the clip — tie to angle too (keeps phase perfect)
  const clipOffset = useTransform(
    cardRotate as MotionValue<number>,
    (deg) =>
      Math.sign(deg as number) *
      Math.min(Math.abs(deg as number), MAX_SWING) *
      0.6
  ) as MotionValue<number>;

  // snap-to rotation angles for "resting" positions
  const snapAngles = useMemo(() => [-12, -6, 0, 6, 12], []);

  // keyboard a11y: Enter flips; arrows nudge resting angle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key.toLowerCase() === ' ') {
        e.preventDefault();
        setFlipped((f) => !f);
      }
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const curr = restAngle.get();
        const idx = snapAngles.indexOf(curr);
        const base = idx === -1 ? Math.floor(snapAngles.length / 2) : idx;
        const next =
          e.key === 'ArrowLeft'
            ? snapAngles[Math.max(0, base - 1)]
            : snapAngles[Math.min(snapAngles.length - 1, base + 1)];
        restAngle.set(next);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [restAngle, snapAngles]);

  // helper to snap resting rotation on drag end
  const snapRestingRotation = (currentPendulum: number, velocity: number) => {
    // Project where the resting angle should be based on velocity and current swing
    const projected = restAngle.get() + velocity * 0.008;
    const next = snapAngles.reduce((prev, curr) =>
      Math.abs(curr - projected) < Math.abs(prev - projected) ? curr : prev
    );
    restAngle.set(next);
  };

  return (
    <div className='w-full flex justify-center'>
      <div
        ref={frameRef}
        className='relative h-[560px] sm:h-[640px] w-full max-w-[460px] sm:max-w-[520px] select-none'
        aria-hidden={false}
      >
        {/* === LANYARD (reacts to card swing) === */}
        <motion.div
          className='absolute left-1/2 -translate-x-1/2 top-0 z-10 origin-top'
          style={{
            rotateZ: lanyardSway,
            scaleY: lanyardStretch,
          }}
          aria-hidden
        >
          {/* BACK STRAP */}
          <div className='absolute top-0 left-[calc(50%+18px)] sm:left-[calc(50%+40px)] w-12 sm:w-14 h-[340px] sm:h-[400px] overflow-hidden origin-top z-0 rotate-[6deg] shadow'>
            <div className='absolute inset-0 bg-[#C91515]' />
            <div className='absolute inset-0 flex items-center justify-center opacity-85'>
              <div className='relative rotate-90 whitespace-nowrap'>
                <div className='font-futura text-white/80 text-2xl leading-none'>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className='mx-2'>
                      Contact&nbsp;&nbsp;
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FRONT STRAP */}
          <div className='absolute top-0 left-[calc(50%-18px)] sm:left-[calc(50%-40px)] w-12 sm:w-14 h-[340px] sm:h-[400px] overflow-hidden origin-top z-10 -rotate-[6deg] shadow-md'>
            <div className='absolute inset-0 bg-[#E21B1B]' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='relative rotate-90 whitespace-nowrap'>
                <div className='font-futura text-white text-2xl leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]'>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className='mx-2'>
                      Contact&nbsp;&nbsp;
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* === CLIP AND CARD SYSTEM (swings as one unit) === */}
        <motion.div
          className='absolute left-1/4 -translate-x-1/2 top-[340px] sm:top-[400px] z-20'
          drag='x'
          dragControls={dragControls}
          dragConstraints={{ left: -MAX_PULL, right: MAX_PULL }}
          dragListener={false} // clicks don’t start drag here
          dragMomentum={false}
          dragElastic={0.12}
          style={{ x, y: clipOffset }} // <<< clip and card share the same x
        >
          {/* Clip/Tail - now part of the swinging system */}
          <motion.div
            className='mx-auto w-[26px] sm:w-[48px] h-3 bg-[#E21B1B] rounded-b-md'
            style={{ rotateZ: lanyardSway }}
          />

          {/* === CARD (hangs from clip point, swings like pendulum) === */}
          <motion.div
            role='button'
            aria-label='Interactive ID badge'
            tabIndex={0}
            drag='x'
            dragConstraints={{ left: -MAX_PULL, right: MAX_PULL }}
            dragElastic={0.12}
            dragMomentum={false}
            onPointerDown={(e) => dragControls.start(e)} // card is the handle
            className='relative z-20 pointer-events-auto origin-top'
            style={{
              x,
              transformStyle: 'preserve-3d',
              perspective: 1200,
              rotate: cardRotate,
              transformOrigin: 'top center', // Card pivots from its attachment point
            }}
            onDragEnd={(_, info) => {
              const currentSwing = pendulumAngle.get();
              snapRestingRotation(currentSwing, info.velocity.x);
              restAngle.set(0);
              animate(x, 0, {
                type: 'spring',
                stiffness: 220,
                damping: 36,
                restDelta: 0.5,
              });
            }}
          >
            <Tilt
              tiltMaxAngleX={prefersReducedMotion ? 0 : 6}
              tiltMaxAngleY={prefersReducedMotion ? 0 : 6}
              perspective={900}
              transitionSpeed={450}
              gyroscope
              glareEnable
              glareMaxOpacity={0.18}
              glareColor='rgba(255,255,255,0.8)'
              glarePosition='all'
              className='will-change-transform'
            >
              <div className='relative h-[400px] w-[280px] sm:h-[460px] sm:w-[320px] [transform-style:preserve-3d]'>
                {/* tiny slot/punch at the top of badge for realism */}
                <div className='pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-16 rounded-b-[8px] bg-neutral-200 shadow-sm z-10' />

                {/* FRONT */}
                <motion.div
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  className='absolute inset-0 rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden [backface-visibility:hidden]'
                >
                  {/* top band */}
                  <div className='h-10 bg-neutral-50 border-b border-neutral-200 flex items-center justify-center tracking-[0.25em] text-[10px] uppercase text-neutral-700'>
                    Access / Guest — Drop 002 — 2025
                  </div>

                  {/* body */}
                  <div className='p-4 flex flex-col items-center gap-3'>
                    <div className='relative h-24 w-24 overflow-hidden ring-1 ring-neutral-200'>
                      <Image
                        src={headshot}
                        alt='Jordan Campbell headshot'
                        fill
                        className='object-cover'
                      />
                    </div>

                    <div className='text-center'>
                      <h3 className='font-semibold tracking-tight text-lg'>
                        Jordan Campbell
                      </h3>
                      <p className='text-[11px] tracking-widest uppercase text-neutral-500'>
                        Software Engineer
                      </p>
                    </div>

                    <div className='mt-1 h-px w-full bg-neutral-200' />

                    <ul className='w-full grid grid-cols-2 gap-2'>
                      {LINKS.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target={link.newTab ? '_blank' : undefined}
                            rel={
                              link.newTab ? 'noopener noreferrer' : undefined
                            }
                            className='group inline-flex w-full items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-100'
                          >
                            <span>{link.label}</span>
                            <span
                              aria-hidden
                              className='translate-x-0 group-hover:translate-x-0.5 transition-transform'
                            >
                              ↗
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setFlipped(true)}
                      className='mt-2 text-[11px] uppercase tracking-widest underline underline-offset-4'
                      aria-label='Flip badge to back'
                    >
                      Flip for QR & bio
                    </button>
                  </div>
                </motion.div>

                {/* BACK */}
                <motion.div
                  initial={false}
                  animate={{ rotateY: flipped ? 0 : -180 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  className='absolute inset-0 rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] p-4 flex flex-col'
                >
                  <div className='text-center'>
                    <p className='text-[11px] uppercase tracking-widest text-neutral-500'>
                      Contact
                    </p>
                    <h4 className='mt-1 text-sm font-medium'>
                      Let&apos;s build something worth shipping.
                    </h4>
                  </div>

                  <div className='mt-3 flex-1 flex items-center justify-center'>
                    {/* Replace with your QR */}
                    <div className='h-36 w-36 rounded-md bg-[repeating-linear-gradient(45deg,#eee,#eee_4px,#ddd_4px,#ddd_8px)] grid place-items-center text-[10px] text-neutral-500'>
                      QR / Link
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <button
                      onClick={() => navigator.clipboard?.writeText('jordan@…')}
                      className='rounded-md border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-100'
                    >
                      Copy Email
                    </button>
                    <a
                      href='https://linkedin.com/in/…'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-md border border-neutral-200 px-3 py-2 text-sm text-center hover:bg-neutral-100'
                    >
                      Open LinkedIn
                    </a>
                  </div>

                  <button
                    onClick={() => setFlipped(false)}
                    className='mt-2 self-center text-[11px] uppercase tracking-widest underline underline-offset-4'
                    aria-label='Flip badge to front'
                  >
                    Back to front
                  </button>
                </motion.div>
              </div>
            </Tilt>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
