import * as React from "react"

import Image from "next/image"

import classNames from "classnames"
import { Carousel, CarouselSlide, useCarousel } from "./Carousel"
import { INft } from "src/typings/INfts"

interface GalleryProps {
  nft: INft
}

const Gallery = ({ nft }: GalleryProps) => {
  // const [index, setIndex] = React.useState(0)
  // const [currentSlide, setCurrentSlide] = React.useState(0)

  // const [ref] = useCarousel({
  //   slides: {
  //     perView: 5,
  //     spacing: 16,
  //   },
  //   slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
  // })

  const content = {
    contentType: nft.imageUrl.contentType,
    contentUrl: nft?.imageUrl?.mediaURL,
    thumbnailUrl: nft?.imageUrl?.thumbnailUrl || nft?.imageUrl?.mediaURL,
    alt: nft?.title,
  }

  return (
    <div className="flex w-full h-full flex-col gap-3 max-h-[600px]">
      <div className="flex relative h-full">
        {content.contentType?.includes("video") ? (
          <video
            className="rounded-[38px]"
            style={{
              objectFit: "scale-down",
            }}
            width={450}
            src={content.contentUrl}
            loop
            muted
            playsInline
            autoPlay
          />
        ) : (
          <Image
            className="w-full h-full object-contain"
            src={content.contentUrl}
            // fill
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL="/Inspector_footer.png"
            priority
            alt={content.alt}
          />
        )}
      </div>
      {/* <div className="flex">
        <Carousel ref={ref} direction="row" width="lg">
          {content.map((media, i) => (
            <CarouselSlide key={i} onClick={() => setIndex(i)} cursor="pointer">
              <div
                className={classNames("hover:opacity-100 aspect-square transition-opacity", {
                  "opacity-40": index !== i,
                  "opacity-100": index === i,
                })}
              >
                <Image
                  className="aspect-square h-full object-cover"
                  src={media.thumbnailUrl}
                  fill
                  alt={media.alt}
                />
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
      </div> */}
    </div>
  )
}

export default React.memo(Gallery)
