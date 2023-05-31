import React, {memo} from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {Repository} from '../types/Types';
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
  item: Repository;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({item}) => {
  const handleRepoPress = () => {
    Linking.openURL(item.url);
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
          <Avatar source={{uri: item.owner?.avatar_url}} />
          <StarContainer>
            <StarIcon name="star-o" size={16} color="white" />
            <StarCount>
              {formatStargazersCount(item.stargazers_count)}
            </StarCount>
          </StarContainer>
        </View>
        <View>
          <ListItemTitle numberOfLines={1}>{item.full_name}</ListItemTitle>
          <DescriptionText numberOfLines={2}>
            {item.description}
          </DescriptionText>
        </View>
      </ListItem>
    </TouchableOpacity>
  );
};

export default memo(RepositoryItem);
