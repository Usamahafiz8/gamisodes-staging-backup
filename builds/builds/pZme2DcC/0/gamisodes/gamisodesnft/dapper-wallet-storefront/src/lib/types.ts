import { NextComponentType, NextPageContext } from "next"
import { ReactElement, ReactNode } from "react"

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr]
}
type PageProps = {
  requireWallet?: boolean
  requireAuth?: boolean
  requiredCustodialWallet?: boolean
}

export type ComponentWithWallet<P = {}> = NextComponentType<NextPageContext, any, P> &
  PageProps & {
    getLayout?: (page: ReactElement) => ReactNode
  }

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
