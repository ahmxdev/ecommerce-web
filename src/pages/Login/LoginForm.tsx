// HOOKS
import { useForm } from "react-hook-form";

// UI
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          className={
            errors.email
              ? "border-red-500 ring-red-500/40 ring-1 focus-visible:ring-red-500/40 focus-visible:border-red-500"
              : ""
          }
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1 ">
        <Label htmlFor="password">Password</Label>
        <Input
          className={
            errors.password
              ? "border-red-500 ring-red-500/40 ring-1 focus-visible:ring-red-500/40 focus-visible:border-red-500"
              : ""
          }
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
}
