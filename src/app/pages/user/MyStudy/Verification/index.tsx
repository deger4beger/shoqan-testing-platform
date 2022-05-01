import React, { useEffect, useRef, useState } from "react"
import {
  ArrowRightIcon,
  ArrowsHorizontalIcon,
  Button,
  Heading,
  InfoSignIcon,
  Pane,
  Strong
} from "evergreen-ui"
import * as faceapi from "face-api.js"
import { observer } from "mobx-react"
import { useStores } from "../../../../../lib/mobx"

const Verification = () => {

  const videoRef = useRef<null | HTMLVideoElement>(null)
  const photoRef = useRef<null | HTMLCanvasElement>(null)

  const [faceSimilarity, setFaceSimilarity] = useState<null | number>(null)
  const [isPhotoDone, setIsPhotoDone] = useState(false)
  const [isNetsLoading, setIsNetsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerificateDisabled, setIsVerificateDisabled] = useState(false)


  const { userStore } = useStores()

  useEffect( () => {
    const loadNets = async () => {
      setIsNetsLoading(true)
      await faceapi.loadSsdMobilenetv1Model("/models")
      await faceapi.loadTinyFaceDetectorModel("/models")
      await faceapi.loadFaceLandmarkModel("/models")
      await faceapi.loadFaceRecognitionModel("/models")
      setIsNetsLoading(false)
    }
    loadNets()
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
    isVerificateDisabled && setIsVerificateDisabled(false)
  }

  const verifyFace = async () => {
    try {
      setIsVerifying(true)

      const first = await faceapi
        .detectSingleFace(photoRef.current!)
        .withFaceLandmarks()
        .withFaceDescriptor()

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = userStore.profile!.photo

      const second = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor()

      const result = await faceapi.euclideanDistance(first!.descriptor, second!.descriptor)
      faceapi.draw.drawFaceLandmarks(photoRef.current!, first!)

      setFaceSimilarity(Math.round((1 - result) * 100))
      setIsVerifying(false)
      setIsVerificateDisabled(true)
    } catch (e) {
      setFaceSimilarity(0)
      setIsVerifying(false)
      console.log(e)
    }
  }

  const startTest = () => {
    console.log("test started")
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
        Сделайте фото профиля, схожешь должна быть &gt;50%
      </Heading>
    </Pane>
    <Pane display="flex" alignItems="center">
      <Pane border="3px solid #8f95b2" height={414} padding={4} marginRight={20}>
        <video ref={videoRef}></video>
      </Pane>
      <ArrowRightIcon color="muted" size={30} />
      <Pane
          marginX={20}
          border="3px solid #8f95b2"
          height={414}
          padding={4}
          position="relative"
        >
        <canvas ref={photoRef}></canvas>
        { !isPhotoDone && (
          <Strong position="absolute" width="100%" left="34%" top="47%">Сделайте фото</Strong>
        ) }
      </Pane>
      <ArrowsHorizontalIcon color="muted" size={30} />
      <Pane
          border="3px solid #8f95b2"
          height={414}
          padding={4}
          marginLeft={20}
        >
        <img
            src={userStore.profile!.photo}
            alt="#"
            width="300px"
            height="400px"
          />
      </Pane>
    </Pane>
    <Pane marginTop={40} display="flex" alignItems="center" position="relative" left={10}>
      <Button
          onClick={() => takePhoto()}
          appearance="primary"
          size="large"
          marginRight={20}
          disabled={isVerifying}
          isLoading={isNetsLoading}
        >
        Сделать фото
      </Button>
      <ArrowRightIcon color="muted" size={24} />
      <Button
          onClick={verifyFace}
          appearance="primary"
          size="large"
          intent="success"
          marginLeft={20}
          disabled={!isPhotoDone || isVerificateDisabled}
          isLoading={isVerifying}
        >
        Верифицировать
      </Button>
    </Pane>
    { faceSimilarity !== null && (
      <Pane marginTop={40} borderBottom="2px solid #c1c4d6" paddingX={10} paddingBottom={2}>
        <Strong size={500} color={faceSimilarity < 50 ? "red500" : "green600"}>
          Схожесть - {faceSimilarity}%
       </Strong>
      </Pane>
    ) }
    { faceSimilarity !== null && <Button
        onClick={startTest}
        appearance="primary"
        size="large"
        intent="none"
        marginTop={30}
        disabled={!faceSimilarity || (faceSimilarity < 50)}
        isLoading={false}
      >
      Начать тестирование
    </Button> }
    </Pane>
  )
}

export default observer(Verification)