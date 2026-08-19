import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="grid md:flex min-h-[75dvh] justify-center items-center">
      <div className="w-[50%] flex items-center justify-center">
        <SignUp />
      </div>
      <div className="w-[50%] flex items-center justify-center">
        <Image
          src="/app_images/login-pic.jpg"
          alt="Gym snooze"
          width={400}
          height={400}
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
