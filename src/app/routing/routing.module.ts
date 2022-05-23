import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { ContactsComponent } from '../contacts/contacts/contacts.component';
import { AboutComponent } from '../about/about/about.component';
import { AddContactComponent } from '../add-contact/add-contact.component';

const routes: Routes = [
  {path: 'contacts', component: ContactsComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/contacts', pathMatch: 'full'},
  // {path: 'addContact', component:AddContactComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  // entryComponents: [AddContactComponent]
})
export class RoutingModule { }
