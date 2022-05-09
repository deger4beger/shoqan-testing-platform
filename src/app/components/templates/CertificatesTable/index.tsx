import React, { useState } from 'react'
import { Dialog, Heading, Pane, Strong, Table } from "evergreen-ui"
import { Certificate } from "../../../../types"

interface CertificatesTableProps {
	title: string
	isSearchShown: boolean
	certificates: Certificate[]
}

const CertificatesTable: React.FC<CertificatesTableProps> = ({
	title,
	certificates,
	isSearchShown=false
}) => {

	const [isDialogShown, setIsDialogShown] = useState(false)
	const [selectedCertificateData, setSelectedCertificateData] = useState<null | Certificate>(null)
	const [filter, setFilter] = useState<string>("")

	const dialogTitle = `Сертификат №${selectedCertificateData?.id}`

	const onCertificateClick = (certificate) => {
		setSelectedCertificateData(certificate)
		setIsDialogShown(true)
	}

	const onFilterChange = (e: any) => {
		setFilter(e)
	}

	return (
		<Pane
				width="56%"
				display="flex"
				flexDirection="column"
				alignItems="center"
				margin="auto"
			>
			<Pane marginBottom={30}>
				<Heading size={600} borderBottom="2px solid #c1c4d6" paddingX={20} paddingBottom={4}>
					{title}
				</Heading>
			</Pane>
			<Table width="100%">
			  <Table.Head>
			    { isSearchShown ? <Table.SearchHeaderCell
			    			placeholder="Поиск"
			    			value={filter}
			    			onChange={onFilterChange}
			    		/> :
			    	<Table.TextHeaderCell>Имя прошедшего</Table.TextHeaderCell> }
			    <Table.TextHeaderCell>Название теста</Table.TextHeaderCell>
			    <Table.TextHeaderCell>Количество баллов <Heading size={100} display="inline-block">
			    	(Максимум: 30)
			   	</Heading></Table.TextHeaderCell>
			  </Table.Head>
			  <Table.VirtualBody height={610}>
			    {certificates.filter(el => el.fullName.toLowerCase().includes(filter)).map((certificate) => (
			      <Table.Row key={certificate.id} isSelectable onSelect={() => onCertificateClick(certificate)}>
			        <Table.TextCell>{certificate.fullName}</Table.TextCell>
			        <Table.TextCell>{certificate.testName}</Table.TextCell>
			        <Table.TextCell isNumber>{certificate.score}</Table.TextCell>
			      </Table.Row>
			    ))}
			  </Table.VirtualBody>
			</Table>
			<Dialog
        isShown={isDialogShown}
        title={dialogTitle}
        onCloseComplete={() => setIsDialogShown(false)}
        confirmLabel="Понятно"
        cancelLabel="Закрыть"
      >
      	<Pane>
        	<Strong>
        		• Идентификатор:
        	</Strong> {selectedCertificateData?.id}
        </Pane>
        <Pane marginTop={6}>
        	<Strong>
        		• Имя прошедшего:
        	</Strong> {selectedCertificateData?.fullName}
        </Pane>
        <Pane marginTop={6}>
        	<Strong>
        		• Название тестирования:
        	</Strong> {selectedCertificateData?.testName}
        </Pane>
        <Pane marginTop={6}>
        	<Strong>
        		• Дисциплина:
        	</Strong> {selectedCertificateData?.discipline}
        </Pane>
        <Pane marginTop={6}>
        	<Strong>
        		• Дата прохождения:
        	</Strong> {selectedCertificateData?.passDate}
        </Pane>
        <Pane marginTop={6}>
        	<Strong>
        		• Результат:
        	</Strong> {selectedCertificateData?.score}
        </Pane>
      </Dialog>
		</Pane>
	)
}

export default CertificatesTable