import { useRouter } from 'next/router';

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
    experience: convertToArray(experience),
    type: convertToArray(type),
    position: convertToArray(position),
    title: convertToString(title),
    location: convertToString(location)
  };

  let url = '?';

  if (experience) url += `Iskustvo=${experience.toString()}&`;
  if (type) url += `Tip=${type.toString()}&`;
  if (position) url += `Pozicija=${position.toString()}&`;

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

  return { addToUrl, removeFromUrl, activeFilters };
}
