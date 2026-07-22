// HOOKS
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

// UI
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

// API
import { login } from "../../auth/auth.api";
import axios from "axios";

// AUTH
import { useAuth } from "@/contexts/AuthContext";

type LoginFormData = {
  email: string;
  password: string;
};
type ValidationErrors<T> = Partial<Record<keyof T, string[]>>;
type ValidationErrorResponse<T> = {
  message: string;
  errors: ValidationErrors<T>;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      auth.login(response);
      navigate("/profile", { replace: true });
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        return;
      }

      if (error.response?.status === 422) {
        const data = error.response
          .data as ValidationErrorResponse<LoginFormData>;

        Object.entries(data.errors).forEach(([field, messages]) => {
          setError(field as keyof LoginFormData, {
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

      {/* Login Button */}
      <Button type="submit">Login</Button>
      {/* End Login Button */}

      {/* Root Error Message */}
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      {/* End Root Error Message */}
    </form>
  );
}
