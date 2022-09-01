import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "components/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const BackButton = styled.button`
    background-color: var(--dark-text-light-element);
    border: 1px solid var(--light-mode-input);
    width: 135px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    &:hover {
        cursor: pointer;
        background-color: var(--light-mode-input);
        color: var(--dark-text-light-element);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Flag = styled.img`
    width: 558px;
    height: 403px;
`
const Content = styled.div`
    display: grid;
    grid-template-rows: auto 140px auto;
    align-items: center;
    width: 575px;
`
const Detail = styled.div`
    display: flex;
    flex-direction: row;
    gap: 115px;
`;

const DetailBlock = styled.div`
    
`

const Description = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    margin: 8px 0;

    && h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
    }

    && span {
        font-size: 16px;
        font-weight: 300;
    }
`
const CountryDetail = () => {
    const { code } = useParams();
    const [countryDetail, setCountryDetail] = useState({});
    // console.log(code);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then((res) => res.json())
        .then((data) => setCountryDetail(data));
    }, [code]);

    console.log(countryDetail)

    return (
        <Layout>
            <BackButton>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
            </BackButton>

            <Container>
                <Flag src={countryDetail[0]?.flags?.svg} alt=""/>

                <Content>
                    <h2>{countryDetail[0]?.name?.common}</h2>
                    <Detail>
                        <DetailBlock>
                            <Description>
                                <h3>Official Name:</h3>
                                <span>{countryDetail[0]?.name?.official}</span>
                            </Description>
                            <Description>
                                <h3>Population:</h3>
                                <span>{countryDetail[0]?.population}</span>
                            </Description>
                            <Description>
                                <h3>Region:</h3>
                                <span>{countryDetail[0]?.region}</span>
                            </Description>
                            <Description>
                                <h3>Sub Region:</h3>
                                <span>{countryDetail[0]?.subregion}</span>
                            </Description>
                            <Description>
                                <h3>Capital:</h3>
                                <span>{countryDetail[0]?.capital}</span>
                            </Description>
                        </DetailBlock>

                        <DetailBlock>
                            <Description>
                                <h3>Top Level Domain:</h3>
                                <span>{countryDetail[0]?.tld}</span>
                            </Description>
                            <Description>
                                <h3>Currencies:</h3>
                                {/* <span>{countryDetail[0]?.currencies}</span> */}
                            </Description>
                            <Description>
                                <h3>Languages:</h3>
                                <span>{countryDetail[0]?.capital}</span>
                            </Description>
                        </DetailBlock>
                    </Detail>
                </Content>
            </Container>

        </Layout>
    );
}

export default CountryDetail;