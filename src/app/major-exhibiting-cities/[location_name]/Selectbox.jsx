"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import Link from "next/link";
import React from "react";

const Selectbox = ({
  majorExhibitingCities,
  boothSizes,
  city_name,
  city_id,
}) => {
  const [size, setSize] = React.useState();
  const [city, setCity] = React.useState({
    name: city_name,
    value: city_id,
  });

  console.log(size);

  return (
    <div className="flex flex-col sm:flex-row relative mt-6 gap-4  sm:bg-gray-400/20 rounded-full p-4 justify-center items-center w-4/5 mx-auto">
      <Select
        onValueChange={(value) => {
          const city = majorExhibitingCities.data.find(
            (city) => city._id === value
          );
          console.log(value);
          setCity({ name: city.name, value: value });
        }}
        value={city.value}
      >
        <SelectTrigger className="text-secondary text-lg font-semibold bg-white rounded-full p-6">
          <SelectValue>{city.name ?? "Select a City"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {majorExhibitingCities.data.map((city, index) => (
              <SelectItem className="text-lg" value={city._id} key={index}>
                {city.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={size} onValueChange={(value) => setSize(value)}>
        <SelectTrigger className="text-secondary text-lg  font-semibold bg-white rounded-full p-6">
          <SelectValue placeholder={size ?? "Select a Booth Size"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {boothSizes.map((sizes, index) => (
              <SelectItem className="text-lg" value={sizes.name} key={index}>
                {sizes.name}
              </SelectItem>
            ))}
            {/* <SelectItem value="banana">10x20</SelectItem>
                <SelectItem value="blueberry">10x30</SelectItem>
                <SelectItem value="grapes">20x20</SelectItem>
                <SelectItem value="pineapple">20x30</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Link href={`/get-search-booth/?size=${size}`}>
        <Button className="bg-transparent border-2 font-semibold text-lg border-white py-5 self-center hover:bg-white transition-all duration-300 hover:text-secondary px-6 rounded-full">
          Search
        </Button>
      </Link>
    </div>
  );
};

export default Selectbox;
