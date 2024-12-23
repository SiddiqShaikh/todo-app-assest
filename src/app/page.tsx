import Header from "@/components/layout/header";
import Image from "next/image";

export default function Home() {
  // if(loading){
  //   return(

  //     <div className="min-h-screen flex items-center justify-center">
  //     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  //   </div>
  //   )
  // }
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto pt-16">
        <div className="min-h-[calc(100vh-4rem)] px-4">
          Hello
          {/* <TodoList token={user.token} /> */}
        </div>
      </div>
    </main>
  );
}
