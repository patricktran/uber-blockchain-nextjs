import RideSelector from "./ride-selector";
import { useContext } from "react";
import { UberContext } from "../context/uber-context";
//import { ethers } from "ethers";

//todo
// update readme on how to upload ride types to sanity.io
// explain studio folder
// create sample-data folder with ride.json

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col`,
  confirmButtonContainer: `border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
};

const ConfirmRide = () => {
  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    selectedRide,
    pickupCoords,
    dropoffCoords,
    basePrice,
    metamask,
  } = useContext(UberContext);

  const storeTripDetails = async () => {
    if (!pickup || !dropoff || !basePrice) return;

    try {
      await fetch("/api/db/save-trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          price,
          selectedRide,
        }),
      });

      //charge the customer
      // https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters
      /*
      await metamask.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
            gas: '0x7EF40' // 520000 wei
            value: ethers.utils.parseEther(price)._hex
          },
        ],
      });*/
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoords && dropoffCoords && <RideSelector />}
      </div>
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButton} onClick={storeTripDetails}>
          Confirm {selectedRide?.service}
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
