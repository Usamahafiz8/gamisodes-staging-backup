import { useRouter } from "next/router"
import { ForwardedRef, forwardRef, memo, useCallback, useImperativeHandle, useRef } from "react"
import { useIsomorphicEffect } from "rooks"
import { useModal } from "src/hooks/useModal"
import { IVideoModalWrapper } from "../interface"
import VideoModal from "./VideoModal"
import useVideoPlayer from "./hooks/useAutoplayVideo"
import PlayButton from "./PlayButton"

function usePassedRef<T>(passedRef: ForwardedRef<T>) {
  const videoRef = useRef<T>(null)
  useImperativeHandle(passedRef, () => videoRef.current)
  return videoRef
}

const VideoModalWrapper = forwardRef<HTMLVideoElement, IVideoModalWrapper>(
  function VideoModalWrapper({ videoFileArrays, successRedirectLink }, passedRef): JSX.Element {
    const router = useRouter()
    const videoRef = usePassedRef(passedRef)

    const { showPlayButton, handlePlayButtonClick, playVideo } = useVideoPlayer(videoRef)

    const { closeModal, openModal, isOpen } = useModal({ timeout: undefined })

    const beforeEnterAnimation = useCallback(() => {
      // console.log("beforeEnterAnimation:", videoRef)
      videoRef?.current?.pause()
    }, [])

    const afterEnterAnimation = useCallback(() => {
      // console.log("afterEnterAnimation:", videoRef)
      playVideo()
    }, [])

    const handleVideoEnd = useCallback(() => {
      closeModal()
      if (successRedirectLink) {
        router.replace(successRedirectLink)
      }
    }, [successRedirectLink])

    useIsomorphicEffect(() => {
      if (videoFileArrays?.length > 0) {
        openModal()
      }
    }, [videoFileArrays])

    return (
      <VideoModal
        closeModal={closeModal}
        isOpen={isOpen}
        beforeEnter={beforeEnterAnimation}
        afterEnter={afterEnterAnimation}
        afterLeave={closeModal}
      >
        {showPlayButton && <PlayButton onClick={handlePlayButtonClick} />}
        <video
          onEnded={handleVideoEnd}
          ref={videoRef}
          preload="auto"
          className="z-50 w-screen h-screen"
          width="400"
          autoPlay
          playsInline
        >
          {videoFileArrays?.map((videoSrc, index) => {
            const url = videoSrc.url
            return <source key={index} src={url} type={videoSrc.fileType} />
          })}
          Your browser does not support HTML video.
        </video>
      </VideoModal>
    )
  }
)

export default memo(VideoModalWrapper)
