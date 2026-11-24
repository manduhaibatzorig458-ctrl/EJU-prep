import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import AuthLayout from "../../../components/auth/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      formLabel="Нэвтрэх"
    >
      <Suspense fallback={null}>
        <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
      </Suspense>
    </AuthLayout>
  );
}
