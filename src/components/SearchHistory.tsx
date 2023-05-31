import React from 'react';
import {useAppSelector} from '../redux/Hooks';
import {RootState} from '../store/Store';
import {
  Container,
  EmptyText,
  SearchTermContainer,
  SearchTermText,
  StyledFlatList,
} from './StyledComponents';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

interface SearchHistoryProps {
  onPressItem: (searchTerm: string) => void;
}
const SearchHistory: React.FC<SearchHistoryProps> = ({onPressItem}) => {
  const searchHistory = useAppSelector(
    (state: RootState) => state.search.searchHistory,
  );

  const renderSearchTerm = ({item}: {item: string}) => {
    return (
      <TouchableWithoutFeedback onPress={() => onPressItem(item)}>
        <SearchTermContainer>
          <SearchTermText>{item}</SearchTermText>
        </SearchTermContainer>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container>
        <StyledFlatList
          keyboardShouldPersistTaps={'always'}
          data={searchHistory}
          renderItem={renderSearchTerm}
          keyExtractor={(item: any, index: {toString: () => any}) =>
            index.toString()
          }
          ListEmptyComponent={
            <SearchTermContainer>
              <EmptyText>No search history</EmptyText>
            </SearchTermContainer>
          }
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SearchHistory;
