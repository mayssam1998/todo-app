import { AddtodoComponent } from './addtodo.component';
import { render, screen } from '@testing-library/angular';
import { TodosService } from '../../services/todos.service';
import userEvent from '@testing-library/user-event';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
describe('AddToDoComponent', () => {
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

    await render(AddtodoComponent, {
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
