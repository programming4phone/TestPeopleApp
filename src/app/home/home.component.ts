import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { IPerson } from '../people-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public people: IPerson[] = [];

  person: IPerson;
  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getAllPeople().subscribe(
      (data: IPerson[]) => {
        console.log(data);
        this.people = data;
      }
    );
  }

  selectPerson(person) {
    this.person = person;
  }

}
