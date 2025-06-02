import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { ShopifyService } from './shopify.service';

@Controller('shopify')
@ApiExcludeController()
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Post('webhook/orders/paid')
  async orderPaid(@Body() body: any, @Res() res: Response) {
    res.sendStatus(200);
    return await this.shopifyService.ordersPaid(body);
  }
}
