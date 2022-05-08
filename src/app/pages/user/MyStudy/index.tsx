import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { withProfile } from "../../../hocs/withProfile"
import { useStores } from "../../../../lib/mobx"
import Preloader from "../../../components/reusable/Preloader"
import Psychology from "./Psychology"
import Common from "./Common"
import Verification from "./Verification"
import Testing from "./Testing"
import PassedInfo from "./PassedInfo"

const MyStudy = () => {

	const { testStore, passingStore } = useStores()

	useEffect(() => {
		testStore.getStressData()
		return () => {
			testStore.resetData()
			passingStore.resetData()
		}
	}, [])

	if (testStore.passed === null) {
		return <Preloader />
	}

	if (!testStore.passed) return <Psychology />

	if (passingStore.passedInfo) return <PassedInfo />

	if (passingStore.allowToPass) return <Testing />

	if (passingStore.test) return <Verification />

	return <Common />

}

export default withProfile(observer(MyStudy))