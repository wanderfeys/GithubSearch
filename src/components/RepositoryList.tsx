import React, {memo} from 'react';
import {FlatList} from 'react-native';
import RepositoryItem from './RepositoryItem';
import {useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import {Repository} from '../utils/Types';
import {ContainerView, EmptyText} from './StyledComponents';

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
      ListEmptyComponent={
        <ContainerView>
          <EmptyText>No repositories found</EmptyText>
        </ContainerView>
      }
    />
  );
};

export default memo(RepositoryList);
