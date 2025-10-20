import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    username: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className='bg-gray-100 dark:bg-gray-900  transition-colors duration-300'>
      <h1 className='text-3xl font-semibold text-center text-gray-800 dark:text-gray-200'>
        Sign Up <span className='text-blue-500 dark:text-blue-400'> ChitChat</span>
      </h1>

      <form onSubmit={handleSubmit} className='mt-6'>
        {/* Full Name */}
        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-gray-800 dark:text-gray-200'>
              Full Name
            </span>
          </label>
          <input
            type='text'
            name='fullName'
            placeholder='John Doe'
            className='w-full input input-bordered h-10 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
            value={inputs.fullName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        {/* Username */}
        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-gray-800 dark:text-gray-200'>
              Username
            </span>
          </label>
          <input
            type='text'
            name='username'
            placeholder='johndoe'
            className='w-full input input-bordered h-10 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
            value={inputs.username}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        {/* Email */}
        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-gray-800 dark:text-gray-200'>
              Email
            </span>
          </label>
          <input
            type='email'
            name='email'
            placeholder='you@example.com'
            className='w-full input input-bordered h-10 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
            value={inputs.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        {/* Password */}
        <div className='relative'>
          <label className='label'>
            <span className='text-base label-text text-gray-800 dark:text-gray-200'>
              Password
            </span>
          </label>
          <input
            type={showPassword1 ? "text" : "password"}
            name='password'
            placeholder='Enter Password'
            className='w-full input input-bordered h-10 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
            value={inputs.password}
            onChange={handleChange}
            autoComplete="off"
          />
          {!showPassword1 ? (
            <IoEye
              className='absolute top-[51px] right-[15px] cursor-pointer w-[20px] h-[20px] text-gray-500 dark:text-gray-300'
              onClick={() => setShowPassword1(true)}
            />
          ) : (
            <IoEyeOff
              className='absolute top-[51px] right-[15px] cursor-pointer w-[20px] h-[20px] text-gray-500 dark:text-gray-300'
              onClick={() => setShowPassword1(false)}
            />
          )}
        </div>

        {/* Confirm Password */}
        <div className='relative'>
          <label className='label'>
            <span className='text-base label-text text-gray-800 dark:text-gray-200'>
              Confirm Password
            </span>
          </label>
          <input
            type={showPassword2 ? "text" : "password"}
            name='confirmPassword'
            placeholder='Confirm Password'
            className='w-full input input-bordered h-10 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
            value={inputs.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
          />
          {!showPassword2 ? (
            <IoEye
              className='absolute top-[51px] right-[15px] cursor-pointer w-[20px] h-[20px] text-gray-500 dark:text-gray-300'
              onClick={() => setShowPassword2(true)}
            />
          ) : (
            <IoEyeOff
              className='absolute top-[51px] right-[15px] cursor-pointer w-[20px] h-[20px] text-gray-500 dark:text-gray-300'
              onClick={() => setShowPassword2(false)}
            />
          )}
        </div>

        {/* Gender */}
        <GenderCheckbox
          onCheckboxChange={handleCheckboxChange}
          selectedGender={inputs.gender}
        />

        {/* Link to login */}
        <Link
          to={"/login"}
          className='text-sm hover:underline hover:text-blue-600 dark:hover:text-blue-400 mt-2 inline-block text-gray-800 dark:text-gray-200'
        >
          Already have an account?
        </Link>

        {/* Submit button */}
        <div>
          <button
            className='btn btn-block btn-sm mt-2 border border-slate-700 dark:border-slate-500 bg-sky-500 text-white dark:bg-sky-600 dark:hover:bg-sky-500'
            disabled={loading}
          >
            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
