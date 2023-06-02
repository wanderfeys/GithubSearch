import React from 'react';
import {ContainerView, EmptyText} from './StyledComponents';

const ListEmptyComponent = ({text}: {text: string}) => {
  return (
    <ContainerView>
      <EmptyText>{text}</EmptyText>
    </ContainerView>
  );
};

export default ListEmptyComponent;
