import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import ethLogo from "../assets/eth-logo.png";
import { UberContext } from "../context/uber-context";

const style = {
  wrapper: `h-full flex flex-col`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  carList: `flex flex-col flex-1`,
  car: `flex p-3 m-2 items-center border-2 border-white cursor-pointer`,
  selectedCar: `border-2 border-black flex p-2 m-2 items-center`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-blue-500`,
  priceContainer: `flex items-center`,
  price: `mr-[-0.8rem]`,
};

const RideSelector = () => {
  const [carList, setCarList] = useState([]);

  const { selectedRide, setSelectedRide, setPrice, basePrice } =
    useContext(UberContext);

  useEffect(() => {
    const fetchCarList = async () => {
      const res = await fetch("/api/db/get-ride-types");
      const data = await res.json();
      setCarList(data?.data);
      setSelectedRide(data?.data?.[0]);
    };

    fetchCarList();
  }, [setSelectedRide]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Choose a ride, or swipe up for more</div>
      <div className={style.carList}>
        {carList?.map((car, index) => {
          //double asteriks is equivalent to Math.pow
          const carPrice = (
            (basePrice / 10 ** 5) *
            car.priceMultiplier
          ).toFixed(5);

          return (
            <div
              className={`${
                selectedRide?.service === car.service
                  ? style.selectedCar
                  : style.car
              }`}
              key={index}
              onClick={() => {
                setSelectedRide(car);
                setPrice(carPrice);
              }}
            >
              <Image
                src={car.iconUrl}
                className={style.carImage}
                width={50}
                height={50}
                alt={car.service}
              />
              <div className={style.carDetails}>
                <div className={style.service}>{car.service}</div>
                <div className={style.time}>5 mins away</div>
              </div>
              {carPrice > 0 && (
                <div className={style.priceContainer}>
                  <div className={style.price}>{carPrice}</div>
                  <Image
                    src={ethLogo}
                    width={40}
                    height={25}
                    alt={"eth logo"}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RideSelector;
