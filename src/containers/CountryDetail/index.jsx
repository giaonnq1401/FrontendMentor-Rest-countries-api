import { lazy } from 'react';

const LazyAbout = lazy(() => import('./CountryDetail'));

const CountryDetail = (props) => (
    <LazyAbout {...props} />
);

export default CountryDetail;