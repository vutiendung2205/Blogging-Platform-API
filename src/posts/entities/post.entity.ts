import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
