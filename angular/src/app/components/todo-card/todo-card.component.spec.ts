import {TodoCardComponent} from "./todo-card.component";
import {of} from "rxjs";
import {render, screen} from '@testing-library/angular';
import {HttpClientModule} from "@angular/common/http";
import {TodosService} from "../../services/todos.service";
import {userEvent} from "@testing-library/user-event";

describe("TodoCardComponent", () => {
  const todosService = jasmine.createSpyObj('TodosService', [
    'checkTodo',
    'deleteTodo',
  ]);

  todosService.checkTodo.and.returnValue(
    of({
      "id": 30,
      "todo": "Take cat on a walk",
      "completed": false,
      "userId": 15
    })
  )

  todosService.deleteTodo.and.returnValue(
    of({
      "id": 30,
      "todo": "Take cat on a walk",
      "completed": false,
      "userId": 15,
      "isDeleted": true,
      "deletedOn": "2024-04-19T14:00:27.095Z"
    })
  )

  it("should delete a checked todo card", async () => {
    const emit = jasmine.createSpy();
    await render(TodoCardComponent, {
      // componentProperties: {isSelected: 5},
      componentProperties: {removeListItem : {  emit: emit,
  } as any,
      },
      imports: [HttpClientModule],
      providers: [
        {
          provide: TodosService,
          useValue: todosService,
        },
      ],
    });
    const user = userEvent.setup();

    const checkbox = screen.queryByRole("input");
    // expect(emit).toHaveBeenCalledTimes(1);
    // expect(screen.getByText('30')).toBeUndefined();
    // expect(todosService.checkTodo).toHaveBeenCalledTimes(1);
    // expect(todosService.deleteTodo).toHaveBeenCalledTimes(1);
  })
});
