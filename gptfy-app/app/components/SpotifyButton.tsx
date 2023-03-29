import { Link } from "react-router-dom";

import { FaSpotify } from 'react-icons/fa';

export default ({ url }: { url: string }) => {
    return (
        <Link
            to={url}
            className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
            <FaSpotify size="1.5em" />
            <span className='text-sm font-semibold'>Login with Spotify</span>
        </Link>
    );
};
