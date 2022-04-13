import React, { useState } from "react"
import {
	Button,
	Heading,
	Pane,
	SelectMenu,
	SelectMenuItem,
	SendMessageIcon
} from "evergreen-ui"

import DocxUploader from "../../../components/singletone/DocxUploader"

const UploadTests = () => {

	const [formData, setFormData] = useState({
		competence: undefined,
		discipline: undefined
	})

	const setSelectedField = (item: SelectMenuItem, fieldName: keyof typeof formData) => {
		setFormData(prev => ({
			...prev,
			[fieldName]: item.value
		}))
	}

	const onFormConfirm = ({
		file,
		rejectHandler
	}: {
		file: File,
		rejectHandler: () => void
	}) => {
		return () => {
			console.log(formData, file, rejectHandler)
		}
	}

	return (
		<Pane
				width="34%"
				display="flex"
				flexDirection="column"
				alignItems="center"
				margin="auto"
			>
			<Pane marginBottom={30}>
				<Heading size={700} borderBottom="1px solid black">
					Загрузка нового теста
				</Heading>
			</Pane>
			<SelectMenu
        hasTitle={false}
        onSelect={(item: SelectMenuItem) => setSelectedField(item, "competence")}
        selected={formData.competence}
        options={[
          "Apple", "Apricot",
          "Banana", "Cherry",
          "Cucumber"]
          .map(
            (label) => ({label, value: label})
          )}
      >
        <Button width="100%" marginBottom={20}>
          Выберите компетенцию . . .
        </Button>
      </SelectMenu>
      <SelectMenu
        hasTitle={false}
        onSelect={(item: SelectMenuItem) => setSelectedField(item, "discipline")}
        selected={formData.discipline}
        options={[
          "Apple", "Apricot",
          "Banana", "Cherry",
          "Cucumber"]
          .map(
            (label) => ({label, value: label})
          )}
      >
        <Button width="100%" marginBottom={20}>
          Выберите дисциплину . . .
        </Button>
      </SelectMenu>
			<DocxUploader>
				{(fileData) =>
					<Button
							width="100%"
							marginTop={20}
							appearance="primary"
							intent="success"
							onClick={onFormConfirm(fileData)}
						>
		      	<SendMessageIcon marginRight={16} />
		      	Загрузить тест
		      </Button>
				}
			</DocxUploader>
		</Pane>
	)
}

export default UploadTests