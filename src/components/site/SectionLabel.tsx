export function SectionLabel({
  index,
  title,
  meta,
}: {
  index: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="border-rule text-mute label flex items-center justify-between border-t pt-4">
      <span className="text-bone">
        <span className="text-flare">●</span> {index} <span className="mx-2 text-dim">/</span>{" "}
        {title}
      </span>
      {meta && <span className="hidden md:inline">{meta}</span>}
    </div>
  );
}
