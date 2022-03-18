import Image from "next/image";
import uberX from "../assets/rides/uberX.png";
import uberBlack from "../assets/rides/uberBlack.png";
import uberBlackSuv from "../assets/rides/uberBlackSuv.png";
import uberSelect from "../assets/rides/uberSelect.png";
import uberXL from "../assets/rides/uberXL.png";
import ethLogo from "../assets/eth-logo.png";

const style = {
  wrapper: `h-full flex flex-col`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  carList: `flex flex-col flex-1 overflow-scroll`,
  car: `flex p-3 m-2 items-center border-2 border-white`,
  selectedCar: `border-2 border-black flex p-2 m-2 items-center`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-blue-500`,
  priceContainer: `flex items-center`,
  price: `mr-[-0.8rem]`,
};

const carList = [
  {
    service: "UberX",
    image: uberX,
    priceMultiplier: 1,
  },
  {
    service: "UberBlack",
    image: uberBlack,
    priceMultiplier: 1.5,
  },
  {
    service: "UberBlackSuv",
    image: uberBlackSuv,
    priceMultiplier: 1.5,
  },
  {
    service: "UbserSelect",
    image: uberSelect,
    priceMultiplier: 1.5,
  },
  {
    service: "UberXL",
    image: uberXL,
    priceMultiplier: 1.5,
  },
];

const basePrice = 1542;

const RideSelector = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Choose a ride, or swipre up for more</div>
      <div className={style.carList}>
        {carList.map((car, index) => (
          <div className={style.car} key={index}>
            <Image
              src={car.image}
              className={style.carImage}
              width={50}
              height={50}
              alt={car.service}
            />
            <div className={style.carDetails}>
              <div className={style.service}>{car.service}</div>
              <div className={style.time}>5 mins away</div>
            </div>
            <div className={style.priceContainer}>
              <div className={style.price}>
                {/* double asteriks is equivalent to Math.pow */}
                {((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5)}
              </div>
              <Image src={ethLogo} width={40} height={25} alt={"eth logo"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideSelector;
