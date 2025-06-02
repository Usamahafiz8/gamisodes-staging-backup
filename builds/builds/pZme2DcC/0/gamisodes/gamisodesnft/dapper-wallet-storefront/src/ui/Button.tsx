import classNames from "classnames"
import { ButtonHTMLAttributes, memo, PropsWithChildren } from "react"
import { Loading } from "src/icon/Loading"

interface IButton extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  isLoading?: boolean
  loadingText?: string | JSX.Element
}
function Button({ isLoading, loadingText, children, ...props }: IButton) {
  return (
    <button
      {...props}
      className={classNames(
        "inline-flex px-5 py-2 rounded-[5px] uppercase font-bold text-base font-dosis bg-header disabled:bg-pink-900 disabled:opacity-90 hover:bg-header.hover transition-all duration-300",
        props.className,
        { "bg-pink-900": isLoading }
      )}
      disabled={props.disabled ?? isLoading ?? undefined}
    >
      {isLoading ? (
        <div className="flex items-center h-[20px]">
          <Loading size="small" />
          {(loadingText && loadingText) || children}
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default memo(Button)
