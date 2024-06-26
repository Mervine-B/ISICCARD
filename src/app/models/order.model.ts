
export class Ordermodel{
    id!: number
    name!: string
    studentId!: number
    typeOfCardId!: number
    validationDate!: Date
    submissionDate!:Date
    statusId!:number
   
    // join 
    studentName!: string
    cardName!: string
    statusName!:string 
}
