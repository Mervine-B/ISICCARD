
export class Ordermodel{
    id!: number
    name!: string
    studentId!: number
    typeOfCardId!: number
    validationDate!: Date
    submissionDate!:Date

    // join 
    studentName!: string
    cardName!: string
}
