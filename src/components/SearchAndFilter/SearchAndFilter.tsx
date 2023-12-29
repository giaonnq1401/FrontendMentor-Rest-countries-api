import { useMemo } from 'react';

import IconSearch from '@/assets/icons/icon-search.svg';

import './search-filter.scss';

type KeyRegion = 'africa' | 'america' | 'asia' | 'europe' | 'oceania' | 'filter';

export default function SearchAndFilter() {
  const regions: Array<{ key: KeyRegion; label: string }> = useMemo(
    () => [
      {
        key: 'filter',
        label: 'Filter by Region',
      },
      {
        key: 'africa',
        label: 'Africa',
      },
      {
        key: 'america',
        label: 'America',
      },
      {
        key: 'asia',
        label: 'Asia',
      },
      {
        key: 'europe',
        label: 'Europe',
      },
      {
        key: 'oceania',
        label: 'Oceania',
      },
    ],
    []
  );

  return (
    <div className="action-bar">
      <div className="search-bar">
        <IconSearch />
        <input type="text" placeholder="Search for a country..." />
      </div>

      <select name="region" className="filter-bar">
        {regions.map(region => (
          <option value={region.key}>{region.label}</option>
        ))}
      </select>
    </div>
  );
}
