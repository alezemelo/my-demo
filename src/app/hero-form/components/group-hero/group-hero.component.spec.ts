import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHeroComponent } from './group-hero.component';

describe('GroupHeroComponent', () => {
  let component: GroupHeroComponent;
  let fixture: ComponentFixture<GroupHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
