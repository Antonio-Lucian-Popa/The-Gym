import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './../../shared/services/user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateUser } from 'src/app/shared/interfaces/createUser';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'profileImageId', 'firstName', 'lastName', 'birthday', 'email', 'phoneNumber', 'subscription', 'expiredSubscription'];
  dataSource = new MatTableDataSource<any>;

  wordToSearch = this.fb.group({
    word: ['']
  });

  searchSubscription: any;

  selection = new SelectionModel<any>(true, []);

  userData: User[] = [];

  filteredUsers: User[] = [];

  constructor(private userService: UserService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
   this.searchSubscription = this.wordToSearch.get('word')!.valueChanges.subscribe((w)=>{
    console.log(w);
    this.searchUser(w!);
  });
    this.getDataInTable();
  }

  getDataInTable(): void {
    this.userService.findAllUsers().subscribe(users => {
      this.userData = users.map(user => {
        user.subscription = this.getDate(user.subscription);
        user.expiredSubscription = this.getDate(user.subscription, true, user.numberOfMonthsPayed);
        return user;
      });
      this.filteredUsers = this.userData;
      this.dataSource = new MatTableDataSource(this.filteredUsers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * Convert BE date
   * @param dateInput
   * @returns
   */
  getDate(dateInput: any, isExpiredSubscription?: boolean, numberOfMonthsPayed?: number): string {
    // TODO: sa revad partea asta, ca daca pun un numar de abonament platit egal cu 100 de ex imi da 98 ca luna si nu ioncrementeaza ani in loc
    var today = new Date(dateInput);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm;
    var yyyy;

    if (isExpiredSubscription && numberOfMonthsPayed) {
      if (today.getMonth() + 1 + numberOfMonthsPayed <= 12) {
        mm = String(today.getMonth() + 1 + numberOfMonthsPayed).padStart(2, '0');
        yyyy = today.getFullYear();
      } else if (today.getMonth() + 1 + numberOfMonthsPayed > 12) {
        let counter = 0;
        while (today.getMonth() + 1 + numberOfMonthsPayed > 12) {
          counter++;
          numberOfMonthsPayed--;
        }
        console.log(counter);
        console.log(numberOfMonthsPayed)
        let calculatedMonth;
        if (counter < 10) {
          calculatedMonth = '0' + counter.toString();
        } else {
          calculatedMonth = counter.toString();
        }
        mm = calculatedMonth.padStart(2, '0');
        yyyy = today.getFullYear() + 1;
      }
    } else {
      mm = String(today.getMonth() + 1).padStart(2, '0');
      yyyy = today.getFullYear();
    }
    console.log(numberOfMonthsPayed);
    return mm + '/' + dd + '/' + yyyy;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent,
      {
        width: '500px'
      });

    dialogRef.afterClosed().subscribe((result: CreateUser) => {
      if (result) {
        console.log(result);
        this.userService.createUser(result).subscribe(() => this.getDataInTable());
      }
    });
  }

  removeUser(): void {
    // colect every row that have enabled to true and send to be
    const userToRemove: User[] = this.selection['_selected'];
    const dialogRef = this.dialog.open(InfoModalComponent,
      {
        data: {
          title: "Sterge User",
          description: "Suneti sigur ca vreti sa stergeti nr de useri: " + userToRemove.length + " din aplicatia Dvs?"
        }
      });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        const userIds: string[] = userToRemove.map(user => user.id);
        console.log(userIds)
        this.userService.removeUser(userIds).subscribe(() => {
          this.selection.clear();
          this.getDataInTable();
        });
      }
    });
  }

  searchUser(wordToSearch: string): void {
    this.filteredUsers = this.userData.filter(user => user.firstName.toLocaleLowerCase().includes(wordToSearch.toLocaleLowerCase())
    || user.lastName.toLocaleLowerCase().includes(wordToSearch.toLocaleLowerCase())
    || user.phoneNumber && user.phoneNumber.includes(wordToSearch.toLocaleLowerCase())
    || user.email && user.email.toLocaleLowerCase().includes(wordToSearch.toLocaleLowerCase())
    );
    console.log(this.filteredUsers);
    if(wordToSearch) {
      this.dataSource = new MatTableDataSource(this.filteredUsers);
    } else {
      this.dataSource = new MatTableDataSource(this.userData);
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  editUser(): void {
    const userToEdit: User[] = this.selection['_selected'];

    // if is more that 1 user selected, show a dialog info to inform the user to select just one to edit
    if(userToEdit.length > 1) {
      // show dialog
      const dialogRef = this.dialog.open(InfoModalComponent,
        {
          data: {
            title: "Actiune nepermisa",
            description: "Nu puteti sa editati mai mult decat un user pe rand",
            typeOfInfo: "alert"
          }
        });

      dialogRef.afterClosed().subscribe();
    } else if(userToEdit.length === 1) {
      const dialogRef = this.dialog.open(EditUserModalComponent,
        {
          data: {
            user: userToEdit[0]
          },
          width: '500px'
        });

      dialogRef.afterClosed().subscribe();
    }
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
