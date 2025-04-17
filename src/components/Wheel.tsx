import React, { useRef, useEffect, useState } from 'react';
import useStore from '../store';
import confetti from 'canvas-confetti';
import { RotateCcw } from 'lucide-react';

// Enhanced color palette with more vibrant and modern colors
const COLORS = [
  '#4F46E5', // Indigo
  '#06B6D4', // Cyan
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#8B5CF6', // Violet
];

export default function Wheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    entries, 
    isSpinning, 
    setSpinning, 
    hasSpunOnce,
    setHasSpunOnce,
    addWinner,
    setShowWinnerModal,
    setCurrentWinner
  } = useStore();
  const [rotation, setRotation] = useState(0);
  const animationFrameRef = useRef<number>();
  const [hoverSpin, setHoverSpin] = useState(false);

  useEffect(() => {
    drawWheel();
  }, [entries, rotation, hasSpunOnce, hoverSpin]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) -40; // Increased margin for larger text

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wheel segments
    entries.forEach((entry, index) => {
      const startAngle = (index / entries.length) * 2 * Math.PI + rotation;
      const endAngle = ((index + 1) / entries.length) * 2 * Math.PI + rotation;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const color = COLORS[index % COLORS.length];
      ctx.fillStyle = color;
      ctx.fill();

      // Add gradient overlay to create depth
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add segment border
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Determine text color based on segment color brightness
      const isDark = color === '#F59E0B' || color === '#10B981';
      const fillTextColor = isDark ? '#000000' : '#FFFFFF';

      // Draw text on segments
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = fillTextColor;
      ctx.font = 'bold 40px "Poppins", sans-serif'; // Increased font size from 32px to 40px
      
      // Position text on the segment
      const textDistance = radius * 0.65;
      ctx.rotate(Math.PI / 2);
      
      // Add shadow to text for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // Calculate available width based on sector angle and radius
      const sectorAngle = 2 * Math.PI / entries.length;
      const availableWidth = 2 * textDistance * Math.sin(sectorAngle / 2) * 0.8;
      
      // Dynamically truncate text to fit within sector
      let displayName = entry.name;
      let textWidth = ctx.measureText(displayName).width;
      
      if (textWidth > availableWidth) {
        let len = displayName.length - 1;
        while (len > 0 && ctx.measureText(displayName.substring(0, len) + '...').width > availableWidth) {
          len--;
        }
        displayName = displayName.substring(0, len) + '...';
      }
      
      ctx.fillText(displayName, 0, -textDistance);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 80, 0, 2 * Math.PI); // Increased center circle size
    
    const centerGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 80
    );
    
    if (hoverSpin && !isSpinning) {
      centerGradient.addColorStop(0, '#4F46E5');
      centerGradient.addColorStop(1, '#6366F1');
    } else {
      centerGradient.addColorStop(0, '#FFFFFF');
      centerGradient.addColorStop(1, '#F3F4F6');
    }
    
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw center text
    if (!hasSpunOnce || !isSpinning) {
      ctx.fillStyle = hoverSpin ? '#FFFFFF' : '#000000';
      ctx.font = 'bold 32px "Poppins", sans-serif'; // Increased font size
      ctx.textAlign = 'center';
      ctx.fillText('Click to', centerX, centerY - 10);
      ctx.fillText('spin', centerX, centerY + 24);
    } else if (isSpinning) {
      ctx.fillStyle = '#4F46E5';
      ctx.font = 'bold 24px "Poppins", sans-serif'; // Reduced font size from 32px to 24px
      ctx.textAlign = 'center';
      ctx.fillText('Spinning...', centerX, centerY);
    }
  };

  const getSelectedEntry = (angle: number) => {
    const normalizedAngle = (360 - (angle % 360) + 0) % 360;
    const segmentAngle = 360 / entries.length;
    const index = Math.floor(normalizedAngle / segmentAngle);
    return entries[index];
  };

  const spin = () => {
    if (isSpinning || entries.length === 0) return;

    setSpinning(true);
    setHasSpunOnce(true);

    const startTime = performance.now();
    const spinDuration = 5000;
    const startRotation = rotation;
    const totalRotation = 10 * Math.PI + Math.random() * Math.PI * 2;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentRotation = startRotation + totalRotation * easeOut(progress);
      setRotation(currentRotation);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        const winner = getSelectedEntry(currentRotation * (180 / Math.PI));
        if (winner) {
          const newWinner = {
            id: winner.id,
            name: winner.name,
            timestamp: Date.now(),
          };
          
          // Play sound
          if (audioRef.current) {
            audioRef.current.play();
          }

          // Trigger confetti with more variety
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#4F46E5', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6']
          });

          addWinner(newWinner);
          setCurrentWinner(newWinner);
          setShowWinnerModal(true);
        }
        setSpinning(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleReset = () => {
    setRotation(0);
    setHasSpunOnce(false);
    startIdleAnimation();
  };

  const startIdleAnimation = () => {
    let startTime = performance.now();
    const animate = () => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      
      // Complete one rotation every 30 seconds (30000ms)
      const rotationSpeed = (2 * Math.PI) / 30000;
      setRotation(elapsed * rotationSpeed);
      
      if (!hasSpunOnce) {
        startTime = currentTime;
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-120px)] max-h-[900px] min-h-[500px] -mt-16">
      <div className="relative group w-full h-full">
        <div 
          className="relative cursor-pointer w-full h-full bg-transparent"
          onMouseEnter={() => setHoverSpin(true)}
          onMouseLeave={() => setHoverSpin(false)}
        >
          <canvas
            ref={canvasRef}
            width={900}
            height={900}
            className={`${isSpinning ? 'animate-pulse' : ''} ${hoverSpin && !isSpinning ? 'scale-[1.01]' : 'scale-100'} transition-transform duration-300 w-full h-full object-contain`}
            onClick={spin}
          />
          <div className="absolute top-1/2 right-0 transform translate-y-[-50%] -translate-x-0 -rotate-180 transition-all duration-300 z-10">
            <div className="w-0 h-0 border-t-[30px] border-t-transparent border-l-[60px] border-l-black border-b-[30px] border-b-transparent drop-shadow-md" />
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} src="/ding.mp3" preload="auto" />
    </div>
  );
}