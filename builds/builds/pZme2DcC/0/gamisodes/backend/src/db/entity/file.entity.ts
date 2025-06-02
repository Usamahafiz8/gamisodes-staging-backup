import { ApiExpose } from 'src/shared/utils';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Files' })
export class File {
  @PrimaryColumn()
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  id: string;

  @Column()
  @ApiExpose('jpg')
  fileType: string;

  @Column()
  @ApiExpose('Untitled')
  key: string;

  @Column()
  @ApiExpose('https://image...')
  url: string;
}
