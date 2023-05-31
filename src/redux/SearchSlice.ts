import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Organization, Repository, SearchState} from '../types/Types';

const initialState: SearchState = {
  searchTerm: '',
  repositories: [],
  organizations: [],
  searchHistory: [],
  error: null,
};

export const searchGithub = createAsyncThunk(
  'search/searchGithub',
  async (searchTerm: string, {dispatch}) => {
    try {
      const repositoryResponse = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm}`,
      );
      const repositoryData = await repositoryResponse.json();
      const repositories: Repository[] = repositoryData.items.map(
        (item: any) => {
          return {
            id: item.id,
            full_name: item.name,
            description: item.description,
            owner: item.owner,
            url: item.html_url,
            stargazers_count: item.stargazers_count,
          };
        },
      );

      dispatch(setRepositories(repositories));
    } catch (error: any) {
      dispatch(searchError(error.message));
    }
    try {
      const organizationResponse = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&type=org`,
      );
      const organizationData = await organizationResponse.json();
      const organizations: Organization[] = organizationData.items.map(
        (item: any) => {
          return {
            id: item.id,
            login: item.login,
            avatar_url: item.avatar_url,
            url: item.html_url,
          };
        },
      );

      dispatch(setOrganizations(organizations));
    } catch (error: any) {
      dispatch(searchError(error.message));
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setRepositories: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload;
    },
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload;
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload;
      if (state.searchHistory.length >= 5) {
        state.searchHistory.pop();
      }
      state.searchHistory.unshift(searchTerm);
    },
    searchError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setRepositories,
  setOrganizations,
  addToHistory,
  searchError,
} = searchSlice.actions;

export default searchSlice.reducer;
