import { ENftRarity } from "src/typings/INfts"
import { authApi } from "../api/baseApi"
import { IFile, IGroup, IGroups } from "./types"

export type IGetServerGroupByIdRequest = { groupId: string }
export type IPostOpenGroupNftRequest = { groupId: string; niftoryId: string }
export interface IPostSingleNFTResponse {
  id: string
  userId?: string
  status?: string
  modelID: string
  niftoryId: string
  serialNumber: number
  title: string
  rarity: ENftRarity
}
export interface IPostOpenGroupNftResponse extends IPostSingleNFTResponse {
  packaging: boolean | IPostSingleNFTResponse
  files: IFile[]
}

export const NftGroupsRequest = {
  async getServerGroups() {
    return authApi.get<{ data: IGroups[]; count: number }>("/server/groups").then((val) => val.data)
  },
  async getServerGroupById(props: IGetServerGroupByIdRequest) {
    return authApi.get<IGroup>(`/server/groups/${props.groupId}`).then((val) => val.data)
  },
  async postOpenGroupNft(props: IPostOpenGroupNftRequest) {
    return authApi
      .post<IPostOpenGroupNftResponse>(
        `/server/groups/open-group/${props.groupId}/${props.niftoryId}`
      )
      .then((val) => val.data)
  },
}
