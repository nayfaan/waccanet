"use client";

import { AllData, Property } from "@/app/types/types";
import React from "react";
import PropertyCard from "./PropertyCard";
import EmptyState from "../EmptyState";
import { useEffect, useState } from "react";

interface PropertiesProps {
  allData: AllData;
}


const PropertiesList: React.FC<PropertiesProps> = ({ allData }) => {

  console.log(allData);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties(allData.results);
  }, [allData]);


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
