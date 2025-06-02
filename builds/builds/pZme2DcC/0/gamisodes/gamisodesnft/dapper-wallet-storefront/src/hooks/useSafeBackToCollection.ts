import { useRouter } from "next/router"
import { useCallback } from "react"
import { useCollectionStore } from "src/store/collection"
import shallow from "zustand/shallow"

const setSelectedCollection = (state) => state.setCollection

export default function useSafeBackToCollection() {
  const router = useRouter()
  const selectedCollection: string = router.query["collection"]?.toString()
  const setCollection = useCollectionStore(setSelectedCollection, shallow)

  return useCallback(() => {
    if (window.history.length > 1) {
      router.back()
    } else {
      setCollection(selectedCollection)
      router.push(`/collection/${selectedCollection}`)
    }
  }, [])
}
