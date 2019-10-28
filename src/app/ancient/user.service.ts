import { User } from '../login/authentication/user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserService{
    private users: User[] = [];
    usersChanged = new Subject<User[]>();

    addUser(user: User) {
        this.users.push(user);
        this.usersChanged.next(this.users.slice());
    }

}