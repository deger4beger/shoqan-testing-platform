import React, { useState } from "react"
import { Dialog, Heading, Pane, Table, Text } from "evergreen-ui"
import { Certificate } from "../../../../types"

const AllCertificates = () => {

	const [isDialogShown, setIsDialogShown] = useState(false)
	const [selectedCertificateData, setSelectedCertificateData] = useState<null | Certificate>(null)
	const certificates: Certificate[] = [
		{
			id: "1",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну ебучему",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "12",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну ебучему",
			score: 0,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "123",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну ебучему",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "1234",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну ебучему",
			score: 100,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "12345",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну ебучему",
			score: 96,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "123456",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну ебучему",
			score: 54,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		}
	]
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
					Список сертификатов всех студентов
				</Heading>
			</Pane>
			<Table width="100%">
			  <Table.Head>
			    <Table.SearchHeaderCell placeholder="Поиск" />
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

export default AllCertificates