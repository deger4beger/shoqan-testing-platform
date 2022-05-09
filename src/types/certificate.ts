export interface Certificate {
	id: string
	fullName: string
	testName: string
	score: number
	passDate: string
	discipline: string
}

export interface GetCertificatesParams {
	all: 0 | 1
}