import React, {useEffect, useRef, useState} from 'react';
import {setSearchTerm, searchGithub} from '../redux/SearchSlice';
import {AppAction, AppState} from '../utils/Types';
import {Input, SearchHistoryView} from './StyledComponents';
import {debounce} from 'lodash';
import {ThunkDispatch} from 'redux-thunk';
import {useReduxDispatch, useReduxSelector} from '../redux/Hooks';
import {RootState} from '../store/Store';
import SearchHistory from './SearchHistory';

const SearchInput = () => {
  const dispatch = useReduxDispatch();
  const asyncDispatch: ThunkDispatch<AppState, void, AppAction> =
    useReduxDispatch();
  const searchTerm = useReduxSelector(
    (state: RootState) => state.search.searchTerm,
  );
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const debouncedSearchGithub = useRef(
    debounce((text: string) => asyncDispatch(searchGithub(text)), 500),
  ).current;

  useEffect(() => {}, [dispatch, searchTerm]);

  const handleSearchInputFocus = () => {
    setShowSearchHistory(true);
  };

  const handleSearchInputBlur = () => {
    setShowSearchHistory(false);
  };

  const handleSearchTermChange = (text: string) => {
    dispatch(setSearchTerm(text));

    debouncedSearchGithub(text);
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
