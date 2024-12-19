import { Suspense } from 'react';
import { DeferredLoader, ErrorFallback } from '@/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { router } from '@/routes/router';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/fonts.css';
import '@/styles/designTokens.css';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Suspense fallback={<DeferredLoader />}>
					<RouterProvider router={router} />
				</Suspense>
			</ErrorBoundary>
		</QueryClientProvider>
	);
}

export default App;
