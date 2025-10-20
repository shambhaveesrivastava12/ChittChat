import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const GifPicker = ({ onGifSelect }) => {
    const [gifs, setGifs] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    
    const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;

    const fetchGifs = async (searchQuery) => {
        if (!giphyApiKey) {
            console.error("GIPHY API Key is missing! Make sure it's in your .env file and you have restarted the dev server.");
            toast.error("GIPHY service is not configured.");
            return;
        }
        setLoading(true);
        const endpoint = searchQuery
            ? `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchQuery}&limit=24&rating=g`
            : `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=24&rating=g`;

        try {
            const res = await fetch(endpoint);
            const { data } = await res.json();
            setGifs(data);
        } catch (error) {
            console.error("Failed to fetch GIFs", error);
            toast.error("Could not load GIFs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGifs(''); 
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            fetchGifs(query);
        }
    };

    return (
        <div className="p-2 flex flex-col h-full">
            <div className="mb-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for GIFs"
                    className="w-full p-2 border rounded-md text-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                />
            </div>
            {loading ? (
                <div className="flex-grow flex items-center justify-center">
                    <span className="loading loading-spinner"></span>
                </div>
            ) : (
                <div className="flex-grow overflow-y-auto grid grid-cols-3 gap-2 pr-1">
                    {gifs.map((gif) => (
                        <div key={gif.id} className="cursor-pointer aspect-square bg-gray-200 dark:bg-gray-700 rounded-md" onClick={() => onGifSelect(gif)}>
                            <img 
                                src={gif.images.fixed_width_downsampled.url} 
                                alt={gif.title}
                                className="w-full h-full object-cover rounded-md"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GifPicker;