import {
  RequestFeed,
  NotificationInNumber,
  ContactCard,
  MobileProfileModal,
  Button,
} from "../index";
import { randomNamesWithPictures } from "../../constants/Constants";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { GoPersonAdd } from "react-icons/go";

const DesktopSecondaryColumn = () => {
  const [friendReq, setFriendReq] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const { socket, friendReq_response } = useContext(MyContext);

  // Function to fetch friend requests from the server
  const fetchFriendRequest = async () => {
    console.log("in fetch friend req");
    try {
      const { data } = await axios.get(
        "http://localhost:8000/friend/fetchFriendRequest",
        { withCredentials: true }
      );

      setFriendReq(data.friendRequests);
      // console.log(data.friendRequests);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch friend requests when the component mounts
  useEffect(() => {
    fetchFriendRequest();
  }, []);

  useEffect(() => {
    fetchFriendRequest();
  }, [friendReq_response]);

  //socket io
  useEffect(() => {
    socket.on("new friend request", () => {
      fetchFriendRequest();
      // console.log("got new friend request");
    });
  }, [socket]);

  return (
    <aside className="bg-main-shade text-text-color relative hidden w-72 flex-shrink-0 overflow-y-auto custom-scrollbar  xl:flex xl:flex-col overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="h-full px-5">
          <div>
            {/* Friend Requests */}
            <div className="py-8">
              <div className="flex flex-row items-center justify-between uppercase">
                <p className="font-semibold">Recent</p>
                {/* Show the number of friend requests in a notification */}
                <NotificationInNumber
                  total={friendReq ? friendReq.length : 0}
                />
              </div>
              {/* Render friend requests or "No Friend Request" if none */}
              {!friendReq
                ? "No Friend Request"
                : friendReq?.map((user) => (
                    <RequestFeed key={user._id} user={user} />
                  ))}
            </div>
            {/* Contacts */}
            <div className="py-8">
              <div className="flex flex-row items-center justify-between uppercase">
                <p className="font-semibold">CONTACTS</p>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {/* Render contact cards with name, picture, and status */}
                {randomNamesWithPictures.map((item) => (
                  <ContactCard
                    key={item.id}
                    user={item}
                    open={isOpen}
                    setIsOpen={setIsOpen}
                    setSelectedUser={setSelectedUser}
                  />
                ))}
              </div>
              <MobileProfileModal
                open={isOpen}
                setOpen={setIsOpen}
                user={selectedUser}
              >
                <Button
                  type="button"
                  className="inline-flex items-center rounded-full border border-transparent bg-transparent text-text-color shadow-sm hover:bg-primary-shade focus:outline-none focus:ring-2 border-white p-1"
                >
                  <div onClick={() => console.log("added")}>
                    <GoPersonAdd className="h-4 w-4" aria-hidden="true" />
                  </div>
                </Button>
              </MobileProfileModal>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSecondaryColumn;
