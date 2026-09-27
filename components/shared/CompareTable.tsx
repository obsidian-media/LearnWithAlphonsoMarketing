// Shared table shell for the /compare/* pages -- same structure, three
// competitors now (Duolingo, Babbel, Busuu), so the markup earns extraction
// rather than being copy-pasted a third time.
export type CompareRow = [feature: string, ours: string, theirs: string];

type CompareTableProps = {
  competitorName: string;
  rows: CompareRow[];
};

export function CompareTable({ competitorName, rows }: CompareTableProps) {
  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-xs font-bold uppercase tracking-wide text-ink-soft">
            <th className="py-3 pr-4">Feature</th>
            <th className="py-3 pr-4">Learn with Alphonso</th>
            <th className="py-3">{competitorName}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([feature, ours, theirs]) => (
            <tr key={feature} className="border-b border-ink/8">
              <td className="py-3 pr-4 font-semibold text-ink">{feature}</td>
              <td className="py-3 pr-4 text-ink-soft">{ours}</td>
              <td className="py-3 text-ink-soft">{theirs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
