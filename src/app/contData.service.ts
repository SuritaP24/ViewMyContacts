import { Injectable } from '@angular/core';
import { last, observable } from 'rxjs';
import contacts from '../assets/_files/contacts.json'
import { AgifyService } from './agify.service';
import { Agify } from './agify.service';

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
  agify:string,
  active:boolean
}



@Injectable({
  providedIn: 'root'
})


export class contDataService {

  public agifyResposne:Agify = {name:'', age:'', count:''};

  public contactsListBare:Contacts[] = contacts;
  public contactsListInit:ContactsInit[] = [];
  
  constructor(private agifyService:AgifyService) { 
    this.addInitialsOfContacts();
  }

  // run through array, add initials to new array
  addInitialsOfContacts(){
    contacts.forEach(contact => {
        this.contactsListInit.push({
          initials:this.calculateInitials(contact.firstName,contact.lastName),
          firstName:contact.firstName,
          lastName:contact.lastName,
          email:contact.email,
          address:contact.address,
          cellNumber:contact.cellNumber,
          bio:contact.bio,
          agify:'',
          active:false
        });
    });

    this.contactsListInit.forEach(contact => {
      this.setAgify(contact);
    })
  }

  calculateInitials(firstN:string,lastN:string){
    let firstNameLetter = firstN.charAt(0);
    let lastNameLetter = lastN.charAt(0);

    return firstNameLetter+lastNameLetter;
  }

 
  setActive(cont:ContactsInit){
    this.contactsListInit.forEach(contact => {
      contact.active = false;
    })
    cont.active = true;
  }

  setAgify(contact:ContactsInit){
    let smallLettersF = contact.firstName.toLowerCase();

      this.agifyService.getAgifyAge(smallLettersF).subscribe(
        (data:Agify) => {
          contact.agify = data.age.toString();
      });
  }

  searchContacts(searchVar:any) {
    try{
      var displayArr;
      // if the value only contains numbers, check with cell number value for filter
      if(/^\d+$/.test(searchVar)){
        return displayArr = this.contactsListInit.filter(obj => obj.cellNumber.includes(searchVar));
      }

      // if value is passed only contains letters, check first name and last name for filter
      else if(/^[a-zA-Z]/.test(searchVar)){
        
        // if there is a space, check for both first and last name combos
        if(/\s/g.test(searchVar)){
          const nameArr = searchVar.split(" ");
          
          const firstN = nameArr[0].toLowerCase();
          const lastN = nameArr[1].toLowerCase();
      
          return displayArr = this.contactsListInit.filter(obj => obj.firstName.toLowerCase().includes(firstN) && obj.lastName.toLowerCase().includes(lastN));
  
        }

        else{
          const filterValue = searchVar.toLowerCase();
          return displayArr = this.contactsListInit.filter(obj => obj.firstName.toLowerCase().includes(filterValue) || obj.lastName.toLowerCase().includes(filterValue));
        }
        
      }
      
      // undefined value passed, catch
      else{
        return this.contactsListInit;
      }
    }

    catch{
        return this.contactsListInit;
    }
  }
}
