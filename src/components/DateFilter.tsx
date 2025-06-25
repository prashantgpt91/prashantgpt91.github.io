import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface DateRange {
  start?: string;
  end?: string;
}

interface DateFilterProps {
  value?: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  years?: string[];
  className?: string;
}

export const DateFilter = ({ 
  value = {}, 
  onDateRangeChange, 
  years = [], 
  className = "" 
}: DateFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePresetSelect = (preset: string) => {
    const currentYear = new Date().getFullYear();
    let range: DateRange = {};

    switch (preset) {
      case 'this-year':
        range = { start: currentYear.toString(), end: currentYear.toString() };
        break;
      case 'last-year':
        range = { start: (currentYear - 1).toString(), end: (currentYear - 1).toString() };
        break;
      case 'last-3-years':
        range = { start: (currentYear - 2).toString(), end: currentYear.toString() };
        break;
      case 'last-5-years':
        range = { start: (currentYear - 4).toString(), end: currentYear.toString() };
        break;
      case 'all':
      default:
        range = {};
        break;
    }

    onDateRangeChange(range);
    setIsOpen(false);
  };

  const handleYearSelect = (year: string) => {
    if (year === 'all') {
      onDateRangeChange({});
    } else {
      onDateRangeChange({ start: year, end: year });
    }
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (!value.start && !value.end) return 'All dates';
    if (value.start === value.end) return value.start;
    if (value.start && value.end) return `${value.start} - ${value.end}`;
    if (value.start) return `From ${value.start}`;
    if (value.end) return `Until ${value.end}`;
    return 'All dates';
  };

  return (
    <div className={`relative ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full sm:w-auto justify-between min-w-[140px]"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="truncate">{getDisplayText()}</span>
            </div>
            <ChevronDown className="h-4 w-4 ml-1 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-56"
          side="bottom"
        >
          {/* Preset ranges */}
          <DropdownMenuItem onClick={() => handlePresetSelect('all')}>
            All dates
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect('this-year')}>
            This year
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect('last-year')}>
            Last year
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect('last-3-years')}>
            Last 3 years
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect('last-5-years')}>
            Last 5 years
          </DropdownMenuItem>
          
          {/* Individual years if available */}
          {years.length > 0 && (
            <>
              <div className="border-t my-1" />
              <div className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                Specific Years
              </div>
              {years.slice(0, 10).map((year) => (
                <DropdownMenuItem 
                  key={year} 
                  onClick={() => handleYearSelect(year)}
                >
                  {year === 'all' ? 'All years' : year}
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DateFilter;
