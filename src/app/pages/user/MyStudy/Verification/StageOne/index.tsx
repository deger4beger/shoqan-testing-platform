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
import { useStores } from "../../../../../../lib/mobx"
import Title from "../../../../../components/reusable/Title"
import { dataURItoBlob } from "../../../../../helpers"
import useCamera from "../../../../../hooks/useCamera"

interface StageOneProps {
  complete: () => void
}

const StageOne: React.FC<StageOneProps> = ({
  complete
}) => {

  const [faceSimilarity, setFaceSimilarity] = useState<null | number>(null)
  const [isPhotoDone, setIsPhotoDone] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerificateDisabled, setIsVerificateDisabled] = useState(false)

  const { videoRef, photoRef, getVideo, takePhoto } = useCamera()

  const { userStore } = useStores()

  useEffect( () => {
    getVideo()
  }, [videoRef])

  const onTakePhoto = () => {
    takePhoto()
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
    }
  }

  return (
    <Pane
      width="56%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
    >
      <Title
        icon={ <InfoSignIcon color="info" marginRight={16} /> }
        title="Верификация #1"
        description="Сделайте фото профиля, схожешь должна быть &gt;50%"
      />
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
            onClick={() => onTakePhoto()}
            appearance="primary"
            size="large"
            marginRight={20}
            disabled={isVerifying}
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
          onClick={complete}
          appearance="primary"
          size="large"
          intent="none"
          marginTop={30}
          disabled={!faceSimilarity || (faceSimilarity < 50)}
          isLoading={false}
        >
        Продолжить
      </Button> }
    </Pane>
  )
}

export default observer(StageOne)