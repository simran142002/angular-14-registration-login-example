import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { dogProfile } from '@app/_models';

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.component.html',
  styleUrls: ['./dog-profile.component.css']
})
export class DogProfileComponent implements OnInit {
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
  ownerContact!: string;
  dogProfile: dogProfile[] =[];

  constructor(private formBuilder: FormBuilder,
    private functions: AngularFireFunctions,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.getDog();
  // form with validation rules
  this.form = this.formBuilder.group({
      dogName: [''],
      ownerName: [''],
      address: [''],
      age: [''],
      breed: [''],
      gender: [''],
      // password only required in add mode
      ownerContact: ['', [Validators.minLength(10), ...(!this.id ? [Validators.required] : [])]]
  });

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

public getDog() {
  const dogProfile=this.accountService.getDetails();
  console.log(dogProfile);
  this.dogName=dogProfile['dogName'];
  this.ownerName=dogProfile['ownerName'];
  this.address=dogProfile['address'];
  this.age=dogProfile['age'];
  this.breed=dogProfile['breed'];
  this.gender=dogProfile['gender'];
  this.ownerContact=dogProfile['ownerContact'];
}

private saveDog() {
  // create or update user based on id param
  console.log(this.form.value);
      this.accountService.updateDogProfile(this.form.value).subscribe({
        next: (data) => {
        this.alertService.success('dog details saved', { keepAfterRouteChange: true });
        this.getDog();
        },
        error: (error) => {
            console.error(error);
            
              this.alertService.error(error);
              this.submitting = false;
        }
      });
}

}
