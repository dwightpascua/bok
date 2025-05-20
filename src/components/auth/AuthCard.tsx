
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-xl sm:text-2xl">
          {isSignUp ? "Create an Account" : "Sign In"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSignUp ? (
          <SignUpForm isLoading={isLoading} setIsLoading={setIsLoading} />
        ) : (
          <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-4">
        <Button
          variant="link"
          onClick={() => {
            setIsSignUp(!isSignUp);
          }}
          className="text-xs sm:text-sm"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
