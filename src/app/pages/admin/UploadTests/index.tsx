import React from 'react'
import { FileUploader, Pane } from "evergreen-ui"

const UploadTests = () => {
	return (
		<Pane width="100%" display="flex" justifyContent="center">
			<FileUploader />
		</Pane>
	)
}

export default UploadTests