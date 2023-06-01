import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import {Avatar, ListItem, TextListItem} from './StyledComponents';

interface OrganizationItemProps {
  login: string;
  avatar_url: string;
  url: string;
}

const OrganizationItem: React.FC<OrganizationItemProps> = ({
  login,
  avatar_url,
  url,
}) => {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ListItem>
        <Avatar source={{uri: avatar_url}} />
        <TextListItem>{login}</TextListItem>
      </ListItem>
    </TouchableOpacity>
  );
};

export default OrganizationItem;
