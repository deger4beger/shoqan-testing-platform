import React, { useState } from 'react'
import { Dialog, Heading, Pane, Table } from "evergreen-ui"
import { Certificate } from "../../../../types"

interface CertificatesTableProps {
	title: string
	isSearchShown: boolean
	certificates: Certificate[]
}

const CertificatesTable = ({ title, certificates, isSearchShown=false }) => {

	const [isDialogShown, setIsDialogShown] = useState(false)
	const [selectedCertificateData, setSelectedCertificateData] = useState<null | Certificate>(null)

	const dialogTitle = `Сертификат №${selectedCertificateData?.id}`

	const onCertificateClick = (certificate) => {
		setSelectedCertificateData(certificate)
		setIsDialogShown(true)
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
				<Heading size={700} borderBottom="1px solid black">
					{title}
				</Heading>
			</Pane>
			<Table width="100%">
			  <Table.Head>
			    { isSearchShown ? <Table.SearchHeaderCell placeholder="Поиск" /> :
			    	<Table.TextHeaderCell>Имя прошедшего</Table.TextHeaderCell> }
			    <Table.TextHeaderCell>Название теста</Table.TextHeaderCell>
			    <Table.TextHeaderCell>Количество баллов <Heading size={100} display="inline-block">
			    	(Максимум: 100)
			   	</Heading></Table.TextHeaderCell>
			  </Table.Head>
			  <Table.VirtualBody height={500}>
			    {certificates.map((certificate) => (
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
      >
      	<Pane>
        	Идентификатор: {selectedCertificateData?.id}
        </Pane>
        <Pane>
        	Имя прошедшего: {selectedCertificateData?.fullName}
        </Pane>
        <Pane>
        	Название тестирования: {selectedCertificateData?.testName}
        </Pane>
        <Pane>
        	Результат: {selectedCertificateData?.score}
        </Pane>
        И другое гавно
      </Dialog>
		</Pane>
	)
}

export default CertificatesTable