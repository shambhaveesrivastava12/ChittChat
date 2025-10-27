import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
          Sign Up <span className="text-blue-500">ChitChat</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg px-3"
              value={inputs.fullName}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          {/* Username and Email side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 dark:text-gray-200 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg px-3"
                value={inputs.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-gray-800 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg px-3"
                value={inputs.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Password and Confirm Password side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <div className="relative">
              <label className="block text-gray-800 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword1 ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg px-3 pr-10"
                  value={inputs.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-gray-800 dark:text-gray-200 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg px-3 pr-10"
                  value={inputs.confirmPassword}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </div>
              </div>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={inputs.gender}
              onChange={handleChange}
              className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg px-3"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
              <option value="notsay">I’d rather not say</option>
            </select>
          </div>

          {/* Already have account link */}
          <div className="text-right">
            <Link
              to="/login"
              className="text-sm text-gray-800 hover:underline dark:text-white"
            >
              Already have an account?
            </Link>
          </div>

          {/* Submit button */}
          <button
            className="w-full py-2 mt-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
