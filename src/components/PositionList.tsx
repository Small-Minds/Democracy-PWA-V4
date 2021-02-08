import React, { useEffect, useContext, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Col, FlexboxGrid, Icon, List } from 'rsuite';
import { ElectionDetails } from '../utils/api/ElectionManagement';

interface PLProps {
  election: ElectionDetails;
}

const PositionList: FC<PLProps> = ({ election }) => {
  return (
    <div>
      {election.positions.length !== 0 ? (
        <List>
          {election.positions.map((position, index) => (
            <List.Item>
              <FlexboxGrid align="middle" justify="space-around">
                <FlexboxGrid.Item componentClass={Col} colspan={24} sm={16}>
                  <h5>{position.title}</h5>
                  <p>{position.description}</p>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  componentClass={Col}
                  colspan={24}
                  sm={8}
                  style={{ paddingRight: 20, textAlign: 'right' }}
                >
                  <Link to={`/election/${election.id}`}>
                    {'Apply Now'}&nbsp;
                    <Icon icon="arrow-right-line" />
                  </Link>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
        </List>
      ) : (
          <FlexboxGrid>
            <p>No positions posted yet. Check back soon for updates.</p>
          </FlexboxGrid>
      )}
    </div>
  );
};

export default PositionList;
