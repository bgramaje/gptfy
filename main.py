import spotipy
import os

from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

# load env file
load_dotenv()

# Define los parámetros de autenticación de la API de Spotify
client_credentials_manager = SpotifyClientCredentials(
    client_id=os.environ.get('CLIENT_ID'),
    client_secret=os.environ.get('CLIENT_SECRET'),
)

# Crea un objeto de la clase Spotipy
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Usa el objeto de la clase Spotipy para acceder a los recursos públicos de la API de Spotify
# resultados = sp.search(q="artist:'Michael Jackson'", type='artist')

# # Imprime los resultados
# print(resultados)