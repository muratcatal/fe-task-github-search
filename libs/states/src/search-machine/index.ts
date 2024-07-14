import {
  ORDER_TYPES,
  REPOSITORY_TABLE_COLUMNS,
  SEARCH_LANGUAGE_TYPES,
} from '@intenseye/fe-task-constants';
import { RepositoryItem, RepositoryResultResult } from '@intenseye/services';
import { assign, createActor, setup } from 'xstate';
import { LOCAL_STORAGE_KEY_SEARCH_ACTOR } from './constants';

const machine = setup({
  types: {
    context: {} as {
      repositories: RepositoryItem[];
      sort: {
        column: string;
        order: ORDER_TYPES;
      };
      page: number;
      limit: number;
      hasMorePage?: boolean;
      language: SEARCH_LANGUAGE_TYPES;
      searchKeyword: string;
      githubApiKey?: string;
    },
    events: {} as
      | {
          type: 'sort_changed';
          value: { column: string; order: ORDER_TYPES };
        }
      | { type: 'pagination_changed'; value: number }
      | { type: 'input_changed'; value?: string }
      | { type: 'language_changed'; value: SEARCH_LANGUAGE_TYPES }
      | { type: 'data_loaded'; value: RepositoryResultResult }
      | { type: 'set_github_api_key'; value?: string }
      | { type: 'reset' },
  },
  actions: {
    setGithubApiKey: assign({
      githubApiKey: ({ context, event }) =>
        event.type === 'set_github_api_key'
          ? event.value
          : context.githubApiKey,
    }),
    updateLanguageContext: assign({
      language: ({ context, event }) =>
        event.type === 'language_changed' ? event.value : context.language,
      page: 1,
    }),
    updateSortingContext: assign({
      sort: ({ context, event }) =>
        event.type === 'sort_changed' ? event.value : context.sort,
      page: 1,
    }),
    updatePaginationContext: assign({
      page: ({ context, event }) =>
        event.type === 'pagination_changed' ? event.value : context.page,
    }),
    updateSearchKeywordContext: assign({
      searchKeyword: ({ context, event }) =>
        event.type === 'input_changed'
          ? event.value ?? ''
          : context.searchKeyword,
      page: 1,
    }),
  },
  guards: {
    isColumnSortable: function ({ context, event }) {
      if (event.type === 'sort_changed') {
        return Boolean(
          REPOSITORY_TABLE_COLUMNS.find(
            (column) => column.title === event.value.column
          )?.sortable
        );
      }
      return false;
    },
  },
  schemas: {
    events: {
      data_loaded: {
        type: 'object',
        properties: {},
      },
      sort_changed: {
        type: 'object',
        properties: {},
      },
      pagination_changed: {
        type: 'object',
        properties: {},
      },
      input_changed: {
        type: 'object',
        properties: {},
      },
      language_changed: {
        type: 'object',
        properties: {},
      },
      reset: {
        type: 'object',
        properties: {},
      },
    },
    context: {
      repositories: {
        type: 'array',
        description: 'github repositories',
      },
      sort: {
        type: 'string',
        description: 'sort column',
      },
      page: {
        type: 'number',
        description: 'active page',
      },
      limit: {
        type: 'number',
        description: 'limit for pagination',
      },
    },
  },
}).createMachine({
  context: {
    repositories: [],
    page: 1,
    limit: 10,
    sort: {
      column: 'id',
      order: 'asc',
    },
    language: 'Javascript',
    searchKeyword: '',
  },
  id: 'repositories',
  initial: 'loading',
  states: {
    loading: {
      on: {
        data_loaded: {
          target: 'idle',
          actions: [
            assign({
              repositories: ({ event }) => {
                return event.value.items;
              },
              hasMorePage: ({ context, event }) => {
                return event.value.incomplete_results;
              },
            }),
          ],
        },
      },
    },
    idle: {
      on: {
        set_github_api_key: {
          actions: {
            type: 'setGithubApiKey',
          },
        },
        sort_changed: {
          actions: {
            type: 'updateSortingContext',
          },
          target: 'loading',
          guard: {
            type: 'isColumnSortable',
          },
        },
        input_changed: {
          actions: {
            type: 'updateSearchKeywordContext',
          },
          target: 'loading',
        },
        language_changed: {
          actions: {
            type: 'updateLanguageContext',
          },
          target: 'loading',
        },
        pagination_changed: {
          actions: {
            type: 'updatePaginationContext',
          },
          target: 'loading',
        },
      },
    },
    failed_response: {
      always: {
        target: 'idle',
      },
    },
  },
});

const persistedSearchActor = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY_SEARCH_ACTOR) ?? '{}'
);

const searchActor = createActor(machine, {
  ...{
    ...(persistedSearchActor &&
      Object.keys(persistedSearchActor).length > 0 && {
        snapshot: persistedSearchActor,
      }),
  },
});

searchActor.subscribe(() => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY_SEARCH_ACTOR,
    JSON.stringify(searchActor.getPersistedSnapshot())
  );
});

searchActor.start();

export { searchActor };
