import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  console.log(user);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1>Profile</h1>

        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
    </main>
  );
}
