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
  useMotionTemplate,
} from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';

import type { MotionValue } from 'framer-motion';

// Replace with your assets
import headshot from '@/public/images/headshot.svg'; // temp image
// import qr from '@/public/qr-contact.png' ;

type LinkItem = { label: string; href: string; newTab?: boolean };
type BadgeCardProps = { introPlay?: boolean };

const LINKS: LinkItem[] = [
  { label: 'GitHub', href: 'https://github.com/jcamp50', newTab: true },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/campbell-jordan',
    newTab: true,
  },
  { label: 'Email', href: 'mailto:7jacampbell@gmail.com' },
  { label: 'Resume', href: '/Jordan_Campbell_Resume.pdf', newTab: true },
];

const MAX_DEG = 14; // how much card rotation we consider
const MAX_PULL = 160; // px: hard limit for how far the card can be dragged
const MAX_SWING = 10; // deg: card’s own swing angle at MAX_PULL
const SWAY_MULT = 1.325; // how much more the lanyard rotates than the card
const MAX_STRETCH = 0.15; // +18% length at extreme (tweak to taste)

export default function BadgeCard({ introPlay = false }: BadgeCardProps) {
  const [flipped, setFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // drag constraints container
  const frameRef = useRef<HTMLDivElement | null>(null);

  // horizontal position of the clip+card system
  const x = useMotionValue(0);
  const dragControls = useDragControls();

  const [introDone, setIntroDone] = useState(false);
  const introLanyardScale = useMotionValue(0); // 0..1 during intro
  const introGroupY = useMotionValue(-120); // card starts ~120px above

  // === full-card glare state ===
  const cardRef = useRef<HTMLDivElement>(null);

  // normalized cursor position over the FRONT face [0..1]
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // glare hotspot that follows the cursor
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  // card rotation (pendulum) from X — no spring here (instant angle)
  const pendulumAngle = useTransform(
    x,
    [MAX_PULL, 0, -MAX_PULL],
    [MAX_SWING, 0, -MAX_SWING]
  ) as MotionValue<number>;

  // resting snap you already have
  const restAngle = useMotionValue<number>(0);
  // Reverse the card's skew direction by negating pendulumAngle
  const cardRotate = useTransform(
    [pendulumAngle as MotionValue<number>, restAngle as MotionValue<number>],
    ([swing, rest]) => 3.5 * -(swing as number) + (rest as number)
  );

  // LANYARD: rotate directly from the *final* card angle (no spring → no lag)
  const lanyardSway = useTransform(
    cardRotate as MotionValue<number>,
    (deg) => (deg as number) * SWAY_MULT
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

  // === small wobble tilt (extra plane of motion) ===
  const tiltX = useMotionValue(0); // degrees: left/right (rotates around Y)
  const tiltY = useMotionValue(0); // degrees: up/down (rotates around X)

  // give them some springy feel
  const tiltSpringX = useSpring(tiltX, {
    stiffness: 220,
    damping: 16,
    mass: 0.6,
  });
  const tiltSpringY = useSpring(tiltY, {
    stiffness: 220,
    damping: 16,
    mass: 0.6,
  });

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  /**
   * Wobble the card with a few decaying random keyframes, then settle to 0/0.
   * intensity: max degrees (e.g., 6–12)
   */
  const wobbleTilt = async (intensity = 20) => {
    if (prefersReducedMotion) return;

    const seq = [
      {
        x: rand(-intensity, intensity),
        y: rand(-intensity, intensity),
        t: 0.1,
      },
      {
        x: rand(-intensity * 0.75, intensity * 0.75),
        y: rand(-intensity * 0.75, intensity * 0.75),
        t: 0.12,
      },
      {
        x: rand(-intensity * 0.45, intensity * 0.45),
        y: rand(-intensity * 0.45, intensity * 0.45),
        t: 0.14,
      },
      { x: 0, y: 0, t: 1.0 },
    ];

    for (const k of seq) {
      await Promise.all([
        animate(tiltX, k.x, { duration: k.t, ease: 'easeOut' }),
        animate(tiltY, k.y, { duration: k.t, ease: 'easeOut' }),
      ]);
    }
  };

  // snap-to rotation angles for "resting" positions
  const snapAngles = useMemo(() => [-12, -6, 0, 6, 12], []);

  const [cardVisible, setCardVisible] = useState(false);
  useEffect(() => {
    if (!introPlay) {
      setCardVisible(false);
      return;
    }
    const id = setTimeout(() => setCardVisible(true), 300); // ⟵ tweak delay (ms)
    return () => clearTimeout(id);
  }, [introPlay]);

  // keyboard a11y: Enter flips; arrows nudge resting angle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key.toLowerCase() === ' ') {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [restAngle, snapAngles]);

  useEffect(() => {
    if (!introPlay || introDone) return;

    // tiny random x at the bottom (like hitting lanyard slack)
    const kick = Math.random() < 0.5 ? -6 : 6;

    (async () => {
      // grow the lanyard while the card begins to drop
      await Promise.all([
        animate(introLanyardScale, 1, { duration: 0.45, ease: 'easeOut' }),
        animate(introGroupY, 0, {
          type: 'spring',
          stiffness: 340,
          damping: 26,
          restDelta: 0.5,
        }),
      ]);

      setIntroDone(true);

      // bounce to center + subtle wobble while settling
      await Promise.all([
        animate(x, kick, {
          type: 'spring',
          stiffness: 140,
          damping: 12,
          restDelta: 0.6,
        }),
        wobbleTilt(12),
      ]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introPlay]);

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
            scaleY: introDone ? lanyardStretch : introLanyardScale,
          }}
          aria-hidden
        >
          {/* FRONT STRAP */}
          <div className='absolute top-0 left-1/2 ml-[-28px] -translate-x-[32px] sm:-translate-x-[40px] w-14 h-[340px] sm:h-[400px] overflow-hidden origin-top z-10 -rotate-[6deg] shadow-md'>
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
          {/* BACK STRAP */}
          <div className='absolute top-0 left-1/2 ml-[-28px] translate-x-[36px] sm:translate-x-[40px] w-14 h-[340px] sm:h-[400px] overflow-hidden origin-top z-0 rotate-[6deg] shadow'>
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
        </motion.div>
        {/* === CLIP AND CARD SYSTEM (swings as one unit) === */}
        <motion.div style={{ y: introDone ? 0 : introGroupY }}>
          <motion.div
            className='absolute left-1/2 -translate-x-1/2 top-[340px] sm:top-[400px] z-20'
            drag='x'
            dragControls={dragControls}
            dragConstraints={{ left: -6, right: 6 }}
            dragListener={false} // clicks don’t start drag here
            dragMomentum={false}
            dragElastic={0.12}
            style={{ x, y: clipOffset }} // <<< clip and card share the same x
          >
            {/* === CARD (hangs from clip point, swings like pendulum) === */}
            <motion.div
              role='button'
              aria-label='Interactive ID badge'
              tabIndex={0}
              drag='x'
              dragConstraints={{ left: -6, right: 6 }}
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
              initial={false}
              animate={{ opacity: cardVisible ? 1 : 0 }}
              transition={{ opacity: { duration: 0.25, ease: 'easeOut' } }}
              onDragEnd={(_, info) => {
                const currentSwing = pendulumAngle.get();
                snapRestingRotation(currentSwing, info.velocity.x);
                restAngle.set(0);

                // scale wobble intensity by release speed (capped)
                const speed = Math.min(Math.abs(info.velocity.x) / 800, 1); // 0..1
                const intensity = 10 + 6 * speed;

                Promise.all([
                  animate(x, 0, {
                    type: 'spring',
                    stiffness: 140,
                    damping: 12,
                    restDelta: 0.5,
                    velocity: info.velocity.x,
                  }),
                  wobbleTilt(intensity),
                ]);
              }}
            >
              <motion.div
                // rotateX corresponds to "tilt up/down" (driven by tiltSpringY)
                // rotateY corresponds to "tilt left/right" (driven by tiltSpringX)
                style={{
                  rotateX: tiltSpringY,
                  rotateY: tiltSpringX,
                  transformStyle: 'preserve-3d',
                }}
                className='will-change-transform'
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
                  <div className='absolute left-1/2 -translate-x-1/2 top-0'>
                    {/* Clip/Tail - now part of the swinging system */}
                    <motion.div
                      className='absolute left-1/2 -translate-x-1/2 ml-[-28px] -top-2 w-[26px] sm:w-[48px] h-3 bg-[#E21B1B] rounded-b-md'
                      style={{
                        rotateZ: useTransform(lanyardSway, (v) => v * 0.3),
                      }}
                    />
                    <div className='relative h-[440px] w-[280px] sm:h-[460px] sm:w-[320px] [transform-style:preserve-3d]'>
                      {/* tiny slot/punch at the top of badge for realism */}
                      <div className='pointer-events-none absolute left-1/2 -translate-x-1/2 -top-1 h-3 w-16 rounded-b-[8px] bg-neutral-200 shadow-sm z-10' />

                      {/* FRONT — premium streetwear pass (with full-card glare) */}
                      <motion.div
                        ref={cardRef}
                        onMouseMove={(e) => {
                          const rect = cardRef.current?.getBoundingClientRect();
                          if (!rect) return;
                          mx.set((e.clientX - rect.left) / rect.width);
                          my.set((e.clientY - rect.top) / rect.height);
                        }}
                        onMouseLeave={() => {
                          mx.set(0.5);
                          my.set(0.5);
                        }}
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 220,
                          damping: 26,
                        }}
                        className='absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-2xl'
                      >
                        {/* Foil edge frame */}
                        <div className='absolute inset-0 rounded-2xl p-[1px] bg-[conic-gradient(at_0%_0%,#E8E8E8, #9EE7FF, #F7C9FF, #FFE89E, #E8E8E8)]'>
                          {/* Laminate + subtle paper texture */}
                          <div className='relative h-full w-full rounded-[1rem] bg-[radial-gradient(120%_100%_at_50%_0%,#fff_0%,#F7F7F7_60%,#F1F1F1_100%)] shadow-[0_14px_60px_rgba(0,0,0,0.18)]'>
                            {/* Static gloss swipe (kept for richness) */}
                            <div className='pointer-events-none absolute inset-0 rounded-[1rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0)_40%)] mix-blend-screen' />

                            {/* Top foil band */}
                            <div className='relative h-10 border-b border-black/5'>
                              <div className='absolute inset-0 bg-[linear-gradient(90deg,#F41111_0%,#F86262_40%,#F41111_100%)]' />
                              <div className='relative z-10 h-full flex items-center justify-center'>
                                <div className='tracking-[0.25em] text-[10px] uppercase text-white/95 text-md font-medium'>
                                  Access / Guest — Drop 002 — 2025
                                </div>
                              </div>
                              {/* micro notch */}
                              <div className='absolute left-1/2 -translate-x-1/2 -bottom-[6px] h-3 w-16 bg-neutral-200/70 shadow-sm' />
                            </div>

                            {/* Serial + NFC row */}
                            <div className='px-4 pt-3 flex items-center justify-between'>
                              <div className='text-[10px] tracking-widest uppercase text-neutral-500/80'>
                                ID:{' '}
                                <span className='font-mono'>JC-002-025</span>
                              </div>
                              <div className='h-5 w-9 rounded-[4px] border border-black/10 bg-[radial-gradient(100%_100%_at_30%_20%,#FAFAFA_0%,#EDEDED_40%,#DADADA_100%)] relative overflow-hidden'>
                                <div className='absolute inset-[3px] rounded-[3px] border border-black/20' />
                                <div className='absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.06)_0_1px,transparent_1px_3px)]' />
                              </div>
                            </div>

                            {/* Body */}
                            <div className='p-4 pt-3 flex flex-col items-center gap-3'>
                              {/* avatar with bezel ring */}
                              <div className='relative h-32 w-32 overflow-hidden ring-1 ring-black/10'>
                                <Image
                                  src={headshot}
                                  alt='Jordan Campbell headshot'
                                  fill
                                  className='object-cover'
                                  unoptimized
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

                              {/* Links — pill tags */}
                              <ul className='w-full grid grid-cols-2 mt-2 sm:mt-4 gap-2'>
                                {LINKS.map((link) => (
                                  <li key={link.label}>
                                    <a
                                      href={link.href}
                                      target={
                                        link.newTab ? '_blank' : undefined
                                      }
                                      rel={
                                        link.newTab
                                          ? 'noopener noreferrer'
                                          : undefined
                                      }
                                      className='group inline-flex w-full items-center justify-between border border-black/10 bg-white/70 backdrop-blur-[2px] px-3 py-2 text-[13px] uppercase tracking-widest hover:bg-black/5 transition'
                                    >
                                      <span className='font-medium'>
                                        {link.label}
                                      </span>
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

                              {/* Bottom zone: hologram + flip link + issue date */}
                              <div className='mt-2 sm:mt-4 w-full grid grid-cols-3 items-end text-center'>
                                {/* Left: hologram */}
                                <motion.div
                                  aria-hidden
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                  className='h-10 w-10 rounded-full justify-self-start'
                                  style={{
                                    background:
                                      'conic-gradient(from 0deg, #76E3FF, #FF76EA, #FFE776, #76E3FF)',
                                    boxShadow:
                                      '0 2px 10px rgba(0,0,0,0.15), inset 0 1px 10px rgba(255,255,255,0.6)',
                                  }}
                                />

                                {/* Center: flip link */}
                                <button
                                  onClick={() => setFlipped(true)}
                                  className='text-[11px] uppercase tracking-widest underline underline-offset-4 justify-self-center'
                                  aria-label='Flip badge to back'
                                >
                                  QR &amp; bio
                                </button>

                                {/* Right: issue date */}
                                <div className='text-[10px] text-neutral-500/80 tracking-widest uppercase justify-self-end'>
                                  Issued SS25
                                </div>
                              </div>
                            </div>

                            {/* === Full-card cursor-tracked glare overlay === */}
                            <motion.div
                              aria-hidden
                              className='pointer-events-none absolute inset-0 rounded-[1rem] mix-blend-overlay'
                              style={{
                                background: useMotionTemplate`radial-gradient(80% 80% at ${glareX} ${glareY}, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.0) 55%)`,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>

                      {/* BACK — premium streetwear pass */}
                      <motion.div
                        initial={false}
                        animate={{ rotateY: flipped ? 0 : -180 }}
                        transition={{
                          type: 'spring',
                          stiffness: 220,
                          damping: 26,
                        }}
                        className='absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden rounded-2xl'
                      >
                        {/* Foil edge frame */}
                        <div className='absolute inset-0 rounded-2xl p-[1px] bg-[conic-gradient(at_0%_0%,#E8E8E8, #9EE7FF, #F7C9FF, #FFE89E, #E8E8E8)]'>
                          {/* Laminate / substrate */}
                          <div className='relative h-full w-full rounded-[1rem] bg-[radial-gradient(120%_100%_at_50%_0%,#fff_0%,#F7F7F7_60%,#F1F1F1_100%)] shadow-[0_14px_60px_rgba(0,0,0,0.18)] p-4 flex flex-col'>
                            {/* Gloss swipe */}
                            <div className='pointer-events-none absolute inset-0 rounded-[1rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0)_45%)] mix-blend-screen' />

                            {/* Header row */}
                            <div className='text-center'>
                              <p className='text-[11px] uppercase tracking-[0.35em] text-neutral-500'>
                                Contact
                              </p>
                              <div className=' bg-neutral-50 p-2 text-center'>
                                <p className='text-[12px] leading-snug text-neutral-600'>
                                  Software engineer passionate about building
                                  thoughtful, scalable systems and sleek,
                                  user-focused design.
                                </p>
                              </div>
                            </div>

                            {/* QR area — larger */}
                            <div className='mt-4 flex-1 flex items-center justify-center'>
                              <Image
                                src='/images/qr.svg'
                                alt='QR code'
                                width={200}
                                height={200}
                                className='rounded-md shadow-md'
                                draggable={false}
                                unoptimized
                              />
                            </div>

                            <h4 className='mt-4 text-xs sm:text-sm text-center font-medium leading-tight'>
                              Let&apos;s build something worth shipping.
                            </h4>

                            {/* Footer: short bio + flip link */}
                            <div className=''>
                              {/* Action buttons */}
                              <div className='mt-4 grid grid-cols-2 gap-2'>
                                <button
                                  onClick={() =>
                                    navigator.clipboard?.writeText(
                                      '7jacampbell@gmail.com'
                                    )
                                  }
                                  className='border border-black/10 bg-white/70 backdrop-blur-[2px] px-3 py-2 text-sm hover:bg-black/[0.04] transition'
                                >
                                  Copy Email
                                </button>
                                <a
                                  href='https://linkedin.com/in/campbell-jordan'
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='border border-black/10 bg-white/70 backdrop-blur-[2px] px-3 py-2 text-sm text-center hover:bg-black/[0.04] transition'
                                >
                                  Open LinkedIn
                                </a>
                              </div>
                              <button
                                onClick={() => setFlipped(false)}
                                className='mt-3 block mx-auto text-[11px] uppercase tracking-widest underline underline-offset-4'
                                aria-label='Flip badge to front'
                              >
                                Back to front
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
