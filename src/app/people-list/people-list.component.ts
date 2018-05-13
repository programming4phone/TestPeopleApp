import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPerson } from '../people-interface';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  @Input()
  people: IPerson[];

  @Output()
  selectedPerson = new EventEmitter<IPerson>();

  constructor() { }

  ngOnInit() { }

selectPerson(person: IPerson) {
    this.selectedPerson.emit(person);
}

}
