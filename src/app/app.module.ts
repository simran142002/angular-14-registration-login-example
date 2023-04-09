import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/compat/functions';
// used to create fake backend
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { fakeBackendProvider } from './_helpers';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DogProfileComponent } from './dog-profile/dog-profile.component';
import { DaycareComponent } from './daycare/daycare.component';
import { HealthcheckupComponent } from './healthcheckup/healthcheckup.component';
import { ContactPageComponent } from './contact-page/contact-page.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule, 
        FormsModule,      
        AngularFireModule.initializeApp(environment.firebase),
        BrowserAnimationsModule    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        DogProfileComponent,
        DaycareComponent,
        HealthcheckupComponent,
        ContactPageComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };