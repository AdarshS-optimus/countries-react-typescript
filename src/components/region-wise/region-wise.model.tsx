import { RouteComponentProps } from 'react-router';

export interface RegionWiseProps extends RouteComponentProps<{ region:string }> { }

export interface RegionWiseState {
    countries: any[];
    searchTerm: string;
}