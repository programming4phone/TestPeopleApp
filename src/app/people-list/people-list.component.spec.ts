import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListComponent } from './people-list.component';
import { IPerson } from '../people-interface';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with IPerson array', () => {
    expect(component).toBeTruthy();
    const people: IPerson[] = getPeople();
    component.people = people;
    fixture.detectChanges(); // During test change detection does not automatically occur when the @Input is set

    const tds: any[] = fixture.nativeElement.querySelectorAll('td');
    expect(tds[0].textContent).toContain('ID');
    expect(tds[1].textContent).toContain('First Name');
    expect(tds[2].textContent).toContain('Last Name');
    expect(tds[3].textContent).toContain('Age');
    expect(tds[4].textContent).toContain('Weight');
    expect(tds[5].textContent).toEqual('1');
    expect(tds[6].textContent).toContain('Fred');
    expect(tds[7].textContent).toContain('Farley');
    expect(tds[8].textContent).toEqual('59');
    expect(tds[9].textContent).toEqual('190');
  });

  it('click on table row', () => {
    expect(component).toBeTruthy();
    const people: IPerson[] = getPeople();
    component.people = people;
    fixture.detectChanges(); // During test change detection does not automatically occur when the @Input is set

    const trs: any[] = fixture.nativeElement.querySelectorAll('tbody tr');
    console.log(trs);

    let clickedPerson: IPerson;

    component.selectedPerson.subscribe((person: IPerson) => {
      clickedPerson = person;
      console.log(clickedPerson);
    });

    for ( let i = 0; i < trs.length; i++) {
      trs[i].click();
      expect(clickedPerson).toBe(people[i]);
    }

    component.selectedPerson.unsubscribe();
  });

});

function getPeople(): IPerson[] {
  let people: IPerson[] = new Array<IPerson>();
  people = [{'id': 1, 'firstName': 'Fred', 'lastName': 'Farley', 'age': 59, 'weight': 190},
  {'id': 2, 'firstName': 'Jeff', 'lastName': 'Zavoral', 'age': 60, 'weight': 210},
  {'id': 3, 'firstName': 'Al', 'lastName': 'Mosevich', 'age': 52, 'weight': 189},
  {'id': 4, 'firstName': 'Jimmy', 'lastName': 'Owczarzak', 'age': 21, 'weight': 160},
  {'id': 5, 'firstName': 'Joey', 'lastName': 'Butafuco', 'age': 28, 'weight': 150}];
  return people;
}
