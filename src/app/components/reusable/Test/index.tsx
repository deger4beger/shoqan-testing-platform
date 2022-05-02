import React, { useRef } from "react"
import { Heading, Pane, Strong, Tab, Tablist, Text } from "evergreen-ui"

interface TestProps {

}

const Test: React.FC<TestProps> = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [tabs] = React.useState(["300 тенге", "400 тенге", "350 тенге", "800 рублей", "1 гривна"])

  return (
    <Pane width="100%">
      <Heading size={600}>
        Сколько стоит мороженное в отмороженном магазине ?
      </Heading>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            id={tab}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
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