import React from "react"

import { Certificate } from "../../../../types"
import CertificatesTable from "../../../components/templates/CertificatesTable"

const AllCertificates = () => {

	const certificates: Certificate[] = [
		{
			id: "1",
			fullName: "Богдан",
			testName: "Тестирование по ...",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "1",
			fullName: "Богдан",
			testName: "Тестирование по ...",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "1",
			fullName: "Богдан",
			testName: "Тестирование по ...",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "1",
			fullName: "Богдан",
			testName: "Тестирование по ...",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "1",
			fullName: "Богдан",
			testName: "Тестирование по ...",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "1",
			fullName: "Богдан",
			testName: "Тестирование по ...",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		}
	]

	return <CertificatesTable
		title="Список последних сертификатов студентов"
		certificates={certificates}
		isSearchShown
	/>
}

export default AllCertificates