import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Index() {
  //TODO: Todas estas constantes estan en el .env, ver como cogerlas
  const SPOTIFY_CLIENT_ID = '';
  const SPOTIFY_REDIRECT_URI = 'http://localhost:3000';
  const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const SPOTIFY_RESPONSE_TYPE = 'token';

  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);

    if (token){
      navigate('/recommender');
    }

  }, []);

  return (
    <div>
      <h1> SPOTIFY ROUTE</h1>
      <div>
      <a href={`${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&response_type=${SPOTIFY_RESPONSE_TYPE}`}>
        Login to Spotify
      </a>
      </div>
    </div>
  );
}
