import { toaster } from "evergreen-ui"

export const notify = (
	content: string,
	type: "error" | "success" | "notify",
	duration: number = 5,
	description: string = ""
) => {
	toaster[type](description, {
		duration: duration,
		description: content
	})
}