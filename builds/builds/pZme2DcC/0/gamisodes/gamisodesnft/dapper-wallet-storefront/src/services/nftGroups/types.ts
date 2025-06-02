import { EGroupTypes } from "src/typings/EGroupTypes"

interface IModelFromBackend {
  id: string
  niftoryId: string
  fileUrl: string
  title: string
  description: string
  numEntities: number
  m_platform: string
  m_property: string
  m_collection: string
  m_series: number
  m_type: string
  m_rarity: any
  m_missionNum: any
  m_mintLevel: any
  m_level: any
  m_rank: any
  m_editionSize: number
  m_artist: string
  m_signed: any
  m_externalURL: string
  m_copyright: string
  a_price: number
  a_maxNftForUser: any
  a_isBlocked: any
  checkoutDisclaimer: any
  isOpenEdition: any
}

export interface IFile {
  fileType: string
  id: string
  key: string
  url: string
}

export type IGroups = {
  id: string
  cardFaceModelId: string
  cardFaceModel: IModelFromBackend
  type: EGroupTypes
  unpackagingDate: string
}

export type IGroup = IGroups & {
  files?: IFile[]
  models?: { groupId: string; id: string; modelId: string; chance: any }[]
}
