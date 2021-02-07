import React from 'react';
import { FlexboxGrid, Loader } from 'rsuite';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';

function Loading() {
  return (
    <React.Fragment>
      <FlexboxGrid align="middle" justify="center" style={{ height: '90vh' }}>
        <FlexboxGridItem>
          <Loader size="lg" speed="slow" vertical />
        </FlexboxGridItem>
      </FlexboxGrid>
    </React.Fragment>
  );
}

export default Loading;
