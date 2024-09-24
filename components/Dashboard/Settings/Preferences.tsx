// Components
import NotificationDetails from "./PreferencesContent/NotificationDetails";

const Preferences = () => {
  return (
    <div className="mt-2 flex flex-col gap-2 laptop:flex-row">
      <NotificationDetails />
    </div>
  );
};

export default Preferences;
