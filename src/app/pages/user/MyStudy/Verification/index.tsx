import React, { useEffect, useRef } from "react"
import { Button } from "evergreen-ui"

const Verification = () => {

	const videoRef = useRef<null | HTMLVideoElement>(null)
	const photoRef = useRef<null | HTMLCanvasElement>(null)

	useEffect( ()=> {
    getVideo()
  }, [videoRef])

	const getVideo = () => {
    window.navigator.mediaDevices.getUserMedia({
      video: {
        width: 300,
        height: 400
      }
    }).then(stream => {
      let video = videoRef.current
      video!.srcObject = stream
      video!.play()
    })
  }

  const takePhoto = () => {
    const width = 300
    const height = 400
    let video = videoRef.current
    let photo = photoRef.current

    photo!.width = width
    photo!.height = height

    let ctx = photo!.getContext("2d")
    ctx!.drawImage(video as any, 0, 0, width, height)
  }

	return (
		<div>
			Verification
			<video ref={videoRef}></video>
			<Button onClick={() => takePhoto()} />
			<canvas ref={photoRef}></canvas>
		</div>
	)
}

export default Verification