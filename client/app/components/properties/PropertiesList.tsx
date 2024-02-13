import { Property } from "@/app/types/types";
import React from "react";
import PropertyCard from "./PropertyCard";
import EmptyState from "../EmptyState";

interface PropertiesProps {
  propertiesData: Property[];
}

const PropertiesList: React.FC<PropertiesProps> = ({ propertiesData }) => {
  return (
    <div>
      {propertiesData.length === 0 ? (
        <EmptyState
          title="物件"
          message="再度条件を設定するか、下のボタンでホームへ戻ってください。"
        />
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
