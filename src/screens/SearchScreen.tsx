import React, {useState} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import {
  AppContainer,
  InputContainer,
  SectionView,
  StyledTabBar,
} from '../components/StyledComponents';
import SearchInput from '../components/SearchInput';
import RepositoryList from '../components/RepositoryList';
import OrganizationList from '../components/OrganizationList';
import {colors} from '../utils/Colors';

const SearchScreen = () => {
  const [index, setIndex] = useState(0);

  const routes = [
    {key: 'repositories', title: 'Repositories'},
    {key: 'organizations', title: 'Organizations'},
  ];

  const renderScene = SceneMap({
    repositories: RepositoryList,
    organizations: OrganizationList,
  });

  const renderTabBar = (props: any) => (
    <StyledTabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.white}}
      pressOpacity={1}
      pressColor={colors.background}
    />
  );

  return (
    <AppContainer>
      <InputContainer>
        <SearchInput />
      </InputContainer>
      <SectionView>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          removeClippedSubviews={true}
        />
      </SectionView>
    </AppContainer>
  );
};

export default SearchScreen;
