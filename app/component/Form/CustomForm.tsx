"use client";
import React, { Fragment, ReactNode } from "react";
import { Field, Formik, FormikHelpers } from "formik";
import  { ButtonProps , Button} from 'primereact/button'
import styled from "styled-components";
import { ObjectSchema } from "yup";


export interface IFormInput {
	name: string;
	options?: object;
	format?: (value: any) => any;
	icon?: ReactNode;
	label?: string
	placeholder?: string | ReactNode;
	as: any;
}

export interface IFormValues<T> {
	[key: string]: T;
}


interface IForm<T> {
	removeInput?: Array<string>;
	initialValues: IFormValues<any>;
	validationSchema: ObjectSchema<any>;
	AfterSubmitButton?: ReactNode;
	BeforeSubmitButton?: ReactNode;
	onSubmitFunction: (values: IFormValues<T>, formikHelpers: FormikHelpers<IFormValues<T>>) => void;
	loading: boolean;
	removeSubmitButton?: boolean;
	enableReinitialize?: boolean;
	formInputs: Array<IFormInput>;
	submitButtonText?: string;
	formButtonProps?: ButtonProps;
	onInputChange?: (field: string, value: string) => any;
	validateOnMount?: boolean;
}

const CustomForm = <T extends {}>({ initialValues, validationSchema, AfterSubmitButton, BeforeSubmitButton, onSubmitFunction,
	                                  loading, removeInput=[], removeSubmitButton = false, onInputChange, formButtonProps={}, enableReinitialize,
	                                  validateOnMount = true, formInputs, submitButtonText = "Submit" }: IForm<T>) => {
	return (
		<>
			<Formik<IFormValues<T>>
				validateOnMount={validateOnMount}
				enableReinitialize={enableReinitialize}
				initialValues={initialValues}
				validationSchema={validationSchema}
				validateOnChange
				validateOnBlur
				onSubmit={onSubmitFunction}
			>
				{({
					  errors,
					  setFieldTouched,
					  values,
					  setFieldValue,
					  touched,
					  handleBlur,
					  handleSubmit,
					  isValid
				  }) => (
					<>
						{formInputs.map(({ name, icon, format,label, placeholder, as, options }) => {
							return (!removeInput?.includes(name) && <Fragment key={name}>
								<Field
									key={name}
									errors={errors}
									onBlur={handleBlur}
									format={format}
									touched={touched}
									label={label}
									options={options}
									value={values[name]}
									onChange={async (field: string, value: string) => {
										await setFieldValue(field, value);
										await setFieldTouched(field, true);
										onInputChange?.(field, value);
									}}
									icon={icon}
									as={as}
									{...options}
									placeholder={placeholder}
									name={name}
								/>
							</Fragment>);
						})}
						<>
							{BeforeSubmitButton}
							{!removeSubmitButton && <FormButtonStyle>
								<Button
									type="submit"
									label={submitButtonText}
									loading={loading}
									disabled={!isValid || loading}
									{...formButtonProps}
								/>
							</FormButtonStyle>}
							{AfterSubmitButton}
						</>
					</>
				)}
			</Formik>
		</>
	);
};


const FormButtonStyle = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CustomForm;
