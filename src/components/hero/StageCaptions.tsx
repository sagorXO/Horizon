'use client';

interface StageCaptionsProps {
  progress: number;
}

// Five narrative beats that unfold as the building rises in the video.
// Each caption tells a genuine story about what HORIZON represents —
// not construction jargon, but the promise of the finished residence.
const STAGES = [
  {
    start: 0,
    end: 0.2,
    label: 'SITE · DOWNTOWN CORE',
    title: 'Where the City Meets the Sky',
    subtitle: 'A landmark address at the heart of the metropolitan skyline',
  },
  {
    start: 0.2,
    end: 0.4,
    label: 'ARCHITECTURE · PRECISION',
    title: 'Engineered for Eternity',
    subtitle: 'Structural integrity designed to outlast generations',
  },
  {
    start: 0.4,
    end: 0.6,
    label: 'DESIGN · CRAFTSMANSHIP',
    title: 'Every Detail Deliberate',
    subtitle: 'From the curtain wall to the crown — nothing left to chance',
  },
  {
    start: 0.6,
    end: 0.8,
    label: 'RESIDENCES · EXCLUSIVE',
    title: 'Three Residence Types',
    subtitle: 'Garden Villas · Sky Suites · Crown Penthouse',
  },
  {
    start: 0.8,
    end: 1.0,
    label: 'HORIZON · EST. 2025',
    title: 'Redefining Luxury Living',
    subtitle: 'Inquire now — limited residences available',
  },
];

export default function StageCaptions({ progress }: StageCaptionsProps) {
  let currentStageIndex = STAGES.findIndex(
    (s) => progress >= s.start && progress <= s.end
  );
  if (currentStageIndex === -1) {
    currentStageIndex = progress < 0 ? 0 : STAGES.length - 1;
  }

  return (
    <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10 w-[480px] max-w-[55vw] pointer-events-none">
      {STAGES.map((stage, index) => {
        const isActive = index === currentStageIndex;
        return (
          <div
            key={index}
            className="absolute top-0 left-0 transition-all duration-700 ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateY(0)' : 'translateY(12px)',
              pointerEvents: 'none',
            }}
          >
            {/* Label — Helvetica, tiny, steel-blue */}
            <div
              className="text-[10px] tracking-[0.3em] text-[#0EA5E9] uppercase mb-5"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 600 }}
            >
              {stage.label}
            </div>

            {/* Main title — Cinzel, large, white */}
            <h1
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-wider mb-5"
            >
              {stage.title}
            </h1>

            {/* Subtitle — Helvetica, small, muted white */}
            <p
              className="text-xs md:text-sm text-white/60 tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400 }}
            >
              {stage.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
