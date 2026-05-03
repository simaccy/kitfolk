import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="border-rule flex flex-col items-center border border-dashed py-14 px-6 text-center">
      <p className="serif text-ink text-2xl">{title}</p>
      {body && (
        <p className="text-mute mt-3 max-w-xs text-[14px] leading-relaxed">{body}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
