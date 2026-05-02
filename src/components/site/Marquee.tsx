const ROLES = [
  "DOP",
  "1ST AC",
  "2ND AC",
  "GAFFER",
  "BEST BOY",
  "GRIP",
  "SOUND MIXER",
  "BOOM OP",
  "1ST AD",
  "PRODUCER",
  "PRODUCTION DESIGNER",
  "ART DIRECTOR",
  "COSTUME",
  "MAKE-UP",
  "EDITOR",
  "COLOURIST",
  "VFX SUP",
  "STEDICAM OP",
  "DIT",
  "SCRIPT SUPERVISOR",
];

export function Marquee() {
  const items = [...ROLES, ...ROLES];
  return (
    <div className="border-rule relative overflow-hidden border-y py-5">
      <div className="from-bg pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-12">
        {items.map((r, i) => (
          <span
            key={`${r}-${i}`}
            className="label text-bone flex items-center gap-12"
          >
            {r}
            <span className="text-dim">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
