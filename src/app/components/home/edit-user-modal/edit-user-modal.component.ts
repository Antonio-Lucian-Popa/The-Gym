import { UserService } from './../../../shared/services/user.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUser } from 'src/app/shared/interfaces/createUser';
import { MyErrorStateMatcher } from '../add-user/add-user.component';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit, OnDestroy {

  user = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthday: [''],
    email: [''],
    phoneNumber: ['', Validators.required],
    numberOfMonthsPayed: ['', Validators.required]
  });

  matcher = new MyErrorStateMatcher();

  isNewSubscriptionBtnPressed = false;

  editSubscription: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUser>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.user.patchValue({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      birthday: data.user.birthday,
      email: data.user.email,
      phoneNumber: data.user.phoneNumber,
      numberOfMonthsPayed: data.user.numberOfMonthsPayed,
    });
  }

  ngOnInit(): void {
    console.log(this.user.value);
  }

  editUser(): void {
    if (this.user.valid) {
      const firstName = this.user.get('firstName')!.value;
      const lastName = this.user.get('lastName')!.value;
      const birthday = this.user.get('birthday')!.value;
      const email = this.user.get('email')!.value;
      const phoneNumber = this.user.get('phoneNumber')!.value;
      const numberOfMonthsPayed = this.user.get('numberOfMonthsPayed')!.value;
      const userLocal = {
        id: this.data.user.id,
        firstName: firstName ? firstName : this.data.user.firstName,
        lastName: lastName ? lastName : this.data.user.lastName,
        birthday: birthday ? birthday : this.data.user.birthday,
        email: email ? email : this.data.user.email,
        phoneNumber: phoneNumber ? phoneNumber : this.data.user.phoneNumber,
        numberOfMonthsPayed: numberOfMonthsPayed ? numberOfMonthsPayed : this.data.user.numberOfMonthsPayed
      };
      if (this.isNewSubscriptionBtnPressed) {
        this.editSubscription = this.userService.editUser(userLocal, true).subscribe(() => this.dialogRef.close());
      } else {
        this.editSubscription = this.userService.editUser(userLocal).subscribe(() => this.dialogRef.close());
      }
    }
  }

  newSubscription(): void {
    this.isNewSubscriptionBtnPressed = true;
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

}
