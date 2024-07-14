import { useAppContext } from '@intenseye/context';
import { useSearchGithubRepositories } from '@intenseye/services';
import { useSelector } from '@xstate/react';
import { useEffect } from 'react';

export const useSearch = () => {
  const context = useAppContext();

  const repositoryParams = useSelector(context, (state) => {
    return {
      keyword: state.context.searchKeyword,
      page: state.context.page,
      limit: state.context.limit,
      language: state.context.language,
      sort: state.context.sort,
      githubApiKey: state.context.githubApiKey,
    };
  });

  const { data } = useSearchGithubRepositories(repositoryParams);

  useEffect(() => {
    if (data) {
      context.send({
        type: 'data_loaded',
        value: data,
      });
    }
  }, [context, data]);
};
