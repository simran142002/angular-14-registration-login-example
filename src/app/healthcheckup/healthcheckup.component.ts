import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { dogProfile, Appointment } from '@app/_models';

@Component({
  selector: 'app-healthcheckup',
  templateUrl: './healthcheckup.component.html',
  styleUrls: ['./healthcheckup.component.css']
})
export class HealthcheckupComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  createPetProfile: boolean = false;
  dogName!: string;
  ownerName!: string;
  address!: string;
  age!: string;
  breed!: string;
  gender!: string;
  estimatedTimeHrs!: number
  ownerContact!: string;
  dogProfile: dogProfile[] =[];
  appointment: Appointment[] =[];
  date!: string;
  time!: string;

  constructor(private formBuilder: FormBuilder,
    private functions: AngularFireFunctions,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // form with validation rules
    this.form = this.formBuilder.group({
        dogName: [''],
        age: [''],
        breed: [''],
        gender: [''],
        date: [''],
        time: [''],
        // password only required in add mode
        ownerContact: ['', [Validators.minLength(10), ...(!this.id ? [Validators.required] : [])]]
    });
    this.getAppointment();
  }

  // convenience getter for easy access to form fields
get f() { return this.form.controls; }

onSubmit() {
  this.submitted = true;

  // reset alerts on submit
  this.alertService.clear();

  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }

  this.submitting = true;
  this.saveDog()
      // .pipe(first())
      // .subscribe({
      //     next: () => {
      //         this.alertService.success('dog details saved', { keepAfterRouteChange: true });
      //         this.router.navigateByUrl('/users');
      //     },
      //     error: error => {
      //         this.alertService.error(error);
      //         this.submitting = false;
      //     }
      // })
}

createProfile() {
  this.createPetProfile = true;
}

public getAppointment() {
  const appointment = this.accountService.getAppointmentDetail();
  console.log(appointment);
  this.dogName = appointment['dogName'];
  this.age = appointment['age'];
  this.breed = appointment['breed'],
  this.gender = appointment['gender'],
  this.date = appointment['date'],
  this.time = appointment['time'],
  this.ownerContact = appointment['ownerContact'];
}

private saveDog() {
  // create or update user based on id param
  console.log(this.form.value);
      this.accountService.updateAppointment(this.form.value).subscribe({
        next: (data) => {
        this.alertService.success('Apponitment Request Generated Successfully', { keepAfterRouteChange: true });
        this.getAppointment();
        this.loading=false;
        },
        error: (error) => {
            console.error(error);
            
              this.alertService.error(error);
              this.submitting = false;
        }
      });
}
}
