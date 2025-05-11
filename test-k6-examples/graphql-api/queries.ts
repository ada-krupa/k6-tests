import { GetCountriesInput } from './types.ts'

export const getCountriesQuery = (filters: GetCountriesInput) => {
    const { name } = filters

    return {
        query: `
            query getCountries($name: String!) {
                countries(filter: {name: {eq: $name}}) {
                    code
                    name
                    capital
                    currency
                }
            }
        `,
        variables: {
            name
        }
    }
}
