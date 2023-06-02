import React, {memo, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import RepositoryItem from './RepositoryItem';
import {RootState} from '../store/store';
import {Repository} from '../utils/types';
import {useDebouncedHook, useReduxSelector} from '../redux/hooks';
import ListEmptyComponent from './ListEmptyComponent';
import {strings} from '../utils/srtings';

const RepositoryList = () => {
  const searchTerm = useReduxSelector(
    (state: RootState) => state.search.searchTerm,
  );
  const {repositories, refreshing, handleSearch} = useDebouncedHook(searchTerm);

  useEffect(() => {}, [refreshing]);

  const renderItem = ({item}: {item: Repository}) => {
    return (
      <RepositoryItem
        owner={item.owner}
        url={item.url}
        stargazers_count={item.stargazers_count}
        full_name={item.full_name}
        description={item.description}
      />
    );
  };

  const keyExtractor = (item: Repository) => item.id.toString();

  return (
    <FlatList
      data={repositories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => handleSearch(searchTerm, true)}
          colors={['gray']}
          tintColor="gray"
        />
      }
      ListEmptyComponent={<ListEmptyComponent text={strings.emptyRepository} />}
    />
  );
};

export default memo(RepositoryList);
