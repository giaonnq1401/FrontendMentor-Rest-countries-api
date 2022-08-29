import Header from "components/Header";
import styled from "styled-components";

const LayoutStyled = styled.div`
  background-color: #1c233d;
`;

const PrimaryLayout = ({ children }) => {
  return (
      <>
      <Header />
      <LayoutStyled>{children}</LayoutStyled>
      </>
  );
};

export default PrimaryLayout;