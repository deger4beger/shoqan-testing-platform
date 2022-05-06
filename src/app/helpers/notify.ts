import { toaster } from "evergreen-ui"

export const notify = (
	content: string,
	type: "warning" | "danger" | "success" | "notify",
	duration: number = 5,
	description: string = ""
) => {
	toaster[type](description, {
		duration: duration,
		description: content
	})
}