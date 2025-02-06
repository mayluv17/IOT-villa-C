import { getPathname } from "@/auth/misc";
import { validateSession } from "@/auth/session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateSession();
  const pathName = await getPathname();

  if (!user && pathName !== "/login") {
    redirect("/login");
  }

  return <div className="">{children}</div>;
}
