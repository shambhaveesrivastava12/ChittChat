import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from "./EmojiPicker";
import { useRef } from "react";
import { useEffect } from "react";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const [showPicker, setShowPicker] = useState(false);
	const pickerRef = useRef(null);
	const buttonRef = useRef(null); // <-- ref for emoji button


	const onEmojiClick = (emojiData) => {
		setMessage((prev) => prev + emojiData.emoji);
	};

	// Close picker if click outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target) // <-- ignore clicks on button
			) {
				setShowPicker(false);
			}
		};

		// Only add listener when picker is shown
		if (showPicker) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showPicker]); 


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>

				{/* Emoji button */}
				<button
					type="button"
					ref={buttonRef}
					className="absolute inset-y-0 end-9 flex items-center  text-xl text-gray-300"
					onClick={() => setShowPicker(!showPicker)}
				>
					😂
				</button>

				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>

				{/* Emoji Picker */}
				{showPicker && (
					<div
						ref={pickerRef}
						className="absolute bottom-12 right-0 z-50"
					>
						<EmojiPicker onEmojiClick={onEmojiClick} />
					</div>
				)}
			</div>
		</form>
	);
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
