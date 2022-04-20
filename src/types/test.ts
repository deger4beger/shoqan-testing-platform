import { Competence, Discipline } from "."

interface TestInfo {
	discipline: Discipline
	competencies: Competence[]
}

export interface UploadTestPayload {
	info: TestInfo
	file: File
}