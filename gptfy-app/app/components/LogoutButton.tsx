import { ActionFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import React from 'react'
import { CgLogOut } from 'react-icons/cg';
import utilfy from '../utils/spotify'

export const action: ActionFunction = async ({ request }) => {
    console.log('[spotipy] removing access_token and refresh_token from api and localStorage')
    utilfy.api.resetAccessToken();
    utilfy.api.resetRefreshToken();
    return new Response(null, { status: 200 });
}

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = (e: any) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/')
    }   

    return (
        <button
            className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={(e) => handleLogout(e)}
        >
            <CgLogOut size="1.5em" />
            <span className='text-sm font-semibold'>Logout</span>
        </button>
    );
}

export default LogoutButton