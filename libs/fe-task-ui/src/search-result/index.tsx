import { useAppContext } from '@fetask/context';
import { Table } from '@fetask/core';
import {
  ORDER_TYPES,
  REPOSITORY_TABLE_COLUMNS,
} from '@fetask/fe-task-constants';
import { useSelector } from '@xstate/react';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { useSearch } from '../hooks/use-search';
import { LoadingSkeleton } from './loading-skeleton';

export const SearchResult = () => {
  const context = useAppContext();
  const machine = context.getSnapshot();

  useSearch();

  const loading = machine.matches('loading');

  const searchRepositoriesResult = useSelector(context, (state) => {
    return state.context.repositories;
  });

  const currentSort = useSelector(context, (state) => {
    return state.context.sort;
  });

  const pagination = useSelector(context, (state) => {
    return {
      limit: state.context.limit,
      page: state.context.page,
      hasMorePage: state.context.hasMorePage,
    };
  });

  const handleSort = useCallback(
    (key: string, order: ORDER_TYPES) => {
      context.send({
        type: 'sort_changed',
        value: { column: key, order },
      });
    },
    [context]
  );

  return (
    <Table
      loading={loading}
      LoadingSkeleton={<LoadingSkeleton />}
      HeaderItems={REPOSITORY_TABLE_COLUMNS}
      currentSort={currentSort}
      onSort={handleSort}
      data={searchRepositoriesResult}
      pagination={{
        hasNextPage: pagination.hasMorePage,
        currentPage: pagination?.page,
        onPageChange: (page) => {
          context.send({
            type: 'pagination_changed',
            value: page,
          });
        },
      }}
    >
      {({ data }) => {
        return data?.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.owner.login}</td>
              <td>{item.description}</td>
              <td>{item.stargazers_count}</td>
              <td>{item.forks_count}</td>
              <td>{format(item.pushed_at, 'yyyy-MM-dd hh:mm a')}</td>
            </tr>
          );
        });
      }}
    </Table>
  );
};
