"use client";

import React, {useContext, useLayoutEffect, useState} from "react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Logo } from "../../../components/icons/duotone/logo";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { GoogleLogo } from "../../../components/icons/multicolor/google";
import { UserContext } from "../../../provider/UserContext";
import { useNavigate} from "react-router";
import {handleAxiosError} from "../../../helpers/error-handling.tsx";
import { showToast } from "../../../utils/toaster.tsx";

export default function Loginpage() {
    const [isVisible, setIsVisible] = React.useState(false);
    const { login, token, isAuthenticated } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if( token && isAuthenticated ) {
            navigate('/');
        }
    }, [token, isAuthenticated, navigate])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(e);
            navigate('/')
        } catch (error) {
            showToast('Login Failed', 'Invalid username or password.', 'bg-red-400', "bg-red-200");
            // handleAxiosError(error)
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
                <div className="flex flex-col items-center pb-6">
                    <Logo size={60} className="text-primera" />
                    <p className="text-xl font-medium">Welcome Back</p>
                    <p className="text-small text-default-500">
                        Log in to your account to continue
                    </p>
                </div>
                <Form
                    className="flex flex-col gap-3"
                    validationBehavior="native"
                    onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        name="username"
                        placeholder="Enter your email or username"
                        variant="bordered"
                    />
                    <Input
                        endContent={
                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="cursor-pointer">
                                {isVisible ? (
                                    <GoEyeClosed
                                        size={20}
                                        className="text-second"
                                    />
                                ) : (
                                    <GoEye size={20} className="text-second" />
                                )}
                            </button>
                        }
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    <div className="flex w-full items-center justify-between px-1 py-2">
                        <Checkbox name="remember" size="sm">
                            Remember me
                        </Checkbox>
                        <Link className="text-default-500" href="#" size="sm">
                            Forgot password?
                        </Link>
                    </div>
                    <Button className="w-full bg-primera text-white"  type="submit" isLoading={loading} >
                        Sign In
                    </Button>
                </Form>
                <div className="flex items-center gap-4 py-2">
                    <Divider className="flex-1" />
                    <p className="text-tiny text-default-500 shrink-0">OR</p>
                    <Divider className="flex-1" />
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        startContent={<GoogleLogo size={23} />}
                        variant="bordered">
                        Continue with Google
                    </Button>
                </div>
                <p className="text-small text-center">
                    Need to create an account?&nbsp;
                    <Link href="#" size="sm">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
