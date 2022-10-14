import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateUser } from 'src/app/shared/interfaces/createUser';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthday: [''],
    email: [''],
    phoneNumber: ['', Validators.required],
    numberOfMonthsPayed: ['', Validators.required]
  });

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateUser>) { }

  ngOnInit(): void {
  }

  addUser(): void {
    if(this.user.valid) {
      this.dialogRef.close(this.user.value);
    }
  }

}
