import { Competence, Discipline } from "."

interface TestInfo {
	discipline: Discipline
	competencies: Competence[]
}

export interface UploadTestPayload {
	info: TestInfo
	file: File
}

export interface Question {
	question: string
	answers: string[]
}

export interface StressData {
	passed: boolean
	test: Question[]
}
