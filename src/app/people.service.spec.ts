import { TestBed, inject } from '@angular/core/testing';

import { asyncData, asyncError } from '../testing/async-observable-helpers';
import { PeopleService } from './people.service';
import { IPerson } from './people-interface';

import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

describe('PeopleService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let peopleService: PeopleService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    peopleService = new PeopleService(<any>httpClientSpy);
  });

  it('should return IPerson array', () => {

    let expectedPeople: IPerson[] = new Array<IPerson>();
    expectedPeople = [{'id': 1, 'firstName': 'Fred', 'lastName': 'Farley', 'age': 59, 'weight': 190},
    {'id': 2, 'firstName': 'Jeff', 'lastName': 'Zavoral', 'age': 60, 'weight': 210},
    {'id': 3, 'firstName': 'Al', 'lastName': 'Mosevich', 'age': 52, 'weight': 189},
    {'id': 4, 'firstName': 'Jimmy', 'lastName': 'Owczarzak', 'age': 21, 'weight': 160},
    {'id': 5, 'firstName': 'Joey', 'lastName': 'Butafuco', 'age': 28, 'weight': 150}];

    httpClientSpy.get.and.returnValue(asyncData(expectedPeople));
    peopleService.getAllPeople().subscribe(data => {
       expect(data).toEqual(expectedPeople);
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });


  it('should fail with http status 404', () => {
    const errorResponse = new HttpErrorResponse(
      {
        error: 'HttpStatus: 404 NOT FOUND',
        status: 404,
        statusText: 'NOT FOUND'
      }
    );
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    peopleService.getAllPeople().subscribe(
      (data: IPerson[]) => {
        fail('expected error, not HTTP status 200');
      },
      (error: Error) => {
        console.log(error);
        expect(error.message).toContain('404');
        expect(error.message).toContain('NOT FOUND');
      }
    );
  });

});
