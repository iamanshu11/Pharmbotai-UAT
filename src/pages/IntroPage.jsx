import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../assets/logo_svg.svg';
import introVideo from '../assets/intro-aiva-video.mp4';
import { useTheme } from '../context/ThemeContext';
import chatic from '../assets/chat-ic.png';

import safeIcon from '../assets/ic-1/safe.png';
import validationIcon from '../assets/ic-1/validation.png';
import confidentAccuracyIcon from '../assets/ic-1/confident-accuracy.png';
import antiHallucinationIcon from '../assets/ic-1/anti-hallucination.png';
import adminIcon from '../assets/ic-1/admin.png';
import instantDrugIcon from '../assets/ic-2/instant-drug.png';
import clinicalDecisionIcon from '../assets/ic-2/clinical-decision.png';
import availabilityIcon from '../assets/ic-2/availability.png';
import patientSafetyIcon from '../assets/ic-2/patient-safety.png';
import pharmacyIntegrationIcon from '../assets/ic-2/pharmacy-integration.png';

const infographicFeatures = [
  {
    icon: <img src={instantDrugIcon} alt="Instant Drug Information" className="h-12 md:h-16 mb-2" />,
    title: 'Instant Drug Information',
    desc: 'Interacts in real time',
  },
  {
    icon: <img src={clinicalDecisionIcon} alt="Clinical Decision Support" className="h-12 md:h-16 mb-2" />,
    title: 'Clinical Decision Support',
    desc: 'Flags interactions & contraindications',
  },
  {
    icon: <img src={availabilityIcon} alt="24/7 Availability" className="h-12 md:h-16 mb-2" />,
    title: '24/7 Availability',
    desc: 'Always ready to assist',
  },
  {
    icon: <img src={patientSafetyIcon} alt="Patient Safety First" className="h-12 md:h-16 mb-2" />,
    title: 'Patient Safety First',
    desc: 'Alerts you to critical risks',
  },
  {
    icon: <img src={pharmacyIntegrationIcon} alt="Pharmacy Integration" className="h-12 md:h-16 mb-2" />,
    title: 'Pharmacy Integration',
    desc: 'Seamlessly works with your PMR',
  },
];

const infographicFeatures2 = [
  {
    icon: <img src={safeIcon} alt="Safe, Secure, Compliant" className="h-12 md:h-16 mb-2" />,
    title: 'Safe. Secure. Compliant.',
    desc: '',
  },
  {
    icon: <img src={validationIcon} alt="Validation Checks" className="h-12 md:h-16 mb-2" />,
    title: 'Validation Checks',
    desc: 'Ensures answers meet regulatory standards',
  },
  {
    icon: <img src={antiHallucinationIcon} alt="Anti-Hallucination" className="h-12 md:h-16 mb-2" />,
    title: 'Anti-Hallucination',
    desc: 'Prevents inaccurate or misleading responses',
  },
  {
    icon: <img src={confidentAccuracyIcon} alt="Confident Accuracy" className="h-12 md:h-16 mb-2" />,
    title: 'Confident Accuracy',
    desc: 'Provides responses you can trust',
  },
  {
    icon: <img src={adminIcon} alt="Admin-Friendly Interface" className="h-12 md:h-16 mb-2" />,
    title: 'Admin-Friendly Interface',
    desc: 'Offers analytics and content control',
  },
];

export default function IntroPage() {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const [showName, setShowName] = useState(false);
  const navigate = useNavigate();
  const [featureIndex, setFeatureIndex] = useState(0);
  const featureIntervalRef = useRef();
  const [featureIndex2, setFeatureIndex2] = useState(0);
  const featureIntervalRef2 = useRef();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const welcomeText = "Welcome to Your AI-Enabled Virtual Pharmacist";

  const slides = [
    {
      type: 'video',
      content: introVideo,
      title: "Welcome to AIVAe",
      description: "Your AI-powered medical assistant"
    },
    {
      type: 'custom',
      content: null // placeholder, will render custom JSX below
    },
    {
      type: 'custom-faq',
      content: null // placeholder, will render custom FAQ JSX below
    },
    {
      type: 'custom-infographic',
      content: null // placeholder, will render custom infographic JSX below
    },
    {
      type: 'custom-infographic-2',
      content: null // placeholder, will render custom infographic 2 JSX below
    }
  ];

  // Staggered animation sequence
  useEffect(() => {
    let typingTimeout;
    let currentIndex = 0;

    // Show logo first
    setTimeout(() => setShowLogo(true), 500);

    // Show name after logo
    setTimeout(() => setShowName(true), 1000);

    // Start typing after name
    const startTyping = setTimeout(() => {
      const typeText = () => {
        if (currentIndex < welcomeText.length) {
          setTypingText(welcomeText.slice(0, currentIndex + 1));
          currentIndex++;
          typingTimeout = setTimeout(typeText, 80);
        } else {
          // After typing is complete, wait for 1.5 seconds then show main content
          setTimeout(() => {
            setShowIntro(true);
          }, 1500);
        }
      };
      typeText();
    }, 1500);

    // Cleanup function
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(startTyping);
    };
  }, []); // Empty dependency array to run only once

  const handleGetStarted = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    navigate('/login');
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    if (!showIntro) return;
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isTransitioning, showIntro]);

  // Auto-advance infographic features every 4 seconds
  useEffect(() => {
    if (slides[currentSlide].type !== 'custom-infographic') return;
    featureIntervalRef.current = setInterval(() => {
      setFeatureIndex((prev) => (prev + 2) % infographicFeatures.length);
    }, 3000);
    return () => clearInterval(featureIntervalRef.current);
  }, [currentSlide]);

  // Auto-advance infographic2 features every 3 seconds
  useEffect(() => {
    if (slides[currentSlide].type !== 'custom-infographic-2') return;
    featureIntervalRef2.current = setInterval(() => {
      setFeatureIndex2((prev) => (prev + 2) % infographicFeatures2.length);
    }, 3000);
    return () => clearInterval(featureIntervalRef2.current);
  }, [currentSlide]);

  if (!showIntro) {
    return (
      <div className="min-h-screen bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] text-black dark:text-white flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div className={`transform transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="animate-bounce">
              <img src={logo} alt="AIVAe Logo" className="h-24 w-24 md:h-32 md:w-32" />
            </div>
          </div>

          <div className={`transform transition-all duration-1000 ${showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#71BF44]">
              AIVA<span className="text-[#000] dark:text-[#fff]">e</span>
            </span>
          </div>

          <div className="h-12 md:h-16 text-center">
            <span className="text-lg md:text-xl lg:text-2xl text-[#000] dark:text-[#fff] font-semibold max-w-[90vw] md:max-w-2xl lg:max-w-3xl inline-block">
              {typingText}
              <span className="animate-blink">|</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] text-black dark:text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Pharmbot Logo" className="h-12" />
          <span className="text-2xl font-bold text-[#71BF44]">AIVA<span className="text-[#000] dark:text-[#fff]">e</span></span>
        </div>
        <span className="text-xs text-black dark:text-white mt-1 pl-1">0.1.0 Medic</span>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl  rounded-2xl shadow-2xl overflow-hidden">
        {/* Combined Slider */}
        <div className="relative w-full h-[600px] bg-black">
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
              >
                {slide.type === 'video' ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={slide.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : slide.type === 'custom' ? (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] p-8">
                    <div className="flex flex-col items-center gap-4">
                      {/* Logo and PHARMBOT AI */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[#71BF44] rounded-full flex items-center justify-center h-14 w-14">
                          <img src={logo} alt="Pharmbot Logo" className="h-12" />
                        </div>
                        <span className="text-2xl font-bold"><span className="text-[#71BF44]">PHARM</span><span className="text-[#000] dark:text-[#fff]">BOT</span> <span className="text-[#222] dark:text-[#fff]">AI</span></span>
                      </div>
                      {/* AIVAe */}
                      <div className="text-6xl font-extrabold text-[#71BF44] tracking-tight">AIVA<span className="text-[#222] dark:text-[#fff]">e</span></div>
                      {/* Chat bubble with headset icon */}
                      <div className="my-4">
                        <img src={chatic} alt="Pharmbot Logo" className="h-20" />
                      </div>
                      {/* Tagline */}
                      <div className="text-2xl font-bold text-[#71BF44] mt-2">YOUR AI-ENABLED</div>
                      <div className="text-2xl font-bold text-[#222] dark:text-[#fff] mb-2">VIRTUAL PHARMACIST</div>
                      {/* Website URL */}
                      <div className="text-xl text-[#222] dark:text-[#fff] mt-4">www.pharmbotai.com</div>
                    </div>
                  </div>
                ) : slide.type === 'custom-faq' ? (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] p-8">
                    <div className="max-w-2xl w-full mx-auto flex flex-col gap-8 text-left">
                      <div>
                        <div className="text-xl md:text-2xl font-extrabold text-[#222] dark:text-[#fff] mb-2">What is AIVAe?</div>
                        <div className="text-md md:text-xl text-[#222] dark:text-[#fff] font-normal">AIVAe is an AI-powered virtual assistant in eHealth.</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-extrabold text-[#222] dark:text-[#fff] mb-2">How do you say the name?</div>
                        <div className="text-md md:text-xl text-[#222] dark:text-[#fff] font-normal">It is pronounced 'AI-Va'.</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-extrabold text-[#222] dark:text-[#fff] mb-2">What does it mean?</div>
                        <div className="text-md md:text-xl text-[#222] dark:text-[#fff] font-normal">AIVAe stands for Artificial Intelligence Virtual Assistant in eHealth.</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-extrabold text-[#222] dark:text-[#fff] mb-2">What is special about it?</div>
                        <div className="text-md md:text-xl text-[#222] dark:text-[#fff] font-normal">It ensures reliable and accurate information with anti-hallucination features.</div>
                      </div>
                    </div>
                  </div>
                ) : slide.type === 'custom-infographic' ? (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] px-2 py-4 md:p-8">
                    {/* Main Title */}
                    <div className="text-center text-lg md:text-2xl font-extrabold text-[#222] dark:text-[#fff] mb-3 md:mb-8 leading-tight w-full">
                      Meet AIVAe Your AI-Powered<br />Virtual Pharmacist
                    </div>
                    {/* Central Chat Bubble with Headset */}
                    <div className="flex flex-col items-center w-full max-w-2xl mb-3 md:mb-8">
                      <img src={chatic} alt="Pharmbot Logo" className="h-20 md:h-28 mx-auto" />
                    </div>
                    {/* Features Grid - only show 2 at a time */}
                    <div className="w-full max-w-2xl mb-3 md:mb-8 text-[#222] flex flex-row flex-wrap justify-center gap-4">
                      {infographicFeatures.slice(featureIndex, featureIndex + 2).concat(
                        featureIndex + 2 > infographicFeatures.length
                          ? infographicFeatures.slice(0, (featureIndex + 2) % infographicFeatures.length)
                          : []
                      ).map((feature, idx) => (
                        <div key={feature.title} className="flex-1 min-w-[140px] max-w-[220px] flex flex-col items-center text-center bg-white rounded-xl shadow p-3">
                          {feature.icon}
                          <div className="font-bold text-base md:text-lg mt-2">{feature.title}</div>
                          <div className="text-xs md:text-sm">{feature.desc}</div>
                        </div>
                      ))}
                    </div>
                    {/* Footer */}
                    <div className="mt-2 md:mt-6 text-center text-[#222] dark:text-[#fff]">
                      <div className="text-sm md:text-xl font-semibold">Powered by PharmBot AI</div>
                      <div className="text-xs md:text-lg">www.pharmbotai.com</div>
                    </div>
                  </div>
                ) : slide.type === 'custom-infographic-2' ? (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] px-2 py-4 md:p-8">
                    {/* Main Title */}
                    <div className="text-center text-lg md:text-2xl font-extrabold text-[#222] dark:text-[#fff] mb-3 md:mb-8 leading-tight w-full">
                      Meet AIVAe Your AI-Powered <br /> Virtual Pharmacist
                    </div>
                    {/* Central Chat Icon */}
                    <div className="flex flex-col items-center w-full max-w-2xl mb-3 md:mb-8">
                      <img src={chatic} alt="Pharmbot Logo" className="h-20 md:h-28 mx-auto" />
                    </div>
                    {/* Features Grid - only show 2 at a time */}
                    <div className="w-full max-w-2xl mb-3 md:mb-8 text-[#222] flex flex-row flex-wrap justify-center gap-4">
                      {infographicFeatures2.slice(featureIndex2, featureIndex2 + 2).concat(
                        featureIndex2 + 2 > infographicFeatures2.length
                          ? infographicFeatures2.slice(0, (featureIndex2 + 2) % infographicFeatures2.length)
                          : []
                      ).map((feature, idx) => (
                        <div key={feature.title} className="flex-1 min-w-[140px] max-w-[220px] flex flex-col items-center text-center bg-white rounded-xl shadow p-3">
                          {feature.icon}
                          <div className="font-bold text-base md:text-lg mt-2">{feature.title}</div>
                          {feature.desc && <div className="text-xs md:text-sm">{feature.desc}</div>}
                        </div>
                      ))}
                    </div>
                    {/* Footer */}
                    <div className="mt-2 md:mt-6 text-center text-[#222] dark:text-[#fff]">
                      <div className="text-sm md:text-xl font-semibold">Powered by PharmBot AI</div>
                      <div className="text-xs md:text-lg">www.pharmbotai.com</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={slide.content}
                      alt={slide.title}
                      className="w-full h-full object-contain bg-[#D1CBBC]"
                    />
                  </div>
                )}
                
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft size={28} className="text-gray-800 dark:text-[#fff]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight size={28} className="text-gray-800 dark:text-[#fff]" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 
                  ${index === currentSlide 
                    ? 'w-8 bg-[#71BF44] dark:bg-white' 
                    : 'w-2 bg-gray-800/40 dark:bg-white/40 hover:bg-[#71BF44]/80 dark:hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>

        {/* Get Started Button */}
        <div className="p-8 text-center bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)]">
          <button
            onClick={handleGetStarted}
            className="px-12 py-4 bg-[#71BF44] text-white rounded-full text-xl font-semibold hover:bg-[#5da336] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
} 