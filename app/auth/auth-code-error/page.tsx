"use server";
import DisplayError from '@/components/authComponents/DisplayError';

const page = () => {
  return (
    <div>Auth Code Error display
        <div>
            <DisplayError />
        </div>
    </div>
  )
}

export default page