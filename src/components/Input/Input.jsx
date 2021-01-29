import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input.attrs(() => ({
  type: 'text',
  // size: props.small ? 5 : 2,
}))`
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  /* display: block; */
  margin: 1em 0em;
  padding: 0.25em 1em;
  font-size: 1em;
  background-color: ${({ theme }) => theme.colors.secondaryLight};

  ::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Input = ({ onChange, placeholder, ...props }) => (
  <>
    <InputBase
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  </>
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
};

export default Input;
