import { useId } from 'react';
import { Formik, Field, Form, type FormikHelpers } from 'formik';
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
  deliveryMethod: 'pickup',
  restrictions: [],
  message: '',
};

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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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

          <label htmlFor={`${fieldId}-email`} className={css.label}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            className={css.field}
          />
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

        <button type="submit" className={css.btn}>
          Place order
        </button>
      </Form>
    </Formik>
  );
}
