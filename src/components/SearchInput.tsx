import React, {useEffect, useState} from 'react';
import {setSearchTerm, searchGithub, addToHistory} from '../redux/SearchSlice';
import {AppAction, AppState} from '../utils/Types';
import {Input, SearchHistoryView} from './StyledComponents';
import {debounce} from 'lodash';
import {ThunkDispatch} from 'redux-thunk';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';
import {RootState} from '../store/Store';
import SearchHistory from './SearchHistory';

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const asyncDispatch: ThunkDispatch<AppState, void, AppAction> =
    useAppDispatch();
  const searchTerm = useAppSelector(
    (state: RootState) => state.search.searchTerm,
  );
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [debouncedSearchGithub, setDebouncedSearchGithub] = useState<ReturnType<
    typeof debounce
  > | null>(null);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      dispatch(addToHistory(searchTerm));
    }
  }, [dispatch, searchTerm]);

  const handleSearchInputFocus = () => {
    setShowSearchHistory(true);
  };

  const handleSearchInputBlur = () => {
    setShowSearchHistory(false);
  };

  const handleSearchTermChange = (text: string) => {
    dispatch(setSearchTerm(text));

    if (debouncedSearchGithub) {
      debouncedSearchGithub.cancel();
    }

    setDebouncedSearchGithub(
      debounce(() => {
        asyncDispatch(searchGithub(text));
      }, 500),
    );
  };

  return (
    <>
      <Input
        placeholder="Search or jump to..."
        placeholderTextColor={'#C5C6C8'}
        value={searchTerm}
        onChangeText={handleSearchTermChange}
        onFocus={handleSearchInputFocus}
        onBlur={handleSearchInputBlur}
      />
      {showSearchHistory && (
        <SearchHistoryView>
          <SearchHistory onPressItem={handleSearchTermChange} />
        </SearchHistoryView>
      )}
    </>
  );
};

export default SearchInput;
