import { useEffect, useState} from "react";

export function Cronometro({order}) {
  const [diff, setDiff] = useState(null)
  const [initial, setInitial] = useState(null)

  const tick = () => {
    setDiff(new Date(+new Date() - initial)) 
  };

  
  const start = () => { setInitial(order.date.toDate())  }

  useEffect(()=>{
    start()
  },[])
  
  useEffect(() => {
    if (initial) {
      requestAnimationFrame(tick);
    }
  }, [initial]);

  useEffect(() => {
    if (diff) {
      requestAnimationFrame(tick);
    }
  }, [diff]);

  return (
    <div>
      <h1>{timeFormat(diff)}</h1>
    </div>
  );
}

const timeFormat = (date) => {
  if (!date) return "00:00";

  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();

  mm = mm < 10 ? "0"+mm :  mm;
  ss = ss < 10 ? "0"+ss :  ss;

  return `${mm}:${ss}`;
};

