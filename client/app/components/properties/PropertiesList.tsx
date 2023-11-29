"use client";

import { Property } from "@/app/types/types";
import React from "react";
import PropertyCard from "./PropertyCard";

interface PropertiesProps {
  properties: Property[];
}

const PropertiesList: React.FC<PropertiesProps> = ({ properties }) => {
  return (
    <div className="p-5">
      {properties.map((property) => (
        <PropertyCard property={property} key={property.name} />
      ))}
    </div>
  );
};

export default PropertiesList;
