import { lazy } from 'react';

const LazyAbout = lazy(() => import('./Dashboard'));

const Dashboard = (props) => (
    <LazyAbout {...props} />
);

export default Dashboard;