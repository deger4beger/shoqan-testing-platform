import React, { useEffect } from "react"

import { Certificate } from "../../../../types"
import CertificatesTable from "../../../components/templates/CertificatesTable"
import { withProfile } from "../../../hocs/withProfile"
import { observer } from "mobx-react"
import { useStores } from "../../../../lib/mobx"
import Preloader from "../../../components/reusable/Preloader"

const MyCertificates = () => {

	const { certificateStore } = useStores()

	useEffect(() => {
		certificateStore.getCertificates({
			all: 0
		})
		return () => {
			certificateStore.resetAllData()
		}
	}, [])

	if (!certificateStore.certificates) {
		return <Preloader />
	}

	return <CertificatesTable
		title="Список моих сертификатов"
		certificates={certificateStore.certificates}
		isSearchShown={false}
	/>
}

export default withProfile(observer(MyCertificates))