import { TestBed, inject } from '@angular/core/testing';

import { PeopleService } from './people.service';
import { IPerson } from './people-interface';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

describe('PeopleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleService],
      imports: [HttpClientModule],
    });
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));

  it('should return IPerson array', inject([PeopleService], (service: PeopleService) => {
    let people: IPerson[] = [];
    service.getAllPeople().subscribe(
      (data: IPerson[]) => {
        people = data;
        expect(people.length).toEqual(5);
        expect(people[0].firstName).toContain('Fred');
        expect(people[4].firstName).toContain('Joey');
      }
    );
  }));

  it('should fail with http status 404', inject([PeopleService], (service: PeopleService) => {
    let people: IPerson[] = [];
    service.configUrl = 'assets/testdata/peopletest.json'; // set to non-exisitent file path
    service.getAllPeople().subscribe(
      (data: IPerson[]) => {
        people = data;
      },
      (error: Error) => {
        const errMessage: string = error.message;
        console.log(errMessage);
        expect(errMessage).toContain('404');
        expect(errMessage).toContain('NOT FOUND');
      }
    );
  }));

});
