export const ChristmasLights = () => {
  const lights = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute top-0 left-0 right-0 h-12 flex justify-around items-start z-10">
      {lights.map((i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-0.5 h-8 bg-green-800/50"></div>
          <div
            className="w-3 h-4 rounded-full animate-twinkle"
            style={{
              backgroundColor: [
                "#ff0000",
                "#00ff00",
                "#ffff00",
                "#0000ff",
                "#ff00ff",
              ][i % 5],
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        </div>
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
