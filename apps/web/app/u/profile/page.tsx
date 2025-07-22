"use client"
import { useRouter } from "next/navigation";
export default function Profile() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    router.push("/");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
      <p className="text-lg">This is the profile page.</p>
      <p className="text-sm mt-2">You can add your profile details here.</p>
      <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-1.5 rounded-md transition duration-150 hover:cursor-pointer" onClick={logout}>
        Logout
      </button>
    </div>
  );
}