import { FaSpotify } from 'react-icons/fa';

export default () => {
    return (
        <button
            className="flex items-center space-x-2 px-2 py-1.5 text-xs font-regular bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
            <FaSpotify size="1.5em" />
            <span className='text-xs font-regular'>Create playlist</span>
        </button>
    );
};
