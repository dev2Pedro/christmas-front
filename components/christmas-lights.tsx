const COLORS = [
  "var(--candle)",
  "var(--berry)",
  "var(--night-foreground)",
  "var(--candle)",
];

/** Fio de luzes: linha fina com lâmpadas que piscam em fases diferentes. */
export function ChristmasLights({ count = 22 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0">
      <svg
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
        className="block h-8 w-full"
      >
        <path
          d="M0 4 Q 500 44 1000 4"
          fill="none"
          stroke="var(--night-muted)"
          strokeOpacity="0.45"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ul className="absolute inset-x-0 top-0 flex h-16 justify-between px-[2%]">
        {Array.from({ length: count }).map((_, i) => {
          const t = i / (count - 1);
          // altura da lâmpada acompanha a curva do fio
          const sag = 4 * t * (1 - t) * 27;
          return (
            <li
              key={i}
              className="bulb size-2.5 rounded-full"
              style={{
                marginTop: `${4 + sag}px`,
                background: COLORS[i % COLORS.length],
                boxShadow: `0 6px 18px 2px color-mix(in oklab, ${
                  COLORS[i % COLORS.length]
                } 55%, transparent)`,
                ["--d" as string]: `${(i * 0.37) % 3}s`,
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}
