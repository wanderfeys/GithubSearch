import React, {memo} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import {Organization} from '../types/Types';
import OrganizationItem from './OrganizationItem';
import {ContainerView, EmptyText} from './StyledComponents';

const OrganizationList = () => {
  const organizations = useSelector(
    (state: RootState) => state.search.organizations,
  );

  const renderItem = ({item}: {item: Organization}) => {
    return <OrganizationItem item={item} />;
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
