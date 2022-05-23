import { Injectable } from '@angular/core';
import { last, observable } from 'rxjs';

import contacts from '../assets/_files/contacts.json'

export interface Contacts {
  firstName:string,
  lastName:string,
  email:string,
  address:string,
  cellNumber:string,
  bio:string
}

export interface ContactsInit {
  initials:string,
  firstName:string,
  lastName:string,
  email:string,
  address:string,
  cellNumber:string,
  bio:string,
  agify:string
}



@Injectable({
  providedIn: 'root'
})


export class contDataService {

  public contactsListBare:Contacts[] = contacts;
  public contactsListInit:ContactsInit[] = [];
  
  constructor() { 
    this.addInitialsOfContacts();
  }

  // run through array, add initials to new array
  addInitialsOfContacts(){

    contacts.forEach(contact => {

      let calcAgify = '00';

      this.contactsListInit.push({
        initials:this.calculateInitials(contact.firstName,contact.lastName),
        firstName:contact.firstName,
        lastName:contact.lastName,
        email:contact.email,
        address:contact.address,
        cellNumber:contact.cellNumber,
        bio:contact.bio,
        agify:calcAgify
      });
    });
  }

  calculateInitials(firstN:string,lastN:string){
    let firstNameLetter = firstN.charAt(0);
    let lastNameLetter = lastN.charAt(0);

    return firstNameLetter+lastNameLetter;
  }

  calculateAgify(){
    
  }

  searchContacts(searchVar:any) {

    try{
      // if the value only contains numbers, check with cell number value for filter
      if(/^\d+$/.test(searchVar)){
        return this.contactsListInit.filter(obj => obj.cellNumber.includes(searchVar));
      }

      // if value is passed only contains letters, check first name and last name for filter
      else if(/^[a-zA-Z]/.test(searchVar)){
        
        // if there is a space, check for both first and last name combos
        if(/\s/g.test(searchVar)){
          const nameArr = searchVar.split(" ");
          
          const firstN = nameArr[0].toLowerCase();
          const lastN = nameArr[1].toLowerCase();
      
          return this.contactsListInit.filter(obj => obj.firstName.toLowerCase().includes(firstN) && obj.lastName.toLowerCase().includes(lastN));
  
        }

        else{
          const filterValue = searchVar.toLowerCase();
          return this.contactsListInit.filter(obj => obj.firstName.toLowerCase().includes(filterValue) || obj.lastName.toLowerCase().includes(filterValue));
        }
        
      }
      
      // undefined value passed, catch
      else{
        console.log('in else line')
        return this.contactsListInit;
      }
    }

    catch{
        return this.contactsListInit;
    }
  }
}
