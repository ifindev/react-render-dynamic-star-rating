import "./style.css";

function floatToPercentage(value: number): string {
  const percentage = (value * 100).toFixed(2);
  return `${percentage}%`;
}

function calculateDynamicRating(maximumStars: number, rating: number) {
  const numberOfFullRating = Math.floor(rating);

  const fractionRatingValue = parseFloat(
    (rating - numberOfFullRating).toFixed(2)
  );
  const numberOfFractionRating = fractionRatingValue > 0 ? 1 : 0;

  const numberOfEmptyRating =
    maximumStars - numberOfFullRating - numberOfFractionRating;

  return {
    numberOfFullRating,
    numberOfFractionRating,
    fractionRatingValue,
    numberOfEmptyRating,
  };
}

type StarProps = {
  maximumStars: number;
  rating: number;
};

export default function Star({ maximumStars, rating }: StarProps) {
  const params = calculateDynamicRating(maximumStars, rating);
  const percentageActive = floatToPercentage(params.fractionRatingValue);

  const getStarsConfigs = () => {
    const configs = [...Array(maximumStars).keys()].map((index) => {
      const starConfig = {
        fill: "",
        className: "",
      };

      const isActivePart = index < params.numberOfFullRating;
      const isFractionPart =
        params.numberOfFractionRating === 1 &&
        index === params.numberOfFullRating;

      if (isActivePart) {
        starConfig.className = "active";
      }

      if (isFractionPart) {
        starConfig.fill = `url(#fraction-fill)`;
      }

      return starConfig;
    });

    return configs;
  };

  return (
    <div>
      <svg
        style={{ width: 0, height: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <defs>
          <linearGradient id="fraction-fill" x1="0" x2="100%" y1="0" y2="0">
            <stop offset={percentageActive} stopColor="#ffa41b" />
            <stop offset={percentageActive} stopColor="#ececed" />
          </linearGradient>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="star"
          >
            <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
          </symbol>
        </defs>
      </svg>
      {getStarsConfigs().map((config) => (
        <svg className={`c-star ${config.className}`} viewBox="0 0 32 32">
          <use xlinkHref="#star" fill={config.fill}></use>
        </svg>
      ))}
    </div>
  );
}
