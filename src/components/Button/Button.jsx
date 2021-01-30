import PropTypes from 'prop-types';

import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  color: ${({ theme }) => theme.colors.contrastText};

  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  width: 100%;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: 5px 5px 10px -3px rgba(0,0,0,0.5);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.divider};
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};


export default Button;
