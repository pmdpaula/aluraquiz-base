import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  font-size: 1em;
  margin: 1em 0em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  &:hover{
    box-shadow: 5px 5px 10px -3px rgba(0,0,0,0.5);
  }
`;

export default Button;
