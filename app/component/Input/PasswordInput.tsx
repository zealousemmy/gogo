"use client";
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Password } from "primereact/password";

type name = string;
type touched = { [key in name]: boolean };
type errors = { [key in name]: string };

export interface IInput {
	icon?: ReactNode,
	inputStyle?: HTMLStyleElement,
	touched?: touched
	name: name
	value: string
	label?: string
	formatValue?: (value: string) => string
	errors?: errors
	placeholder: string
	options?: any
	onChange: (name: string, value: string) => void
}

const PasswordInput = ({
	                       placeholder,
	                       onChange = () => undefined,
	                       value = '',
	                       options = {},
	                       label,
	                       touched = {},
	                       formatValue,
	                       name,
	                       errors = {}
                       }: IInput) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(name, formatValue ? formatValue(e.target.value) : e.target.value);
	};
	return (
		<Container>
			{label && <label
				htmlFor={placeholder}
				className="block text-900 font-medium text-xl mb-2"
			>
				{label}
			</label>}
			<Password
				inputId={name}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={handleChange}
				toggleMask
				{...options}
			></Password>
			<ErrorMessageContainer>
				<ErrorMessageDisplay>{touched[name] && errors[name] ? errors[name] : null}</ErrorMessageDisplay>
			</ErrorMessageContainer>
		</Container>
	);
};


const Container = styled.div`
  .p-password {
    margin-bottom: .7rem !important;
  }
`;
const ErrorMessageContainer = styled.div`
`;
const ErrorMessageDisplay = styled.div`
  color: ${({theme}) => theme.error};
  text-transform: capitalize;
  font-size: 12px;
  position: relative;
`;
export default PasswordInput;
