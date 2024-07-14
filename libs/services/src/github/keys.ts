import { SearchGithubRepositoriesProps } from './repositories/search';

export const QUERY_KEYS_SEARCH_GITHUB_REPOSITORIES = {
  all: 'search-github-repositories-all',
  withQueryParams: (queryParams: SearchGithubRepositoriesProps) => [
    ...QUERY_KEYS_SEARCH_GITHUB_REPOSITORIES.all,
    queryParams,
  ],
};
