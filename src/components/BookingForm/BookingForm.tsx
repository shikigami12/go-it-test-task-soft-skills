import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import css from './BookingForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from "react";

interface BookingFormProps {
    onSubmit: (values: BookingFormValues) => void;
}

export interface BookingFormValues {
    name: string;
    email: string;
    bookingDate: Date | null;
    comments: string;
}

const BookingForm = ({onSubmit}: BookingFormProps) => {
    const [dateTimePlaceholder, setDateTimePlaceholder] = useState<string>('Booking date*');
    const today = new Date();

    const handleSubmit = (values: BookingFormValues, helpers: FormikHelpers<BookingFormValues>) => {
        onSubmit(values);
        helpers.resetForm();
        helpers.setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                bookingDate: null,
                comments: ''
            } as BookingFormValues}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
                bookingDate: Yup.date().nullable()
                    .required('Booking date is required')
                    .min(today, 'Select a date between today')
            })}
            onSubmit={handleSubmit}
        >
            {({isSubmitting, setFieldValue, values}) => (
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            className={css.formControl}
                            placeholder="Name*"
                        />
                        <ErrorMessage name="name" component="div" className={css.errorMsg}/>
                    </div>

                    <div className={css.formGroup}>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            className={css.formControl}
                            placeholder="Email*"
                        />
                        <ErrorMessage name="email" component="div" className={css.errorMsg}/>
                    </div>

                    <div className={css.formGroup}>
                        <DatePicker
                            id="bookingDate"
                            className={css.formControl}
                            selected={values.bookingDate}
                            onChange={(date) => {
                                if (date && date < today) {
                                    setDateTimePlaceholder("Select a date between today");
                                    return setFieldValue('bookingDate', null);
                                }
                                return setFieldValue('bookingDate', date);
                            }}
                            placeholderText={dateTimePlaceholder}
                            dateFormat="dd.MM.yyyy"
                        />
                        <ErrorMessage name="bookingDate" component="div" className={css.errorMsg}/>
                    </div>

                    <div className={css.formGroup}>
                        <Field
                            as="textarea"
                            name="comments"
                            id="comments"
                            className={css.formControl}
                            placeholder="Comment"
                            rows="3"
                        />
                    </div>

                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default BookingForm;
