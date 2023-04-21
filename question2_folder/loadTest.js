const axios = require('axios');

const requestInterval = 1000; //

function sendRequest() {
  axios.get('http://localhost:5000/eptwo')
    .then(response => {
      console.log(`Success. Response data: ${JSON.stringify(response.data)}`);
    })
    .catch(error => {
      console.log(`Request failed. Error: ${error.message}`);
    });
}

setInterval(sendRequest, requestInterval);
