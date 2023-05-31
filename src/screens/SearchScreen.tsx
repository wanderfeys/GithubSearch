import React from 'react';
import {
  AppContainer,
  InputContainer,
  SectionView,
  SectionHeader,
  SectionSpacing,
} from '../components/StyledComponents';
import SearchInput from '../components/SearchInput';
import RepositoryList from '../components/RepositoryList';
import OrganizationList from '../components/OrganizationList';

const SearchScreen = () => {
  return (
    <AppContainer>
      <InputContainer>
        <SearchInput />
      </InputContainer>
      <SectionView>
        <SectionHeader>Repositories:</SectionHeader>
        <RepositoryList />
      </SectionView>
      <SectionSpacing />
      <SectionView>
        <SectionHeader>Organizations:</SectionHeader>
        <OrganizationList />
      </SectionView>
    </AppContainer>
  );
};

export default SearchScreen;
