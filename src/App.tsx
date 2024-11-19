/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorPannel } from './components/ErrorPannel';
import { useAppData } from './utils/useAppData';
import { useEffect } from 'react';

export const App: React.FC = () => {
  const {
    todos,
    activeTodosCount,
    selectedFilterType,
    completedIds,
    filteredTodos,
    todosToDelete,
    errorMessage,
    tempTodo,
    setSelectedFilterType,
    setTempTodo,
    setErrorMessage,
    setTodosToDelete,
    handleUpload,
    updateTodo,
    addTodo,
    deleteTodos,
    handleClearCompleted,
  } = useAppData();

  useEffect(handleUpload, [todosToDelete.length, handleUpload]);

  useEffect(() => {
    if (todosToDelete.length > 0) {
      deleteTodos(todosToDelete);
    }
  }, [deleteTodos, todosToDelete]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          onTempTodo={setTempTodo}
          onErrorMessage={setErrorMessage}
          onAdd={addTodo}
          onUpdate={updateTodo}
          todos={todos}
        />
        {!!todos.length && (
          <>
            <TodoList
              onTodosToDelete={setTodosToDelete}
              todos={filteredTodos}
              todosToDelete={todosToDelete}
              tempTodo={tempTodo}
              onUpdate={updateTodo}
            />
            <TodoFooter
              onSelectedFilterType={setSelectedFilterType}
              selectedFilterType={selectedFilterType}
              activeTodosCount={activeTodosCount}
              completedTodosIds={completedIds}
              clearCompletedTodos={handleClearCompleted}
            />
          </>
        )}
      </div>
      <ErrorPannel errorMessage={errorMessage} />
    </div>
  );
};
