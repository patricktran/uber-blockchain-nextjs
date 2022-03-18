import RideSelector from "./ride-selector";

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: `border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
};

const ConfirmRide = () => {
  const storeTripDetails = async () => {
    console.log("clicked");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        <RideSelector />
      </div>
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButton} onClick={storeTripDetails}>
          Confirm UberX
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
