import { RouteComponentProps } from 'react-router';

export interface CountryProfileProps extends RouteComponentProps<{ alpha3Code:string }> { }

export interface CountryProfileState {
    name: string;
    nativeName: string;
    capital: string;
    region: string;
    population: number;
    area: string;
    currencies: string[];
    languages: string[];
    borders: string[];
    flag: string;
}