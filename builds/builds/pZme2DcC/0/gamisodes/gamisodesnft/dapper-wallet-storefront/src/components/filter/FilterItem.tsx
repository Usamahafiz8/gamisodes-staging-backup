import { useState, useCallback, useMemo, Dispatch, SetStateAction, FC, useEffect } from "react"
import cn from "classnames"
import Arrow from "src/icon/Filter-arrow.svg"
import { RenderOptions } from "./RenderOptions"
import { RenderType } from "./RenderType"
import { useRouter } from "next/router"
import { IFilterState } from "src/hooks/useCollectionFilter"
import { FilterStorage } from "src/utils/filterStorage"
import { ENftCollection } from "src/typings/INfts"
interface IFilterItem {
  item: IFilterState,
  filter: IFilterState[],
  setFilter: Dispatch<SetStateAction<IFilterState[]>>,
  index: number
}

export const FilterItem: FC<IFilterItem> = ({ item, filter, setFilter, index }) => {
  const { label: title, options, type } = item
  const loadIsOpen = useMemo(() => options?.some(({ selected }) => selected), [options])
  const router = useRouter()
  const collection: ENftCollection = router.query["collection"]?.toString() as ENftCollection
  const [isOpen, setOpen] = useState(false)

  useEffect(() => { setOpen(loadIsOpen) }, [options])

  const onSelectFilter = useCallback(
    (idx, typeIdx = null, subtypeIdx = null) =>
      (event) => {
        setFilter((prev) => {
          const updateFilter = [...prev]
          if (typeIdx !== null && subtypeIdx === null) {
            updateFilter[index].type[typeIdx].options[idx].selected = event.target.checked
          } else if (subtypeIdx !== null) {
            updateFilter[index].type[typeIdx].subtype[subtypeIdx].options[idx].selected =
              event.target.checked
          } else {
            updateFilter[index].options[idx].selected = event.target.checked
          }
          FilterStorage.set({ collection, filter: updateFilter })
          return updateFilter
        })
      },
    []
  )

  const renderType = useMemo(() => {
    return type?.map((typeItem, typeIndex) => (
      <RenderType
        key={typeIndex}
        typeItem={typeItem}
        onSelectFilter={onSelectFilter}
        typeIndex={typeIndex}
        filter={filter}
      />
    ))
  }, [type, filter])

  return (
    <div
      className={cn(
        { "h-full": isOpen, "h-14 hover:bg-gray-200": !isOpen },
        "bg-white",
        "text-black",
        "rounded-lg",
        "duration-300",
        "truncate"
      )}
    >
      <div
        className="grid grid-cols-12 cursor-pointer items-center p-4"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="col-span-10 font-bold text-base">{title}</div>
        <div className="col-span-2 justify-self-center">
          <Arrow className={cn({ "rotate-180": isOpen }, "duration-300")} />
        </div>
      </div>
      <div className="body">
        <div className="grid">
          {Array.isArray(type) && renderType}
          <RenderOptions options={options} onSelectFilter={onSelectFilter} />
        </div>
      </div>
    </div>
  )
}
