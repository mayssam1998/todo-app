import { AddtodoComponent } from './addtodo.component';
import { render, screen } from '@testing-library/angular';
import { TodosService } from '../../services/todos.service';
import userEvent from '@testing-library/user-event';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('AddToDoComponent', () => {
  /*
    getBy...: Returns the matching node for a query, and throw a descriptive error if no elements match or if more than one match is found (use getAllBy instead if more than one element is expected).
queryBy...: Returns the matching node for a query, and return null if no elements match. This is useful for asserting an element that is not present. Throws an error if more than one match is found (use queryAllBy instead if this is OK).
findBy...: Returns a Promise which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms. If you need to find more than one element, use findAllBy
 */

  /*
   * Arrange
   * Act
   * Assert
   */

  const todosService = jasmine.createSpyObj('TodosService', [
    'postToDo',
    'addTodo',
  ]);
  todosService.postToDo.and.returnValue(
    of({
      id: 'test',
      todo: 'test',
      completed: false,
      userId: 1,
    })
  );

  beforeEach(() => {
    todosService.postToDo.calls.reset();
    todosService.addTodo.calls.reset();
  });

  it('should render 2 input fields and a disabled add button', async () => {
    await render(AddtodoComponent, {
      imports: [HttpClientModule],
      providers: [
        {
          provide: TodosService,
          useValue: todosService,
        },
      ],
    });
    /* No act */
    /* Assert */
    expect(screen.queryByPlaceholderText(/Title of note/i)).not.toBeNull();
    expect(screen.queryAllByPlaceholderText(/Add a new note/i)).not.toBeNull();
    const addBtn = screen.queryByRole('button', { name: /Add/ });
    expect(addBtn).not.toBeNull();
    expect(
      addBtn?.attributes.getNamedItem('disabled')?.value
    ).not.toBeUndefined();
  });

  it('should enable the button when input fields are populated', async () => {
    await render(AddtodoComponent, {
      imports: [HttpClientModule],
      providers: [
        {
          provide: TodosService,
          useValue: todosService,
        },
      ],
    });
    const user = userEvent.setup();
    const titleInput = screen.queryByPlaceholderText(/Title of note/i);
    const contentInput = screen.queryByPlaceholderText(/Add a new note/i);
    const addBtn = screen.queryByRole('button', { name: /Add/ });

    if (titleInput) await user.type(titleInput, 'test');
    if (contentInput) await user.type(contentInput, 'test');

    expect(addBtn?.attributes.getNamedItem('disabled')).toBeNull();
    if (addBtn) await user.click(addBtn);
  });

  it('should call the addtodo function in the todos service and emit an event on add to do clicked', async () => {
    const emit = jasmine.createSpy();

    const renderResult = await render(AddtodoComponent, {
      imports: [HttpClientModule],
      componentProperties: {
        onTodoAdded: {
          emit: emit,
        } as any,
      },
      providers: [
        {
          provide: TodosService,
          useValue: todosService,
        },
      ],
    });

    const user = userEvent.setup();
    const titleInput = screen.queryByPlaceholderText(/Title of note/i);
    const contentInput = screen.queryByPlaceholderText(/Add a new note/i);
    const addBtn = screen.queryByRole('button', { name: /Add/ });

    if (titleInput) await user.type(titleInput, 'test');
    if (contentInput) await user.type(contentInput, 'test');
    expect(addBtn?.attributes.getNamedItem('disabled')).toBeNull();
    if (addBtn) await user.click(addBtn);

    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith('to do added');
    expect(todosService.postToDo).toHaveBeenCalledTimes(1);
    expect(todosService.addTodo).toHaveBeenCalledTimes(1);
  });
});
