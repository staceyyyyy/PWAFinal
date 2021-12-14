import { gql } from '@apollo/client';

export const getCountryList = gql`
query{
  countries{
    full_name_english
    full_name_locale
    id
    three_letter_abbreviation
    two_letter_abbreviation
  }
}`

export const cancelNewsLetter = gql`
mutation unSubscribe($email:String){
    unSubscribe(input: {email:$email}){
      status{
        message,
        response
      }
    }
}`
