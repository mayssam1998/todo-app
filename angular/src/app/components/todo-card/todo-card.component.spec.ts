import { render, screen } from '@testing-library/angular';
import userEvent, { UserEvent } from '@testing-library/user-event';
import {HttpClientModule} from '@angular/common/http';
import {TodoCardComponent} from "./todo-card.component";
import {TodosProps} from "../../services/todos.service";

describe('TodoCardComponent', () => {
  let todo: TodosProps;
  let user: UserEvent;
  beforeEach(() => {
    todo = {
      id: '1',
      title: 'Todo',
      content: 'Todo Content',
    };
    user = userEvent.setup();
  });
  it('should show delete icon and not confirm and cancel buttons', async () => {
    await render(TodoCardComponent, {
      imports: [HttpClientModule],
      componentProperties: { todo: todo }
    });
    expect(screen.getByText(todo.title)).not.toBeNull();
    expect(screen.getByText(todo.content)).not.toBeNull();
    expect(screen.getByTestId('delete-icon-button')).not.toBeNull();
    expect(screen.queryByRole('button', {name: /Confirm/})).toBeNull();
    expect(screen.queryByRole('button', {name: /Cancel/})).toBeNull();
  });
  it('should show confirm and cancel buttons and hide delete icon on delete icon click, and vice versa on cancel button click', async () => {
    await render(TodoCardComponent, {
      imports: [HttpClientModule],
      componentProperties: { todo: todo }
    });
    const deleteIconBtn = screen.queryByTestId('delete-icon-button');
    expect(deleteIconBtn).not.toBeNull();
    expect(screen.queryByRole('button', {name: /Confirm/})).toBeNull();
    expect(screen.queryByRole('button', {name: /Cancel/})).toBeNull();

    if (deleteIconBtn) await user.click(deleteIconBtn);

    expect(screen.queryByTestId('delete-icon-button')).toBeNull();
    expect(screen.queryByRole('button', {name: /Confirm/})).not.toBeNull();
    const cancelBtn = screen.queryByRole('button', {name: /Cancel/});
    expect(cancelBtn).not.toBeNull();

    if (cancelBtn) await user.click(cancelBtn);

    expect(screen.queryByTestId('delete-icon-button')).not.toBeNull();
    expect(screen.queryByRole('button', {name: /Confirm/})).toBeNull();
    expect(screen.queryByRole('button', {name: /Cancel/})).toBeNull();
  });

  it('should call deleteTodo function and emit event on confirm button click', async () => {
    const emit = jasmine.createSpy();
    await render(TodoCardComponent, {
      imports: [HttpClientModule],
      componentProperties: {
        todo: todo,
        removeListItem: {
          emit: emit,
        } as any
      }
    });
    const deleteIconBtn = screen.queryByTestId('delete-icon-button');
    if (deleteIconBtn) await user.click(deleteIconBtn);
    const confirmBtn = screen.queryByRole('button', {name: /Confirm/});
    expect(confirmBtn).not.toBeNull();

    if (confirmBtn) await user.click(confirmBtn);

    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith('1'); //todo id
  });

  it('should call markTaskAsCompleted function and emit event if markAsCompleted is checked', async () => {
    const emit = jasmine.createSpy();
    await render(TodoCardComponent, {
      imports: [HttpClientModule],
      componentProperties: {
        todo: todo,
        markAsCompleted: {
          emit: emit,
        } as any
      }
    });
    const checkbox: any = screen.getByTestId('mark-as-completed-checkbox');
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith('1'); //todo id
  });

  it('should call onClick function and emit event on list item click', async () => {
    const emit = jasmine.createSpy();
    await render(TodoCardComponent, {
      imports: [HttpClientModule],
      componentProperties: {
        todo: todo,
        click: {
          emit: emit,
        } as any
      }
    });
    const listItem: any = screen.getByTestId('todo-list-item');
    expect(listItem).not.toBeNull();
    if(listItem) await user.click(listItem);
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith();
  });
});
