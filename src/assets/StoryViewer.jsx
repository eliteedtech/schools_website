import { useEffect, useState } from "react";

export default function StoryViewer({ story, close }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < story.items.length - 1) {
        setIndex(index + 1);
      } else {
        close();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="fixed inset-0 bg-black z-50">
      <img
        src={story.items[index]}
        className="w-full h-full object-contain"
      />

      {/* يمين ويسار للتنقل */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full"
        onClick={() => index > 0 && setIndex(index - 1)}
      />
      <div
        className="absolute right-0 top-0 w-1/2 h-full"
        onClick={() =>
          index < story.items.length - 1
            ? setIndex(index + 1)
            : close()
        }
      />

      <button
        onClick={close}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        ✕
      </button>
    </div>
  );
}
