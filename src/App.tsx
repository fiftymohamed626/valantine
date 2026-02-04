/* eslint-disable react-hooks/purity */
import { useState, useRef } from "react";

type Heart = {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
};

function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState<{ top: string; left: string } | null>(null);
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);

  // ✅ Generate once, persist forever
  const floatingHearts = useRef<Heart[]>(
    Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }))
  ).current;

  const moveNo = () => {
    setNoButtonSize((prev) => Math.max(prev - 0.1, 0.3));
    setYesButtonSize((prev) => Math.min(prev + 0.15, 2));

    // ✅ Forbidden zone around YES button (center of screen)
    const FORBIDDEN = {
      topMin: 35,
      topMax: 65,
      leftMin: 35,
      leftMax: 65,
    };

    let top = 0;
    let left = 0;

    // ✅ Keep generating positions until we're outside the YES zone
    do {
      top = Math.random() * 90 + 5; // 5% to 95%
      left = Math.random() * 90 + 5; // 5% to 95%
    } while (
      top >= FORBIDDEN.topMin &&
      top <= FORBIDDEN.topMax &&
      left >= FORBIDDEN.leftMin &&
      left <= FORBIDDEN.leftMax
    );

    setNoPos({
      top: `${top}%`,
      left: `${left}%`,
    });
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden flex items-center justify-center bg-linear-to-br from-pink-400 via-red-400 to-pink-600">
      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-float"
            style={heart}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* ✅ NO button - absolute to entire page */}
      {!yesClicked && noPos && (
        <button
          onMouseEnter={moveNo}
          onClick={moveNo}
          onTouchStart={moveNo}
          style={{
            top: noPos.top,
            left: noPos.left,
            transform: `translate(-50%, -50%) scale(${noButtonSize})`,
          }}
          className="fixed z-9999 px-12 py-5 cursor-pointer rounded-full bg-gray-700 text-2xl font-bold transition-all"
        >
          NO 😅
        </button>
      )}

      {yesClicked ? (
        <div className="text-center text-white z-10 animate-fadeIn">
          <div className="text-9xl mb-6 animate-heartBeat">❤️</div>
          <h1 className="text-6xl font-bold mb-4 animate-bounce">YAAAY! 🎉</h1>
          <p className="text-3xl">Best Valentine Ever 💕</p>
        </div>
      ) : (
        <div className="text-center text-white z-20">
          <h1 className="text-6xl font-bold mb-16">
            Will you be my Valentine? 💖
          </h1>

          <div className="flex gap-6 justify-center">
            <button
              onClick={() => setYesClicked(true)}
              style={{ transform: `scale(${yesButtonSize})` }}
              className="px-12 py-5 cursor-pointer rounded-full bg-pink-500 text-2xl font-bold transition-all"
            >
              YES 💘
            </button>

            {/* ✅ Initial NO button position */}
            {!noPos && (
              <button
                onMouseEnter={moveNo}
                onClick={moveNo}
                onTouchStart={moveNo}
                style={{ transform: `scale(${noButtonSize})` }}
                className="px-12 py-5 rounded-full bg-gray-700 text-2xl font-bold transition-all"
              >
                NO 😅
              </button>
            )}
          </div>
        </div>
      )}

      <div className="absolute flex gap-2 items-center start-4 bottom-4 text-white text-sm w-full text-center">
        Created by
        <a target="_blank" href="https://abdullah-portfolio-app.netlify.app/" className="text-white px-3 hover:underline hover:text-pink-500 hover:bg-white ">Abdullah Moahmed</a>
      </div>
    </div>
  );
}

export default App;