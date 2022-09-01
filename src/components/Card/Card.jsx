import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 260px;
    height: 335px;
    background-color: hsl(0, 0%, 100%);
    border-radius: 5px;
    
    &:hover {
        cursor: pointer;
        transform: translate(0, -10px);
    }

    & a {
        text-decoration: none;
    }
`;

const Flag = styled.img`
    width: 100%;
    height: 158px;
`;

const Content = styled.div`
    padding-left: 24px;
`;

const Country = styled.h2`
    font-weight: 800;
    font-size: 16px;
`

const Description = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    margin: 8px 0;

    && h3 {
        font-size: 14px;
        font-weight: 600;
        margin: 0;
    }

    && span {
        font-size: 14px;
        font-weight: 300;
    }
`
const Card = ({ to, flag, country, population, region, capital }) => {
    return (
        <Container>
            <NavLink to={to}>
                <Flag
                src= {flag}
                alt=""/>
                <Content>
                    <Country>{country}</Country>
                    <Description>
                        <h3>Population:</h3>
                        <span>{population}</span>
                    </Description>
                    <Description>
                        <h3>Region:</h3>
                        <span>{region}</span>
                    </Description>
                    <Description>
                        <h3>Capital:</h3>
                        <span>{capital}</span>
                    </Description>
                </Content>
            </NavLink>
        </Container>
    );
}

export default Card;