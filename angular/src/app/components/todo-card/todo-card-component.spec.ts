import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TodoCardComponent} from "./todo-card.component";

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should only show the '+' sign", () => {
    component.currentCount = 0;
    fixture.detectChanges();
    const element :HTMLElement = fixture.nativeElement;
    const  elements = element.querySelectorAll("button");
    console.log("!!!!!!!!!!!!!!!!!!!");
    console.log(elements);
    expect(elements.length).toBe(1);
    expect(element.textContent).toBe("+");
  })
});
