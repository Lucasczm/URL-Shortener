import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Encurtador {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 10 })
  @Index('IDX_CODE')
  code: string;

  @Column()
  @ApiProperty({ example: 'https://wisereducacao.com' })
  url: string;

  @CreateDateColumn()
  created_at: Date;
}

export class ResposeEncurtador {
  @ApiProperty({ example: 'http://localhost:3000/abc123' })
  newUrl: string;
}
