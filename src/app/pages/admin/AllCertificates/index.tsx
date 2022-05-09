import React, { useEffect } from "react"

import CertificatesTable from "../../../components/templates/CertificatesTable"
import Preloader from "../../../components/reusable/Preloader"
import { Certificate } from "../../../../types"
import { observer } from "mobx-react"
import { useStores } from "../../../../lib/mobx"

const AllCertificates = () => {

	const { certificateStore } = useStores()

	useEffect(() => {
		certificateStore.getCertificates({
			all: 1
		})
		return () => {
			certificateStore.resetAllData()
		}
	}, [])

	if (!certificateStore.certificates) {
		return <Preloader />
	}

	return <CertificatesTable
		title="Список последних сертификатов студентов"
		certificates={certificateStore.certificates}
		isSearchShown
	/>
}

export default observer(AllCertificates)