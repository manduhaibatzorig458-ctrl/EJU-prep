import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import AuthLayout from "../../../components/auth/auth-layout";

export default function SignUpPage() {
  return (
    <AuthLayout
      formLabel="Бүртгэл үүсгэх"
    >
      <Suspense fallback={null}>
        <SignUp path="/sign-up" routing="path" signInUrl="/login" />
      </Suspense>
    </AuthLayout>
  );
}
