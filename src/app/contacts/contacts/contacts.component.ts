import { Component, OnInit } from '@angular/core';
import { contDataService } from 'src/app/contData.service';
import { ContactsInit } from 'src/app/contData.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddContactComponent } from '../../add-contact/add-contact.component';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public searchedContacts:boolean = false;
  public contList:ContactsInit[] = [];
  public currentCont:ContactsInit;


  constructor(private contDataService : contDataService,public dialog: MatDialog) {
      this.contList = this.contDataService.contactsListInit;
      this.currentCont = this.contList[0];
      this.contDataService.setActive(this.contList[0]);
    }

  ngOnInit(): void {
  }

  sendData(event:any){
    this.contList = this.contDataService.searchContacts(event.target.value);
    
    //if there is only one result in the array, show the details in the screen to the right
    if(this.contList.length < 2){
      this.contDataService.setActive(this.contList[0]);
      this.currentCont = this.contList[0];
    }
    this.searchedContacts = true;
  }

  

  showDetails(contact:ContactsInit){
    this.contDataService.setActive(contact);
    this.currentCont = contact;
  }

  addContact(): void {
   
    const dialogRef = this.dialog.open(AddContactComponent, {
      height: '600px',
      width: '600px',
      disableClose: true,
      autoFocus:true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        this.contDataService.setAgify(result);
        this.contDataService.contactsListInit.push(result);
      }
    });
  }


 
}
