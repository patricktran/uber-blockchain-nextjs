import NavBar from "../components/nav-bar";
import Map from "../components/map";
import LocationSelector from "../components/location-selector";
import ConfirmRide from "../components/confirm-ride";

const style = {
  wrapper: `h-screen w-screen flex flex-col`,
  main: `h-full w-screen flex-1 z-10`,
  rideRequestContainer: `h-full w-[400px] ml-[1rem] py-[3rem] absolute top-0 left-0 flex flex-col justify-end z-20`,
  rideRequest: `h-full max-h-[700px] bg-white rounded-lg flex flex-col overflow-scroll`,
};

export default function Home() {
  return (
    <div className={style.wrapper}>
      <NavBar />
      <div className={style.main}>
        <Map />
      </div>
      <div className={style.rideRequestContainer}>
        <div className={style.rideRequest}>
          <LocationSelector />
          <ConfirmRide />
        </div>
      </div>
    </div>
  );
}
