import Image from "next/image";
import { initials } from "@/lib/utils";

export function Avatar({
  name,
  hue = 200,
  size = 40,
  src,
  className = "",
}: {
  name: string;
  hue?: number;
  size?: number;
  src?: string | null;
  className?: string;
}) {
  const fontSize = Math.round(size * 0.36);

  if (src) {
    return (
      <span
        className={`border-rule-strong relative inline-block shrink-0 overflow-hidden border ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={`border-rule-strong relative inline-flex shrink-0 items-center justify-center overflow-hidden border ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${hue} 55% 86%), hsl(${hue} 42% 72%))`,
      }}
      aria-hidden="true"
    >
      <span className="serif text-ink leading-none" style={{ fontSize }}>
        {initials(name)}
      </span>
    </span>
  );
}
