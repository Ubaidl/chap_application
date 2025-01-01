import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import usesignup from '../hooks/usesignup';

const Signup = () => {
    // const [loading, setloading] = useState('');
    const [inputs, setInputs] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        gender: "",
    });

    const { signupfunction, loading } = usesignup();// thisis a user hook
    const handlform = async (e) => {
        e.preventDefault();
        //console.log(inputs);
        await signupfunction(inputs);




    }





    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    SignUp <span className='text-blue-500'>ChatApp</span>
                </h1>
                <form onSubmit={handlform}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='enter full name'
                            className='w-full input input-bordered  h-10'
                            value={inputs.fullname}
                            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='enter full name'
                            className='w-full input input-bordered  h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>email</span>
                        </label>
                        <input
                            type='text'
                            placeholder='enter full name'
                            className='w-full input input-bordered  h-10'
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>password</span>
                        </label>
                        <input
                            type='text'
                            placeholder='enter your password'
                            className='w-full input input-bordered  h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                className="radio checked:bg-blue-500"
                                checked={inputs.gender === "male"}
                                onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                            />
                            <span className="text-base label-text">Male</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                className="radio checked:bg-pink-500"
                                checked={inputs.gender === "female"}
                                onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                            />
                            <span className="text-base label-text">Female</span>
                        </label>

                    </div>
                    <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Already"} have an account
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default Signup;
