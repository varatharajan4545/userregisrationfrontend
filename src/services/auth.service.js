import { apiUrls } from '../utils/properties';
import api,{Method} from '../utils/apiManager';


  const logIn = async (data) => {
    return new Promise((resolve, reject) => {
      api(Method.POST, { 'Content-Type': 'application/json' } , apiUrls.LOG_IN, '', data, '')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const logOut = async () => {
    return new Promise((resolve, reject) => {
      api(Method.POST, { 'Content-Type': 'application/json' } , apiUrls.LOG_OUT, '', '', '')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  

  export {
    logIn,
    logOut
  };