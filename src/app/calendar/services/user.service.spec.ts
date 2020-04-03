import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '@calendar/model/user';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';

import { UserService } from './user.service';

export const usersMock: User[] = [
  { id: 1, name: 'Bob' },
  { id: 2, name: 'Barry ' },
];

describe('UserService', () => {
  let service: UserService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getUsers', () => {
    spyOn(http, 'get').and.returnValue(of(usersMock));
    const expected = cold('(a|)', { a: usersMock });

    const result = service.getUsers();

    expect(result).toBeObservable(expected);
  });
});
