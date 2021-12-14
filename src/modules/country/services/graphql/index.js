import { useQuery, useMutation } from '@apollo/client';
import {getCountryList,cancelNewsLetter} from '@core_modules/country/services/graphql/schema';

export const getCountriesList = () => useQuery(getCountryList);
export const cancelSubscribe = () => useMutation(cancelNewsLetter);

