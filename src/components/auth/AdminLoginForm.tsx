import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

interface AdminLoginFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ isLoading, setIsLoading }) => {
  const navigate = useNavigate();

  const loginForm = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleLogin = async (values: AdminLoginFormValues) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      // Check if the user has admin role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Unauthorized: Admin access required');
      }

      toast.success("Admin login successful!");
      navigate("/admin");
    } catch (error: any) {
      console.error("Admin login error:", error.message);
      toast.error(error.message || "Admin login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-3 sm:space-y-4">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Admin Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="admin@example.com" 
                  autoComplete="email"
                  disabled={isLoading}
                  className="text-sm sm:text-base"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="text-sm sm:text-base"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? "Processing..." : "Sign In as Admin"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminLoginForm; 