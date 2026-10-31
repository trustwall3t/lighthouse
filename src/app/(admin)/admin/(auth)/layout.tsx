import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";

const AdminAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthSplitLayout>{children}</AuthSplitLayout>;
};

export default AdminAuthLayout;
