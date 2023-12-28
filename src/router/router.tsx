import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './constant';

export const router = createBrowserRouter([
  {
    path: ROUTES.messageDetail,
    async lazy() {
      const { default: countryDetail } = await import('../pages/CountryDetail');

      return { Component: countryDetail };
    },
  },
]);
