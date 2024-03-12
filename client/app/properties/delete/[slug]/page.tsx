import { PropertyExistResponse } from "@/app/types/types";
import { fetchPropertyExist } from "@/app/lib/data";
import PropertyDelete from "@/app/properties/delete/[slug]/PropertyDelete";
import Footer from "@/app/components/footer/Footer";
import EmptyState from "@/app/components/EmptyState";

export default async function Delete({ params }: { params: { slug: string } }) {
  const propertyExist: PropertyExistResponse = await fetchPropertyExist(
    params.slug
  );

  if (propertyExist.exist) {
    return <PropertyDelete PropertyId={params.slug} />;
  } else {
    return (
      <div className="flex flex-col justify-between h-screen">
        <EmptyState
          title="削除済み"
          message="物件情報は見つかりませんでした。"
        />
        <Footer />
      </div>
    );
  }
}
