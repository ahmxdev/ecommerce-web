import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1>Profile</h1>

        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <Button onClick={logout}>Logout</Button>
      </div>
    </main>
  );
}
