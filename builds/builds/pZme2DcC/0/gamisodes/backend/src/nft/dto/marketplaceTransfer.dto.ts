import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class MarketplaceTransferDto {
  @IsString()
  @IsNotEmpty()
  @ApiExpose('0xdd21aa1a7ddbf4a0', {
    required: true,
    description: 'Address of user which gets NFT',
  })
  recipientAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiExpose('eyJhbGciOiJSU...', {
    required: true,
    description: 'Signature for approval validity of the request',
  })
  signature: string;

  @IsString()
  @IsNotEmpty()
  @ApiExpose('40th Anniversary Blind Box and Keep Packaging', {
    required: true,
    description: 'Title of the transferred NFT',
  })
  title: string;

  @IsInt()
  @IsNotEmpty()
  @ApiExpose(5, { required: true, description: 'Level of the transferred NFT' })
  level: number;

  @IsInt()
  @IsNotEmpty()
  @ApiExpose(5, {
    required: true,
    description: 'Serial of the transferred NFT',
  })
  serialNumber: number;
}
