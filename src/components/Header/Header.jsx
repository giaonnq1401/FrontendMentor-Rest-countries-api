
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderStyled = styled.div`
  position: fixed;
  z-index: 99;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #1c233d;
  h1 {
    font-weight: 500;
    font-size: 25px;
    line-height: 32px;
    color: #e5e5e5;
  }
  li {
    display: inline-block;
    padding: 20px;
  }
  .nav-link {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    /* identical to box height */

    color: #e5e5e5;
  }

  @media (min-width: 992px) {
    height: 80px;
  }
  .connect-btn {
    margin-left: 12px;
    height: 50px;
    background: blue;
    border-radius: 5px;
    border: none;
    color: white;
  }
`;

const HeaderRightStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  .header-lg {
    display: none;
  }

  .header-small {
    display: flex;
  }

  @media (min-width: 992px) {
    .header-lg {
      display: flex;
      align-items: center;
    }
    .header-small {
      display: none;
    }
  }
`;


// eslint-disable-next-line arrow-body-style
const Header = () => {
  
  return (
    <HeaderStyled>
      <h1>Devestore</h1>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Explore
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            Marketplace
          </Link>
        </li>
        <li>
          <Link to="/view-product" className="nav-link">
            Artist
          </Link>
        </li>
        <li>
          <Link to="/collection" className="nav-link">
            Collection
          </Link>
        </li>
      </ul>
      <div className="header-search">
        <input type="text" placeholder="Search" className="input-search" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </HeaderStyled>
  );
};

export default Header;