import AsyncStorage from '@react-native-async-storage/async-storage';

const SEARCH_HISTORY_KEY = 'searchHistory';

export const saveSearchHistory = async (searchHistory: string[]) => {
  try {
    await AsyncStorage.setItem(
      SEARCH_HISTORY_KEY,
      JSON.stringify(searchHistory),
    );
  } catch (error) {
    console.log('Error saving search history:', error);
  }
};

export const loadSearchHistory = async () => {
  try {
    const searchHistoryJSON = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
    return searchHistoryJSON ? JSON.parse(searchHistoryJSON) : [];
  } catch (error) {
    console.log('Error loading search history:', error);
    return [];
  }
};
