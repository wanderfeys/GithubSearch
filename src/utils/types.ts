export interface Repository {
  id: number;
  full_name: string;
  description: string;
  url: string;
  stargazers_count: number;
  owner: {
    avatar_url: string;
  };
}

export interface SearchState {
  searchTerm: string;
  repositories: Repository[];
  organizations: Organization[];
  searchHistory: string[];
  error: string | null | undefined;
  refreshing: boolean;
}

export interface Organization {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
}

export interface AppState {
  searchTerm: string;
  repositories: Repository[];
  organizations: Organization[];
  searchHistory: string[];
}

export interface SetSearchTermAction {
  type: 'SET_SEARCH_TERM';
  payload: string;
}

export interface SetRepositoriesAction {
  type: 'SET_REPOSITORIES';
  payload: Repository[];
}

export interface SetOrganizationsAction {
  type: 'SET_ORGANIZATIONS';
  payload: Organization[];
}

export interface AddToHistoryAction {
  type: 'ADD_TO_HISTORY';
  payload: string;
}

export type AppAction =
  | SetSearchTermAction
  | SetRepositoriesAction
  | SetOrganizationsAction
  | AddToHistoryAction;
