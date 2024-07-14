import { useAppContext } from '@fetask/context';
import { RadioButtonGroup, SearchInput } from '@fetask/core';
import { LANGUAGES, SEARCH_LANGUAGE_TYPES } from '@fetask/fe-task-constants';
import { useSelector } from '@xstate/react';
import { useCallback } from 'react';

import { GithubApiKeySettings } from '../github-api-key-settings';
import { useSearch } from '../hooks/use-search';
import { SearchPanelWrapper } from './styled';

export const SearchPanel = () => {
  const context = useAppContext();

  useSearch();

  const selectedLanguage = useSelector(context, (state) => {
    return state.context.language;
  });

  const searchKeyword = useSelector(context, (state) => {
    return state.context.searchKeyword;
  });

  const handleLanguageChange = useCallback(
    (value: SEARCH_LANGUAGE_TYPES) => {
      context.send({
        type: 'language_changed',
        value,
      });
    },
    [context]
  );

  const handleKeywordChange = useCallback(
    (value?: string) => {
      context.send({
        type: 'input_changed',
        value,
      });
    },
    [context]
  );

  return (
    <SearchPanelWrapper>
      <RadioButtonGroup
        items={LANGUAGES}
        onChange={handleLanguageChange}
        value={selectedLanguage}
      />
      <SearchInput
        onChange={handleKeywordChange}
        defaultValue={searchKeyword}
        placeholder="Repository name"
        fullWidth
      />
      <GithubApiKeySettings />
    </SearchPanelWrapper>
  );
};
