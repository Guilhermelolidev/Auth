import { AuthProvider } from '@/contexts/AuthContext';
import { hasUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await hasUser();

  if (!user) {
    redirect('/login');
  }

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
