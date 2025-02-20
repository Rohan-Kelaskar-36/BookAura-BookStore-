import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider'; // To use the AuthContext

function SignUp() {
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    // Manage the authentication state through context
    const [authUser, setAuthUser] = useAuth();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(true);

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

        try {
            const res = await axios.post("http://127.0.0.1:4001/user/signup", userInfo, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Signup successful:", res.data);
            if (res.data) {
                // Store the user data in localStorage and update the context
                localStorage.setItem("users", JSON.stringify(res.data));
                setAuthUser(res.data); // Set authUser state

                toast.success("Signup successful!");

                // Navigate to the course section after a successful signup
                navigate('/Course');
            }
        } catch (err) {
            console.error("Error response:", err.response ? err.response.data : err);
            toast.error("Signup failed: Invalid email or password");
        }

        closeSignUpModal(); // Close modal after submit
    };

    const closeSignUpModal = () => {
        setIsSignUpModalOpen(false); 
        navigate('/'); // Redirect to the home page after closing the modal
    };

    const openLoginModal = () => {
        setIsSignUpModalOpen(false);
        setIsLoginModalOpen(true); 
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        navigate('/'); // Redirect to home page after closing login modal
    };

    useEffect(() => {
        const signUpModal = document.getElementById("my_modal_3");
        if (isSignUpModalOpen) {
            signUpModal?.showModal(); // Open sign-up modal
        } else {
            signUpModal?.close(); // Close modal
        }
    }, [isSignUpModalOpen]);

    useEffect(() => {
        const loginModal = document.getElementById("login_modal");
        if (isLoginModalOpen) {
            loginModal?.showModal(); // Open login modal
        } else {
            loginModal?.close(); // Close login modal
        }
    }, [isLoginModalOpen]);

    return (
        <div>
            {/* SignUp Modal */}
            {isSignUpModalOpen && (
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box dark:bg-slate-900 dark:text-white">
                        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                            <button
                                type="button"
                                onClick={closeSignUpModal} 
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            >
                                ✕
                            </button>

                            <h3 className="font-bold text-lg">Sign Up</h3>

                            {/* Email Input */}
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

                            {/* Password Input */}
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

                            {/* Confirm Password Input */}
                            <div className="mt-4 space-y-2">
                                <span>Confirm Password</span>
                                <br />
                                <input
                                    type="password"
                                    placeholder="Confirm Your Password"
                                    className="w-80 px-3 border rounded-md outline-none dark:text-black"
                                    {...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        validate: (value) =>
                                            value === watch("password") || "Passwords don't match", 
                                    })}
                                />
                                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-around mt-4">
                                <button
                                    type="submit"
                                    className="px-3 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 duration-300"
                                >
                                    Sign Up
                                </button>
                                <p>
                                    Already registered?{" "}
                                    <button
                                        onClick={openLoginModal} 
                                        className="underline text-blue-500 cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}

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
                        {/* Login Form (optional, not implemented yet) */}
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default SignUp;
