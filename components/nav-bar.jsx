import Image from "next/image";
import AvatarImage from "../temp/avatar.png";
import { BsPerson } from "react-icons/bs";
import { useContext } from "react";
import { UberContext } from "../context/uber-context";

const style = {
  wrapper: `h-16 w-full bg-black text-white flex md:justify-around items-center px-60 z-20`,
  leftMenu: `flex gap-3`,
  logo: `text-3xl text-white flex cursor-pointer mr-16`,
  menuItem: `text-lg text-white font-medium flex items-center mx-4 cursor-pointer`,
  rightMenu: `flex gap-3 items-center`,
  userImageContainer: `mr-2 h-10 w-10`,
  //userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
  userImage: `rounded-full p-px object-cover cursor-pointer`,
  loginButton: `flex items-center cursor-pointer rounded-full hover:bg-[#333] px-4 py-1`,
  loginText: `ml-2`,
};

const NavBar = () => {
  const { currentAccount, currentUser, connectWallet } =
    useContext(UberContext);

  return (
    <header className={style.wrapper}>
      <div className={style.leftMenu}>
        <div className={style.logo}>Uber</div>
        <div className={style.menuItem}>Ride</div>
        <div className={style.menuItem}>Drive</div>
        <div className={style.menuItem}>More</div>
      </div>
      <div className={style.rightMenu}>
        <div className={style.menuItem}>Help</div>
        <div className={style.menuItem}>
          {currentUser && currentUser.name?.split(" ")[0]}
        </div>
        <div className={style.userImageContainer}>
          <Image
            className={style.userImage}
            src={AvatarImage}
            width={40}
            height={40}
            alt="avatar"
          />
        </div>
        {currentAccount ? (
          <div>
            {currentAccount.slice(0, 5)}...{currentAccount.slice(15)}
          </div>
        ) : (
          <div className={style.loginButton} onClick={connectWallet}>
            <BsPerson />
            <span>Log in</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
