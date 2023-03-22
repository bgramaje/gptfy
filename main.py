import spotipy
import openai
import os
import sys

from datetime import datetime, timedelta
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

# load env file
load_dotenv()

# api_key from env variable
openai.api_key = os.environ.get('OPENAI_KEY')

# spotify api authenticator
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=os.environ.get('CLIENT_ID'),
    client_secret=os.environ.get('CLIENT_SECRET'),
    redirect_uri=os.environ.get('REDIRECT_URI'),
    scope=os.environ.get('SCOPE'),
))

# date from today substracted a month
start_date = datetime.now() - timedelta(days=30)
# convert date into format ISO string
start_date_iso = start_date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
print(f"[spotipy]: Obtaining last recently played sonfs after {start_date_iso}")

# get recent tracks played after provided date
tracks = sp.current_user_recently_played(after=start_date_iso, limit=50)
print(f"[spotipy]: Founded {len(tracks)} tracks that has been recently played since {start_date_iso}")

# pre-training chatgpt open-ai
messages = [
    {
      'role': 'system',
      'content': 'Asume que eres un recomendador de canciones de spotify, responde con código python únicamente con una array con el nombre de canciones que recomiendas'
    },
    { 
     'role': 'user', 
     'content': 'Genera una playlist nueva con música nueva a partir de estas canciones: Nandemonaiya - movie ver, Zenzenzense - movie ver, Nandemonaiya - movie edit, Date, Dream lantern' 
    },
    { 
     'role': 'assistant', 
     'content': '["Sparkle - Original Version", "Katawaredoki", "Theme of Mitsuha", "Dream Lantern (From Kimi No Nawa)- Guitar Instrumental"]\ninfo:Playlist generada a partir de las canciones facilitadas' 
    },
]

# generate message given by the tracks of spotify
message = 'Genera una playlist nueva con música nueva a partir de estas canciones: '
for track in tracks['items']:
    message += f'{track["track"]["name"]}, '
    
# append final-message to array
messages.append({
    'role': 'user',
    'content': message
})

# generate respone from all the messages provided
response = openai.ChatCompletion.create(
    model='gpt-3.5-turbo',
    messages = messages,
    stop=['info']
)
try: 
    # TODO: Clean string with accents and double/single quotes that can appear in the track_name
    # obtain new_tracks
    new_tracks = eval(response.choices[0].message['content'])
    print(f"[openai]: Founded {len(new_tracks)} tracks to be added")
    
    # transform track_name into track_id
    track_ids = [f'spotify:track:{sp.search(q=track, limit=1, type="track")["tracks"]["items"][0]["id"]}' for track in new_tracks] 
    
    # create new playlist
    playlist = sp.user_playlist_create(user=sp.current_user()['id'], name='gptfy-ai-list', public=True)   
    print(f"[spotipy]: Creating new playlist '{playlist['id']}' into spotify")
    
    # add provided chatgpt songs into playlist
    sp.playlist_add_items(playlist_id=playlist['id'], items=track_ids)
    print(f"[spotipy]: Tracks provided by ChatGTP added succesfully into the playlist '{playlist['id']}'")
except Exception as e:
    print(e)
    sys.exit(0)
    
