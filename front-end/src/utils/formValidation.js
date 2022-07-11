import { today } from "./date-time";



export function dateValidation(formData) {
    const day = new Date(formData.reservation_date).getDay();
    if(formData.reservation_date < today()){
        throw new Error("Reservation date can not be a past date")
    } 
    else if(day === 1){
        throw new Error("Can not book reservation on day that we are not open")
    }
}

export function timeValidation(formData) {
    const date = new Date();
    const now = date.toString().slice(16,21);
    if(today() === formData.reservation_date){
        if(formData.reservation_time < "10:30" || formData.reservation_time > "21:30" || now > formData.reservation_time){
            throw new Error("Must be in future and during hours of operation");
        }
        } else if(formData.reservation_time < "10:30" || formData.reservation_time > "21:30"){
            throw new Error("Must be in future and during hours of operation")
        }
}

export function phoneValidation(formData) {
    const num = formData.mobile_number;
    let final;
    if(!num.includes("-")){
        const area = num.slice(0,3);
        const middle = num.slice(3,6);
        const last = num.slice(6,10);
        final = ([area, middle, last]).join("-")
        formData.mobile_number = final;
    }
}

export function peopleValidation(formData){
    if(formData.people === 0) throw new Error("Group must be a integer greater than 0");
    formData.people = Number(formData.people);
}