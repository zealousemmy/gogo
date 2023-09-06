import React, { useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';

const CustomError = (props:any) => {
    const toastRef = useRef<any>(null);

    useEffect(() => {
        handleErrorMessage();
    }, [props.error]);

    const handleErrorMessage = () => {
        const { error } = props;

        if (error.message === 'UNAUTHENTICATED') {
            toastRef.current.show({
                severity: 'error',
                summary: 'Authentication Error',
                detail: 'You are not authenticated.',
            });
        } else if (error.message === 'VALIDATION_FAILED') {
            toastRef.current.show({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Your request data is invalid.',
            });
        } else if (error.message === 'FORBIDDEN') {
            toastRef.current.show({
                severity: 'error',
                summary: 'Forbidden Error',
                detail: 'You do not have permission to access this resource.',
            });
        } else if (error.message === 'BAD_USER_INPUT') {
            toastRef.current.show({
                severity: 'error',
                summary: 'Bad User Input Error',
                detail: 'The input provided is not valid.',
            });
        } else {
            toastRef.current.show({
                severity: 'error',
                summary: 'An error occurred',
                detail: 'An error occurred.',
            });
        }

        toastRef.current.show({severity:'success', summary: 'Success', detail:'updates has been successful', life: 3000});
    };

    return (
        <div>
            <Toast ref={toastRef} />
            {props.children}
        </div>
    );
};

export default CustomError;
