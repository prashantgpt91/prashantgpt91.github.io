import { useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showCount?: boolean;
  formatLabel?: (option: string) => string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select...",
  className,
  showCount = false,
  formatLabel = (option) => option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')
}) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(option => option === selectedValue);
  const isDefaultSelected = selectedValue === 'all' || selectedValue === '';
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-between min-w-[140px] max-w-[200px]",
            !isDefaultSelected && "border-blue-500 bg-blue-50 dark:bg-blue-950",
            className
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Filter className="h-3 w-3 shrink-0" />
            <span className="truncate text-sm">
              {isDefaultSelected 
                ? placeholder 
                : formatLabel(selectedOption || selectedValue)
              }
            </span>
            {!isDefaultSelected && (
              <Badge variant="secondary" className="h-4 px-1 text-xs ml-1">
                1
              </Badge>
            )}
          </div>
          <ChevronDown className="h-3 w-3 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-56 max-h-80 overflow-y-auto"
      >
        <DropdownMenuLabel className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {options.map((option) => {
          const isSelected = option === selectedValue;
          const displayLabel = formatLabel(option);
          
          return (
            <DropdownMenuItem
              key={option}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                onValueChange(option);
                setOpen(false);
              }}
            >
              <span className="flex-1 truncate">{displayLabel}</span>
              {isSelected && (
                <Check className="h-3 w-3 text-blue-600" />
              )}
            </DropdownMenuItem>
          );
        })}
        
        {showCount && options.length > 1 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
              {options.length - 1} options available
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
