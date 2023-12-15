import { apiUrls } from "../utils/properties";
import api, { Method } from '../utils/apiManager';
const registerUser = async (data) => {
    return new Promise((resolve, reject) => {
      api(Method.POST, { 'Content-Type': 'application/json' } , apiUrls.USER, '', data, '')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };




  export {
    registerUser
  };