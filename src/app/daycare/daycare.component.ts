import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { dogProfile, Appointment, DayCare } from '@app/_models';

@Component({
  selector: 'app-daycare',
  templateUrl: './daycare.component.html',
  styleUrls: ['./daycare.component.css']
})
export class DaycareComponent implements OnInit {
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
  estimatedTimeHrs1!: number
  ownerContact!: string;
  dogProfile: dogProfile[] =[];
  appointment: Appointment[] =[];
  dayCare: DayCare[] = [];
  date!: string;
  time!: string;
  pickupTime!:string; 
  dropTime!:string;

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
        date: [''],
        pickupTime: [''],
        dropTime: [''],
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
  const appointment = this.accountService.getDayCareDetails();
  console.log(appointment);
  this.dogName = appointment['dogName'];
  this.date = appointment['date'],
  this.pickupTime = appointment['pickupTime'],
  this.dropTime = appointment['dropTime']
  this.ownerContact = appointment['ownerContact'];
}

private saveDog() {
  // create or update user based on id param
  console.log(this.form.value);
      this.accountService.updateDayCareBooking(this.form.value).subscribe({
        next: (data) => {
        this.alertService.success('Daycare Request Generated Successfully', { keepAfterRouteChange: true });
        this.getAppointment();
        this.loading=false;
        this.submitted=true;
        },
        error: (error) => {
            console.error(error);
            
              this.alertService.error(error);
              this.submitting = false;
        }
      });
}

}
