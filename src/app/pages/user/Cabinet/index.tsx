import React, { useEffect, useState } from "react"
import { Button,
	Combobox,
	FilePicker, Heading, InfoSignIcon, InlineAlert, MimeType, Pane,
	SendMessageIcon, Strong, TextInputField
} from "evergreen-ui"
import { useStores } from "../../../../lib/mobx"
import { observer } from "mobx-react"
import UserProfileFilled from "../../../components/singletone/UserProfileFilled"
import Preloader from "../../../components/reusable/Preloader"
import CompetenceCard from "../../../components/reusable/CompetenceCard"
import SymbolsPerSecond from "../../../components/reusable/SymbolsPerSecond"
import useCamera from "../../../hooks/useCamera"
import Title from "../../../components/reusable/Title"
import { dataURItoBlob } from "../../../helpers"

const UserCabinet = () => {

	const { userStore } = useStores()
	const { videoRef, photoRef, getVideo, takePhoto } = useCamera(300, 400)

  const [formData, setFormData] = useState({
  	fullname: "",
  	specialty: "",
  	course: ""
  })
  const [photo, setPhoto] = useState<null | FileList>(null)
  const [SPS, setSPS] = useState<null | number>(null) // symbols per second
  const [error, setError] = useState<null | string>(null)
  const [isCameraShown, setIsCameraShown] = useState(false)

  const isBtnDisabled = Object.values(formData).some(el => !el) || !photo || !SPS

  useEffect(() => {
  	userStore.getCabinetData()
  	return () => {
  		userStore.cleanData()
  	}
  }, [])

  const isFormDisabled = !!userStore.profile

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
    	...prev,
    	fullname: e.target.value
    }))
  }

  const setSelectedField = (item: any, fieldName: keyof typeof formData) => {
		setFormData(prev => ({
			...prev,
			[fieldName]: item
		}))
	}

	const onFormConfirm = async () => {
		let localError = null as null | string
		const photoFile = (photo as FileList)[0]
		if (photoFile.size > 1000000) {
			localError = "Максимальный размер фото - 1 мб."
		}

		if (!localError) {
			const promise = new Promise((resolve, reject) => {
				const img = new Image()
		    img.src = window.URL.createObjectURL( photoFile )
		    img.onload = function() {
		      const width = (this as any).naturalWidth,
		      height = (this as any).naturalHeight

		      const format = height / width
		      if ( !(1.2 <= format) || !(1.4 >= format) ) {
		      	resolve("Разрешение фото должно быть 4:3")
		      }
		      resolve(null)
		    }
			})
			const error = await promise
			if (error) {
				localError = error as any
			}
		}

    if (localError) {
    	setError(localError)
    	return
    }
   	setError(null)
		userStore.sendProfile({
			...formData,
			sps: SPS!,
			photo: photoFile
		})
	}

	const onSetSPS = (sps: number) => {
		setSPS(sps)
	}

	const onShowCamera = () => {
		getVideo()
		setIsCameraShown(true)
	}
	const onMakePhoto = () => {
		takePhoto()
		setPhoto([dataURItoBlob(photoRef.current!.toDataURL())] as any)
	}

	if (!userStore.isInitialized || userStore.states.loading.base) {
		return <Preloader />
	}

  return (
    <>
      <Pane
        width="60%"
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
      	<Pane width={480}>
    			{ !isFormDisabled ? (
    				<>
		      		<Title
					      icon={ <InfoSignIcon color="info" marginRight={16} /> }
					      title="Заполните анкету, чтобы продолжить дальше"
					    />
			      	<TextInputField
			          label="ФИО"
			          placeholder="Введите ФИО"
			          width="100%"
			          marginTop={30}
			          onChange={onFullNameChange}
			          value={formData.fullname}
			          disabled={isFormDisabled}
			        />
			      	<Combobox
							  openOnFocus
							  items={["Корпоративные информационные системы", "Вычислительная техника и ПО"]}
							  onChange={selected => setSelectedField(selected, "specialty")}
							  selectedItem={formData.specialty}
							  placeholder="Специальность"
							  width="100%"
							  marginBottom={20}
							  disabled={isFormDisabled}
							/>
							<Combobox
							  openOnFocus
							  items={['1', '2', '3', '4']}
							  onChange={selected => setSelectedField(selected, "course")}
							  selectedItem={formData.course}
							  placeholder="Курс"
							  width="100%"
							  marginBottom={20}
							  disabled={isFormDisabled}
							/>
							<Pane borderBottom={true} paddingBottom={6} marginBottom={10}>
								<Heading size={500} textAlign="center">
									Загрузите фото
								</Heading>
							</Pane>
							<FilePicker
									width="100%"
									onChange={(photo) => setPhoto(photo)}
									placeholder="Фото"
									marginBottom={10}
									disabled={isFormDisabled}
									accept={[MimeType.jpeg, MimeType.png]}
								/>
							<Pane textAlign="center" borderTop={true} paddingTop={10} >
								<Heading size={500} textAlign="center" paddingBottom={10}>
									Или сделайте фото
								</Heading>
								{ !isCameraShown && <Button width={200} onClick={onShowCamera}>
									Открыть камеру
								</Button> }
							</Pane>
							{ isCameraShown && (
								<Pane display="flex" alignItems="center" flexDirection="column">
									<Pane display="flex" justifyContent="center">
										<Pane
												border="3px solid #8f95b2"
												height={414}
												width={314}
												padding={4}
												marginRight={20}
											>
						          <video ref={videoRef}></video>
						        </Pane>
						        <Pane
						            border="3px solid #8f95b2"
						            height={414}
												width={314}
						            padding={4}
						            position="relative"
						          >
						          <canvas ref={photoRef}></canvas>
						          { !photo && <Strong position="absolute" width="100%" left="34%" top="47%">
						          	Сделайте фото
						          </Strong> }
						        </Pane>
					        </Pane>
					        <Button width={200} onClick={onMakePhoto} marginTop={20}>
										Сделать фото
									</Button>
				        </Pane>
							) }
							<SymbolsPerSecond
								onSetSPS={onSetSPS}
							/>
							{ error && (
								<InlineAlert intent="danger" paddingTop={4} paddingLeft={2}>
									{ error }
						  	</InlineAlert>
						  )}
			        <Button
			        		width="100%"
			        		marginTop={30}
			        		appearance="primary"
			        		onClick={onFormConfirm}
			        		disabled={isBtnDisabled}
			        		isLoading={userStore.states.loading.profile}
			        	>
			        	<SendMessageIcon marginRight={16} />
			        	Отправить данные
			        </Button>
		      </> ) : (
		      	<UserProfileFilled profile={userStore.profile as any} />
		      )}
		    </Pane>
		    <Pane
		    		width="100%"
		    		display="flex"
		    		flexWrap="wrap"
		    		justifyContent="center"
		    		marginTop={30}
						borderTop={true}
						paddingTop={30}
					>
		    	{userStore.competencies?.length ? (
		    		<Pane width="100%">
		    			<Heading size={600} borderBottom="1px solid #c1c4d6" paddingBottom={6} textAlign="center">
		      			Список приобретенных вами компетенций
		      		</Heading>
		      		<Pane width="100%" display="flex" flexWrap="wrap" marginTop={20}>
				    		{ userStore.competencies.map(el =>
				    			<CompetenceCard
				    				key={el}
				    				title={el}
				    			/>
				    		) }
			    		</Pane>
		    		</Pane>
		    	) : (
		    		userStore.states.loading.competence && <Preloader />
		    	)	}
		    </Pane>
      </Pane>
    </>
  )
}

export default observer(UserCabinet)