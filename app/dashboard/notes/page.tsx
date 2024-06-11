"use server"

// Components
import Header from "@/components/Dashboard/Header"

// Icones
import GgNotes from "@/Icones/GgNotes"

const page = async () => {
  return (
    
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Notes" Icon={GgNotes} />
      </div>
    </div>
  )
}

export default page