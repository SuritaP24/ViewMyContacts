import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ContactsInit } from 'src/app/contData.service';
import { contDataService } from 'src/app/contData.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddContactComponent>, private contDataService:contDataService) { }


  newContact:ContactsInit = {initials:'', firstName:'', lastName:'', email:'', address:'', cellNumber:'', bio:'', agify:'00',active:false};

  cellValidator: FormControl =  new FormControl('', [Validators.required]);
  emailValidator: FormControl =  new FormControl('', [Validators.required, Validators.email]);

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
