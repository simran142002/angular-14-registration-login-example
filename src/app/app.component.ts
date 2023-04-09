import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User, dogProfile } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;
    dog?: dogProfile | null;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
        this.accountService.dog.subscribe(x=> this.dog = x);
    }

    logout() {
        this.accountService.logout();
    }

    bookGrooming() {

    }

    dayCare() {

    }

    healthChekup() {
        
    }
}