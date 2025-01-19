import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SenderType } from './types';

@Entity('quote')
export class Quote {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fName: string;

  @Column()
  lName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  sourceLanguage: string;

  @Column()
  targetLanguage: string;

  @Column()
  translationType: string;

  @Column()
  file: string;

  @Column()
  message: string;

  @Column()
  type: SenderType;

  @Column({ nullable: true, default: false })
  isOpened: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
