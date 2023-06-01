import React, {memo} from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {
  Avatar,
  StarContainer,
  StarIcon,
  StarCount,
  ListItemTitle,
  DescriptionText,
  ListItem,
} from './StyledComponents';

interface RepositoryItemProps {
  owner: {avatar_url: string};
  url: string;
  stargazers_count: number;
  full_name: string;
  description: string;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({
  owner,
  url,
  stargazers_count,
  full_name,
  description,
}) => {
  const handleRepoPress = () => {
    Linking.openURL(url);
  };

  const formatStargazersCount = (count: number) => {
    if (count >= 1000) {
      const roundedCount = Math.floor(count / 100) / 10;
      return `${roundedCount}k`;
    }
    return count.toString();
  };

  return (
    <TouchableOpacity onPress={handleRepoPress}>
      <ListItem>
        <View>
          <Avatar source={{uri: owner.avatar_url}} />
          <StarContainer>
            <StarIcon name="star-o" size={16} color="white" />
            <StarCount>{formatStargazersCount(stargazers_count)}</StarCount>
          </StarContainer>
        </View>
        <View>
          <ListItemTitle numberOfLines={1}>{full_name}</ListItemTitle>
          <DescriptionText numberOfLines={2}>{description}</DescriptionText>
        </View>
      </ListItem>
    </TouchableOpacity>
  );
};

export default memo(RepositoryItem);
