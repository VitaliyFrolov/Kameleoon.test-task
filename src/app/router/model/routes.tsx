import { RouteObject } from 'react-router-dom';
import { ResultsPage } from '../../../pages/results';
import { FinalizePage } from '../../../pages/finalize';
import { DashboardPage } from '../../../pages/dashboard';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <DashboardPage />,
    },
    {
        path: '/results/:testId',
        element: <ResultsPage />
    },
    {
        path: '/finalize/:testId',
        element: <FinalizePage />
    }
];