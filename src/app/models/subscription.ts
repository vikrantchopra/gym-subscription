export interface Subscription {
    id: string,
    gymid: string,
    employeeName: string,
    receipt: string,
    amountPaid: Number,
    startDate: Date,
    //validity: Date,
    status: string,
    comments: string,
    phone: string,
    contactName: string,
    contactPhone: string,
    relation: string,
    doctorName: string,
    doctorPhone: string,
    ailments: string
}