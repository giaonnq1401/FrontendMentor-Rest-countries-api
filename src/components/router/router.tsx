import { createBrowserRouter } from 'react-router-dom';

import RootErrorBoundary from '../RootErrorBoundary';
import { ROUTES } from './constant';

export const router = createBrowserRouter([
  {
    path: ROUTES.countryDetail,
    async lazy() {
      const CountryDetail = (await import('../../pages/CountryDetail')).default;
      return { Component: CountryDetail };
    },
    errorElement: <RootErrorBoundary />,
  },
]);
