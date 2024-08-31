import { FcGoogle, FaFacebook, MdLogout, FaBookmark } from "../utils/icons";
import { useAuth } from "../context/useAuth";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Login = () => {
  const { user, signInWithGoogle, signInWithFacebook, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("google login successfully")
    } catch (error) {
      console.log("error: ", error)
    }
  }
  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
      console.log("facebook login successfully")
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return user ? (
    <Menu>
      <MenuButton>
        <Avatar bg={"red.500"} color={"white"} size={"sm"} name={user?.displayName} src={user?.photoURL}/>
      </MenuButton>
    <MenuList>
      <Link to={"/watchlist"}>
        <MenuItem>
          <div className="flex items-center gap-4 text-black">
            <FaBookmark/>
            WatchList
          </div>
        </MenuItem>
      
      </Link>
      <MenuItem onClick={logout}>
        <div className="flex items-center gap-4  text-black">
          <MdLogout/>
          Logout
        </div>
      </MenuItem>
    </MenuList>
    </Menu>
  ) : (
    <Menu>
      <MenuButton>
        <Avatar bg={"gray.800"} color={"white"} size={"sm"} />
      </MenuButton>
    <MenuList>
      <MenuItem onClick={handleGoogleLogin}>
        <div className="flex items-center gap-4  text-black">
          <FcGoogle/>
          Sign in with Google
        </div>
        
      </MenuItem>
      <MenuItem onClick={handleFacebookLogin}>
        <div className="flex items-center gap-4  text-black">
          <FaFacebook color="#1877F2" />
          Sign in with facebook
        </div>
      </MenuItem>
    </MenuList>
    </Menu>
  );
};

export default Login;
