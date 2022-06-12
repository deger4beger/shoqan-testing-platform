import React, { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js"
import Timer from "../../reusable/Timer"
import { Button, Heading, Pane, Strong } from "evergreen-ui"
import { notify } from "../../../helpers"
import useCamera from "../../../hooks/useCamera"

interface ControlPanelProps {
  isTestStarted: boolean
  isAbleToEnd: boolean
  isTestLoading: boolean
  isPassTestLoading: boolean
  secondsLeft: number,
  callbackData: CallbackData
  onStartTest: () => void
  onFinishTest: (answersList?: string[], testId?: string) => void
}

interface CallbackData {
  isTestFinished: boolean,
  testId: string | undefined
  answers: string[]
}

interface CallbackDataRef extends CallbackData {
  isTestStarted: boolean
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isTestStarted,
  isTestLoading,
  onStartTest,
  onFinishTest,
  secondsLeft,
  isAbleToEnd,
  callbackData,
  isPassTestLoading,
}) => {

  const intervalRef = useRef<null | NodeJS.Timer>(null)
  const [isProctoringStarted, setIsProctoringStarted] = useState(false)
  const [msWithoutCamera, setMsWithoutCamera] = useState(0)

  const { photoRef, videoRef, getVideo } = useCamera(320, 180)

  const callbackDataRef = useRef<CallbackDataRef | null>(null)
  callbackDataRef.current = {
    ...callbackData,
    isTestStarted
  }

  useEffect(() => {
    getVideo()
    return () => {
      clearTimeout(intervalRef.current!)
      if (!callbackDataRef.current!.isTestFinished && callbackDataRef.current!.isTestStarted) {
        const { answers, testId } = callbackDataRef.current!
        onFinishTest(answers, testId)
        notify(
          "Тестирование закончено, так как вы вышли со страницы",
          "notify",
          5,
          "Внимание"
        )
      }
    }
  }, [])

  useEffect(() => {
    if (secondsLeft === 0) {
      notify(
        "Тест закончен, время истекло",
        "notify",
        5,
        "Внимание"
      )
      onFinishTest()
    }
  }, [secondsLeft])

  useEffect(() => {
    if (msWithoutCamera === 6000 && isTestStarted) {
      notify(
        "Вы завалили тест, не появлявшись на камере",
        "danger",
        5,
        "Ошибка"
      )
      onFinishTest()
    }
  }, [msWithoutCamera])

  const runProctoring = async () => {
    const msToRecalculate = 100

    !isProctoringStarted && setIsProctoringStarted(true)
    const mtcnnForwardParams = {
      minFaceSize: 80,
    }
    const mtcnnResults = await faceapi.mtcnn(
      videoRef.current!,
      mtcnnForwardParams as any
    )

    photoRef.current!.getContext('2d')!.clearRect(0, 0, 320, 180)
    faceapi.draw.drawDetections(photoRef.current!, mtcnnResults)

    if (mtcnnResults.length === 0) {
      setMsWithoutCamera(prev => prev += msToRecalculate)
    }
    if (mtcnnResults.length !== 0) {
      setMsWithoutCamera(prev => 0)
    }

    intervalRef.current = setTimeout(() => {
      runProctoring()
    }, msToRecalculate)
  }

  return (
    <Pane
      borderBottom="3px solid #c1c4d6"
      width="100%"
      display="flex"
      height="198px"
    >
      <Pane display="flex" alignItems="flex-end">
        <Pane
            height={34}
            display="flex"
            alignItems="center"
            paddingX={10}
            width="70px"
            border="3px solid #c1c4d6"
            borderBottom={false}
            borderLeft={false}
            borderTopRightRadius={6}
          >
          <Timer secondsLeft={secondsLeft} />
        </Pane>
      </Pane>
      <Pane
          height="100%"
          border="3px solid #c1c4d6"
          padding={6}
          position="relative"
          borderBottom={false}
          marginLeft={16}
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
          <canvas ref={photoRef} />
        </Pane>
      </Pane>
      <Pane
          height="100%"
          width="100%"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          marginRight={26}
        >
        <Pane
            border="3px solid #c1c4d6"
            padding={3}
            borderBottom={false}
            borderTopLeftRadius={6}
            borderTopRightRadius={6}
            marginLeft={6}
            display="flex"
            flexWrap="wrap"
          >
          <Button
              onClick={runProctoring}
              size="medium"
              intent="none"
              disabled={isProctoringStarted}
              isLoading={false}
              margin={6}
              marginRight={12}
              flexGrow={1}
              // width="100%"
            >
            Начать прокторинг
          </Button>
          <Button
              onClick={onStartTest}
              size="medium"
              intent="none"
              disabled={!isProctoringStarted || isTestStarted}
              isLoading={isTestLoading}
              margin={6}
              marginRight={12}
              flexGrow={1}
              // width="100%"
            >
            Начать тестирование
          </Button>
          <Button
              onClick={() => onFinishTest()}
              size="medium"
              intent="none"
              disabled={!isAbleToEnd}
              isLoading={isPassTestLoading}
              margin={6}
              flexGrow={1}
              // width="100%"
            >
            Закончить тестирование
          </Button>
        </Pane>
      </Pane>
    </Pane>
  )
}

export default ControlPanel