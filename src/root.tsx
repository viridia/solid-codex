// @refresh reload
import { Suspense } from 'solid-js';
import ErrorBoundary, { FileRoutes, Routes } from 'solid-start';

export default function Root() {
  return (
    <ErrorBoundary>
      <Suspense>
        <Routes>
          <FileRoutes />
        </Routes>
      </Suspense>
    </ErrorBoundary>
 );
}
