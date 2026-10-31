import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { UserProvider } from "@/lib/context/UserContext";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <AuthSplitLayout>{children}</AuthSplitLayout>
    </UserProvider>
  );
};

export default AuthLayout;
