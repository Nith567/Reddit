"use client";
import React, { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        className="sm rounded-md w-full shadow-md hover:text-slate-300"
      >
        {isLoading ? null : <Icons.google className="h-6 md:w-8 sm:w-6 m-2" />}
        GOOGLE
      </Button>
    </div>
  );
};

export default UserAuthForm;
