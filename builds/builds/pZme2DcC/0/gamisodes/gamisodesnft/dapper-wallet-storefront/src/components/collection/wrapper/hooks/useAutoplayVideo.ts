import { useState, useCallback, RefObject } from "react"

const useVideoPlayer = (videoElement: RefObject<HTMLVideoElement | null>) => {
  const [showPlayButton, setShowPlayButton] = useState(true)

  const playVideo = useCallback(() => {
    if (videoElement) {
      videoElement?.current
        .play()
        .then(() => setShowPlayButton(false))
        .catch(() => setShowPlayButton(true))
    }
  }, [])

  const handlePlayButtonClick = useCallback(() => {
    setShowPlayButton(false)
    playVideo()
  }, [playVideo])

  return {
    showPlayButton,
    handlePlayButtonClick,
    playVideo,
  }
}

export default useVideoPlayer
