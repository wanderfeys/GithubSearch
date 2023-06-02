import React, {useState} from 'react';
import {setSearchTerm} from '../redux/searchSlice';
import {Input, SearchHistoryView} from './StyledComponents';
import {
  useDebouncedHook,
  useReduxDispatch,
  useReduxSelector,
} from '../redux/hooks';
import {RootState} from '../store/store';
import SearchHistory from './SearchHistory';

const SearchInput = () => {
  const dispatch = useReduxDispatch();
  const searchTerm = useReduxSelector(
    (state: RootState) => state.search.searchTerm,
  );
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const debouncedSearchGithub = useDebouncedHook(searchTerm);

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
