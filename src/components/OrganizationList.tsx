import React, {memo} from 'react';
import {FlatList} from 'react-native';
import {RootState} from '../store/store';
import {Organization} from '../utils/types';
import OrganizationItem from './OrganizationItem';
import {ContainerView, EmptyText} from './StyledComponents';
import {useReduxSelector} from '../redux/hooks';

const OrganizationList = () => {
  const organizations = useReduxSelector(
    (state: RootState) => state.search.organizations,
  );

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
      ListEmptyComponent={
        <ContainerView>
          <EmptyText>No organization found</EmptyText>
        </ContainerView>
      }
      renderItem={renderItem}
    />
  );
};

export default memo(OrganizationList);
