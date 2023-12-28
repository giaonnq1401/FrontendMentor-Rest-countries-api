import { createBrowserRouter } from 'react-router-dom';

import RootErrorBoundary from '../RootErrorBoundary';
import { ROUTES } from './constant';

export const router = createBrowserRouter([
  {
    path: ROUTES.homepage,
    errorElement: <RootErrorBoundary />,
    async lazy() {
      const Component = (await import('@/components/Layout')).default;
      return { Component };
    },

    children: [
      {
        index: true,
        async lazy() {
          const Homepage = (await import('@/pages/Homepage')).default;
          return { Component: Homepage };
        },
      },
      {
        path: ROUTES.countryDetail,
        async lazy() {
          const Component = (await import('@/pages/CountryDetail')).default;
          return { Component };
        },
      },
    ],
  },
]);
