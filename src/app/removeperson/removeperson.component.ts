import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { IPerson } from '../interfaces/iperson';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { PagerService } from '../services/pager.service';

@Component({
  selector: 'app-removeperson',
  templateUrl: './removeperson.component.html',
  styleUrls: ['./removeperson.component.css']
})
export class RemovepersonComponent implements OnInit {

  @Output() modifyClicked = new EventEmitter<any>();

  baseURL = 'https://first-project-d6073.firebaseio.com/';
  rootNode = 'people';

  peopleCollection: Array<IPerson> = [];
  person: object;
    fname: string;
  lname: string;
    refID: any;

  constructor(private dbservice: DbService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() { 
     this.dbservice.getAllData(`${this.baseURL}/${this.rootNode}.json`)
     .subscribe(
       (response) => {
         this.peopleCollection = response;
        } ,
       (error) => console.log(error)
     );
  }


RemoveData(dataID){
     console.log(dataID);
     this.refID = dataID;
     this.dbservice.getID(`${this.baseURL}/${this.rootNode}/${this.refID}.json`)
     .subscribe(
       (response) => {
           this.fname = null;
           this.lname = null;

           this.person = {
         firstName: null,
         lastName: null
       }

       this.dbservice.editData(`${this.baseURL}/${this.rootNode}/${this.refID}.json`,this.person)
       .subscribe(
         (response) => console.log(response),
         (error) => console.log(error)
       );

       },
       (error) => console.log(error)
     );
  }


//-----------------------------------------------------

}



