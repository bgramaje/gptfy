import { ActionFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import React from 'react'
import { TbBrandOpenai } from 'react-icons/tb';
import utilfy from '../utils/spotify'

export const action: ActionFunction = async ({ request }) => {
    console.log('[spotipy] removing access_token and refresh_token from api and localStorage')
    utilfy.api.resetAccessToken();
    utilfy.api.resetRefreshToken();
    return new Response(null, { status: 200 });
}

const ChatButton = ({ onClick }: { onClick: any }) => {
    const navigate = useNavigate();

    const handleChat = (e: any) => {
        e.preventDefault();
        onClick();
    }

    return (
        <button
            className="flex items-center space-x-2 px-2 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={(e) => handleChat(e)}
        >
            <TbBrandOpenai size="1.1em" />
            <span className='text-xs font-regular'>Generate playlist</span>
        </button>
    );
}

export default ChatButton