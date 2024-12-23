import Header from "@/components/layout/header";
import { TodoList } from "@/components/TodoList";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto pt-16">
        <div className="min-h-[calc(100vh-4rem)] px-4">
          {/* <TodoList token={user.token} /> */}
          <TodoList />
        </div>
      </div>
    </main>
  );
}
