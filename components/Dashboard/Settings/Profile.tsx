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
    <div className="mt-2 flex flex-col gap-2">
      <AccountDetails
        User={User}
        personalInfo={personalInfo}
        userInfo={userInfo}
      />
      <PersonalInformation
        User={User}
        personalInfo={personalInfo}
        userInfo={userInfo}
      />
    </div>
  );
};

export default Profile;
