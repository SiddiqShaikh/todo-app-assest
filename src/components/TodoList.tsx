"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/commonTypes";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/lib/api/todos";
import { useRouter } from "next/navigation";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await getTodos();
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos(response.data.todo);
    }
    setLoading(false);
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const response = await createTodo({ title, description });
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos([...todos, response.data]);
      setTitle("");
      setDescription("");
      router.refresh();
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    const response = await updateTodo(id, { completed });
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos(todos.map((todo) => (todo._id === id ? response.data! : todo)));
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const response = await deleteTodo(id);
    if (response.error) {
      setError(response.error);
    } else {
      setTodos(todos.filter((todo) => todo._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg">{error}</div>
      )}

      <form onSubmit={handleAddTodo} className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title..."
          required
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo description..."
          required
        />
        <Button type="submit" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Todo
        </Button>
      </form>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) =>
                handleToggleTodo(todo._id, checked as boolean)
              }
              className="mt-1"
            />
            <div className="flex-1">
              <h3
                className={`font-medium ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </h3>
              <p
                className={`text-sm text-gray-600 mt-1 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
