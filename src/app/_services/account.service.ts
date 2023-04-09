import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User, dogProfile, Appointment, DayCare } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    private dogSubject: BehaviorSubject<dogProfile | null>;
    private appointmentSubject: BehaviorSubject<Appointment | null>
    private dayCareSubject: BehaviorSubject<DayCare | null>
    public user: Observable<User | null>;
    public dog: Observable<dogProfile | null>;
    public dayCare: Observable<DayCare | null>;
    public appointment: Observable<Appointment | null>
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
        this.appointmentSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('appointment')!));
        this.appointment = this.appointmentSubject.asObservable();
        this.dogSubject =  new BehaviorSubject(JSON.parse(localStorage.getItem('dog')!));
        this.dog = this.dogSubject.asObservable();
        this.dayCareSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('dayCare')!));
        this.dayCare = this.dayCareSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                console.log(localStorage);
                console.log(user);
                return user;
            }));
    }

    updateDogProfile( dogProfile: dogProfile) {
        console.log(dogProfile);
        return this.http.post<dogProfile>(`${environment.apiUrl}/dogProfile`, dogProfile)
            .pipe(map(dog => {
                localStorage.setItem('dog', JSON.stringify(dog));
                this.dogSubject.next(dog);
                console.log(localStorage);
                console.log(dog);
                return dog;
            }))
    }

    updateAppointment( appointment: Appointment) {
        console.log(appointment);
        return this.http.post<Appointment>(`${environment.apiUrl}/appointment`, appointment).pipe((map(appointment => {
            localStorage.setItem('appointment', JSON.stringify(appointment));
            this.appointmentSubject.next(appointment);
            console.log(localStorage);
            return appointment;
        })))
    }

    updateDayCareBooking( dayCare: DayCare) {
        console.log(dayCare);
        return this.http.post<DayCare>(`${environment.apiUrl}/dayCare`, dayCare).pipe((map(dayCare => {
            localStorage.setItem('dayCare', JSON.stringify(dayCare));
            this.appointmentSubject.next(dayCare);
            console.log(localStorage);
            return dayCare;
        })))
    }

    getDayCareDetails(){
        const dayCare = localStorage.getItem('dayCare')!;
        return JSON.parse(dayCare);
    }

    getDetails(){
        const dogProfile=localStorage.getItem('dog')!;
        return JSON.parse(dogProfile)
    }

    getAppointmentDetail() {
        const appointment = localStorage.getItem('appointment')!;
        return JSON.parse(appointment)
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        localStorage.clear();
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getDog() {
        return this.http.get<dogProfile[]>(`${environment.apiUrl}/dogProfile`)
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}