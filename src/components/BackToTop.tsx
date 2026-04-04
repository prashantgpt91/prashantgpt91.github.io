import { ChevronUp } from "lucide-react";
import { smoothScrollToTop } from "@/utils/smoothScroll";

const BackToTop = () => {
  return (
    <div className="flex justify-center pt-10 pb-6">
      <button
        onClick={() => smoothScrollToTop()}
        className="group flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors duration-200"
      >
        <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
        <span>Back to top</span>
      </button>
    </div>
  );
};

export default BackToTop;
