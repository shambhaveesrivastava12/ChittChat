import React from "react";

// A small set of emojis; you can expand this array
const EMOJIS = [
    "😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂",
    "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋",
    "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳",
    "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "😣", "😖", "😫",
    "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳",
    "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭",
    "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧",
    "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢",
    "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
    "👆", "👇", "☝️", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️",
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
    "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "🔥",
    "✨", "⭐", "🌟", "💫", "💥", "💢", "💯", "💬", "👀", "🎉"
];


const EmojiPicker = ({ onEmojiClick }) => {
    return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-2 flex flex-wrap gap-2 w-64 max-h-48 overflow-y-auto z-50">
            {EMOJIS.map((emoji, index) => (
                <button
                    key={index}
                    type="button"
                    className="text-xl hover:bg-gray-700 rounded p-1"
                    onClick={() => onEmojiClick({ emoji })}
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};

export default EmojiPicker;
