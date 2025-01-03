const getRemainingTime = (delistingDate) => {
  const currentTime = new Date();
  const timeLeft = new Date(delistingDate) - currentTime;

  if (timeLeft <= 0) return "Expired";

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export default getRemainingTime;
