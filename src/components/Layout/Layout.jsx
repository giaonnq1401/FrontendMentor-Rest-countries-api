import Header from "components/Header";
import styled from "styled-components";

const LayoutStyled = styled.div`
  background-color: hsl(0, 0%, 98%);
  min-height: 100vh;
  padding: 0 80px;
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