"use server";
import { NextResponse } from 'next/server';
import DisplayError from '@/components/authComponents/DisplayError';

const page = (request:Request) => {
    console.log(request.url)
  return (
    <div>Auth Code Error display
        <div>
            <DisplayError />
        </div>
    </div>
  )
}

export default page