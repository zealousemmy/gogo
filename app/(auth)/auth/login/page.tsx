/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useRef } from "react";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { classNames } from "primereact/utils";
import { Toast } from 'primereact/toast';
import useLogin from "../../../component/Auth/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useData } from "../../../component/Auth/hooks/DataContext";
import CustomForm, { IFormInput, IFormValues } from "../../../component/Form/CustomForm";
import * as yup from 'yup'
import TextInput from "../../../component/Input/TextInput";
import PasswordInput from "../../../component/Input/PasswordInput";
import { InferType } from "yup";

const inputList: Array<IFormInput> = [
	{
		name: "email",
		as: TextInput,
		format: (value) => value.toLowerCase().replace(/\s/g, ""),
		options: { inputMode: 'email' , className:'w-full md:w-30rem mb-5'},
		placeholder: "Email address",
		label: "Email",
	},
	{
		name: "password",
		as: PasswordInput,
		options: { className:'w-full mb-5', inputClassName:'w-full p-3 md:w-30rem'},
		placeholder: "Password",
		label: 'Password'
	}
];

const schema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required()
});

type InputPayLoad = InferType<typeof schema>

const LoginPage = () => {
	const { layoutConfig } = useContext(LayoutContext);
	const toast = useRef<Toast>(null);
	const { updateData } = useData()
	const router = useRouter();
	
	const { handleLogin, error, data, isLoading } = useLogin({
		onComplete: (res) => {
			updateData({ type: "SET_DATA", payload: { value: res, key: "USER_DATA" } })
			router.replace('/')
		},

		onError: (e) => {
			const error = ['auth/user-not-found', 'auth/wrong-password'].includes(e.code) ? 'Invalid email or password' : 'Unable to login please try again later'
			toast.current?.show({ severity: 'error', summary: 'Error', detail: error });
		}
	})
	
	const containerClassName = classNames(
		"surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
		{ "p-input-filled": layoutConfig.inputStyle === "filled" }
	);
	
	const loginAdmin = (InputPayLoad:IFormValues<InputPayLoad>) => {
		handleLogin({
			password: InputPayLoad.password as unknown as string,
			email: InputPayLoad.email as unknown as string
		})
	}

	return (
		<>
			<Toast ref={toast}/>
			<div className={containerClassName}>
				<div className="flex flex-column align-items-center justify-content-center">
					<img
						src={`/layout/images/logo-${
							layoutConfig.colorScheme === "light" ? "dark" : "white"
						}.svg`}
						alt="go-go-pharma logo"
						className="mb-5 w-6rem flex-shrink-0"
					/>
					<div
						style={{
							borderRadius: "56px",
							padding: "0.3rem",
							background:
								"linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
						}}
					>
						<div
							className="w-full surface-card py-8 px-5 sm:px-8"
							style={{ borderRadius: "53px" }}
						>
							<div className="text-center mb-5">
								<div className="text-900 text-3xl font-medium mb-3">
									Welcome, Admin!
								</div>
								<span className="text-600 font-medium">Sign in to continue</span>
							</div>
							
							<div>
								<CustomForm
									enableReinitialize
									initialValues={{email: "", password: ""}}
									validationSchema={schema}
									onSubmitFunction={loginAdmin}
									loading={isLoading}
									formButtonProps={{
										className:'w-full p-3 text-xl'
									}}
									// BeforeSubmitButton={<BeforeSubmitButton/>}
									// AfterSubmitButton={savedAccount && <AfterSubmitButton/>}
									submitButtonText="Login"
									formInputs={inputList}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
