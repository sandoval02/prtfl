'use client';
import { useRef, useState } from 'react';

// Swipeable screenshot carousel: native scroll-snap does the sliding, buttons and dots just scroll the track.
export default function Carousel({ slides, title }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const go = (n) => {
    const t = track.current;
    const k = (n + slides.length) % slides.length;
    t.scrollTo({ left: k * t.clientWidth, behavior: 'smooth' });
  };
  const onScroll = () => {
    const t = track.current;
    setIndex(Math.round(t.scrollLeft / t.clientWidth));
  };

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={`${title} screenshots`}>
      <div className="carousel-track" ref={track} onScroll={onScroll} tabIndex={0}>
        {slides.map((s, k) => (
          <figure key={s.src} className="carousel-slide" aria-label={`${k + 1} of ${slides.length}`}>
            <img src={s.src} alt={`${title}: ${s.label}`} width="1600" height="1000" loading={k ? 'lazy' : undefined} />
          </figure>
        ))}
      </div>
      <span className="carousel-label" aria-live="polite">{slides[index].label}</span>
      <button type="button" className="carousel-btn prev" onClick={() => go(index - 1)} aria-label="Previous screenshot">‹</button>
      <button type="button" className="carousel-btn next" onClick={() => go(index + 1)} aria-label="Next screenshot">›</button>
      <div className="carousel-dots">
        {slides.map((s, k) => (
          <button key={s.src} type="button" aria-label={`Show ${s.label}`} aria-current={k === index} onClick={() => go(k)} />
        ))}
      </div>
    </div>
  );
}
