import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import {Organization} from '../types/Types';
import {Avatar, ListItem, TextListItem} from './StyledComponents';

interface OrganizationItemProps {
  item: Organization;
}

const OrganizationItem: React.FC<OrganizationItemProps> = ({item}) => {
  const handlePress = () => {
    Linking.openURL(item.url);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ListItem>
        <Avatar source={{uri: item.avatar_url}} />
        <TextListItem>{item.login}</TextListItem>
      </ListItem>
    </TouchableOpacity>
  );
};

export default OrganizationItem;
