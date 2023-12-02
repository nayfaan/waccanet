"use client";

import { Property } from "@/app/types/types";
import React from "react";
import PropertyCard from "./PropertyCard";
import EmptyState from "../EmptyState";

interface PropertiesProps {
  properties: Property[];
}

const PropertiesList: React.FC<PropertiesProps> = ({ properties }) => {
  return (
    <div className="p-5">
      {properties.length === 0 ? (
        <EmptyState title="property" />
      ) : (
        <div className="flex flex-wrap justify-center">
          {properties.map((property) => (
            <PropertyCard property={property} key={property.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
