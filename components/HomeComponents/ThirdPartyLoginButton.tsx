import { motion } from "framer-motion";

interface props {
  provider: string;
  buttonName: string;
  backgroundColor: string;
  Icon: React.ComponentType<{color: string}>;
  mutateFn: (loginType: string, provider: string) => void
}

const ThirdPartyLoginButton = ({
  backgroundColor,
  buttonName,
  Icon,
  provider,
  mutateFn
}: props) => {
  return (
    <div className="flex justify-center items-center">
      <motion.button
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        onClick={() => {
            mutateFn("loginWithThirdParty", provider)
        }}
        whileTap={{ scale: 0.9 }}
        style={{background: `${backgroundColor}`}}
        className={`flex items-center gap-1 text-base text-LightSecondary rounded-md mt-2 phone:w-max phone:px-3 phone:py-2`}
      >
        <Icon color="#fff" />
        {buttonName}
      </motion.button>
    </div>
  );
};

export default ThirdPartyLoginButton;
