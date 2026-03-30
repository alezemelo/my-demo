import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomUsersPageComponent } from './random-users-page.component';

describe('RandomUsersPageComponent', () => {
  let component: RandomUsersPageComponent;
  let fixture: ComponentFixture<RandomUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomUsersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
