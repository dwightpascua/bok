
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender",
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ isLoading, setIsLoading }) => {
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "male",
    },
    mode: "onChange",
  });

  const handleSignUp = async (values: SignUpFormValues) => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            gender: values.gender,
          },
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Account created successfully! Please check your email for verification.");
    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast.error(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-3 sm:space-y-4">
        <FormField
          control={signUpForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  autoComplete="name"
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
          control={signUpForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
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
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  autoComplete="new-password"
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
          control={signUpForm.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-2 sm:space-y-3">
              <FormLabel className="text-sm sm:text-base">Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-row gap-4"
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="text-sm sm:text-base">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="text-sm sm:text-base">Female</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? "Processing..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
