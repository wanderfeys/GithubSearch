import React, {memo} from 'react';
import {FlatList} from 'react-native';
import RepositoryItem from './RepositoryItem';
import {useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import {Repository} from '../types/Types';

const RepositoryList = () => {
  const repositories = useSelector(
    (state: RootState) => state.search.repositories,
  );

  const renderItem = ({item}: {item: Repository}) => {
    return <RepositoryItem item={item} />;
  };

  const keyExtractor = (item: Repository) => item.id.toString();

  return (
    <FlatList
      data={repositories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default memo(RepositoryList);
