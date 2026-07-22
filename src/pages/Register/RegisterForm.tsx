// HOOKS
import { useForm } from "react-hook-form";

// UI
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

// API
import { register as registerUser } from "./register.api";
import axios from "axios";

// AUTH
import { useAuth } from "@/contexts/AuthContext";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
type ValidationErrors<T> = Partial<Record<keyof T, string[]>>;
type ValidationErrorResponse<T> = {
  message: string;
  errors: ValidationErrors<T>;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>();

  const auth = useAuth();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);
      auth.login(response);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        return;
      }

      if (error.response?.status === 422) {
        const data = error.response
          .data as ValidationErrorResponse<RegisterFormData>;

        Object.entries(data.errors).forEach(([field, messages]) => {
          setError(field as keyof RegisterFormData, {
            type: "server",
            message: messages?.[0] ?? "",
          });
        });

        return;
      }

      if (error.response?.status === 401) {
        const data = error.response.data as { message: string };

        setError("root", {
          type: "server",
          message: data.message,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Name */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Name</Label>
        <Input
          className={
            errors.name
              ? "border-red-500 ring-red-500/40 ring-1 focus-visible:ring-red-500/40 focus-visible:border-red-500"
              : ""
          }
          id="name"
          type="text"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      {/* End Name */}
      {/* Email */}
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
      {/* End Email */}

      {/* Password */}
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
      {/* End Password */}

      {/* Password Confirm */}
      <div className="flex flex-col gap-1 ">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input
          className={
            errors.password_confirmation
              ? "border-red-500 ring-red-500/40 ring-1 focus-visible:ring-red-500/40 focus-visible:border-red-500"
              : ""
          }
          id="password_confirmation"
          type="password"
          {...register("password_confirmation", {
            required: "Confirm Password is required",
          })}
        />
        {errors.password_confirmation && (
          <p className="text-red-500">{errors.password_confirmation.message}</p>
        )}
      </div>
      {/* End Password Confirm */}

      {/* Register Button */}
      <Button type="submit">Register</Button>
      {/* End Register Button */}

      {/* Root Error Message */}
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      {/* End Root Error Message */}
    </form>
  );
}
