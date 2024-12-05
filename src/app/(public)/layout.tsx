import { hasUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await hasUser()) {
    redirect('/');
  }

  return children;
}
