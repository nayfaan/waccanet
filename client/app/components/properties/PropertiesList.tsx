import { Property } from "@/app/types/types";
import React from "react";
import PropertyCard from "./PropertyCard";
import EmptyState from "./EmptyState";

interface PropertiesProps {
  propertiesData: Property[];
}

const PropertiesList: React.FC<PropertiesProps> = ({ propertiesData }) => {

  return (
    <div className="p-1 sm:p-5">
      {propertiesData.length === 0 ? (
        <EmptyState title="property" />
      ) : (
        <div className="flex flex-wrap justify-center">
          {propertiesData.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
