import { NextResponse } from 'next/server';
import { updateTaskStatus } from '@/lib/supabase';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In Next.js 16, params is now a Promise
    const { id } = await params;
    const { status, userId } = await request.json();
    
    if (!status || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await updateTaskStatus(id, status, userId);
    
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update task' },
      { status: 500 }
    );
  }
}

