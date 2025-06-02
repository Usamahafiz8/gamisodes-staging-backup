import cn from "classnames"
import React, { FC, memo } from "react"

interface IEdition {
  editionNumber: number
  id: string
}

interface IRenderEditionsList {
  nftEditions: {
    counter: number
    editions: IEdition[]
  }
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, edition: IEdition) => void
  checkedNftEditionValue: number
  transferIsLoading?: boolean
  activeColor: string
}

const RenderEditionsList: FC<IRenderEditionsList> = ({
  nftEditions,
  onClick,
  checkedNftEditionValue,
  transferIsLoading = false,
  activeColor,
}) => {

  return (
    <>
      {nftEditions?.editions
        .sort((a, b) => a.editionNumber - b.editionNumber)
        .map((edition, idx) => (
          <button
            key={idx}
            className={cn(
              "w-fit font-dosis font-normal text-xl text-center text-white py-1 px-3 disabled:cursor-not-allowed",
              `${edition.editionNumber === checkedNftEditionValue
                ? activeColor
                : "bg-header disabled:bg-pink-900"
              }`,
              `${onClick ? 'cursor-pointer transition-all' : 'cursor-auto'}`,
              `${edition.editionNumber === checkedNftEditionValue ? "hover:bg-lime-400" : "hover:bg-header.hover"}`
            )}
            onClick={onClick ? (event) => onClick(event, edition) : undefined}
            disabled={transferIsLoading || edition.editionNumber === 0}
          >
            {edition.editionNumber !== 0 ? edition.editionNumber : "Transfer Initiated"}
          </button>
        ))}
    </>
  )
}

export default memo(RenderEditionsList)
