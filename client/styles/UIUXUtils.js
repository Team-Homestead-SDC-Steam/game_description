import styled from 'styled-components';

export const Label = styled.div`
  #${props => props.theme.rootId} & {
    text-transform: uppercase;
    font-size: 10px;
    padding-right: 10px;
    width: 94px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;
