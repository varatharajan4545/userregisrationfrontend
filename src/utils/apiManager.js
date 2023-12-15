import Cookies from 'universal-cookie';
import { apiUrls } from './properties';
import axios from 'axios';
export const Method = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete'
};

function addParamsToURL(url, params) {
  if (params) {
    let temp = url;
    temp = temp + '/' + params;
    return temp;
  }
  return url;
}

const getHeaders = async (token, adHeaders) => {
  const cookies = new Cookies();
  let validToken;
  if (cookies.get('token')) {
    validToken = await cookies.get('token');
  } 

  if (token !== null) {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${validToken}`,
        'Access-Control-Allow-Origin': '*',
        ...adHeaders
      }
    };
  } else {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...adHeaders
      }
    };
  }
};

export default async function api(
  method,
  header,
  endPoint,
  token,
  body,
  params
) {
  let customURL = addParamsToURL(apiUrls.BASEURL + endPoint, params);
  let headers = await getHeaders(token, header === null ? {} : header);

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: customURL,
      data: body === '' ? undefined : JSON.stringify(body),
      headers: headers.headers
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error.response);
      });
  });
}
