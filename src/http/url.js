const dev = 'http://localhost:8080/'
const prod = 'https://aaron-site-api.herokuapp.com/'

var envUrl;

if (process.env.NODE_ENV === 'production') {
  envUrl = prod;
} else {
  envUrl = dev;
}

console.log("[INFO] Using url " + envUrl);

export const BASE_URL = envUrl;
export const API_V1 = 'aaron_site/api/v1/';