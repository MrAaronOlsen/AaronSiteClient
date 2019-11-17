const dev = 'http://localhost:8080/'
const prod = 'https://aaron-site-api.herokuapp.com/'

var envUrl = dev;

if (process.env.NODE_ENV === 'production') {
  envUrl = prod;
}

console.log("[INFO] Using API url " + envUrl);

export const BASE_URL = envUrl;
export const API_V1 = 'aaron_site/api/v1/';
export const CLIENT_URL = '"https://aaron-site.herokuapp.com/"'