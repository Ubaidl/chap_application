import React from 'react'

const Signup = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>SignUp
                    <span className='text-blue-500'>ChatApp</span>
                </h1>
                <form>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>fullname</span>
                        </label>
                        <input
                            type="text"
                            placeholder="enter your fullname"
                            className="w-full input input-bordered h-10" />

                    </div>


                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="enter your username"
                            className="w-full input input-bordered h-10" />


                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="enter your your email"
                            className="w-full input input-bordered h-10" />


                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>password</span>
                        </label>
                        <input
                            type="text"
                            placeholder="your password"
                            className="w-full input input-bordered h-10" />


                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="gender" value="male" className="radio checked:bg-blue-500" />
                            <span className="text-base label-text">Male</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="gender" value="female" className="radio checked:bg-pink-500" />
                            <span className="text-base label-text">Female</span>
                        </label>
                    </div>


                    <a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Already"} have an account
                    </a>
                    <div>
                        <button class="btn btn-block btn-sm mt-2 border border-slate-700">SignUp</button>
                    </div>

                </form>

            </div>


        </div>

    )
}

export default Signup