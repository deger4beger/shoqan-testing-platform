import React, { useState } from "react"
import {
	Button, CornerDialog, Heading,
	Pane,
	SelectMenu,
	SelectMenuItem,
	SendMessageIcon
} from "evergreen-ui"
import { observer } from "mobx-react"

import DocxUploader from "../../../components/singletone/DocxUploader"
import MultipleSelect from "../../../components/reusable/MultipleSelect"
import { useStores } from "../../../../lib/mobx"
import { notify } from "../../../helpers"
import { Competence, Discipline } from "../../../../types"

const UploadTests = () => {

	const [discipline, setDiscipline] = useState<undefined | Discipline>(undefined)
	const [competencies, setCompetencies] = useState<Competence[]>([])

	const { testStore } = useStores()

	const onFormConfirm = ({
		file,
		rejectHandler
	}: {
		file: File,
		rejectHandler: () => void
	}) => {
		return async () => {
			await testStore.uploadTest({
				info: {
					discipline: discipline!,
					competencies
				},
				file
			})
			if (!testStore.states.errors.upload) {
				notify("Тест успешно загружен", "success")
				rejectHandler()
			}
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
				<Heading size={600} borderBottom="2px solid #c1c4d6" paddingX={20} paddingBottom={4}>
					Загрузка нового теста
				</Heading>
			</Pane>
      <SelectMenu
        hasTitle={false}
        hasFilter={false}
        onSelect={(item: SelectMenuItem) => setDiscipline(item.value as Discipline)}
        selected={discipline}
        options={
        	Object.values(Discipline)
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
      	values={Object.values(Competence)}
      	selectedItemsState={competencies}
      	setSelectedItems={setCompetencies as any}
      />
			<DocxUploader>
				{(fileData) =>
					<Button
							width="100%"
							marginTop={20}
							appearance="primary"
							disabled={!discipline || !competencies.length || !fileData.file}
							isLoading={testStore.states.loading.upload}
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

export default observer(UploadTests)