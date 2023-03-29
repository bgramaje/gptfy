import React, { useEffect, useState } from 'react'
import { ActionFunction, json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";

import utilfy from '~/utils/spotify'
import useStore from '~/hooks/store';

import Login from '~/pages/Login';
import Loader from '~/components/Loader';

export const loader = async () => {
    const authorizeUrl = utilfy.getAuthorizeUrl();
    return json({ url: authorizeUrl });
};

export const action: ActionFunction = async ({ request }) => {
    console.log('[spotipy] setting access_token and refresh_token to api')
    const body = await request.json();
    const { accessToken, refreshToken } = body;
    utilfy.api.setAccessToken(accessToken);
    utilfy.api.setRefreshToken(refreshToken);
    return new Response(null, { status: 200 });
}

export default () => {
    const navigate = useNavigate();

    const { url } = useLoaderData<{ url: string }>();
    const { setAccessToken, setRefreshToken } = useStore<any>((state: any) => state);;

    const [loading, setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        // retrive tokens from localStorage
        // TODO: change accessToken into sessionStorage
        const _accessToken = localStorage.getItem('accessToken');
        const _refreshToken = localStorage.getItem('refreshToken')
        // set states
        setLoading(true)
        setAccessToken(_accessToken)
        setRefreshToken(_refreshToken)
        // useStore.setState({ accessToken: _accessToken, refreshToken: _refreshToken })
        // make post request into the action method.
        const fecthData = async () => {
            try {
                await fetch("/?index", {
                    method: "POST",
                    body: JSON.stringify({ accessToken: _accessToken, refreshToken: _refreshToken }),
                    headers: { "Content-Type": "application/json" },
                });
            } catch (error) {
                console.error(error)
                throw error
            }
        }
        // if both are not null then make the post request
        if (_accessToken && _refreshToken) setTimeout(() => fecthData().then(() => {
            setLoading(false)
            navigate('/home')
        }), 500)

        else setLoading(false)
    }, [])

    if (loading) return <Loader />

    return (
        <main style={{
            background: '#1D3354',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Login url={url} />
        </main>
    );
}
