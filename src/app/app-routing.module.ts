import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DogProfileComponent } from './dog-profile/dog-profile.component';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { DaycareComponent } from './daycare/daycare.component';
import { HealthcheckupComponent } from './healthcheckup/healthcheckup.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: 'dogProfile', component: DogProfileComponent, canActivate: [AuthGuard] },
    { path: 'dayCare', component: DaycareComponent, canActivate: [AuthGuard] },
    { path: 'healthCheckUp', component: HealthcheckupComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }