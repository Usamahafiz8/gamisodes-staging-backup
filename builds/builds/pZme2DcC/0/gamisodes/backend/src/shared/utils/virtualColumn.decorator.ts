import { Column } from 'typeorm';

export const VirtualColumn = () =>
  Column({ select: false, insert: false, update: false, type: 'text' });
