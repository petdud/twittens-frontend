import { GoVerified } from "react-icons/go";
import { IUser } from "../../core/collection.interface";
import { AiFillLock } from "react-icons/ai";

export const ProfileItem = ({ user, onClick }: {user: IUser, onClick: (address: string) => void }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(user.address);
  };

  if (!user.twitter) {
    return null;
  }

  const {
    avatar,
    description,
    followers,
    following,
    name: twitterName,
    protected: isProtected,
    username: twitterUsername,
    verified,
  } = user.twitter;

  const ProfileName = () => (
    <div className="text-left">
      <div className="flex items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{twitterName}</h3>
        {verified && <span className="inline-block flex-shrink-0 text-sky-400 pl-1.5">
          <GoVerified aria-label="Twitter verified" />
        </span>}
        {isProtected && <span className="inline-block flex-shrink-0 text-yellow-600 pl-1.5">
          <AiFillLock aria-label="Twitter private account" />
        </span>}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 ">@{twitterUsername}</p>
    </div>
  )

  return (
    <li className="flex flex-col">
      <button className="bg-white dark:bg-neutral-800 rounded-md shadow flex flex-col md:flex-row p-3" onClick={handleClick}>
        <div className="flex-shrink-0 flex items-center mb-2">
          <img className="h-12 w-12 md:h-16 md:w-16 rounded-full mr-4 mt-1" src={avatar} alt={twitterUsername} />
          <div className="block md:hidden">
            <ProfileName/>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1 md:w-72 w-56 overflow-hidden text-left">
          <div className="hidden md:block">
            <ProfileName />
          </div>
          <div>
            <p className="text-base text-gray-600 dark:text-gray-300 truncate">{description}</p>
          </div>

          <div className="flex gap-4 text-base items-center">
            <div className="flex dark:text-white flex-row gap-1 md:gap-0 md:flex-col-reverse items-center md:items-start">
              <span className="font-semibold">{following.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Following</span>
            </div>
            <div className="flex dark:text-white flex-row gap-1 md:gap-0 md:flex-col-reverse items-center md:items-start">
              <span className="font-semibold">{followers.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Followers</span>
            </div>
          </div>
        </div>
      </button>
    </li>
  )
}
