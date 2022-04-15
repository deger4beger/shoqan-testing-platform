import React from "react"

import { Certificate } from "../../../../types"
import CertificatesTable from "../../../components/templates/CertificatesTable"

const AllCertificates = () => {

	const certificates: Certificate[] = [
		{
			id: "1",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "12",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну",
			score: 0,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "123",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну",
			score: 32,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "1234",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну",
			score: 100,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "12345",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну",
			score: 96,
			passDate: "2022/13/04 13.22",
			discipline: "ИТ в Горном деле",
			competence: "3NBLH80H"
		},
		{
			id: "123456",
			fullName: "Марат Барат Багдан",
			testName: "Тестирование по говну",
			score: 54,
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