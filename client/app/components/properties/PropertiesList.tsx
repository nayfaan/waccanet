import PropertyCard from "./PropertyCard";
import EmptyState from "../EmptyState";
import { Property } from "@/app/types/types";

interface PropertiesListProps {
  properties: Property[];
}

const PropertiesList: React.FC<PropertiesListProps> = ({ properties }) => {
  return (
    <div>
      {properties.length === 0 ? (
        <EmptyState
          title="物件"
          message="再度条件を設定するか、下のボタンでホームへ戻ってください。"
        />
      ) : (
        <div className="flex flex-wrap justify-center mx-1">
          {properties.map((property: Property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
