export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full max-w-sm flex flex-col items-center justify-center h-screen mx-auto'>
      {children}
    </div>
  );
}
