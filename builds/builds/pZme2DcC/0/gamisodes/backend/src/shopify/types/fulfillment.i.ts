export interface IFulfillment {
  id: number;
  status: string;
  supported_actions: string[];
  line_items: {
    id: number;
    shop_id: number;
    fulfillment_order_id: number;
    quantity: number;
    line_item_id: number;
    inventory_item_id: number;
    fulfillable_quantity: number;
    variant_id: number;
  }[];
}
