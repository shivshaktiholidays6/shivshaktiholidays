export default function Loading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="sr-only">Loading the next page...</span>
      <span className="route-loading-bar" />
    </div>
  );
}
