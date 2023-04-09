export class User {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
}

export class dogProfile {
    id?: string;
    dogName?: string;
    ownerName?:string;
    address?: string;
    age?: string;
    breed?: string;
    gender?: string;
    ownerContact?: string;
}

export class Appointment {
    dogName?: string;
    age?: string;
    breed?: string;
    gender?: string;
    date?: string;
    time?: string;
    ownerContact?:string; 
}

export class DayCare {
    dogName?: string;
    ownerContact?:string; 
    date?: string;
    pickupTime?: string;
    dropTime?: string;
}