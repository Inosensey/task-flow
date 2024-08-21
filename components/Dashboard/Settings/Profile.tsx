// Components
import AccountDetails from "./ProfileContent/AccountDetails";
import PersonalInformation from "./ProfileContent/PersonalInformation";

// Types
import { UserResponse } from "@supabase/supabase-js";
import { TableRow } from "@/Types/database.types";
interface props {
  User: UserResponse;
  personalInfo: TableRow<"PersonalInformation">[];
  userInfo: TableRow<"User">[];
}

const Profile = ({ User, personalInfo, userInfo }: props) => {
  return (
    <div className="mt-2 flex flex-col gap-2 laptop:flex-row">
      <AccountDetails
        User={User}
        userInfo={userInfo}
      />
      <PersonalInformation
        personalInfo={personalInfo}
      />
    </div>
  );
};

export default Profile;
