import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

export class Timestamp {
  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @BeforeInsert()
  setTimestamps(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }
}
