import { CheckIcon, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
type InputProps = React.ComponentProps<"input">;
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    },
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn("rounded-e-lg rounded-s-none px-4 py-2", className)}
      {...props}
      ref={ref}
    />
  ),
);
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const [search, setSearch] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const firstMatchRef = React.useRef<HTMLDivElement>(null);

  // Find the first visible match index
  const filteredCountries = countryList.filter(({ label }) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    // Scroll to the first match when search changes
    if (search && firstMatchRef.current && scrollRef.current) {
      const scrollArea = scrollRef.current;
      const firstMatch = firstMatchRef.current;
      // Scroll so the first match is at the top
      scrollArea.scrollTop = firstMatch.offsetTop - scrollArea.offsetTop;
    } else if (scrollRef.current) {
      // Default: scroll to top
      scrollRef.current.scrollTop = 0;
    }
  }, [search, filteredCountries.length]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-lg px-3 border-r-0 z-10 py-2"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 z-[1000]">
        <Command className="bg-white border rounded-md overflow-hidden">
          <CommandInput
            placeholder="Search country..."
            className="bg-white text-black border-b"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <ScrollArea ref={scrollRef} className="h-72 bg-white">
              <CommandEmpty className="py-2 text-center text-sm">No country found.</CommandEmpty>
              <CommandGroup>
                {filteredCountries.map(({ value, label }, idx) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      ref={idx === 0 ? firstMatchRef : undefined}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};


interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = React.forwardRef<HTMLDivElement, CountrySelectOptionProps>(
  ({
    country,
    countryName,
    selectedCountry,
    onChange,
  }, ref) => {
    return (
      <CommandItem className="gap-2" onSelect={() => onChange(country)} ref={ref}>
        <FlagComponent country={country} countryName={countryName} />
        <span className="flex-1 text-sm">{countryName}</span>
        <span className="text-foreground/50 text-sm">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
        <CheckIcon
          className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
        />
      </CommandItem>
    );
  }
);
CountrySelectOption.displayName = "CountrySelectOption";

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
