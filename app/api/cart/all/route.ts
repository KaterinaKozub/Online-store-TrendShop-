import clientPromise from '@/lib/mongodb';
import { getDataFromDBByCollection } from '@/lib/utils/api-routes';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Якщо getDataFromDBByCollection повертає NextResponse – await тут необов’язковий,
    // але я рекомендую дочекатися результату аби точно обробити помилки всередині
    const res = await getDataFromDBByCollection(clientPromise, req, 'cart');
    return res;
  } catch (error) {
    // замість throw — повертаємо коректний JSON з помилкою
    return NextResponse.json(
      { message: (error as Error).message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}
