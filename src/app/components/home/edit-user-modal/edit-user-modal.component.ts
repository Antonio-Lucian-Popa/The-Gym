import { UserService } from './../../../shared/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUser } from 'src/app/shared/interfaces/createUser';
import { MyErrorStateMatcher } from '../add-user/add-user.component';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

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
    const userLocal = this.user.value;
    userLocal['id'] = this.data.user.id;
    this.userService.
  }

  newSubscription(): void {
    this.isNewSubscriptionBtnPressed = true;
  }

}
