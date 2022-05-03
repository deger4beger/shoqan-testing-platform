import React, { useRef } from "react"
import { Heading, Pane, Strong, Tab, Tablist, Text } from "evergreen-ui"

interface TestProps {
  question: string
  answers: string[]
  selectedAnswerIndex: number
  setSelectedAnswer: (index: number) => void
}

const Test: React.FC<TestProps> = ({
  question,
  answers,
  setSelectedAnswer,
  selectedAnswerIndex
}) => {

  return (
    <Pane width="100%">
      <Heading size={600}>
        { question }
      </Heading>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {answers.map((tab, index) => (
          <Tab
            key={tab}
            id={tab}
            onSelect={() => setSelectedAnswer(index)}
            isSelected={index === selectedAnswerIndex}
            aria-controls={`panel-${tab}`}
            direction="vertical"
            marginLeft={16}
            marginTop={16}
            height={40}
          >
            <Strong>{ tab }</Strong>
          </Tab>
        ))}
      </Tablist>
    </Pane>
  )
}

export default Test