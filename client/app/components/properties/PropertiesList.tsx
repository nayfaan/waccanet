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
      {properties.results.length === 0 ? (
        <EmptyState title="property" />
      ) : (
        <div className="flex flex-wrap justify-center">
          {/* <<<<<<< Updated upstream
          {properties.map((property) => (
            <PropertyCard property={property} key={property.pub_date} />
=======
          {properties.results.map((property) => (
            <PropertyCard property={property} key={property.name} />
>>>>>>> Stashed changes */}
          {properties.results.map((property) => (
            <PropertyCard property={property} key={property.pub_date} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
