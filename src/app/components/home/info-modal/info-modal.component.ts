import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  title = '';
  description = '';
  typeOfInfo = '';

  constructor(
    public dialogRef: MatDialogRef<boolean>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.title = data.title;
      this.description = data.description;
      this.typeOfInfo = data.typeOfInfo;
     }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
