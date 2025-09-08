import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterProps {
  end: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true, // only once when in view
  });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = end / (duration / 16);

    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
};




const Info:React.FC = () => {
  return (
    <div className="bg-cover h-96 bg-center p-3 bg-no-repeat py-10 flex justify-center items-center"
    style={{ backgroundImage: `url('/backgroundForList.png')` }}>
      <div className="flex w-full  items-center gap-3 justify-center md:justify-between flex-wrap">
        <div className="bg-white rounded  flex flex-col items-center justify-center w-20 h-20 text-lg md:h-32 md:w-32 md:text-2xl">
            <p className="font-lato font-bold text-amber-500"><Counter end={293}/></p>
            <p className="font-lato font-bold text-black">Property</p>

        </div>
        <div className="bg-white rounded flex flex-col items-center justify-center w-20 h-20 text-lg md:h-32 md:w-32 md:text-2xl">
            <p className="font-lato font-bold text-amber-500"><Counter end={334}/></p>
            <p className="font-lato font-bold text-black">Property</p>

        </div>
        <div className="bg-white rounded flex flex-col items-center justify-center w-20 h-20 text-lg md:h-32 md:w-32 md:text-2xl">
            <p className="font-lato font-bold text-amber-500"><Counter end={234}/></p>
            <p className="font-lato font-bold text-black">Property</p>

        </div>
        <div className="bg-white rounded flex flex-col items-center justify-center w-20 h-20 text-lg md:h-32 md:w-32 md:text-2xl">
            <p className="font-lato font-bold text-amber-500"><Counter end={400}/></p>
            <p className="font-lato font-bold text-black">Property</p>

        </div>

      </div>
    </div>
  )
}

export default Info

