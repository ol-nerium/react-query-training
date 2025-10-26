import { useId } from 'react';
import { Formik, Field, Form, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './OrderForm.module.css';

interface OrderFormValues {
  username: string;
  email: string;
  deliveryTime: string;
  deliveryMethod: string;
  restrictions: string[];
  message: string;
}

const initialValues: OrderFormValues = {
  username: 'Petro',
  email: 'Peeppa@mail.com',
  deliveryTime: '',
  deliveryMethod: '',
  restrictions: [],
  message: '',
};

const OrderFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Name must be at least 2 chracters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid mail adress')
    .required('Email is required'),
  deliveryTime: Yup.string()
    .oneOf(['morning', 'afternoon', 'evening'], 'Invalid deliveryTime value')
    .required('deliveryTime is required'),
  deliveryMethod: Yup.string()
    .oneOf(['pickup', 'courier', 'drone'], 'Invalid delivery method')
    .required('deliveryMethod is required'),
  restrictions: Yup.array().of(Yup.string()),
  message: Yup.string()
    .min(2, 'Message is too short')
    .max(300, 'Message is too long'),
});

export default function OrderForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log('Order data:', values);
    // console.log('Actions', actions);
    actions.resetForm();
  };
  //Formik самостійно обробляє відправку форми та збирає значення полів.
  // Функція handleSubmit має два параметри:
  // values – об’єкт зі значеннями всіх полів форми
  // actions – набір методів, які надає Formik для керування формою.
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={OrderFormSchema}
    >
      <Form className={css.form}>
        {/* initialValues – об’єкт початкових значень полів. 
      onSubmit – функція, яка викликається при сабміті форми. */}
        {/* Field – це обгортка над input, textarea або select. */}
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Client Info</legend>

          <label htmlFor={`${fieldId}-username`} className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="username"
            id={`${fieldId}-username`}
            className={css.field}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.error}
          />

          <label htmlFor={`${fieldId}-email`} className={css.label}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            className={css.field}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
        </fieldset>

        <label htmlFor={`${fieldId}-deliveryTime`}>
          Preferred delivery time
        </label>
        <Field as="select" name="deliveryTime" id={`${fieldId}-deliveryTime`}>
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00–12:00)</option>
          <option value="afternoon">Afternoon (12:00–16:00)</option>
          <option value="evening">Evening (16:00–20:00)</option>
        </Field>
        {/* Щоб змінити HTML-елемент, потрібно передати проп as="назва_тега"
        компоненту Field. */}
        <ErrorMessage
          name="deliveryTime"
          component="span"
          className={css.error}
        />

        <fieldset className={`${css.fieldset} ${css.delivery}`}>
          <legend className={css.legend}>Choose delivery method:</legend>

          <label className={css.option}>
            <Field type="radio" name="deliveryMethod" value="pickup" />
            Pickup
          </label>
          <label className={css.option}>
            <Field type="radio" name="deliveryMethod" value="courier" />
            Courier
          </label>
          <label className={css.option}>
            <Field type="radio" name="deliveryMethod" value="drone" />
            Drone delivery
          </label>
          <ErrorMessage
            name="deliveryMethod"
            component="span"
            className={css.error}
          />
        </fieldset>

        <fieldset className={`${css.fieldset} ${css.restrictions}`}>
          <legend className={css.legend}>Dietary restrictions</legend>

          <label>
            <Field type="checkbox" name="restrictions" value="gluten-free" />
            Gluten Free
          </label>
          <label>
            <Field type="checkbox" name="restrictions" value="nut-free" />
            Nut Free
          </label>
          <label>
            <Field type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>
        </fieldset>

        <label htmlFor={`${fieldId}-message`}>Additional message</label>
        <Field
          as="textarea"
          name="message"
          rows={5}
          id={`${fieldId}-message`}
          className={css.textarea}
        />
        <ErrorMessage name="message" component="span" className={css.error} />

        <button type="submit" className={css.btn}>
          Place order
        </button>
      </Form>
    </Formik>
  );
}
