import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { RandomUsersService } from '../../services/random-users.service';
import { Result } from '../../models/randomUser';
import { Subscription } from 'rxjs';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-random-users-page',
  imports: [UserCardComponent, NgFor],
  templateUrl: './random-users-page.component.html',
  styleUrl: './random-users-page.component.css'
})
export class RandomUsersPageComponent implements OnInit, OnDestroy {

  users: Result[] = [];
  subscription: Subscription | undefined = undefined;

  constructor(private service: RandomUsersService) { }

  ngOnInit(): void {
    this.subscription = this.service.getData().subscribe( response => {
      this.users = response.results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
