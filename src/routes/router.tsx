import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
	Home,
	Login,
	Register,
	Profile,
	SalaryManagement,
	SalaryDetails,
	CorrectionRequest,
	ScheduleManagement,
	NotFound,
} from '../pages';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/login', element: <Login /> },
			{ path: '/register', element: <Register /> },
			{
				path: '/profile',
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: '/salary-details',
				element: (
					<ProtectedRoute>
						<SalaryDetails />
					</ProtectedRoute>
				),
			},
			{
				path: '/correction-request',
				element: (
					<ProtectedRoute>
						<CorrectionRequest />
					</ProtectedRoute>
				),
			},
			{
				path: '/schedule-management',
				element: (
					<ProtectedRoute>
						<ScheduleManagement />
					</ProtectedRoute>
				),
			},
			{
				path: '/salary-management',
				element: (
					<ProtectedRoute>
						<SalaryManagement />
					</ProtectedRoute>
				),
			},
		],
	},
]);
