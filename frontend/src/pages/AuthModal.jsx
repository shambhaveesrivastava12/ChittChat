import { useState } from 'react';
import { X } from 'lucide-react';
import Login from './login/Login';
import SignUp from './signup/SignUp';



function AuthModal({ isOpen, onClose }) {
  const [isLoginView, setIsLoginView] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-gray-100 rounded-2xl dark:bg-gray-900 shadow-2xl p-5 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        {isLoginView ? <Login /> : <SignUp />}

        {/* Toggle between Login and Signup */}
        <p className="text-center text-sm text-slate-500 mt-6">
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-semibold text-blue-600 hover:underline"
          >
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;