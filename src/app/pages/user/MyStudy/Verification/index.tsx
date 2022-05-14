import React, { useState } from "react"
import { observer } from "mobx-react"
import StageOne from "./StageOne"
import StageTwo from "./StageTwo"
import CompleteStages from "./CompleteStages"
import { useStores } from "../../../../../lib/mobx"

const Verification = () => {

  const [isFirstStageComplete, setIsFirstStageComplete] = useState(false)
  const [isSecondStageComplete, setIsSecondStageComplete] = useState(false)

  const { passingStore } = useStores()

  if (!isFirstStageComplete) return (
    <StageOne
      complete={() => setIsFirstStageComplete(true)}
    />
  )

  if (!isSecondStageComplete) return (
    <StageTwo
      complete={() => setIsSecondStageComplete(true)}
    />
  )

  return <CompleteStages
    complete={() => passingStore.setAllowToPass(true)}
  />

}

export default observer(Verification)