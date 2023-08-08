import Link from 'next/link';
import data from 'components/filter/data.json';
import { useFilters } from 'components/filter/use-filters';
import {
  type EmploymentType,
  type Experience,
  type Position
} from '@prisma/client';

export const Filter = () => {
  const { addToUrl, removeFromUrl, activeFilters } = useFilters();

  const checkIfChecked = (name: string, option: string) => {
    const { experience, employment, position } = activeFilters;

    if (name === 'Experience' && experience)
      return experience.includes(option as Experience);
    if (name === 'Employment' && employment)
      return employment.includes(option as EmploymentType);
    if (name === 'Position' && position)
      return position.includes(option as Position);

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
                  <Link
                    href={url}
                    className="inline-flex cursor-pointer items-center"
                  >
                    <input
                      readOnly
                      id={option}
                      type="checkbox"
                      className="cursor-pointer rounded border-gray-300 text-blue-600 shadow-sm"
                      value={option}
                      checked={checked}
                    />
                    <label
                      htmlFor={option}
                      className="ml-2 cursor-pointer text-gray-600"
                    >
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
