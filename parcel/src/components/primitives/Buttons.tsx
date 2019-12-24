import styled from "styled-components";

export const Button = styled.button`
  border: 2px solid var(--secondary-500);
  padding: 5px 10px;
  color: var(--secondary-500);
  background: transparent;
  border-radius: 4px;
  /* font-size: 0.8rem; */
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  &:disabled {
    background: var(--grey-100);
    border-color: var(--grey-500);
    color: var(--grey-500);
    cursor: default;
    &:hover {
      color: var(--grey-500);
      background: var(--grey-100);
      border-color: var(--grey-500);
    }
  }
`;

export const SaveButton = styled(Button)`
  padding: 10px;
  /* border-color: var(--secondary-200);
background: var(--secondary-400); */
  &:hover {
    border-color: var(--primary-500);
    color: var(--primary-500);
  }
  box-sizing: border-box;
  margin: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
`;
