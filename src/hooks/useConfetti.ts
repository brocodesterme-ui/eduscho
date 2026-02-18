import confetti from "canvas-confetti";

export const useConfetti = () => {
  const fireConfetti = (type: "burst" | "rain" | "stars" | "side" = "burst") => {
    switch (type) {
      case "burst":
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#0EA5E9", "#22C55E", "#F59E0B", "#A78BFA", "#F472B6"],
        });
        break;

      case "rain":
        const end = Date.now() + 1500;
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#0EA5E9", "#22C55E", "#F59E0B"],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#A78BFA", "#F472B6", "#34D399"],
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
        break;

      case "stars":
        confetti({
          particleCount: 60,
          spread: 100,
          shapes: ["star"],
          colors: ["#FCD34D", "#F59E0B", "#FBBF24"],
          origin: { y: 0.5 },
          scalar: 1.5,
        });
        break;

      case "side":
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
        });
        break;
    }
  };

  return { fireConfetti };
};
