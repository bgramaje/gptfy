import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
const Buffer = require('buffer').Buffer;

// SERVER SIDE

// GET
export async function loader(params) {
  const clientId = 'a360ad27d0fa46d6bf0a8cb8614c3509';
  const clientSecret = '2c0b60ae14a74867b9548fffe6ad060a';

  const tokenResp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
    },
    form: JSON.stringify({ grant_type: 'client_credentials' })
  });

  console.log(tokenResp.body.access_token)

  // if (tokenResp.statusCode === 200) {
  //   var token = tokenResp.body.access_token;

  //   const authResp = await fetch("https://api.spotify.com/v1/users/ment", {
  //     method: "GET",
  //     headers: {
  //       'Authorization': 'Bearer ' + token
  //     },
  //   });

  //   console.log(authResp)
  // }

  return tokenResp;
}

async function loginSpotify() { // TODO: ver porque no las coge del .env

}

// Resto de operaciones
export const action = async (request) => {
  console.log(request.params)
  switch (request.method) {
    case "POST": {
      /* handle "POST" */
    }
  }
};

// UI 
export default async function Spotify() {
  const posts = await useLoaderData();

  return (
    <div>
      <h1> SPOTIFY ROUTE</h1>
      <div>
        <button onClick={loginSpotify}>Login spotify</button>
      </div>
    </div>
  );
}