import Link from 'next/link';
import data from './data.json';
import { useFilters } from './use-filters';

export const Filter = () => {
  const { addToUrl, removeFromUrl, activeFilters } = useFilters();

  const checkIfChecked = (name: string, option: string) => {
    const { experience, type, position } = activeFilters;

    if (name === 'Iskustvo' && experience) return experience.includes(option);
    if (name === 'Tip' && type) return type.includes(option);
    if (name === 'Pozicija' && position) return position.includes(option);

    return false;
  };

  return (
    <div className="w-52 flex-shrink-0 space-y-10">
      {data.filters.map(filter => (
        <div key={filter.name} className="space-y-3">
          <div className="font-semibold">{filter.name}</div>
          <ul className="space-y-3">
            {filter.options.map(option => {
              const checked = checkIfChecked(filter.name, option);
              const url = checked
                ? removeFromUrl(filter.name, option)
                : addToUrl(filter.name, option);

              return (
                <li key={option}>
                  <Link href={url} className="flex items-center">
                    <input
                      readOnly
                      id={option}
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                      value={option}
                      checked={checked}
                    />
                    <label htmlFor={option} className="ml-2 text-gray-600">
                      {option}
                    </label>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
