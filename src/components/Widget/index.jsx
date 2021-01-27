import styled from 'styled-components';

const borderRadius = '8px';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${borderRadius};
  overflow: hidden;
  box-shadow: 5px 5px 10px -3px rgba(0,0,0,0.5);

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2em 2em;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 1em;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.FormGame = styled.form`
  display: flex;
  justify-content: space-around;
`;

Widget.Input = styled.input.attrs((props) => ({
  type: 'text',
  // size: props.small ? 5 : 2,
}))`
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  /* display: block; */
  margin: 1em 0em;
  padding: 0.25em 1em;
  font-size: 1em;

  ::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

Widget.Button = styled.button`
  background-color: ${({ theme }) => theme.colors.altBg};
  font-size: 1em;
  margin: 1em 0em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  &:hover{
    box-shadow: 5px 5px 10px -3px rgba(0,0,0,0.5);
  }
`;

export default Widget;
