import { Dispatch, FC, SetStateAction } from "react"
import { IFilterState } from "src/hooks/useCollectionFilter"
import { FilterItem } from "./FilterItem"
interface ICollectionFilter {
  filter: IFilterState[],
  setFilter: Dispatch<SetStateAction<IFilterState[]>>,
}

export const CollectionFilter: FC<ICollectionFilter> = ({ filter, setFilter }) => (
  <div className="grid gap-4">
    {filter?.map((item, index) => {
      return (
        <FilterItem
          key={index}
          item={item}
          filter={filter}
          setFilter={setFilter}
          index={index}
        />
      )
    })}
  </div>
)
