import SpotifyWebApi from 'spotify-web-api-node';

const {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
} = process.env

const SCOPE = ['user-read-recently-played', 'playlist-modify-public']

const api = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
})

const getAuthorizeUrl = () => {
    return api.createAuthorizeURL(SCOPE, "PRUEBA");
};

const authorize = async (code: any) => {
    try {
        const data = await api.authorizationCodeGrant(code); 
        const { access_token, refresh_token } = data.body;
        api.setAccessToken(access_token);
        api.setRefreshToken(refresh_token);
        return { accessToken: access_token, refreshToken: refresh_token };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getRecentlyPlayed = async (limit = 10) => {
    const response = await api.getMyRecentlyPlayedTracks({ limit });
    return response.body.items;
};

export const refreshAccessToken = async () => {
    try {
        const data = await api.refreshAccessToken();
        const newAccessToken = data.body["access_token"];
        console.log("Nuevo access token:", newAccessToken);

        // Actualiza el access token de la API de Spotify
        api.setAccessToken(newAccessToken);
    } catch (error) {
        console.error("No se pudo renovar el access token:", error);
    }
}

export default {
    api,
    getAuthorizeUrl,
    authorize,
    getRecentlyPlayed,
    refreshAccessToken
}