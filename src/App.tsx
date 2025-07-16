import { useEffect } from "react";
import Lenis from 'lenis'

const App = () => {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="">
      
    </div>
  )
}

export default App
