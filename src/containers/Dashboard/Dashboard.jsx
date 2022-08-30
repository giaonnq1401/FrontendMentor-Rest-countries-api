import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Card from "components/Card";


const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 55px;
  margin-bottom: 50px;
`;

const SearchStyle = styled.div `
  width: 478px;
  height: 53px;
  padding: 0 34px;
  background-color: hsl(0, 0%, 100%);
  display: flex;
  align-items: center;
  gap: 25px;
`;

const Input = styled.input`
  border: none;
  width: 360px;
  color: hsl(0, 0%, 52%);

  && ::placeholder {
    color: hsl(0, 0%, 52%);
  }

  && :active {
    border: none;
  }
`;

const SelectOption = styled.select`
  width: 197px;
  height: 53px;
`

const regionList = [
  "Africa",
  "America",
  "Asia",
  "Europe",
  "Ocearia"
];

const Content = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  row-gap: 74px;
  justify-content: space-between;
`;


const Dashboard = () => {

  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => setCountriesList(data));
  })

  return (
    <Layout>
      <Menu>
        <SearchStyle>
          <FontAwesomeIcon icon={ faMagnifyingGlass } color={"hsl(0, 0%, 52%)"}/>
          <Input placeholder="Search for a country..."></Input>
        </SearchStyle>
        
        <SelectOption>
          {regionList.map((region) => {
            return(
              <option key={region}>{region}</option>
            )
          })}
        </SelectOption>
      </Menu>

      <Content>
        {countriesList.map((country) => {
          return(
            <Card to={"/"}
              flag={country.flags.svg}
              country={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          )
        })}
      </Content>
    </Layout>
  );
};

export default Dashboard;