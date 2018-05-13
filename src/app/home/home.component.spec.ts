import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { PeopleListComponent } from '../people-list/people-list.component';
import { IPerson } from '../people-interface';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { PeopleService } from '../people.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let getPeopleSpy: jasmine.Spy;
  let expectedPeople: IPerson[] = new Array<IPerson>();

  beforeEach(async(() => {

    const peopleService = jasmine.createSpyObj('PeopleService', ['getAllPeople']);
    expectedPeople = [{'id': 1, 'firstName': 'Fred', 'lastName': 'Farley', 'age': 59, 'weight': 190},
    {'id': 2, 'firstName': 'Jeff', 'lastName': 'Zavoral', 'age': 60, 'weight': 210},
    {'id': 3, 'firstName': 'Al', 'lastName': 'Mosevich', 'age': 52, 'weight': 189},
    {'id': 4, 'firstName': 'Jimmy', 'lastName': 'Owczarzak', 'age': 21, 'weight': 160},
    {'id': 5, 'firstName': 'Joey', 'lastName': 'Butafuco', 'age': 28, 'weight': 150}];

    peopleService.getAllPeople.and.returnValue(of(expectedPeople));

    TestBed.configureTestingModule({
      declarations: [ HomeComponent, PeopleListComponent ],
      providers: [ {provide: PeopleService, useValue: peopleService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    component.ngOnInit();
    fixture.detectChanges();
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

    const trs: any[] = fixture.nativeElement.querySelectorAll('tbody tr');

     for ( let i = 0; i < trs.length; i++) {
      trs[i].click();
      expect(component.person).toBe(expectedPeople[i]);
    }

  });
});
