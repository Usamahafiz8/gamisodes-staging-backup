// ButtonComponent.tsx
import React, { PropsWithChildren, memo, useState } from "react"

type Props = PropsWithChildren<{ onClick: () => void }>
const ButtonComponent: React.FC<Props> = ({ onClick, children }) => {
  return (
    <div
      className="flex justify-center items-center w-16 h-16 p-12 border-2 border-pink-300 rounded-full shadow-lg fixed top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{ filter: "drop-shadow(0 0 3.1rem rgba(255,255,255, 0.8))" }}
      onClick={onClick}
    >
      <button className="h-0 w-0 ml-[calc(24px*2*0.14)] border-solid border-transparent border-t-[24px] border-b-[24px] border-l-[calc(24px*2*0.86)] border-l-pink-300 " />
    </div>
  )
}

export default memo(ButtonComponent)
