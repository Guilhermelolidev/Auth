'use client';

import { api } from '@/utils/api';
import { useEffect } from 'react';

export default function Orders() {
  useEffect(() => {
    api.get('/orders').then(res => {
      console.log(res.data);
    });
  }, []);
  return <div>Orders</div>;
}
