import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);  // This will print form data when the form is submitted
    };

    const navigate = useNavigate();

    const closeModalAndGoHome = () => {
        // Close the modal
        document.getElementById('my_modal_3').close();
        // Navigate to the home page
        navigate('/');
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box dark:bg-slate-900 dark:text-white">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        {/* Close the modal and navigate to home when cross is clicked */}
                        <button
                            type="button"
                            onClick={closeModalAndGoHome}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg">Login</h3>
                        
                        {/* Email input */}
                        <div className="mt-4 space-y-2">
                            <span>Email</span>
                            <br />
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-80 px-3 border rounded-md outline-none dark:text-black"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password input */}
                        <div className="mt-4 space-y-2">
                            <span>Password</span>
                            <br />
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="w-80 px-3 border rounded-md outline-none dark:text-black"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-around mt-4">
                            <button
                                type="submit"
                                className="px-3 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 duration-300"
                            >
                                Login
                            </button>
                            <p>
                                Not registered?{" "}
                                <Link to="/Signup" className="underline text-blue-500 cursor-pointer">
                                    Register
                                </Link>{" "}
                            </p>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Login;
