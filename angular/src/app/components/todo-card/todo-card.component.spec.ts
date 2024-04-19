import {TodosService} from "../../services/todos.service";
import {of} from "rxjs";
import {TodoCardComponent} from "./todo-card.component";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {userEvent} from "@testing-library/user-event/setup/index";
// import {screen} from "@testing-library- "
describe("Checkbox clicked", () => {
  let todoService: jasmine.SpyObj<TodosService>;

  beforeEach(async () => {
    todoService = jasmine.createSpyObj("TodosService", ["markTodoAsCompleted"])
    todoService.markTodoAsCompleted.and.returnValue(of({
      "id": 1,
      "todo": "test",
      "completed": true,
      "userId": 1,
      "isDeleted": true,
      "deletedOn": "2024-04-19T13:31:05.130Z"
    }));

  });

  beforeEach(async () => {
    todoService.markTodoAsCompleted.calls.reset();
  });

  it(
    "Should be deleted on checkbox clicked", async () =>  {
      // arrange
      const user = userEvent;

      await render(TodoCardComponent, {
        imports: [HttpClientModule],
        componentProperties:{
          todo :{
            "id": 1,
            "title": "test",
            "content": "testContent"
          }
        },

        providers: [
          {
            TodosService,
            useValue: todoService
          }
        ],
        componentImports: [CommonModule]
      });




      user
      const checkbox : any = screen.queryByRole("input");

      // assert

      user.click(checkbox);

      // act
      // todoService.markTodoAsCompleted is called once.
      // click is not emitted.
      // deleteTodo function is called once.

    });







})
