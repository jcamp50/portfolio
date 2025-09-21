'use client';
import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
  variant?: 'light' | 'dark';
};

export default function ProjectStack({ images, variant = 'light' }: Props) {
  const n = images.length;
  const [idx, setIdx] = useState(0); // index of the top card
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [suppressTransition, setSuppressTransition] = useState(false);

  const order = useMemo(() => {
    // stack order: top card first, then next, etc.
    return Array.from({ length: n }, (_, i) => (idx + i) % n);
  }, [idx, n]);

  const kickAndAdvance = (dir: 1 | -1) => {
    if (animating) return;
    setAnimating(true);

    const amplitude = 160; // how far the card flicks
    const durationMs = 180; // how long the kick lasts

    // 1) flick the top card
    setDragX(dir * -amplitude);

    // 2) after flick, swap index without animating the snap-back
    setTimeout(() => {
      setSuppressTransition(true); // turn off transition for the swap
      setIdx((i) => (i + (dir === 1 ? -1 : 1) + n) % n); // dir=1 => prev, dir=-1 => next (matches your swipe logic)
      setDragX(0); // reset drag to center

      // 3) next frame: re-enable transitions
      requestAnimationFrame(() => {
        setSuppressTransition(false);
        setAnimating(false);
      });
    }, durationMs);
  };

  const goNext = () => setIdx((i) => (i + 1) % n);
  const goPrev = () => setIdx((i) => (i - 1 + n) % n);

  const isFromButton = (t: EventTarget | null) =>
    (t as HTMLElement)?.closest('button') !== null;

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (animating || isFromButton(e.target)) return; // NEW: ignore while animating
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (animating || isFromButton(e.target) || startX.current == null) return;
    setDragX(e.clientX - startX.current);
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!animating && !isFromButton(e.target)) {
      const threshold = 80;
      if (dragX > threshold) setIdx((i) => (i - 1 + n) % n);
      else if (dragX < -threshold) setIdx((i) => (i + 1) % n);
    }
    setDragX(0);
    startX.current = null;
  };

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      {/* stack area */}
      <div
        className='relative w-[86%] max-w-[1100px] aspect-[5/3] select-none'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-roledescription='carousel'
        aria-label='Project screens'
      >
        {order.slice(0, Math.min(n, 4)).map((imgIndex, layer) => {
          // layer 0 = top; increase offset as it goes back
          const depth = layer; // 0,1,2,3...
          const isTop = depth === 0;
          const translateY = depth * 15; // px
          const scale = 1 - depth * 0.025;
          const rotate = depth === 1 ? -0.3 : depth === 2 ? 0.3 : 0; // tiny editorial tilt
          const z = n - depth;

          // drag only the top card
          const dragTranslateX = isTop ? dragX : 0;
          const dragRotate = isTop ? dragX * 0.04 : 0;

          return (
            <figure
              key={`${imgIndex}-${depth}`}
              className='absolute inset-0 mx-auto cursor-pointer top-[7%]'
              style={{
                zIndex: z,
                transform: `translateY(${translateY}px) scale(${scale}) rotate(${
                  rotate + dragRotate
                }deg) translateX(${dragTranslateX}px)`,
                transition:
                  startX.current || suppressTransition
                    ? 'none'
                    : 'transform 260ms ease',
              }}
            >
              <Image
                src={images[imgIndex]}
                alt={`Project screen ${imgIndex + 1}`}
                width={740} // or 500 if you want tighter
                height={444} // keep ~5:3 ratio
                draggable={false}
                className='mx-auto object-contain rounded-md shadow-[0_12px_36px_rgba(0,0,0,.38)] select-none'
                priority={imgIndex === idx}
              />
            </figure>
          );
        })}

        {/* arrows (optional, keyboard-clickable) */}
        <button
          type='button'
          aria-label='Previous'
          onClick={() => kickAndAdvance(1)}
          className={`absolute z-50 left-0 top-1/2 -translate-y-1/2 ml-2 text-2xl px-3 py-2 rounded-full backdrop-blur-sm
    ${
      variant === 'dark'
        ? 'text-white hover:text-white/40'
        : 'text-black hover:text-black/20'
    }`}
        >
          ‹
        </button>
        <button
          type='button'
          aria-label='Next'
          onClick={() => kickAndAdvance(-1)}
          className={`absolute z-50 right-0 top-1/2 -translate-y-1/2 mr-2 text-2xl px-3 py-2 rounded-full backdrop-blur-sm
    ${
      variant === 'dark'
        ? 'text-white hover:text-white/40'
        : 'text-black hover:text-black/20'
    }`}
        >
          ›
        </button>

        {/* indicators */}
        <div className='absolute bottom-0 left-0 right-0 mx-auto flex items-center justify-center gap-4'>
          {/* dots */}
          <div className='flex items-center gap-2'>
            {images.map((_, i) => {
              const active = i === idx;
              return (
                <span
                  key={i}
                  aria-hidden
                  className={`h-2 w-2 rounded-full ${
                    variant === 'dark'
                      ? active
                        ? 'bg-white'
                        : 'bg-white/30'
                      : active
                      ? 'bg-black'
                      : 'bg-black/20'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
