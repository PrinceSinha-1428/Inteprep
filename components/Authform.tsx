"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { Form } from "./ui/form";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type:FormType) => {
    return z.object({
        name:type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email:z.string().email(),
        password:z.string().min(3)
    })
}

const Authform = ({ type }: { type: FormType }) => {
  
  const router = useRouter();
  const isSignIn = type === "sign-in";
  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if(type === 'sign-up'){

          const {name,email,password} = values;
          const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
          const result = await signUp({
            uid: userCredentials.user.uid,
            name: name!,
            email,
            password
          })
          if(!result?.success){
            toast.error(result?.message);
            return;
          }
           toast.success("Account Created Successfully, Please Sign in");
           router.push('/sign-in')
        }else{
            const {email,password} = values;
            const userCredentials = await signInWithEmailAndPassword(auth,email,password);
            const idToken = await userCredentials.user.getIdToken();
            if(!idToken){
              toast.error("Sign in failed");
              return;
            }
            await signIn({
              email,idToken
            })
            toast.success("Sign in successfully");
           router.push('/')
        }
        
    } catch (error) {
        console.log(error)
       toast.error(`There was an error ${error}`)
    }
  }
  return (
    <div className="card-border lg:min-w-[566px] ">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} height={32} width={38} alt="logo" />
          <h2 className="text-primary-100">Inteprep</h2>
        </div>
        <h3>Practice Job Interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
               <FormField name="name" control={form.control} label="Name" placeholder="Your Name" />
            )}
            <FormField name="email" control={form.control} label="Email" placeholder="Email" />
            <FormField name="password" control={form.control} label="password" placeholder="Password" type="password"/>


            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No Account Yet?" : "Have an Account Already?"}
          <Link
            href={!isSignIn ? '/sign-in' : '/sign-up'}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Authform;
