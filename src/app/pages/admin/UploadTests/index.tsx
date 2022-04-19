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
import MultipleSelect from "../../../components/reusable/MultipleSelect"

const UploadTests = () => {

	const [discipline, setDiscipline] = useState<undefined | string>(undefined)
	const [competencies, setCompetencies] = useState<string[]>([])

	const onFormConfirm = ({
		file,
		rejectHandler
	}: {
		file: File,
		rejectHandler: () => void
	}) => {
		return () => {
			console.log(discipline, competencies, file)
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
        onSelect={(item: SelectMenuItem) => setDiscipline(item.value as string)}
        selected={discipline}
        options={[
          "Apple", "Apricot",
          "Banana", "Cherry",
          "Cucumber"]
          .map(
            (label) => ({label, value: label})
          )}
      >
        <Button width="100%" marginBottom={20}>
          { discipline || "Выберите дисциплину . . ." }
        </Button>
      </SelectMenu>
      <MultipleSelect
      	title="Выберите компетенции . . ."
      	values={["Компетенция1", "Компетенция2", "Компетенция3"]}
      	selectedItemsState={competencies}
      	setSelectedItems={setCompetencies}
      />
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