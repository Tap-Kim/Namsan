import { ISearchParams } from './MembersWrapper.interface';

const isBrowser = typeof window !== 'undefined';

const getSearchParams = (): ISearchParams => {
  if (!isBrowser) {
    return { name: '', position: '', businessField: '' };
  }

  const params = new URLSearchParams(document.location.search);
  const name = params.get('name') || '';
  const position = params.get('position') || '';
  const businessField = params.get('businessField') || '';
  return { name, position, businessField };
};

const getCurrentMenu = (): string => {
  if (!isBrowser) {
    return '';
  }

  const { pathname } = document.location;
  const [, path] = pathname.split('/');
  return path;
};

export { getSearchParams, getCurrentMenu };
