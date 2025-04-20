
import React, { useEffect, useState } from "react";
import { Gift, Heart, Calendar, Star, Confetti, Music, MessageSquare, Balloon, Cake, Hug } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

// Countdown Timer component
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date(`June 20, ${new Date().getFullYear()}`) - +new Date();
    let timeLeft = {} as Record<string, number | string>;
    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        message: "Happy Birthday!"
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  if ("message" in timeLeft) {
    return (
      <div className="text-center">
        <h2 className="text-4xl font-playfair font-bold mb-2 text-pink-600 animate-pulse">
          {timeLeft.message}
        </h2>
        <Heart className="mx-auto text-pink-500 animate-pulse" size={70} />
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-6 text-center text-primary-foreground">
      {Object.keys(timeLeft).map((interval) => (
        <div key={interval} className="bg-pink-50 rounded-lg p-4 shadow-md w-20">
          <div className="text-3xl font-bold font-playfair text-pink-600">{timeLeft[interval]}</div>
          <div className="uppercase text-xs font-semibold">{interval}</div>
        </div>
      ))}
    </div>
  );
};

// Timeline Event Component
const TimelineEvent = ({ date, title, description }: { date: string; title: string; description: string }) => (
  <div className="mb-6 flex items-start space-x-4">
    <div className="flex flex-col items-center">
      <div className="w-5 h-5 bg-pink-400 rounded-full border-2 border-pink-600" />
      <div className="w-1 bg-pink-300 flex-1" />
    </div>
    <div className="flex-1">
      <time className="block mb-1 font-semibold text-pink-700">{date}</time>
      <h3 className="text-lg font-bold font-playfair text-pink-800">{title}</h3>
      <p className="text-pink-700">{description}</p>
    </div>
  </div>
);

// Love Story Timeline Component
const LoveStoryTimeline = () => {
  const events = [
    {
      date: "2020-05-01",
      title: "Our First Date",
      description: "The day we met over coffee and sparks flew.",
    },
    {
      date: "2021-07-15",
      title: "First Trip Together",
      description: "Explored the beautiful mountains side by side.",
    },
    {
      date: "2022-12-24",
      title: "Our First Christmas",
      description: "Exchanged gifts and made memories forever.",
    },
    // Add more events as needed
  ];

  return (
    <section aria-label="Love Story Timeline" className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-pink-700">Our Love Story Timeline</h2>
      <div className="border-l-4 border-pink-300 pl-6">
        {events.map((event, i) => (
          <TimelineEvent
            key={i}
            date={new Date(event.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            title={event.title}
            description={event.description}
          />
        ))}
      </div>
    </section>
  );
};

// Memory Lane Gallery component
const MemoryLaneGallery = () => {
  // Example photos and captions
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      caption: "Cozy evenings at home",
    },
    {
      src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
      caption: "Starry nights together",
    },
    {
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
      caption: "Lazy days with my favorite cat",
    },
    {
      src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
      caption: "Sweet moments on our trip",
    },
  ];

  return (
    <section aria-label="Memory Lane Gallery" className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-pink-700">Memory Lane Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer"
            title={photo.caption}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-48 object-cover transform transition duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 bg-pink-900 bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center p-4 text-white text-center transition-opacity"
              aria-hidden="true"
            >
              <p className="text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Heart Rain Animation Component
const HeartRain = () => {
  /* We create multiple heart divs that fall from top with random X positions and durations */
  const hearts = Array.from({ length: 20 });

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 pointer-events-none w-full h-full overflow-hidden z-10">
      {hearts.map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${5 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 10}s`,
          fontSize: `${12 + Math.random() * 24}px`,
        };
        return (
          <Heart
            key={i}
            className="absolute animate-fall text-pink-500"
            size={style.fontSize.replace("px", "")}
            style={style}
            aria-hidden="true"
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10px); opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

// Interactive Love Quiz
const LoveQuiz = () => {
  const questions = [
    {
      question: "Where was our first date?",
      options: ["Coffee Shop", "Movie Theater", "Park", "Restaurant"],
      answer: 0,
    },
    {
      question: "What’s my favorite memory with you?",
      options: ["Our first trip", "Late night talks", "Cooking together", "Watching the sunset"],
      answer: 3,
    },
    {
      question: "When did we first say 'I love you'?",
      options: ["After 1 month", "After 3 months", "After 6 months", "After 1 year"],
      answer: 2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    if (index === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <section aria-label="Love Quiz" className="max-w-xl mx-auto my-10 px-4 bg-pink-50 rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-pink-600 text-center">Love Quiz</h2>
      {!showResult ? (
        <>
          <p className="text-pink-800 mb-6 font-semibold">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <p className="text-lg text-pink-700 mb-6">{questions[currentIndex].question}</p>
          <div className="space-y-3">
            {questions[currentIndex].options.map((option, i) => (
              <button
                key={i}
                disabled={selectedOption !== null}
                onClick={() => handleOptionSelect(i)}
                className={`
                  w-full text-left rounded-md border px-4 py-2 transition 
                  ${
                    selectedOption === i
                      ? i === questions[currentIndex].answer
                        ? "bg-green-200 border-green-600"
                        : "bg-red-200 border-red-600"
                      : "bg-white border-pink-300 hover:bg-pink-100"
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedOption !== null && (
            <Button onClick={handleNext} className="mt-6 mx-auto block">
              {currentIndex + 1 < questions.length ? "Next Question" : "See Results"}
            </Button>
          )}
        </>
      ) : (
        <div className="text-center text-pink-700">
          <p className="text-xl mb-4">You scored {score} out of {questions.length}!</p>
          <Button onClick={handleRestart}>Restart Quiz</Button>
        </div>
      )}
    </section>
  );
};

// Birthday Wishes Wall - simple version allowing to add wishes
const BirthdayWishesWall = () => {
  const [wishes, setWishes] = useState<string[]>([
    "Happy Birthday, my love! You are my world.",
    "Wishing you joy and happiness today and always.",
  ]);
  const [inputText, setInputText] = useState("");

  const addWish = () => {
    if (inputText.trim() === "") {
      toast({
        description: "Please enter a valid wish before adding.",
        variant: "destructive",
      });
      return;
    }
    setWishes((prev) => [inputText.trim(), ...prev]);
    setInputText("");
    toast({ description: "Wish added! So sweet!" });
  };

  return (
    <section aria-label="Birthday Wishes Wall" className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair font-bold text-center mb-6 text-pink-700">Birthday Wishes Wall</h2>
      <div className="flex flex-col items-center space-y-4 mb-6">
        <Textarea
          placeholder="Write your birthday wish here..."
          className="w-full max-w-xl resize-none"
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          aria-label="Write a birthday wish"
        />
        <Button onClick={addWish} className="w-40">
          Add Wish
        </Button>
      </div>
      <div className="space-y-4 max-h-64 overflow-y-auto no-scrollbar text-pink-800 border border-pink-300 rounded-md p-4 bg-pink-50 shadow-inner">
        {wishes.map((wish, idx) => (
          <div key={idx} className="bg-white p-3 rounded-md shadow-sm pointer-events-none text-left text-sm">
            {wish}
          </div>
        ))}
      </div>
    </section>
  );
};

// Birthday Song Playlist Component
const BirthdaySong = () => {
  const songs = [
    {
      title: "Happy Birthday - Special Version",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "Favorite Love Song",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];
  const [current, setCurrent] = useState(0);

  return (
    <section aria-label="Birthday Song Playlist" className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair text-pink-700 font-bold mb-4 text-center">Birthday Song Playlist</h2>
      <audio
        controls
        autoPlay
        key={songs[current]?.url}
        src={songs[current]?.url}
        className="w-full rounded-lg"
        preload="auto"
      />
      <div className="flex justify-center mt-4 space-x-4">
        {songs.map((song, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-current={idx === current}
            className={`px-3 py-1 rounded ${idx === current ? "bg-pink-600 text-white" : "bg-pink-100 text-pink-600"} transition-colors`}
          >
            {song.title}
          </button>
        ))}
      </div>
    </section>
  );
};

// Floating Hearts/Balloons Component
const FloatingHearts = () => {
  const hearts = Array.from({ length: 10 });
  return (
    <div aria-hidden="true" className="fixed bottom-0 left-0 w-full h-full overflow-visible pointer-events-none z-20">
      {hearts.map((_, idx) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${8 + Math.random() * 6}s`,
          animationDelay: `${Math.random() * 10}s`,
          fontSize: `${18 + Math.random() * 24}px`,
        };
        return (
          <Heart
            key={idx}
            className="absolute text-pink-400 animate-floatUp"
            size={style.fontSize.replace("px", "")}
            style={style}
            aria-hidden="true"
          />
        );
      })}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(-150vh) translateX(25px); opacity: 0; }
        }
        .animate-floatUp {
          animation-name: floatUp;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

// Video Greeting Component
const VideoGreeting = () => {
  return (
    <section aria-label="Video Greeting" className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-pink-700 text-center">A Special Birthday Message</h2>
      <div className="aspect-video max-w-xl mx-auto rounded-lg overflow-hidden shadow-lg border border-pink-200">
        <video controls preload="metadata" playsInline>
          <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

// Make a Wish Feature component
const MakeAWish = () => {
  const [madeWish, setMadeWish] = useState(false);

  const handleMakeWish = () => {
    if (madeWish) return;
    setMadeWish(true);
    toast({ description: "Wish made! Happy Birthday! 🎂" });
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/magic/candle_blowing.ogg"
    );
    audio.play();
  };

  return (
    <section aria-label="Make A Wish" className="max-w-xs mx-auto my-10 p-6 bg-pink-50 rounded-lg text-center shadow-md">
      <h2 className="text-2xl font-playfair font-bold mb-4 text-pink-700">Make A Wish</h2>
      <Button onClick={handleMakeWish} disabled={madeWish} size="lg" className="w-full">
        {madeWish ? "Wish Made! 🎉" : "Click to Make a Wish"}
      </Button>
    </section>
  );
};

// Love Meter Component
const LoveMeter = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // Increase love meter based on time spent or user scroll up to 100%
    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 1 : 100));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-label="Love Meter" className="max-w-md mx-auto my-10 px-4 text-center">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-pink-700">Our Love Meter 💖</h2>
      <Progress value={progress} className="h-6 rounded-full bg-pink-200" />
      <p className="mt-3 text-pink-700 font-semibold">{progress}% Love Filled ❤️</p>
    </section>
  );
};

// Gift Suggestions Component
const GiftSuggestions = () => {
  const gifts = [
    "A weekend getaway trip",
    "Handwritten love letters",
    "Personalized jewelry",
    "A custom photo album",
    "Spa day and relaxation",
  ];
  return (
    <section aria-label="Gift Suggestions" className="max-w-md mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair font-bold mb-6 text-pink-700 text-center">Gift Suggestions 🎁</h2>
      <ul className="space-y-2 list-disc list-inside text-pink-800">
        {gifts.map((gift, idx) => (
          <li key={idx}>{gift}</li>
        ))}
      </ul>
    </section>
  );
};

// Photo Carousel Component
const PhotoCarousel = () => {
  // For simplicity, showing horizontal scroll container (carousel)
  const photos = [
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
  ];
  return (
    <section aria-label="Photo Carousel" className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair font-bold mb-6 text-pink-700 text-center">Special Moments Carousel</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-50 py-2">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Carousel item ${i + 1}`}
            className="h-48 w-auto rounded-lg shadow-md flex-shrink-0 hover:scale-105 transform transition"
          />
        ))}
      </div>
    </section>
  );
};

// Heart-Shaped Confetti Component
const HeartConfetti = () => {
  // Similar to HeartRain but triggered on page load or button click, here we'll just render on load
  const hearts = Array.from({ length: 40 });

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-30">
      {hearts.map((_, i) => {
        const size = Math.random() * 15 + 10;
        const style = {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${(i * 0.1).toFixed(2)}s`,
          animationDuration: `${3 + Math.random() * 3}s`,
          width: size,
          height: size,
          opacity: Math.random(),
        };
        return (
          <Heart
            key={i}
            style={style}
            className="absolute text-pink-400 animate-heartConfetti"
            size={size}
            aria-hidden="true"
          />
        );
      })}
      <style>{`
        @keyframes heartConfetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
        }
        .animate-heartConfetti {
          animation-name: heartConfetti;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
      `}</style>
    </div>
  );
};

// Memory Sharing Section
const MemorySharingSection = () => {
  const [sharedMemories, setSharedMemories] = useState<string[]>([
    "Our long walks on weekends.",
    "Watching sunsets at the beach.",
  ]);
  const [input, setInput] = useState("");

  const submitMemory = () => {
    if (input.trim() === "") {
      toast({
        description: "Please enter a memory before submitting.",
        variant: "destructive",
      });
      return;
    }
    setSharedMemories((prev) => [input.trim(), ...prev]);
    setInput("");
    toast({ description: "Memory shared! Thank you ❤️" });
  };

  return (
    <section aria-label="Memory Sharing" className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair font-bold text-center mb-6 text-pink-700">Share a Favorite Memory</h2>
      <div className="flex flex-col space-y-4 mb-6">
        <Textarea
          rows={3}
          placeholder="Write a special memory..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Write a memory"
          className="resize-none"
        />
        <Button onClick={submitMemory} className="self-center w-40">
          Submit Memory
        </Button>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar bg-pink-50 border border-pink-300 rounded-md p-4 text-pink-800 shadow-inner">
        {sharedMemories.map((memory, idx) => (
          <div key={idx} className="bg-white p-3 rounded-md shadow-sm text-left text-sm">
            {memory}
          </div>
        ))}
      </div>
    </section>
  );
};

// Surprise Gift Reveal component
const SurpriseGiftReveal = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      aria-label="Surprise Gift Reveal"
      className="max-w-xs mx-auto my-10 px-4 bg-pink-50 rounded-lg shadow-md text-center p-6"
    >
      <h2 className="text-2xl font-playfair font-bold mb-4 text-pink-700">Surprise Gift 🎁</h2>
      {!revealed ? (
        <Button onClick={() => setRevealed(true)} size="lg" className="w-full">
          Reveal Your Gift
        </Button>
      ) : (
        <p className="text-pink-800 font-semibold mt-4">You are the greatest gift in my life! More surprises coming soon! ❤️</p>
      )}
    </section>
  );
};

// Virtual Hug Button component
const VirtualHugButton = () => {
  const [showHug, setShowHug] = useState(false);

  const handleHug = () => {
    setShowHug(true);
    setTimeout(() => setShowHug(false), 4000);
  };

  return (
    <section aria-label="Virtual Hug" className="max-w-xs mx-auto my-10 p-6 bg-pink-50 rounded-lg shadow-md text-center relative">
      <h2 className="text-2xl font-playfair font-bold mb-4 text-pink-700">Virtual Hug</h2>
      <Button onClick={handleHug} size="lg" className="w-full">
        Send a Virtual Hug 🤗
      </Button>
      {showHug && (
        <div className="absolute inset-0 bg-pink-100/90 flex items-center justify-center rounded-lg mt-2 animate-scale-in">
          <img
            src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
            alt="Virtual Hug GIF"
            className="w-48 h-48 rounded-lg"
          />
        </div>
      )}
    </section>
  );
};

// Future Goals Section component
const FutureGoalsSection = () => {
  const goals = [
    "Travel to 5 new countries together",
    "Buy our first home",
    "Learn to cook new recipes as a team",
    "Celebrate 10 wonderful years",
    "Start a family",
  ];
  return (
    <section aria-label="Future Goals" className="max-w-md mx-auto my-10 px-4">
      <h2 className="text-3xl font-playfair font-bold mb-6 text-pink-700 text-center">Future Goals & Dreams</h2>
      <ul className="list-disc list-inside text-pink-800 space-y-2">
        {goals.map((goal, idx) => (
          <li key={idx}>{goal}</li>
        ))}
      </ul>
    </section>
  );
};

// Main Index Page
const Index = () => {
  return (
    <main className="bg-gradient-to-b from-pink-50 to-pink-100 min-h-screen pb-12 px-6 sm:px-12">
      <HeartRain />
      <FloatingHearts />
      <HeartConfetti />
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-playfair font-extrabold text-pink-700 mb-4 select-none">
          Happy Birthday, My Love 🎉
        </h1>
        <p className="text-xl text-pink-600 italic mb-6 select-none">
          Countdown to your special day - June 20
        </p>
        <CountdownTimer />
      </section>

      <LoveStoryTimeline />
      <MemoryLaneGallery />
      <LoveQuiz />
      <BirthdayWishesWall />
      <BirthdaySong />
      <VideoGreeting />
      <MakeAWish />
      <LoveMeter />
      <GiftSuggestions />
      <PhotoCarousel />
      <SurpriseGiftReveal />
      <VirtualHugButton />
      <FutureGoalsSection />
    </main>
  );
};

export default Index;
