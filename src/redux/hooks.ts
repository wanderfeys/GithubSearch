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
export const useDebouncedHook = (searchTerm: string) => {
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
  const asyncDispatch: ThunkDispatch<AppState, void, AppAction> =
    useReduxDispatch();

  const debouncedSearch = useRef(
    debounce((text: string, refresh: boolean) => {
      if (refresh) {
        dispatch(setRefreshing(true));
      }

      asyncDispatch(searchGithub(text)).then(() => {
        if (refresh) {
          dispatch(setRefreshing(false));
        }
      });
    }, 500),
  ).current;

  useEffect(() => {
    debouncedSearch(searchTerm, false);
  }, []);

  const handleSearch = useCallback((text = searchTerm, isRefresh = false) => {
    debouncedSearch(text, isRefresh);
    if (isRefresh) {
      debouncedSearch(searchTerm, isRefresh);
    }
  }, []);

  return {repositories, organizations, refreshing, handleSearch};
};
