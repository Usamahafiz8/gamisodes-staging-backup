import { Skeleton } from "@chakra-ui/react"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { fetchData } from "fetcher"
import {
  MyWalletsDocument,
  MyWalletsQuery,
  MyWalletsQueryVariables,
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
} from "generated/graphql"
import { GetServerSidePropsContext } from "next"
import { memo } from "react"
import AppLayout from "src/components/AppLayout"
import BuyButton from "src/components/drops/BuyButtons"
import { CheckoutProvider } from "src/components/drops/checkout/CheckoutProvider"
import NFTModelDetail from "src/components/drops/NFTModelDetail"
import { useNftDetail } from "src/hooks/useNftDetail"
import { anyToBoolean } from "src/lib/convertor"
import { getAddressFromCookie } from "src/lib/cookieUtils"

const NFTModelDetailPage = () => {
  const { metadata, nftModelId, isSuccess } = useNftDetail()
  const NFT_READY_TO_BUY =
    metadata.amount - metadata.quantityMinted > 0 ? metadata.amount - metadata.quantityMinted : 0
  return (
    <>
      <AppLayout>
        <Skeleton className="mx-auto w-full" isLoaded={isSuccess}>
          <CheckoutProvider id={nftModelId}>
            <NFTModelDetail metadata={metadata}>
              {metadata.price > 0 ? (
                <BuyButton.Paid nftAvailableToBuy={NFT_READY_TO_BUY} />
              ) : (
                <BuyButton.Free nftAvailableToBuy={NFT_READY_TO_BUY} />
              )}
            </NFTModelDetail>
          </CheckoutProvider>
        </Skeleton>
      </AppLayout>
    </>
  )
}

const blockedId = ["f12b4186-d8f7-473b-9674-8866cf3f65ac", "439a25b0-a743-4484-bf28-4ac13a4f0d93"]

export async function getServerSideProps({ params, req, res }: GetServerSidePropsContext) {
  const urlParam = params.nftModelId as string
  if (blockedId.includes(urlParam)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  const queryClient = new QueryClient()
  const nftModelsVariables = { id: urlParam }
  await queryClient.prefetchQuery(
    ["nftModel", nftModelsVariables],
    fetchData<NftModelQuery, NftModelQueryVariables>(NftModelDocument, nftModelsVariables)
  )

  const data: NftModelQuery = await queryClient.getQueryData(["nftModel", nftModelsVariables])

  if (!data?.nftModel || anyToBoolean(data?.nftModel?.attributes?.isBlocked)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const address: string = getAddressFromCookie(req, res)

  if (address) {
    const myWalletsVariables = { address }
    await queryClient.prefetchQuery(
      ["myWallets", myWalletsVariables],
      fetchData<MyWalletsQuery, MyWalletsQueryVariables>(MyWalletsDocument, myWalletsVariables)
    )
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
export default memo(NFTModelDetailPage)
