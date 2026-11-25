import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import AuthLayout from "../../../../components/layout/auth-layout";

export default function SignUpPage() {
  return (
    <AuthLayout
      formLabel="Бүртгэл үүсгэх"
    >
      <Suspense fallback={null}>
        <SignUp
          path="/signup"
          routing="path"
          signInUrl="/login"
          forceRedirectUrl="/onboarding"
        />
      </Suspense>
    </AuthLayout>
  );
}
