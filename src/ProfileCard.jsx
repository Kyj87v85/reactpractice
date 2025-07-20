import React, { useState, useEffect, useRef } from "react";
import "./ProfileCard.css";

function ProfileCard({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo,
  enableTilt,
  onContactClick,
}) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => {
    if (!enableTilt) return;

    const card = cardRef.current;

    function handleMouseMove(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = deltaY * 10; // tilt degree
      const rotateY = deltaX * 10;

      setTiltStyle({
        transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
        transition: "transform 0.1s ease",
      });
    }

    function resetTilt() {
      setTiltStyle({
        transform: "rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.3s ease",
      });
    }

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", resetTilt);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", resetTilt);
    };
  }, [enableTilt]);

  return (
    <div className="profile-card" ref={cardRef} style={tiltStyle}>
      <img className="avatar" src={avatarUrl} alt={`${name} avatar`} />
      {showUserInfo && (
        <div className="info">
          <h2>{name}</h2>
          <h4>{title}</h4>
          <p className="handle">{handle}</p>
          {status && <p className={`status ${status.toLowerCase()}`}>{status}</p>}
          <button className="contact-btn" onClick={onContactClick}>
            {contactText}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
