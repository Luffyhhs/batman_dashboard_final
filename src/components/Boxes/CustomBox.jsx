const CustomBox = ({ className, icon, text, click }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div
      onClick={click}
      className={classNames("h-[8rem] shadow-md bg-[#ecf0f5]", className)}
    >
      {icon}
      {text}
    </div>
  );
};

export default CustomBox;
