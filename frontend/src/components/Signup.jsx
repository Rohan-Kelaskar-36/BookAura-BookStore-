import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

function SignUp() {
    const navigate = useNavigate();  // Hook to navigate programmatically

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,  // Use watch to track the 'password' field
    } = useForm();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);  // State to control login modal visibility
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(true);  // State to control sign-up modal visibility

    // Use useForm hook for the login form as well
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: { errors: loginErrors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Sign Up Data: ", data);  // Log the form data to the console for sign-up
        closeSignUpModal(); // Close modal after form submission
    };

    const onLoginSubmit = (data) => {
        console.log("Login Data: ", data);  // Log the login form data to the console
        closeLoginModal(); // Close the login modal after submission
    };

    // Function to close the sign-up modal and navigate to the home page
    const closeSignUpModal = () => {
        setIsSignUpModalOpen(false);  // Close the sign-up modal
        navigate('/');  // Redirect to the home page after closing the modal
    };

    const openLoginModal = () => {
        setIsSignUpModalOpen(false);  // Close the sign-up modal
        setIsLoginModalOpen(true);  // Open the login modal
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);  // Close the login modal
        navigate('/');  // Redirect to the home page after closing the login modal
    };

    useEffect(() => {
        const signUpModal = document.getElementById("my_modal_3");
        if (isSignUpModalOpen) {
            signUpModal?.showModal();  // Open the sign-up modal
        } else {
            signUpModal?.close();  // Close the sign-up modal
        }
    }, [isSignUpModalOpen]);

    useEffect(() => {
        const loginModal = document.getElementById("login_modal");
        if (isLoginModalOpen) {
            loginModal?.showModal();  // Open the login modal
        } else {
            loginModal?.close();  // Close the login modal
        }
    }, [isLoginModalOpen]);

    return (
        <div>
            {/* SignUp Modal */}
            {isSignUpModalOpen && (
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box dark:bg-slate-900 dark:text-white">
                        {/* Form to handle submission */}
                        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                            {/* Close button */}
                            <button
                                type="button"
                                onClick={closeSignUpModal}  // Close modal and redirect to home
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
                                        validate: (value) => value === watch('password') || "Passwords don't match"  // Watch 'password' to validate the match
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
                                        onClick={openLoginModal}  // Open the Login modal instead of routing
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

            {/* Login Modal (from Login page) */}
            {isLoginModalOpen && (
                <dialog id="login_modal" className="modal">
                    <div className="modal-box dark:bg-slate-900 dark:text-white">
                        <h3 className="font-bold text-lg">Login</h3>
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={closeLoginModal}  // Close the login modal and redirect to home
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        {/* Login Form */}
                        <form onSubmit={loginHandleSubmit(onLoginSubmit)} method="dialog">
                            {/* Email input */}
                            <div className="mt-4 space-y-2">
                                <span>Email</span>
                                <br />
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="w-80 px-3 border rounded-md outline-none dark:text-black"
                                    {...loginRegister("email", { required: "Email is required" })}
                                />
                                {loginErrors.email && <p className="text-red-500">{loginErrors.email.message}</p>}
                            </div>

                            {/* Password input */}
                            <div className="mt-4 space-y-2">
                                <span>Password</span>
                                <br />
                                <input
                                    type="password"
                                    placeholder="Enter Your Password"
                                    className="w-80 px-3 border rounded-md outline-none dark:text-black"
                                    {...loginRegister("password", { required: "Password is required" })}
                                />
                                {loginErrors.password && <p className="text-red-500">{loginErrors.password.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-around mt-4">
                                <button
                                    type="submit"
                                    className="px-3 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 duration-300"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default SignUp;
