import {
  FcGoogle,
  FaFacebook,
  MdLogout,
  FaBookmark,
  RiHeart3Fill,
} from "../utils/icons";
import { useAuth } from "../context/useAuth";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileAvatar = () => {
  const { user, signInWithGoogle, signInWithFacebook, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();

  const loginError = {
    title: t("loginError"),
    description: t("loginErrorOccurred"),
    status: "error",
    duration: 4000,
    isClosable: true,
  };
  const LoginSuccess = {
    title: t("loginSuccess"),
    status: "success",
    duration: 3000,
    isClosable: true,
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast(LoginSuccess);
    } catch (error) {
      toast(loginError);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
      console.log("facebook login successfully");
      toast(LoginSuccess);
    } catch (error) {
      toast(loginError);
      console.log("error: ", error);
    }
  };
  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return user ? (
    <Menu>
      <MenuButton>
        <Avatar
          bg={"red.500"}
          color={"white"}
          size={"sm"}
          name={user?.displayName}
          src={user?.photoURL}
        />
      </MenuButton>
      <MenuList zIndex={"999"}>
        <Link to={"/watchlist"}>
          <MenuItem>
            <div className="flex items-center gap-4 dark:text-white">
              <FaBookmark />
              {t("watchlist")}
            </div>
          </MenuItem>
        </Link>
        <Link to={"/favorite"}>
          <MenuItem>
            <div className="flex items-center gap-4 dark:text-white">
              <RiHeart3Fill />
              {t("favorites")}
            </div>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <div className="flex items-center gap-4">
            <MdLogout />
            {t("logout")}
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Menu>
      <MenuButton>
        <Avatar bg={"#404040"} color={"white"} size={"sm"} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleGoogleLogin}>
          <div className="flex items-center gap-4">
            <FcGoogle />
            {t("signInGoogle")}
          </div>
        </MenuItem>
        <MenuItem onClick={handleFacebookLogin}>
          <div className="flex items-center gap-4">
            <FaFacebook color="#1877F2" />
            {t("signInFacebook")}
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileAvatar;
