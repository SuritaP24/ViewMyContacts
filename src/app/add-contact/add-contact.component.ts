import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { ContactsInit } from 'src/app/contData.service';
import { contDataService } from 'src/app/contData.service';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddContactComponent>, private contDataService:contDataService) { }

  newContact:ContactsInit = {
    initials:'',
    firstName:'',
    lastName:'',
    email:'',
    address:'',
    cellNumber:'',
    bio:'',
    agify:''
  };

  ngOnInit(): void {
  }

  calculateInitialsAndAgify() {
    if (this.newContact.firstName!= '' && this.newContact.lastName != '') {
      this.newContact.initials = this.contDataService.calculateInitials(this.newContact.firstName,this.newContact.lastName);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
