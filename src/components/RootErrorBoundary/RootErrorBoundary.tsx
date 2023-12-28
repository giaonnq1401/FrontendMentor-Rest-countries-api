import { useRouteError } from 'react-router-dom';

export function RootErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <div>
      <h2>Uh oh, something went terribly wrong 😩</h2>
      <p>{error.message || JSON.stringify(error, null, 2)}</p>
      <button
        type="button"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Retry
      </button>
    </div>
  );
}
