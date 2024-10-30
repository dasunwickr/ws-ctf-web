import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "./ui/Icons";
import { useNavigate } from "react-router-dom";

function AuthComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>(""); 
  const [isSQLInjected, setIsSQLInjected] = useState<boolean>(false); 

  const navigate = useNavigate(); 

  useEffect(() => {
    if (isSQLInjected) {
      const timer = setTimeout(() => {
        navigate("/home"); // Navigate to home after a delay
      }, 3000); // Delay of 3 seconds
      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [isSQLInjected, navigate]);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const mockUsername = "administrator"; 
    const mockPassword = "password123";   

    // Simulating SQL injection vulnerability - simplified
    if (username === `${mockUsername}'--`) {
      setTimeout(() => {
        setIsLoading(false);
        setIsSQLInjected(true); // Show SQL injection banner
      }, 1500);
    } else if (username === mockUsername && password === mockPassword) {
      // Normal successful login
      setTimeout(() => {
        setIsLoading(false);
        navigate("/home"); 
      }, 1500);
    } else {
      // Login failed
      setTimeout(() => {
        setIsLoading(false);
        setLoginError("Invalid credentials. Try again.");
      }, 1500);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isSQLInjected && (
        <div className="fixed top-0 left-0 right-0 bg-green-600 text-white text-center py-3">
          <strong>Login Bypass Successful: You have bypassed the login!. Your CTF value='zigmaLand'</strong>
        </div>
      )}
      <Card className="w-[400px] shadow-lg rounded-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Authentication</CardTitle>
          <CardDescription className="text-sm text-gray-500">Login to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-1 mb-4">
              <TabsTrigger value="login" className="text-sm font-medium">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="username"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="text-sm"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="Password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button disabled={isLoading} className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700">
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </div>
              </form>
              {loginError && (
                <div className="mt-2 text-red-500 text-sm">
                  {loginError}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center">
          <p className="px-8 text-sm text-gray-500">
            By clicking continue, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-blue-600">Terms of Service</a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-blue-600">Privacy Policy</a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export { AuthComponent as Login };
