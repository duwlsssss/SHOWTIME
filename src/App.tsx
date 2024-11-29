import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/fonts.css';
import '@/styles/designTokens.css';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
