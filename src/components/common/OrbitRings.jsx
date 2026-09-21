/**
 * The site's signature element: concentric rings that literally stand for
 * stages of progression (Basic → Intermediate → Advanced tiers, or
 * School → UG/PG → Professional course tracks).
 *
 * Rings are generated from an array so the number of rings and their
 * spacing can be easily adjusted without rewriting the SVG.
 */

import logo from "../../assets/logo/ORBIT-BG.jpg";
import bookIcon from "../../assets/icons/book.svg";
import hardwareIcon from "../../assets/icons/hardware.svg";
import programmingIcon from "../../assets/icons/programming.svg";

export default function OrbitRings({
  labels = ["School", "UG / PG", "Professional"],
  className = "",
}) {
  // Change this array to control the number and spacing of rings.
  // Larger difference between numbers = larger gap.
  const ringRadii = [185, 155, 125, 95, 65, 35];

  // Ring colors are repeated automatically.
  const ringColors = [
    "var(--color-orbit-blue-100)",
    "var(--color-orbit-blue-200)",
    "var(--color-orbit-green-200)",
  ];

  return (
    <div
      className={`relative aspect-square w-full max-w-md ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
      >
        {/* =========================
            CONCENTRIC RINGS
        ========================== */}
        {ringRadii.map((radius, index) => (
          <circle
            key={radius}
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            stroke={ringColors[index % ringColors.length]}
            strokeWidth="1.5"
          />
        ))}

        {/* =========================
            BOOK ICON
            Outer ring
        ========================== */}
        <g
          className="animate-orbit-spin-slow"
          style={{
            transformOrigin: "200px 200px",
          }}
        >
          <image
            href={bookIcon}
            x="188"
            y="3"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* =========================
            HARDWARE ICON
            Second ring
        ========================== */}
        <g
          className="animate-orbit-spin-slow-reverse"
          style={{
            transformOrigin: "200px 200px",
            animationDuration: "16s",
          }}
        >
          <image
            href={hardwareIcon}
            x="188"
            y="33"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* =========================
            PROGRAMMING ICON
            Third ring
        ========================== */}
        <g
          className="animate-orbit-spin-slow"
          style={{
            transformOrigin: "200px 200px",
            animationDuration: "18s",
          }}
        >
          <image
            href={programmingIcon}
            x="188"
            y="63"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* =========================
            LOGO CLIP
        ========================== */}
        <defs>
          <clipPath id="logoClip">
            <circle
              cx="200"
              cy="200"
              r="34"
            />
          </clipPath>
        </defs>

        {/* =========================
            CENTER LOGO
        ========================== */}
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

      {/* =========================
          LABELS
      ========================== */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-3 text-xs font-semibold text-orbit-ink-soft">
        {labels.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className={
              index === 1
                ? "self-center"
                : index === 0
                ? "self-end pr-2"
                : "self-start pl-2"
            }
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}