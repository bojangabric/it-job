import {
  type Position,
  type EmploymentType,
  type Experience
} from '@prisma/client';
import { useRouter } from 'next/router';
import { transformToEnum } from 'utils/transform-to-enum';

function regexAdd(name: string, option: string, url: string) {
  const regexp = new RegExp(`(?<=${name}=)([^&\n]+)`, 'g');
  const search = url.match(regexp);

  if (search) {
    return url.replace(search[0], `${search[0]},${option}`);
  }

  return url;
}

function convertToArray(value: string | string[] | undefined) {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  return value.split(',');
}

function convertToString(value: string | string[] | undefined) {
  if (!value) return '';
  if (Array.isArray(value)) return value.join('');
  return value;
}

export function useFilters() {
  const { query } = useRouter();

  const experience = query.Iskustvo;
  const type = query.Tip;
  const position = query.Pozicija;
  const title = query.Title;
  const location = query.Location;

  const activeFilters = {
    experience: convertToArray(experience) as Experience[],
    type: convertToArray(type) as EmploymentType[],
    position: convertToArray(position) as Position[],
    title: convertToString(title),
    location: convertToString(location)
  };

  const activeEnumFilters = {
    experience: convertToArray(experience)?.map(
      transformToEnum
    ) as Experience[],
    type: convertToArray(type)?.map(transformToEnum) as EmploymentType[],
    position: convertToArray(position)?.map(transformToEnum) as Position[],
    title: convertToString(title),
    location: convertToString(location)
  };

  let url = '?';

  if (experience) url += `Iskustvo=${experience.toString()}&`;
  if (type) url += `Tip=${type.toString()}&`;
  if (position) url += `Pozicija=${position.toString()}&`;
  if (title) url += `Title=${title.toString()}&`;
  if (location) url += `Location=${location.toString()}&`;

  const addToUrl = (name: string, option: string) => {
    if (!url.includes(name)) return `${url}${name}=${option}`;
    if (url.includes(option)) return url;
    return regexAdd(name, option, url);
  };

  const removeFromUrl = (name: string, option: string) => {
    const regexp = new RegExp(`(?<=${name}=)([^&\n]+)`, 'g');
    const search = url.match(regexp);
    if (!search) return url;

    if (search[0] === option) return url.replace(`${name}=${search[0]}`, '');

    const withoutOption = search[0]
      .split(',')
      .filter(o => o !== option)
      .join(',');

    return url.replace(search[0], withoutOption);
  };

  return { addToUrl, removeFromUrl, activeFilters, activeEnumFilters };
}
