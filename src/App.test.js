import axios from 'axios'
import getTokenBody from './getToken.json'

export function fetchToken() {
  
    //Get 
  
      return axios.post
      (
          'https://ss.prestoapi.com/api/login',
          getTokenBody,
      )
      .then(res => res.data.token)

}