import { HttpError, getAPI } from './fetch';

export interface ICountryName {
  common: string;
  official: string;
}

export interface ICountry {
  name: ICountryName;
  population: number;
  region: string;
  capital: string;
}

export interface ICountryResponse {
  currentList: ICountry[] | [];
}

export const getCountryList = async () => {
  try {
    const res = await getAPI('/v3.1/all');
    console.log(res);
    return res;
  } catch (error) {
    throw error as HttpError;
  }
};
