import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import AdminLoginForm from "@/components/auth/AdminLoginForm";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome to Click & Carry</CardTitle>
          <CardDescription className="text-center">
            Choose your login method below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpForm isLoading={isLoading} setIsLoading={setIsLoading} />
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="admin">
              <AdminLoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
