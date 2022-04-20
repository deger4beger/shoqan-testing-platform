import React from "react"
import { FileCard, FileUploader, Pane } from "evergreen-ui"
import { observer } from "mobx-react"

interface ChildrenParams {
  file: File
  rejectHandler: () => void
}

interface DocxUploaderProps {
  children: (params: ChildrenParams) => void
}

const DocxUploader: React.FC<DocxUploaderProps> = ({children}) => {
  const [files, setFiles] = React.useState<File[]>([])
  const [fileRejections, setFileRejections] = React.useState<File[]>([])
  const handleChange = (files) => {
    setFiles([files[0]])
  }
  const handleRejected = (fileRejections) => setFileRejections([fileRejections[0]])
  const handleRemove = () => {
    setFiles([])
    setFileRejections([])
  }
  return (
    <Pane width="100%">
      <FileUploader
        label="Загрузить тест"
        description="Вы можете загрузить 1 файл с тестом, файл может быть весом до 50 мб."
        maxSizeInBytes={50 * 1024 ** 2}
        maxFiles={1}
        onChange={handleChange}
        onRejected={handleRejected}
        renderFile={(file) => {
          const { name, size, type } = file
          const fileRejection = fileRejections.find((fileRejection) => (fileRejection as any).file === file)
          const { message } = fileRejection || {} as any
          return (
            <FileCard
              key={name}
              isInvalid={fileRejection != null}
              name={name}
              onRemove={handleRemove}
              sizeInBytes={size}
              type={type}
              validationMessage={message}
            />
          )
        }}
        values={files}
      />
      {children({file: files[0], rejectHandler: handleRemove})}
    </Pane>
  )
}

export default observer(DocxUploader)