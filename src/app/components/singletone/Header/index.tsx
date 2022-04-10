import React from "react"
import { Pane, Text, Tablist, Tab, Strong, KeyIcon } from "evergreen-ui"

interface HeaderProps {
  isAdmin: null | boolean
}

const Header: React.FC<HeaderProps> = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [tabs] = React.useState(["Моя страница", "Моя учеба", "Мои сертификаты"])

  return (
      <Pane
        height="46px"
        width="100%"
        background="gray200"
        display="flex"
        borderBottom={true}
        borderWidth={2}
        borderColor="#c1c4d6"
      >
        <Tablist
          marginRight={12}
          marginLeft={12}
          width="60%"
          margin="auto"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Pane>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              appearance="primary"
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
              aria-controls={`panel-${tab}`}
              fontSize={14}
            >
              {tab}
            </Tab>
          ))}
          </Pane>
          <Pane>
            <Tab
              key={"deger.begerrr@gmail.com"}
              id={"deger.begerrr@gmail.com"}
              appearance="primary"
              onSelect={() => setSelectedIndex(tabs.length)}
              isSelected={selectedIndex === tabs.length}
              aria-controls={`panel-${"deger.begerrr@gmail.com"}`}
              fontSize={14}
            >
              <KeyIcon marginRight={10} />
              deger.begerrr@gmail.com
            </Tab>
          </Pane>
        </Tablist>
      </Pane>
  );
}

export default Header