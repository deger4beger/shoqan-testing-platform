import { toaster } from "evergreen-ui"

export const notify = (content, type: "error" | "success" | "notify" ) => {
	toaster[type](content)
}