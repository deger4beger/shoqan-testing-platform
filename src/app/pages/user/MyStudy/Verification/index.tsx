import React, { useEffect, useRef, useState } from "react"
import { ArrowRightIcon, ArrowsHorizontalIcon, Button, Heading, InfoSignIcon, Pane, Strong } from "evergreen-ui"

const Verification = () => {

  const videoRef = useRef<null | HTMLVideoElement>(null)
  const photoRef = useRef<null | HTMLCanvasElement>(null)

  const [isPhotoDone, setIsPhotoDone] = useState(false)

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
    setIsPhotoDone(true)
  }

  return (
    <Pane
      width="56%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
    >
    <Pane marginBottom={50} display="flex" flexDirection="column" alignItems="center">
      <Heading size={600} borderBottom="2px solid #c1c4d6" paddingX={20} paddingBottom={4}>
        <InfoSignIcon color="info" marginRight={16} />Пройдите верификацию для начала тестирования
      </Heading>
      <Heading size={200} marginTop={8}>
        Сделайте фото профиля, схожешь должна быть &gt;80%
      </Heading>
    </Pane>
    <Pane display="flex" alignItems="center">
      <Pane border="3px solid #8f95b2" height={414} padding={4} marginRight={20}>
        <video ref={videoRef}></video>
      </Pane>
      <ArrowRightIcon color="muted" size={30} />
      <Pane marginLeft={20} border="3px solid #8f95b2" height={414} padding={4} position="relative">
        <canvas ref={photoRef}></canvas>
        { !isPhotoDone && (
          <Strong position="absolute" width="100%" left="34%" top="47%">Сделайте фото</Strong>
        ) }
      </Pane>
    </Pane>
    <Pane marginTop={40} display="flex" alignItems="center" position="relative" left={10}>
      <Button
          onClick={() => takePhoto()}
          appearance="primary"
          size="large"
          marginRight={20}
        >
        Сделать фото
      </Button>
      <ArrowRightIcon color="muted" size={24} />
      <Button
          onClick={() => console.log("varif")}
          appearance="primary"
          size="large"
          intent="success"
          marginLeft={20}
          disabled={!isPhotoDone}
        >
        Верифицировать
      </Button>
    </Pane>
    </Pane>
  )
}

export default Verification