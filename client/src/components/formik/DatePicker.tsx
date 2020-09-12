/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import { FieldProps } from 'formik';
import { Field } from 'formik-antd';
import { FormikFieldProps } from 'formik-antd/lib/FieldProps';

import { DatePicker as $DatePicker } from '../atoms/DatePicker';

type $DatePickerProps = React.ComponentProps<typeof $DatePicker>;
type $MonthPickerProps = React.ComponentProps<typeof $DatePicker['MonthPicker']>;
type $RangePickerProps = React.ComponentProps<typeof $DatePicker['RangePicker']>;
type $WeekPickerProps = React.ComponentProps<typeof $DatePicker['WeekPicker']>;

const { MonthPicker: $MonthPicker, RangePicker: $RangePicker, WeekPicker: $WeekPicker } = $DatePicker;

export type DatePickerProps = $DatePickerProps & FormikFieldProps;

export type WeekPickerProps = FormikFieldProps & $WeekPickerProps;
export type RangePickerProps = FormikFieldProps & $RangePickerProps;
export type MonthPickerProps = FormikFieldProps & $MonthPickerProps;

export const DatePicker = ({ name, validate, onChange, fast, ...restProps }: DatePickerProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
      <$DatePicker
        value={value}
        onChange={(date, dateString) => {
          setFieldValue(name, date);
          setFieldTouched(name, true, false);

          if (onChange) onChange(date, dateString);
        }}
        {...restProps}
      />
    )}
  </Field>
);

DatePicker.MonthPicker = ({ name, validate, onChange, ...restProps }: MonthPickerProps) => (
  <Field name={name} validate={validate}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
      <$MonthPicker
        value={value}
        onChange={(date, dateString) => {
          setFieldValue(name, date);
          setFieldTouched(name, true, false);

          if (onChange) onChange(date, dateString);
        }}
        {...restProps}
      />
    )}
  </Field>
);

DatePicker.RangePicker = ({ name, validate, onChange, ...restProps }: RangePickerProps) => (
  <Field name={name} validate={validate}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
      <$RangePicker
        name={name}
        value={value}
        onChange={(dates, dateStrings) => {
          setFieldValue(name, dates);
          setFieldTouched(name, true, false);

          if (onChange) onChange(dates, dateStrings);
        }}
        {...restProps}
      />
    )}
  </Field>
);

DatePicker.WeekPicker = ({ name, validate, onChange, ...restProps }: WeekPickerProps) => (
  <Field name={name} validate={validate}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
      <$WeekPicker
        name={name}
        value={value}
        onChange={(date, dateString) => {
          setFieldValue(name, date);
          setFieldTouched(name, true, false);

          if (onChange) onChange(date, dateString);
        }}
        {...restProps}
      />
    )}
  </Field>
);
