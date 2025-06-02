import React, { FC, memo, useEffect, useState } from "react"
import { randomInteger } from "src/utils/randomInteger"

interface ITextBellowButton {
  transferIsLoading: boolean
  nftEditionsCounter: number
  isBlockedByTime: boolean
}

const loadingMessages = [
  "Fetching information... Penny and Brain are on the case!",
  "Analyzing data... Just one more gadget tweak!",
  "Processing... Inspector Gadget is on the job!",
  "Optimizing... Dr. Claw won't stand a chance!",
  "Initializing... Get ready for some gadget magic!",
  "Loading... Go, go, gadget progress bar!",
]
const LoadingScreen = () => {
  const [message, setMessage] = useState(loadingMessages[0])

  useEffect(() => {
    // Create a function to update the message randomly
    const updateMessage = () => {
      // const randomIndex = Math.floor(Math.random() * loadingMessages.length)
      setMessage(loadingMessages[randomInteger(0, loadingMessages.length - 1)])
    }

    // Set an interval to update the message every 2.5 seconds (adjust the interval as needed)
    const intervalId = setInterval(updateMessage, 2500)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  return <p className="pt-2">{message}</p>
}

const TextBellowButton: FC<ITextBellowButton> = ({
  transferIsLoading,
  nftEditionsCounter,
  isBlockedByTime,
}) => {
  if (!transferIsLoading && nftEditionsCounter > 1 && !isBlockedByTime) {
    return <p className="pt-2">* Before the opening please choose which number you want to open</p>
  } else if (transferIsLoading) {
    return <LoadingScreen />
  }
  return (
    <p className="pt-2">
      <br />
      <br />
    </p>
  )
}
export default memo(TextBellowButton)
