export default function Loading() {
  return (
    <div className="container-x py-16" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-40 rounded bg-mist-2" />
        <div className="h-12 w-3/4 max-w-2xl rounded-lg bg-mist-2" />
        <div className="h-5 w-2/3 max-w-xl rounded bg-mist" />
        <div className="grid gap-6 pt-8 md:grid-cols-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-56 rounded-[12px] bg-mist" />)}
        </div>
      </div>
    </div>
  );
}
