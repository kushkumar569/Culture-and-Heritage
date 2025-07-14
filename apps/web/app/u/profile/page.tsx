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
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}