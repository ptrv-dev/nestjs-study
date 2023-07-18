import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'varchar', default: 'USER' })
  role: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
