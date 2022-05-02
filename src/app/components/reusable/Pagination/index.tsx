import React from "react"
import { Strong, Tab, Tablist } from "evergreen-ui"

interface PaginationProps {
	pages: number[]
	selectedPage: number
	setSelectedPage: (number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	pages, selectedPage, setSelectedPage
}) => {
	return (
		<Tablist display="flex">
	      {pages.map((tab, index) => (
	        <Tab
	          key={tab}
	          id={`${tab}`}
	          onSelect={() => setSelectedPage(index + 1)}
	          isSelected={index + 1 === selectedPage}
	          aria-controls={`panel-${tab}`}
	          direction="vertical"
	          height={34}
	          marginLeft={4}
	          width={35}
	          display="flex"
	          justifyContent="center"
	        >
	          <Strong>{ tab }</Strong>
	        </Tab>
	      ))}
	  </Tablist>
	)
}

export default Pagination