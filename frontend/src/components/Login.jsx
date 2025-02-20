import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider'; // To use the AuthContext

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Manage the authentication state through context
    const [authUser, setAuthUser] = useAuth();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

    const onSubmitLogin = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };

        try {
            const res = await axios.post("http://127.0.0.1:4001/user/login", userInfo, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Login successful:", res.data);
            if (res.data) {
                // Store the user data in localStorage and update the context
                localStorage.setItem("users", JSON.stringify(res.data));
                setAuthUser(res.data); // Set authUser state to the logged-in user data

                toast.success("Login successful!");

                // Navigate to the course section after a successful login
                navigate('/Course');
                setIsLoginModalOpen(false); // Close the modal after successful login
            }
        } catch (err) {
            console.error("Login Error response:", err.response ? err.response.data : err);
            toast.error("Login failed: Invalid email or password");
        }
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        navigate('/'); // Redirect to home page after closing login modal
    };

    const openSignUpPage = () => {
        navigate('/Signup'); // Redirect to the sign-up page
    };

    useEffect(() => {
        const loginModal = document.getElementById("login_modal");
        if (isLoginModalOpen) {
            loginModal?.showModal(); // Open login modal if it's not already closed
        } else {
            loginModal?.close(); // Close login modal when state changes
        }
    }, [isLoginModalOpen]);

    // Check if the user is logged in before rendering the login modal
    if (authUser) {
        return null;  // If already authenticated, do not show the login modal
    }

    return (
        <div>
            {/* Login Modal */}
            {isLoginModalOpen && (
                <dialog id="login_modal" className="modal">
                    <div className="modal-box dark:bg-slate-900 dark:text-white">
                        <h3 className="font-bold text-lg">Login</h3>
                        <button
                            type="button"
                            onClick={closeLoginModal} 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit(onSubmitLogin)} method="dialog">
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
                                <p className='mx-8'>
                                    Not registered?{" "}
                                    <button
                                        onClick={openSignUpPage} 
                                        className="underline text-blue-500 cursor-pointer"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default Login;
