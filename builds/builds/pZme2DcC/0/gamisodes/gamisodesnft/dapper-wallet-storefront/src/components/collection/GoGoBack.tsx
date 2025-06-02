import { memo } from "react"
import useSafeBackToCollection from "src/hooks/useSafeBackToCollection"
import Button from "src/ui/Button"

const GoGoBack = () => {
  const handleBtn = useSafeBackToCollection()

  return <Button onClick={handleBtn}>Go Go Back</Button>
}

export default memo(GoGoBack)
