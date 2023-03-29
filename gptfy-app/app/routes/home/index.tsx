import React, { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { redirect, useNavigate } from "react-router";

import utilfy from "~/utils/spotify";
import openai from "~/utils/openai";

import useStore from "~/hooks/store";

import LogoutButton from "~/components/LogoutButton";
import Loader from "~/components/Loader";
import ChatButton from "~/components/ChatButton";
import CreatePlaylist from "~/components/CreatePlaylist";

export const loader: LoaderFunction = async () => {
  try {
    //utilfy.api.setAccessToken('');
    utilfy.api.setAccessToken(
        "BQBuNGuqUQ8x8KuIELCyOobjWaRySQ6pmOZOCD6vYdZWZrb7sA1rKGkFtLaYrCJuEoRBCKZ7FkC127LA72ZvEd__t7V9GnDQxCYqBBPPa_Stkmw2u7UzO1PCGG1oWOKTijrEsyFSc5Jx5KbKv_QCNXH_yVgc_RuCWzgGwSkQBZgCJ5IJpgDukX0uhG04tagkpXoWo0IpYnl0XHJDLhcbAkXGzJVTHQtwxQSe3XdFFg"
        );
    const response = await utilfy.api.getMyRecentlyPlayedTracks({ limit: 50 });
    return json({ tracks: response.body.items });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const action: ActionFunction = async ({ request }) => {
  utilfy.api.setAccessToken(
    "BQBuNGuqUQ8x8KuIELCyOobjWaRySQ6pmOZOCD6vYdZWZrb7sA1rKGkFtLaYrCJuEoRBCKZ7FkC127LA72ZvEd__t7V9GnDQxCYqBBPPa_Stkmw2u7UzO1PCGG1oWOKTijrEsyFSc5Jx5KbKv_QCNXH_yVgc_RuCWzgGwSkQBZgCJ5IJpgDukX0uhG04tagkpXoWo0IpYnl0XHJDLhcbAkXGzJVTHQtwxQSe3XdFFg"
    );
  console.log("[openai] fetching songs for new playlist");
  let gpttracks: any[] = [];
  try {
    const res: any[] = await openai.askChat(
      "dame nuevas canciones cualquiera."
    );
    // console.log('gpt response ', res)
    // por cada cancion que te de, consultar en spotify su spotify:track:'${trackid}'
    for (let name of res) {
      let data = await utilfy.api.searchTracks(name, { limit: 1 });
      gpttracks.push(data.body.tracks?.items[0]);
    }

    // console.log('gpttracks ', gpttracks)
    return new Response(JSON.stringify(gpttracks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};

const index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [gpttracks, setGpttracks] = useState<any[]>([]);

  const { tracks } = useLoaderData<{ tracks: any[] }>();
  const { accessToken, refreshToken } = useStore<{
    accessToken: string;
    refreshToken: string;
  }>((state: any) => state);

  const handleChatGPT = async () => {
    setLoading(true);
    await fetch("/home?index", {
      method: "POST",
      body: JSON.stringify({ tracks: tracks }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
       res.json().then((data) => {
        console.log(data);   
        setGpttracks(data);
      });
    });
  };

  useEffect(() => {
    if (accessToken === null) navigate("/");
  }, []);

  if (loading) return <Loader />;
  return (
    <div
      style={{
        background: "#1D3354",
        width: "100%",
        height: "100vh",
        position: "relative",
        padding: "0px 20px",
      }}
    >
      <div
        style={{
          height: "10vh",
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <LogoutButton />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <div>
          <div
            style={{
              height: "4vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <h4
              style={{
                color: "white",
              }}
            >
              Latest Tracks
            </h4>
            <ChatButton onClick={handleChatGPT} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              overflow: "auto",
              maxHeight: "80vh",
              gap: "10px",
              paddingRight: "10px",
            }}
          >
            {tracks &&
              tracks.map((track) => (
                <div
                  key={track.played_at}
                  style={{
                    backgroundColor: "#0D1821",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {track.track.album.images &&
                    track.track.album.images.length > 0 && (
                      <div
                        style={{
                          objectFit: "contain",
                          maxWidth: "125px",
                          height: "auto",
                        }}
                      >
                        <img src={track.track.album.images[0].url} />
                      </div>
                    )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        padding: 0,
                        fontSize: "0.8rem",
                      }}
                    >
                      {track.track.name}
                    </p>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        marginTop: "0px",
                      }}
                    >
                      {track.track.artists[0]?.name}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <div
            style={{
              height: "4vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <h4
              style={{
                color: "white",
              }}
            >
              ChatGPT Playlist
            </h4>
            <CreatePlaylist />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              overflow: "auto",
              maxHeight: "80vh",
              gap: "10px",
              paddingRight: "10px",
            }}
          >
            {gpttracks &&
              gpttracks.map((track) => (
                <div
                  key={track.played_at}
                  style={{
                    backgroundColor: "#0D1821",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {track.track.album.images &&
                    track.track.album.images.length > 0 && (
                      <div
                        style={{
                          objectFit: "contain",
                          maxWidth: "125px",
                          height: "auto",
                        }}
                      >
                        <img src={track.track.album.images[0].url} />
                      </div>
                    )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        padding: 0,
                        fontSize: "0.8rem",
                      }}
                    >
                      {track.track.name}
                    </p>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        marginTop: "-2px",
                      }}
                    >
                      {track.track.artists[0]?.name}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
