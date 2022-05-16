import React, { useEffect, useRef, useState } from "react"

const useCamera = (width=300, height=400) => {

  const videoRef = useRef<null | HTMLVideoElement>(null)
  const photoRef = useRef<null | HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      stream?.getVideoTracks()[0].stop()
    }
  }, [])

  const getVideo = () => {
    window.navigator.mediaDevices.getUserMedia({
      video: {
        width,
        height
      }
    }).then(stream => {
      let video = videoRef.current
      video!.srcObject = stream
      video!.play()
      setStream(prev => stream)
    })
  }

  const takePhoto = () => {
    let video = videoRef.current
    let photo = photoRef.current

    photo!.width = width
    photo!.height = height

    let ctx = photo!.getContext("2d")
    ctx!.drawImage(video as any, 0, 0, width, height)
  }

  return { videoRef, photoRef, getVideo, takePhoto }

}

export default useCamera