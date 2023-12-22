"use client";

import { Property } from "@/app/types/types";
import React from "react";
import PropertyCard from "./PropertyCard";
import EmptyState from "../EmptyState";
import { useEffect, useState } from "react";

interface PropertiesProps {
  propertiesData: Property[];
}


const PropertiesList: React.FC<PropertiesProps> = ({ propertiesData }) => {

  console.log(propertiesData);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties(propertiesData);
  }, [propertiesData]);


  return (
    <div className="p-5">
      {properties.length === 0 ? (
        <EmptyState title="property" />
      ) : (
        <div className="flex flex-wrap justify-center">
          {properties.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
