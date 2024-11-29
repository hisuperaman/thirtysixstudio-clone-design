import { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";
import datasource from "./data/datasource";
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import bgImage from './assets/img1.jpg'


function App() {
  const [showCanvas, setShowCanvas] = useState(false);

  const growingSpanRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(()=>{
    const locomotiveScroll = new LocomotiveScroll();
  }, [])

  useEffect(()=>{
    function handleHeadingClick(e) {
      setShowCanvas((prevShowCanvas)=>{
        if(!prevShowCanvas) {
          gsap.set(growingSpanRef.current, {
            top: e.clientY,
            left: e.clientX
          })

          gsap.set('body', {
            color: 'black',
          })

          gsap.to(growingSpanRef.current, {
            scale: 100,
            ease: 'power2.inOut',
            onComplete: ()=>{
              gsap.set(growingSpanRef.current, {scale: 0, clearProps: "all" });
              gsap.set('body', {
                backgroundColor: '#FD2725',
              })
            }
          })
        }
        else{
          gsap.set('body', {
            color: 'white',
          })
          gsap.to('body', {
            backgroundColor: 'black',
            ease: 'power2.inOut'
          })
        }

        return !prevShowCanvas;
      })
    }

    if(headingRef.current){
      headingRef.current.addEventListener('click', handleHeadingClick);
    }

    return ()=>{
      headingRef.current.removeEventListener('click', handleHeadingClick);
    }
  }, [showCanvas])

  return (
    <div className="font-['Poppins']">
      <span ref={growingSpanRef} className="absolute left-[-200px] top-[-200px] w-8 h-8 bg-red-500 block rounded-full"></span>
    

      <div className="screen-1 relative min-h-screen z-[1]">
        <nav className="px-4 py-3">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold cursor-default">thirtysixstudio</div>
            <ul className="flex space-x-4">
              
                {
                  ['What we do', 'Who we are', 'How we give back', 'Talk to us'].map((navItem, index)=>{
                    return (
                      <li key={index}>
                        <a href="#" className="hover:text-gray-300">
                          {navItem}
                        </a>
                      </li>
                    )
                  })
                }

            </ul>
          </div>
        </nav>


        {
          showCanvas && datasource[0].map((details, index)=>{
            return (
              <Canvas key={index} canvasDets={details} />
            )
          })
        }

        <div className="w-full px-[20%] mt-10">
          <div className="w-[45%]">
            <p className="text-2xl font-semibold tracking-tight leading-snug">
              At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
            </p>
            <p className="mt-8 text-sm font-light opacity-80 tracking-tighter leading-snug">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam necessitatibus ipsum voluptatem tempora!
            </p>
            <p className="mt-8 font-light tracking-tighter leading-snug">
              Scroll
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 flex justify-center w-full px-[20%] leading-tight">
          <p ref={headingRef} className="text-[12rem] text-center tracking-tight cursor-default select-none">
            thirtysixstudio
          </p>
        </div>
        
      </div>

      <div className="screen-2 relative min-h-screen pt-1">
        {
          showCanvas && datasource[1].map((details, index)=>{
            return (
              <Canvas key={index} canvasDets={details} />
            )
          })
        }

        <div className="w-full px-[5%] mt-10">
          <div className="">
            <p className="text-4xl font-semibold tracking-tight leading-snug">
              About Us
            </p>
            <p className="mt-8 font-light opacity-80 tracking-wide leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam necessitatibus ipsum voluptatem tempora!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, alias! Perferendis dolorum voluptas delectus a, culpa suscipit repudiandae, totam qui magnam sequi hic non sit? Facilis dicta deserunt laborum voluptatum!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed necessitatibus saepe alias esse iusto praesentium nihil rem optio itaque explicabo deserunt quia assumenda at ex, suscipit molestiae hic asperiores voluptas?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptatibus dolorem sunt libero deleniti quia nostrum ratione deserunt velit doloribus ea id est similique fugit quaerat atque, dolor, corporis perspiciatis.
            </p>

            <div className="mt-8 flex justify-center">
              <img src={bgImage} className="w-[50%]" alt="decoration image" />
            </div>

          </div>
        </div>

        
      </div>

    </div>
  )
}

export default App;