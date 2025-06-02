import { IFilterState } from "src/hooks/useCollectionFilter"
import { ENftCollection } from "src/typings/INfts"

interface IParams {
  collection: ENftCollection,
  filter: IFilterState[]
}

interface IFilterStorage {
  set: (params: IParams) => void,
  get: () => IParams | undefined
}
export const FilterStorage: IFilterStorage = {
  set: (params) => localStorage.setItem('filter', JSON.stringify(params)),
  get: () => JSON.parse(localStorage.getItem('filter'))
}