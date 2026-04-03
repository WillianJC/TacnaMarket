import React from 'react';
import styled from 'styled-components';

interface PremiumCardProps {
  badge?: string;
  title: string;
  description: string;
  price: string;
  imageGradient?: string;
  onButtonClick?: () => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  badge = 'NEW',
  title,
  description,
  price,
  imageGradient = 'linear-gradient(45deg, #059669, #10b981)',
  onButtonClick,
}) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__shine" />
        <div className="card__glow" />
        <div className="card__content">
          {badge && <div className="card__badge">{badge}</div>}
          <div
            className="card__image"
            style={{ backgroundImage: imageGradient }}
          />
          <div className="card__text">
            <p className="card__title">{title}</p>
            <p className="card__description">{description}</p>
          </div>
          <div className="card__footer">
            <div className="card__price">{price}</div>
            <button className="card__button" onClick={onButtonClick} title="Agregar al carrito">
              <svg height={16} width={16} viewBox="0 0 24 24">
                <path
                  strokeWidth={2}
                  stroke="currentColor"
                  d="M4 12H20M12 4V20"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --card-bg: #ffffff;
    --card-accent: #059669;
    --card-accent-hover: #047857;
    --card-accent-soft: #d1fae5;
    --card-text: #111827;
    --card-text-secondary: #6b7280;
    --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);

    width: 190px;
    height: 254px;
    background: var(--card-bg);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: var(--card-shadow);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
  }

  .card__shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card__glow {
    position: absolute;
    inset: -10px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(5, 150, 105, 0.3) 0%,
      rgba(5, 150, 105, 0) 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .card__content {
    padding: 1.25em;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    position: relative;
    z-index: 2;
  }

  .card__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: var(--card-accent);
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 999px;
    font-size: 0.7em;
    font-weight: 600;
    transform: scale(0.8);
    opacity: 0;
    transition: all 0.4s ease 0.1s;
  }

  .card__image {
    width: 100%;
    height: 100px;
    background: var(--card-accent);
    border-radius: 12px;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .card__image::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 30%
      ),
      repeating-linear-gradient(
        45deg,
        rgba(16, 185, 129, 0.1) 0px,
        rgba(16, 185, 129, 0.1) 2px,
        transparent 2px,
        transparent 4px
      );
    opacity: 0.5;
  }

  .card__text {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  .card__title {
    color: var(--card-text);
    font-size: 1.1em;
    margin: 0;
    font-weight: 700;
    transition: all 0.3s ease;
  }

  .card__description {
    color: var(--card-text-secondary);
    font-size: 0.75em;
    margin: 0;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  .card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .card__price {
    color: var(--card-text);
    font-weight: 700;
    font-size: 1em;
    transition: all 0.3s ease;
  }

  .card__button {
    width: 28px;
    height: 28px;
    background: var(--card-accent);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: scale(0.9);
    padding: 0;
  }

  /* Hover Effects */
  .card:hover {
    transform: translateY(-10px);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: rgba(5, 150, 105, 0.2);
  }

  .card:hover .card__shine {
    opacity: 1;
    animation: shine 3s infinite;
  }

  .card:hover .card__glow {
    opacity: 1;
  }

  .card:hover .card__badge {
    transform: scale(1);
    opacity: 1;
    z-index: 1;
  }

  .card:hover .card__image {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .card:hover .card__title {
    color: var(--card-accent);
    transform: translateX(2px);
  }

  .card:hover .card__description {
    opacity: 1;
    transform: translateX(2px);
  }

  .card:hover .card__price {
    color: var(--card-accent);
    transform: translateX(2px);
  }

  .card:hover .card__button {
    transform: scale(1);
    box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.2);
    background: var(--card-accent-hover);
  }

  .card:hover .card__button svg {
    animation: pulse 1.5s infinite;
  }

  /* Active State */
  .card:active {
    transform: translateY(-5px) scale(0.98);
  }

  /* Animations */
  @keyframes shine {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default PremiumCard;
