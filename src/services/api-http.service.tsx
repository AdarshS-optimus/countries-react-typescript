import axios from 'axios';

class ApiHttpServiceComponent {
    staticUrl: string = 'https://restcountries.eu/rest/v2/';

    async getAllCountries() {
        const response = await axios({
            method: 'get',
            url: this.staticUrl + 'all'
          });
        return response.data; 
    };

    async getAllRegions() {
        const response = await axios({
            method: 'get',
            url: this.staticUrl + 'all?fields=region'
          });
        return response.data; 
    };

    async getCountriesByRegion(region: string) {
        const response = await axios({
            method: 'get',
            url: this.staticUrl + `region/${region}`
          });
        return response.data; 
    };

    async getCountryByAplha3Code(alpha3Code: string) {
        const response = await axios({
            method: 'get',
            url: this.staticUrl + `alpha/${alpha3Code}`
          });
        return response.data; 
    };
}

export default ApiHttpServiceComponent;