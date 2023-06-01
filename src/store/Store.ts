import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import searchReducer, {addToHistory} from '../redux/searchSlice';
import {
  loadSearchHistory,
  saveSearchHistory,
} from '../redux/searchHistoryPersistence';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: [thunk],
});

loadSearchHistory().then(persistedSearchHistory => {
  persistedSearchHistory.forEach((searchTerm: string) => {
    store.dispatch(addToHistory(searchTerm));
  });
});

store.subscribe(() => {
  const searchHistory = store.getState().search.searchHistory;
  saveSearchHistory(searchHistory);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
