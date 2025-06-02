import { ApiExpose } from 'src/shared/utils';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PendingOrders' })
export class PendingOrders {
  @PrimaryColumn()
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  id: string;

  @Column({ name: 'nftId', array: true, type: 'uuid' })
  @ApiExpose('11d55374-ebc3-4097-9ba4-5be57da3fb85')
  nftIds: string[];

  @Column({ name: 'orderId' })
  @ApiExpose(12345678)
  orderId: number;

  @Column({ name: 'lineItemId' })
  @ApiExpose(12345678)
  lineItemId: number;

  @Column()
  @ApiExpose(32)
  quantity: number;
}
