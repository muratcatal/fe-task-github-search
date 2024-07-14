export type SEARCH_LANGUAGE_TYPES = 'Javascript' | 'Scala' | 'Python';

export type ORDER_TYPES = 'asc' | 'desc';

export type RadioButtonValue<T> = {
  value: T;
  label: string;
};

export const LANGUAGES: RadioButtonValue<SEARCH_LANGUAGE_TYPES>[] = [
  {
    label: 'JavaScript',
    value: 'Javascript',
  },
  {
    label: 'Scala',
    value: 'Scala',
  },
  {
    label: 'Python',
    value: 'Python',
  },
] as const;

export const REPOSITORY_TABLE_COLUMNS = [
  {
    title: 'Repository ID',
    sortable: false,
  },
  {
    title: 'Username',
    sortable: false,
  },
  {
    title: 'Repository Description',
    sortable: false,
  },
  {
    title: 'Stars',
    sortable: true,
  },
  {
    title: 'Forks',
    sortable: true,
  },
  {
    title: 'Last Push',
    sortable: true,
  },
];
