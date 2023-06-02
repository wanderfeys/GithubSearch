import React, {memo, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {RootState} from '../store/store';
import {Organization} from '../utils/types';
import OrganizationItem from './OrganizationItem';
import {useDebouncedHook, useReduxSelector} from '../redux/hooks';
import {strings} from '../utils/srtings';
import ListEmptyComponent from './ListEmptyComponent';

const OrganizationList = () => {
  const searchTerm = useReduxSelector(
    (state: RootState) => state.search.searchTerm,
  );
  const {organizations, refreshing, handleSearch} =
    useDebouncedHook(searchTerm);

  useEffect(() => {}, [refreshing]);

  const renderItem = ({item}: {item: Organization}) => {
    return (
      <OrganizationItem
        url={item.url}
        avatar_url={item.avatar_url}
        login={item.login}
      />
    );
  };

  const keyExtractor = (item: Organization) => item.id.toString();

  return (
    <FlatList
      data={organizations}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => handleSearch(searchTerm, true)}
          colors={['gray']}
          tintColor="gray"
        />
      }
      ListEmptyComponent={
        <ListEmptyComponent text={strings.emptyOrganization} />
      }
    />
  );
};

export default memo(OrganizationList);
