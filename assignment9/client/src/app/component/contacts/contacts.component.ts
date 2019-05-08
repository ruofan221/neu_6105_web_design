import { Component, OnInit } from '@angular/core';
import { contactService } from '../../services/contact.service'
import { Contact } from "../../Modules/contact"
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;

  formshow: boolean = false;
  showList: boolean = false;
  showDetails:boolean = false;
  contactDetail:Contact;

  
  form = new FormGroup({
    name: new FormControl('',Validators.required)
  });


  constructor(private contactService: contactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts
    })
  }
  //display add form 
  displayForm(): void {
    this.formshow = true;
    this.showDetails = false;
    this.showList = true;
    this.clearForm();
  }
  // cancel add form
  cancelForm(): void {
    this.formshow = false;
    this.clearForm();
  }
  // add contact
  addContact(): void {
    const newContact = {
      _id: '',
      name: this.name,
      address: this.address,
      phone: this.phone,
      email: this.email,
      city: this.city
    };
    const reg= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmail = reg.test(this.email);
    let isNull = this.name != '' && this.phone != '' && this.address!= '' && this.city != '' && this.email != '';
    if(isNull){
      if(isEmail){
    this.contactService.addContact(newContact).subscribe(contact => this.contacts.push(contact));
    this.formshow = false;
    this.showList = true;
      }else {
        alert('please enter right email!');
      }
    }else{
      alert('Please fullfill the form!')
    }
    this.clearForm();
  }

  // view contact list
  viewContact():void{
    this.showList = true;
    this.showDetails = false;
    this.formshow = false;
  }

  // showDetail
  showDetail(id:any):void {
    this.showList = false;
    let contacts = this.contacts;
    this.contactService.getContact(id).subscribe(data=> {
      for(let i = 0;i < contacts.length; i++){
        if(contacts[i]._id === id){
          this.name = contacts[i].name;
          this.email = contacts[i].email;
          this.address = contacts[i].address;
          this.city = contacts[i].city;
          this.phone = contacts[i].phone;
        }
      }
    })
    this.showDetails = true;
  }


  // clearForm
  clearForm(){ 
    this.address = '';
    this.city = '';
    this.email = '';
    this.phone = '';
   this.name = '';
  }
}
