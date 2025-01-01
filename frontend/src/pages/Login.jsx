import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import uselogin from '../hooks/uselogin';

const Login = () => {
    const [input, setinput] = useState({
        username: '',
        password: '',
    });
    //const [loading, setLoading] = useState(false);
    const { loading, login } = uselogin();

    const handleinput = async (e) => {
        e.preventDefault();
        console.log(input)
        await login(input);
    }




    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
                    <span className='text-blue-500'>ChatApp</span>
                </h1>
                <form onSubmit={handleinput}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="enter username"
                            className="w-full input input-bordered h-10" value={input.username} onChange={(e) => setinput({ ...input, username: e.target.value })} />

                    </div>


                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>password</span>
                        </label>
                        <input
                            type="text"
                            placeholder="enter password"
                            className="w-full input input-bordered h-10" value={input.password} onChange={(e) => setinput({ ...input, password: e.target.value })} />


                    </div>
                    <Link to='/Signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don 't"} have an account
                    </Link>
                    <div>
                        <button class="btn btn-block btn-sm mt-2"
                            disabled={loading}

                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>

                </form>

            </div>


        </div>
    )
}

export default Login