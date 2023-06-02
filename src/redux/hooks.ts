import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store/store';
import {useCallback, useEffect, useRef} from 'react';
import {debounce} from 'lodash';
import {AppState} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import {AppAction} from '../utils/types';
import {searchGithub, setRefreshing} from './searchSlice';

export const useReduxDispatch: () => AppDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSearchAndRefresh = (searchTerm: string) => {
  const organizations = useReduxSelector(
    (state: RootState) => state.search.organizations,
  );
  const repositories = useReduxSelector(
    (state: RootState) => state.search.repositories,
  );
  const refreshing = useReduxSelector(
    (state: RootState) => state.search.refreshing,
  );
  const dispatch = useReduxDispatch();
  const debouncedHandleSearch = useDebouncedHook(searchTerm);

  const handleRefresh = useCallback(async () => {
    dispatch(setRefreshing(true));
    debouncedHandleSearch.flush();
    debouncedHandleSearch(searchTerm);
    dispatch(setRefreshing(false));
  }, [searchTerm]);

  useEffect(() => {
    if (!refreshing) {
      debouncedHandleSearch(searchTerm);
    }
  }, []);

  return {repositories, organizations, refreshing, handleRefresh};
};

export const useDebouncedHook = (searchTerm: string) => {
  const asyncDispatch: ThunkDispatch<AppState, void, AppAction> =
    useReduxDispatch();
  const debouncedSearch = useRef(
    debounce((text: string) => asyncDispatch(searchGithub(text)), 500),
  ).current;

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return debouncedSearch;
};
