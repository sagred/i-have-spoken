import { useState, useRef, TouchEvent } from "react";

const Comparision = () => {
  const [imageRevealFraq, setImageRevealFraq] = useState(0.5);
  const imageContainer = useRef<HTMLDivElement>(undefined);

  const slide = (xPosition: number): void => {
    const containerBoundingRect =
      imageContainer.current.getBoundingClientRect();
    setImageRevealFraq(() => {
      if (xPosition < containerBoundingRect.left) {
        return 0;
      } else if (xPosition > containerBoundingRect.right) {
        return 1;
      } else {
        return (
          (xPosition - containerBoundingRect.left) / containerBoundingRect.width
        );
      }
    });
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>): void => {
    slide(event.touches.item(0).clientX);
  };

  const handleMouseDown = (): void => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (event: MouseEvent): void => {
    slide(event.clientX);
  };

  const handleMouseUp = (): void => {
    window.onmousemove = undefined;
    window.onmouseup = undefined;
  };

  const beforeVideoSrc = "videos/beforefx.mp4";
  const afterVideoSrc = "videos/afterfx.mp4";

  return (
    <div className="">
      <div
        ref={imageContainer}
        className="group relative mx-auto max-h-96 w-full max-w-lg select-none"
      >
        <video
          autoPlay
          src={afterVideoSrc}
          muted
          playsInline
          loop
          className="pointer-events-none"
        />
        <video
          style={{
            clipPath: `polygon(0 0, ${imageRevealFraq * 100}% 0, ${
              imageRevealFraq * 100
            }% 100%, 0 100%)`,
          }}
          autoPlay
          muted
          playsInline
          loop
          src={beforeVideoSrc}
          className="pointer-events-none absolute inset-0"
        />
        <div
          style={{ left: `${imageRevealFraq * 100}%` }}
          className="absolute inset-y-0 group-hover:opacity-100 sm:opacity-0"
        >
          <div className="relative h-full opacity-50 hover:opacity-100">
            <div className="absolute inset-y-0 -ml-px w-0.5 bg-white"></div>
            <div
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
              className="absolute top-1/2 -ml-6 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 rotate-90 transform text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparision;
