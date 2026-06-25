import Empty from './empty.svg';

export default () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-base">
      <img src={Empty} alt="" className="w-2/12" /> 空空如也
    </div>
  );
};
