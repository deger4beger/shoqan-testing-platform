import React from "react"
import { Pane, Text, Tablist, Tab, Strong, KeyIcon, LogOutIcon } from "evergreen-ui"
import { Link, useLocation } from "react-router-dom"

import { useStores } from "../../../../lib/mobx"

interface HeaderProps {
  isAdmin: boolean
  userIdentifier: string
}

const Header: React.FC<HeaderProps> = ({ isAdmin, userIdentifier }) => {

  const {
    currentRoutes,
    currentRouteNames,
    cabinetUrlIndex
  } = (function() {
    const adminRouteNames = ["Загрузить тест", "Список сертификатов"]
    const adminRotes = ["/upload", "/certificates"]

    const userRouteNames = ["Моя учеба", "Мои сертификаты"]
    const userRotes = ["/study", "/certificates"]

    const currentRouteNames = isAdmin ? adminRouteNames : userRouteNames
    const currentRoutes = isAdmin ? adminRotes : userRotes
    const cabinetUrlIndex = currentRoutes.length
    return {
      currentRoutes,
      currentRouteNames,
      cabinetUrlIndex
    }
  }())

  const { authStore } = useStores()
  const currentLocation = useLocation().pathname

  const [tabs] = React.useState(currentRouteNames)
  const [selectedIndex, setSelectedIndex] = React.useState<
    null | number
  >(
    currentRoutes.includes(currentLocation) ? currentRoutes.indexOf(currentLocation) : cabinetUrlIndex
  )

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
            <Link to={currentRoutes[index]}>
              <Tab
                key={tab}
                id={tab}
                appearance="primary"
                onSelect={() => setSelectedIndex(index)}
                isSelected={index === selectedIndex}
                aria-controls={`panel-${tab}`}
                fontSize={14}
                marginLeft={(index !== 0) ? 20 : 0}
              >
                { tab }
              </Tab>
            </Link>
          ))}
          </Pane>
          <Pane>
            <Link to="/cabinet">
              <Tab
                key={userIdentifier}
                id={userIdentifier}
                appearance="primary"
                onSelect={() => setSelectedIndex(cabinetUrlIndex)}
                isSelected={selectedIndex === cabinetUrlIndex}
                aria-controls={`panel-${userIdentifier}`}
                fontSize={14}
              >
                <KeyIcon marginRight={10} />
                Личный кабинет
              </Tab>
            </Link>
            <Tab
                appearance="primary"
                marginLeft= {20}
                fontSize={14}
                onClick={() =>
                  authStore.logout()
                }>
              <LogOutIcon />&nbsp;Выйти
            </Tab>
          </Pane>
        </Tablist>
      </Pane>
  );
}

export default Header