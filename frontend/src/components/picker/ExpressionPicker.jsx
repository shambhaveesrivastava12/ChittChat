import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import GifPicker from './GifPicker';

const ExpressionPicker = ({ onEmojiClick, onGifSelect }) => {
    const [activeTab, setActiveTab] = useState('emoji');

    return (
        <div className="w-[350px] h-[450px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex flex-col">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button 
                    onClick={() => setActiveTab('emoji')}
                    className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'emoji' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                >
                    Emojis
                </button>
                <button 
                    onClick={() => setActiveTab('gif')}
                    className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'gif' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                >
                    GIFs
                </button>
            </div>
            <div className="flex-grow overflow-hidden">
                {activeTab === 'emoji' && (
                    <div className="h-full">
                        <EmojiPicker onEmojiClick={onEmojiClick} width="100%" height="100%" />
                    </div>
                )}
                {activeTab === 'gif' && <GifPicker onGifSelect={onGifSelect} />}
            </div>
        </div>
    );
};

export default ExpressionPicker;