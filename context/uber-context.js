import { createContext, useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

export const UberContext = createContext();

export const UberProvider = ({ children }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState();
  const [dropoffCoords, setDropoffCoords] = useState();
  const [currentAccount, setCurrentAccount] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [price, setPrice] = useState();
  const [selectedRide, setSelectedRide] = useState();
  const [basePrice, setBasePrice] = useState(0);

  let metamask;

  if (typeof window !== "undefined") {
    metamask = window.ethereum; //this is available if you have metamask/coinbase wallet browser extension installed
  }

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (!window.ethereum) return;

      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (addressArray.length > 0) {
          const address = addressArray[0];
          setCurrentAccount(address);
          requestToCreateUserOnSanity(address);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const requestToGetCurrentUserInfo = async (walletAddress) => {
      try {
        const response = await fetch(
          `/api/db/get-user-info?walletAddress=${walletAddress}`
        );
        const data = await response.json();
        setCurrentUser(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!currentAccount) return;

    requestToGetCurrentUserInfo(currentAccount);
  }, [currentAccount]);

  useEffect(() => {
    if (!pickupCoords || !dropoffCoords) return;

    const getTripDuration = async () => {
      try {
        const response = await fetch("/api/map/get-trip-duration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickupCoordinates: `${pickupCoords[0]},${pickupCoords[1]}`,
            dropoffCoordinates: `${dropoffCoords[0]},${dropoffCoords[1]}`,
          }),
        });

        const data = await response.json();
        const value = isNaN(parseInt(data.data)) ? 0 : parseInt(data.data);

        setBasePrice(Math.round(value));
      } catch (error) {
        console.error(error);
      }
    };

    //call the async method
    getTripDuration();
  }, [pickupCoords, dropoffCoords]);

  //should this be inside the useEffect() below?
  const createLocationCoordinatePromise = (locationName, locationType) => {
    return new Promise(async (resolve, reject) => {
      const res = await fetch("api/map/get-location-coordinates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: locationName,
        }),
      });

      const data = await res.json();

      if (data.message == "success") {
        switch (locationType) {
          case "pickup": {
            setPickupCoords(data.data);
            break;
          }
          case "dropoff": {
            setDropoffCoords(data.data);
            break;
          }
        }
        //resolve promise
        resolve();
      } else {
        //reject promise
        reject();
      }
    });
  };

  useEffect(() => {
    const getCoords = async () => {
      if (pickup && dropoff) {
        await Promise.all([
          createLocationCoordinatePromise(pickup, "pickup"),
          createLocationCoordinatePromise(dropoff, "dropoff"),
        ]);
        //alternatively, you could use result value from Promise.all and call setPickupCoords and setDropoffCoords here
      }
    };

    //call the async method
    getCoords();
  }, [pickup, dropoff]);

  /**
   * Creates user in sanity if record does not exist
   */
  const requestToCreateUserOnSanity = async (address) => {
    if (!window.ethereum) return;

    try {
      await fetch("/api/db/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userWalletAddress: address,
          name: faker.name.findName(),
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return;

    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        const address = addressArray[0];
        setCurrentAccount(address);
        requestToCreateUserOnSanity(address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UberContext.Provider
      value={{
        pickup,
        setPickup,
        dropoff,
        setDropoff,
        pickupCoords,
        setPickupCoords,
        dropoffCoords,
        setDropoffCoords,
        connectWallet,
        currentAccount,
        currentUser,
        price,
        setPrice,
        selectedRide,
        setSelectedRide,
        basePrice,
        metamask,
      }}
    >
      {children}
    </UberContext.Provider>
  );
};
