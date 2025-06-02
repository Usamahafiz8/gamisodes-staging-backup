import { Transform } from 'class-transformer';

export const ToInt = () => Transform(({ value }) => Number(value));

export const ToBoolean = () =>
  Transform(({ value }) => (value ? value !== 'false' : undefined));
