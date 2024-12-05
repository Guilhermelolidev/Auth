import { NextResponse } from 'next/server';

// export const GET = withAuth(async request => {
//   return NextResponse.json([
//     {
//       id: 1,
//       name: 'Order 1',
//       userId: request.user.id,
//     },
//     {
//       id: 2,
//       name: 'Order 2',
//       userId: request.user.id,
//     },
//   ]);
// });

export const GET = async () => {
  return NextResponse.json({ message: 'Hello, world!' });
};
