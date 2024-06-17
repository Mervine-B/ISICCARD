export class StudentModel {
    id!: number
    nameOfSchool!: string
    name!:string
    firstName!:string
    email!:string
    dateOfBirth!:Date
    typeOfCardId!:number

    //join
    typeofcardName!:string
    selected?: boolean;
}