import spotipy
import os
from datetime import datetime, timedelta
from spotipy.oauth2 import SpotifyOAuth

from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

# load env file
load_dotenv()

# # Define los parámetros de autenticación de la API de Spotify
# client_credentials_manager = SpotifyClientCredentials(
#     client_id=os.environ.get('CLIENT_ID'),
#     client_secret=os.environ.get('CLIENT_SECRET'),
# )

# # Crea un objeto de la clase Spotipy
# sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Usa el objeto de la clase Spotipy para acceder a los recursos públicos de la API de Spotify
# resultados = sp.search(q="artist:'Michael Jackson'", type='artist')

# # Imprime los resultados
# print(resultados)

# Autenticar la aplicación en la API de Spotify
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=os.environ.get('CLIENT_ID'),
    client_secret=os.environ.get('CLIENT_SECRET'),
    redirect_uri='http://localhost:3000',
    scope="user-read-recently-played"
))

# Definir la fecha de inicio y fin del período de tiempo que quieres consultar
end_date = datetime.now()
start_date = end_date - timedelta(days=30)

# Convertir las fechas a formato ISO para la solicitud a la API de Spotify
start_date_iso = start_date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
end_date_iso = end_date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

# Obtener las canciones que has escuchado en el período de tiempo especificado
results = sp.current_user_recently_played(
    after=start_date_iso, before=end_date_iso)

# Iterar sobre la lista de canciones y obtener información relevante
for item in results['items']:
    track = item['track']
    print(track['name'], '-', track['artists'][0]['name'])
