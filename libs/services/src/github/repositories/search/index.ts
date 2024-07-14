import { ORDER_TYPES } from '@fetask/fe-task-constants';
import axios from 'axios';
import { useQuery } from 'react-query';
import { QUERY_KEYS_SEARCH_GITHUB_REPOSITORIES } from '../../keys';
import { RepositoryResultResult } from './types';

export type SearchGithubRepositoriesProps = {
  keyword: string;
  page: number;
  limit: number;
  language: string;
  sort: {
    column: string;
    order: ORDER_TYPES;
  };
  githubApiKey?: string;
};

const searchGithubRepositories = async ({
  keyword,
  language,
  limit,
  page,
  sort,
  githubApiKey,
}: SearchGithubRepositoriesProps) => {
  const sorting = `sort:${sort.column}-${sort.order}`;
  const q = encodeURIComponent(
    `${keyword ? keyword + ' in:name ' : ''}language:${language} ${sorting}`
  );

  const result = await axios.get<RepositoryResultResult>(
    `https://api.github.com/search/repositories?q=${q}&page=${page}&per_page=${limit}`,
    {
      ...{
        ...(githubApiKey && {
          headers: {
            Authorization: `token ${githubApiKey}`,
          },
        }),
      },
    }
  );

  return result.data;
};

export const useSearchGithubRepositories = (
  params: SearchGithubRepositoriesProps
) => {
  return useQuery(
    QUERY_KEYS_SEARCH_GITHUB_REPOSITORIES.withQueryParams(params),
    () => searchGithubRepositories(params)
  );
};
