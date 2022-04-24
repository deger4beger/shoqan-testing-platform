import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { withProfile } from "../../../hocs/withProfile"
import { useStores } from "../../../../lib/mobx"
import Preloader from "../../../components/reusable/Preloader"
import Psychology from "./Psychology"
import Common from "./Common"

const MyStudy = () => {

	const { testStore } = useStores()

	useEffect(() => {
		testStore.getStressData()
		return () => {
			testStore.resetData()
		}
	}, [])

	if (testStore.passed === null) {
		return <Preloader />
	}

	if (!testStore.passed) return <Psychology />

	return <Common />

}

export default withProfile(observer(MyStudy))