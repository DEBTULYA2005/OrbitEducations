/**
 * The site's signature element: concentric rings that literally stand for
 * stages of progression (Basic → Intermediate → Advanced tiers, or
 * School → UG/PG → Professional course tracks). Each ring carries a label
 * so the motif encodes real information rather than decorating space.
 */
import logo from "../../assets/logo/ORBIT-BG.jpg";
import bookIcon from "../../assets/icons/book.svg";
import hardwareIcon from "../../assets/icons/hardware.svg";
import programmingIcon from "../../assets/icons/programming.svg";

export default function OrbitRings({ labels = ['School', 'UG / PG', 'Professional'], className = '' }) {
  return (
    <div className={`relative aspect-square w-full max-w-md ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <circle cx="200" cy="200" r="180" fill="none" stroke="var(--color-orbit-blue-100)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="var(--color-orbit-blue-200)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="80" fill="none" stroke="var(--color-orbit-green-200)" strokeWidth="1.5" />

        <g className="animate-orbit-spin-slow" style={{ transformOrigin: '200px 200px' }}>
          <image
              href={bookIcon}
              x="188"
              y="8"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
          />
        </g>
        <g className="animate-orbit-spin-slow-reverse" style={{ transformOrigin: '200px 200px' }}>
          <image
                href={hardwareIcon}
                x="188"
                y="58"
                width="24"
                height="24"
                preserveAspectRatio="xMidYMid meet"
            />
        </g>
        <g className="animate-orbit-spin-slow" style={{ transformOrigin: '200px 200px', animationDuration: '18s' }}>
          <image
              href={programmingIcon}
              x="188"
              y="108"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
          />
        </g>

        <defs>
            <clipPath id="logoClip">
                <circle cx="200" cy="200" r="34" />
            </clipPath>
        </defs>

        <image
            href={logo}
            x="166"
            y="166"
            width="68"
            height="68"
            clipPath="url(#logoClip)"
            preserveAspectRatio="xMidYMid slice"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-3 text-xs font-semibold text-orbit-ink-soft">
        {labels.map((label, i) => (
          <span key={label} className={i === 1 ? 'self-center' : i === 0 ? 'self-end pr-2' : 'self-start pl-2'}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
