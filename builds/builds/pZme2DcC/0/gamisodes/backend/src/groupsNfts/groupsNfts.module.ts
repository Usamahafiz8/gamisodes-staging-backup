import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FilesOfGroupOfNfts,
  GroupsOfNfts,
  ModelOfGroup,
  PendingGroups,
} from 'src/db/entity';
import { FilesModule } from 'src/files/files.module';
import { ModelsModule } from 'src/models/models.module';
import { NftModule } from 'src/nft/nft.module';
import { GroupsNFTController } from './groupsNfts.controller';
import { GroupsNFTService } from './groupsNfts.service';

@Module({
  imports: [
    NftModule,
    TypeOrmModule.forFeature([
      PendingGroups,
      ModelOfGroup,
      GroupsOfNfts,
      FilesOfGroupOfNfts,
    ]),
    FilesModule,
    ModelsModule,
  ],
  controllers: [GroupsNFTController],
  providers: [GroupsNFTService],
  exports: [GroupsNFTService],
})
export class GroupsNFTModule { }
