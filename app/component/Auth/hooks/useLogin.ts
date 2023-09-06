"use client";
import { signInWithEmailAndPassword, getAuth, UserCredential, AuthError } from "firebase/auth";
import firebase_app from "../../../../config";
import { useState } from "react";

const auth = getAuth(firebase_app);

interface ILoginHook {
	onComplete?: (res: UserCredential) => void
	onError?: (error: AuthError) => void
}


export default function useLogin({onComplete, onError}: ILoginHook = {}) {
	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState<AuthError>()
	const [data, setData] = useState<UserCredential | undefined>()

	const handleLogin = ({ email, password }: { email: string, password: string }) => {
		setLoading(true)
		signInWithEmailAndPassword(auth, email, password).then((res) => {
			onComplete?.(res)
			return setData(res);
		}).catch((reason) => {
			onError?.(reason)
			setError(reason)
		}).finally(() => {
			setLoading(false)
		});
	}
	
	return { handleLogin, isLoading, data, error };
}
