interface Props {
  current: number; // 0始まり
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const percent = total === 0 ? 0 : ((current + 1) / total) * 100;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${percent}%`, backgroundColor: "#0D9488" }}
      />
    </div>
  );
}
