import axios from "axios";

interface Geo {
  lat: string;
  lng: string;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface User {
  id: number;
  name: string;
  phone: string;
  address?: Address;
}
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface Result {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
  todos: Todo[];
}

export async function getTodosByUserId(id: number): Promise<Result | string> {
  try {
    const usersRes = await axios.get<User[]>("https://jsonplaceholder.typicode.com/todos");
    const todosRes = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/users");
    const user = usersRes.data.find((u) => u.id === id);
    if (!user) {
      return "Invalid id";
    }
    const userTodos = todosRes.data.filter((t) => t.userId === id);
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
      todos: userTodos,
    };
  } catch {
    return "Invalid id";
  }
}
