import clientPromise from '@/lib/mongodb';
import { getDbAndReqBody } from '@/lib/utils/api-routes';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req);

    const { productId, category } = reqBody;

    if (!productId || !category || !ObjectId.isValid(productId)) {
      return NextResponse.json({
        status: 400,
        message: 'Invalid product ID or category',
      });
    }

    const productItem = await db
      .collection(category)
      .findOne({ _id: new ObjectId(productId) });

    if (!productItem) {
      return NextResponse.json({
        status: 404,
        message: 'Product not found',
      });
    }

    return NextResponse.json({
      status: 200,
      productItem,
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
