import { useEffect, useState } from "react";

export default function useTypewriter(
  words: string[],
  typingSpeed = 80,
  deleteSpeed = 45,
  pauseMs = 2200,
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) {
      const t = setTimeout(() => {
        setIsPausing(false);
        setIsDeleting(true);
      }, pauseMs);
      return () => clearTimeout(t);
    }
    const current = words[wordIndex];
    const delay = isDeleting ? deleteSpeed : typingSpeed;
    const t = setTimeout(() => {
      if (!isDeleting && charIndex === current.length) {
        setIsPausing(true);
        return;
      }
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        return;
      }
      setCharIndex((c) => c + (isDeleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [
    charIndex,
    isDeleting,
    isPausing,
    wordIndex,
    words,
    typingSpeed,
    deleteSpeed,
    pauseMs,
  ]);

  return words[wordIndex].slice(0, charIndex);
}
