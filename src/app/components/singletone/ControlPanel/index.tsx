import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import * as faceapi from "face-api.js"
import { Button, Heading, Pane, Strong } from "evergreen-ui"

const ControlPanel = () => {

  const videoRef = useRef<null | HTMLVideoElement>(null)
  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [isProctoringStarted, setIsProctoringStarted] = useState(false)

  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true)
      await faceapi.loadMtcnnModel("/models")
      setIsModelLoading(false)
    }
    loadModel()
    getVideo()
  }, [])

  const getVideo = () => {
    window.navigator.mediaDevices.getUserMedia({
      video: {
        width: 320,
        height: 180
      }
    }).then(stream => {
      let video = videoRef.current
      video!.srcObject = stream
      video!.play()
    })
  }

  const runProctoring = async () => {
    !isProctoringStarted && setIsProctoringStarted(true)
    const mtcnnForwardParams = {
      minFaceSize: 80,
    }
    const mtcnnResults = await faceapi.mtcnn(
      videoRef.current!,
      mtcnnForwardParams as any
    )

    canvasRef.current!.getContext('2d')!.clearRect(0, 0, 320, 180)

    faceapi.draw.drawDetections(canvasRef.current!, mtcnnResults)
    setTimeout(() => {
      runProctoring()
    }, 100)
  }

  return (
    <Pane
      borderBottom="3px solid #c1c4d6"
      width="100%"
      display="flex"
      height="198px"
    >
      <Pane
          height="100%"
          border="3px solid #c1c4d6"
          padding={6}
          position="relative"
          borderBottom={false}
          marginLeft={26}
          borderTopLeftRadius={6}
          borderTopRightRadius={6}
        >
        <video ref={videoRef} style={{
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px"
        }}></video>
        <Pane
            position="absolute"
            top={6}
            left={6}
            width={320}
            height={180}
            borderTopLeftRadius={6}
            borderTopRightRadius={6}
          >
          <canvas ref={canvasRef} />
        </Pane>
      </Pane>
      <Pane
          height="100%"
          width="100%"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          marginRight={26}
          flexWrap="wrap"
        >
        <Pane
            border="3px solid #c1c4d6"
            padding={3}
            borderBottom={false}
            borderTopLeftRadius={6}
            borderTopRightRadius={6}
            marginLeft={6}
          >
          <Button
              onClick={runProctoring}
              size="medium"
              intent="none"
              disabled={isModelLoading || isProctoringStarted}
              isLoading={false}
              margin={6}
              marginRight={12}
            >
            Начать прокторинг
          </Button>
          <Button
              // onClick={startTest}
              size="medium"
              intent="none"
              disabled={isModelLoading || !isProctoringStarted}
              isLoading={false}
              margin={6}
              marginRight={12}
            >
            Начать тестирование
          </Button>
          <Button
              // onClick={startTest}
              size="medium"
              intent="none"
              disabled={isModelLoading}
              isLoading={false}
              margin={6}
            >
            Закончить тестирование
          </Button>
        </Pane>
      </Pane>
    </Pane>
  )
}

export default ControlPanel