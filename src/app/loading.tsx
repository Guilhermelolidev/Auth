import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <Loader2 className='h-8 w-8 animate-spin' />
      <span className='text-lg font-medium'>Carregando</span>
    </div>
  );
}
