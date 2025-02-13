export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const { user } = await validateSession();
  //   const pathName = await getPathname();

  //   if (!user && pathName !== '/login') {
  //     redirect('/login');
  //   }

  return <div className="container mx-auto p-10">{children}</div>;
}
