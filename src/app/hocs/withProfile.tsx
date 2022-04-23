import { observer } from "mobx-react"
import { Redirect } from "react-router-dom"
import { useStores } from "../../lib/mobx"

export const withProfile = (Component) => {
	const RedirectComponent = (props) => {

		const { userStore } = useStores()

		if (!userStore.profile) return <Redirect to="/cabinet" />
		return <Component {...props} />
	}

	return observer(RedirectComponent)
}