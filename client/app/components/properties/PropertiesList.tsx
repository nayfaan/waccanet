"use client";

import { AllData } from "@/app/types/types";
import React from "react";
import PropertyCard from "./PropertyCard";
import EmptyState from "../EmptyState";

interface PropertiesProps {
  allData: AllData;
}

const PropertiesList: React.FC<PropertiesProps> = ({ allData }) => {
  console.log(allData);
  return (
    <div className="p-5">
      {allData.count === 0 ? (
        <EmptyState title="property" />
      ) : (
        <div className="flex flex-wrap justify-center">
          {allData.results.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
