interface ConfettiProps {
  active: boolean;
}

export const Confetti = ({ active }: ConfettiProps) => {
  if (!active) return null;

  const confettiPieces = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    backgroundColor: [
      "#ff0000",
      "#00ff00",
      "#ffff00",
      "#0000ff",
      "#ff00ff",
      "#ffd700",
    ][Math.floor(Math.random() * 6)],
    animationDuration: 2 + Math.random() * 2,
    animationDelay: Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.backgroundColor,
            animationDuration: `${piece.animationDuration}s`,
            animationDelay: `${piece.animationDelay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall ease-out forwards;
        }
      `}</style>
    </div>
  );
};
