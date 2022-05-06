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

export interface Answers extends Omit<Question, "question"> {}

export interface TestForDisciplineParams {
	discipline: Discipline
}

export interface TestForDiscipline {
	id: string
	filename: string
	passed: null | boolean
	attempts: null | number
}

export interface TestToPass {
	id: string
	title: string
	discipline: string
}

export interface PassTestPayload {
	answers: string[]
}

export interface PassTestReponse {
	score: number
	passed: boolean
}