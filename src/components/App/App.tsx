import { RouterProvider } from 'react-router-dom';

import { router } from '../router';

import './app.scss';

function App() {
  return <RouterProvider router={router} fallbackElement={null} />;
}

export default App;
