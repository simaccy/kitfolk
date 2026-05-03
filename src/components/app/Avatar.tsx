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
        background: `radial-gradient(circle at 30% 30%, hsl(${hue} 60% 40% / 0.6), hsl(${hue} 50% 14% / 0.6))`,
      }}
      aria-hidden="true"
    >
      <span className="serif text-bone leading-none" style={{ fontSize }}>
        {initials(name)}
      </span>
    </span>
  );
}
