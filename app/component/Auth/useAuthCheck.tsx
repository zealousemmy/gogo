'use client';
import React, { useEffect } from 'react';
import {
	onAuthStateChanged,
	getAuth, User,
} from 'firebase/auth';
import config from "../../../config";


const auth = getAuth(config);


interface IAuth {
	onComplete?: (res: User) => void
	onError?: () => void
}

const useAuth = ({onComplete, onError}: IAuth = {}) => {
	const [user, setUser] = React.useState<User | null>(null);
	const [loading, setLoading] = React.useState(true);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user)
				// onComplete?.(user)
				setUser(user);
			} else {
				// onError?.()
				setUser(null);
			}
			setLoading(false);
		});
		
		return () => unsubscribe();
	}, []);
	
	return { user:true, loading:false };
};


export default useAuth;