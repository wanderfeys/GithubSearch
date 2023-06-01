import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions, FlatList} from 'react-native';
import {colors} from '../utils/Colors';
import {TabBar} from 'react-native-tab-view';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const AppContainer = styled.View`
  background-color: ${colors.background};
  height: ${height}px;
  width: ${width}px;
  padding: 5px;
`;

export const Input = styled.TextInput`
  height: 40px;
  border: 2px solid ${colors.border};
  padding: 10px;
  border-radius: 15px;
  color: ${colors.white};
`;

export const SectionHeader = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${colors.textPrimary};
  padding-bottom: 10px;
`;

export const TextListItem = styled.Text`
  font-size: 16px;
  color: ${colors.white};
  padding-bottom: 10px;
`;

export const DescriptionText = styled.Text`
  font-size: 16px;
  color: ${colors.white};
  padding-bottom: 10px;
  width: ${width - 120}px;
`;

export const TitleListItem = styled.Text`
  font-size: 16px;
  color: ${colors.textTitle};
  padding-bottom: 10px;
  width: ${width - 120}px;
`;

export const ListItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${width - 120}px;
`;

export const ListItemTitle = styled(TitleListItem)``;

export const StarContainer = styled.View`
  flex-direction: row;
  padding-horizontal: 2px;
  padding-top: 5px;
`;

export const StarIcon = styled(Icon)`
  padding-horizontal: 2px;
`;

export const StarCount = styled.Text`
  font-size: 12px;
  color: ${colors.white};
`;

export const ListItem = styled.View`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
`;

export const InputContainer = styled.View`
  padding: 10px;
  z-index: 1;
  height: 10%;
`;

export const SectionView = styled.View`
  padding-horizontal: 15px;
  height: ${height}px;
`;

export const ContainerView = styled.View`
  justify-content: center;
  height: 250px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

export const SectionSpacing = styled.View`
  height: 10px;
`;

export const SearchHistoryView = styled.View`
  position: absolute;
  padding-top: 50px;
  left: 10px;
  right: 10px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const StyledFlatList = styled.FlatList`
  border-radius: 15px;
` as unknown as typeof FlatList;

export const SearchTermContainer = styled.View`
  background-color: ${colors.listItemBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  padding-vertical: 10px;
  padding-horizontal: 16px;
`;

export const SearchTermText = styled.Text`
  font-size: 16px;
  color: ${colors.white};
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${colors.listItemEmptyText};
  align-self: center;
  margin-top: 20px;
`;

export const StyledTabBar = styled(TabBar)`
  background-color: ${colors.background};
  elevation: 0;
  shadow-opacity: 0;
  border-radius: 0;
`;
