import React, {memo} from 'react';
import {FlatList} from 'react-native';
import RepositoryItem from './RepositoryItem';
import {RootState} from '../store/Store';
import {Repository} from '../utils/Types';
import {ContainerView, EmptyText} from './StyledComponents';
import {useReduxSelector} from '../redux/Hooks';

const RepositoryList = () => {
  const repositories = useReduxSelector(
    (state: RootState) => state.search.repositories,
  );

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
      ListEmptyComponent={
        <ContainerView>
          <EmptyText>No repositories found</EmptyText>
        </ContainerView>
      }
    />
  );
};

export default memo(RepositoryList);
