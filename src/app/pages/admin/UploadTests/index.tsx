import React from "react"
import { Pane } from "evergreen-ui"

import DocxUploader from "../../../components/singletone/FileUploader"

const UploadTests = () => {

	return (
		<Pane width="100%" display="flex" justifyContent="center">
			<DocxUploader>
				{({file, rejectHandler}) => {
					console.log(file, rejectHandler)
				}}
			</DocxUploader>
		</Pane>
	)
}

export default UploadTests