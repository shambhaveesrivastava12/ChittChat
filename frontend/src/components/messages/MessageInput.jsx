import { useState, useRef, useEffect, useContext } from "react";
import { BsSend, BsPaperclip, BsEmojiSmileFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";
import ExpressionPicker from "../picker/ExpressionPicker";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const { loading, sendMessage } = useSendMessage();
    const fileInputRef = useRef(null);
    const pickerRef = useRef(null);
    const { socket } = useSocketContext();
    const { theme } = useContext(ThemeContext);
    const { selectedConversation } = useConversation();

    const onEmojiClick = (emojiObject) => {
        setMessage((prevInput) => prevInput + emojiObject.emoji);
    };

    const handleGifSelect = async (gif) => {
        setShowPicker(false);
        const gifUrl = gif.images.downsized.url;
        await sendMessage({ message: "", fileUrl: gifUrl, fileType: "image/gif" });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => { setPreview(reader.result); };
                reader.readAsDataURL(selectedFile);
            } else {
                setPreview(selectedFile.name);
            }
        }
    };

    const uploadFile = async () => {
        if (!file) return null;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const token = localStorage.getItem("chat-token");
            const res = await fetch(`${API}/api/upload`, {
                method: "POST",
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");
            return data;
        } catch (error) {
            toast.error("File upload failed. Please try again.");
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && !file) return;
        let fileData = null;
        if (file) {
            fileData = await uploadFile();
            if (!fileData) return;
        }
        await sendMessage({ message, fileUrl: fileData?.fileUrl, fileType: fileData?.fileType });
        setMessage("");
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                 if (!event.target.closest('.picker-toggle-button')) {
                    setShowPicker(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [pickerRef]);

    return (
        <>
            {preview && (
                <div className='px-4 my-2 flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-lg'>
                    <div className='flex items-center gap-2 overflow-hidden'>
                        {file && file.type.startsWith("image/") ? (
                            <img src={preview} alt='Preview' className='w-12 h-12 object-cover rounded' />
                        ) : (
                            <FaFileAlt className='w-8 h-8 text-gray-800 dark:text-gray-200 flex-shrink-0' />
                        )}
                        <span className='text-sm text-gray-800 dark:text-gray-200 truncate'>{file?.name}</span>
                    </div>
                    <button
                        onClick={() => {
                            setFile(null);
                            setPreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className='text-red-500 font-bold p-2'
                    >
                        X
                    </button>
                </div>
            )}
            <form className='px-4 my-3' onSubmit={handleSubmit}>
                <div className='w-full relative'>
                    {showPicker && (
                        <div ref={pickerRef} className="absolute bottom-full right-0 mb-2 z-10">
                            <ExpressionPicker onEmojiClick={onEmojiClick} onGifSelect={handleGifSelect} />
                        </div>
                    )}

                    <input type='file' ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
                    
                    <input
                        type='text'
                        className='border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                        placeholder='Send a message'
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            if (socket && selectedConversation?._id) {
                                socket.emit("typing", { to: selectedConversation._id });
                            }
                        }}
                        onBlur={() => {
                            if (socket && selectedConversation?._id) {
                                socket.emit("stop_typing", { to: selectedConversation._id });
                            }
                        }}
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                        <button type='button' className="p-1 text-gray-800 dark:text-white" onClick={() => fileInputRef.current.click()}>
                            <BsPaperclip />
                        </button>
                        <button type='button' className="p-1 text-gray-800 dark:text-white picker-toggle-button" onClick={() => setShowPicker(val => !val)}>
                            <BsEmojiSmileFill />
                        </button>
                        <button type='submit' className='p-1 text-gray-800 dark:text-white'>
                            {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MessageInput;