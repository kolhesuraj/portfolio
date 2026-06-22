export default function Divider({
  color = "cyan",
}: {
  color?: "cyan" | "violet" | "emerald";
}) {
  const grad = {
    cyan: "from-transparent via-cyan-500/25 to-transparent",
    violet: "from-transparent via-violet-500/25 to-transparent",
    emerald: "from-transparent via-emerald-500/25 to-transparent",
  }[color];
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className={`h-px bg-gradient-to-r ${grad}`} />
    </div>
  );
}
