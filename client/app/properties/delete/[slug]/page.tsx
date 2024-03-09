import Button from "@/app/components/Button";
import { fetchPropertyExist } from "@/app/lib/data";
import PropertyDelete from "@/app/properties/delete/[slug]/PropertyDelete";
import Footer from "@/app/components/footer/Footer";

interface PropertyExistResponse {
  exist: boolean;
}
export default async function Delete({ params }: { params: { slug: string } }) {
  const propertyExist: PropertyExistResponse = await fetchPropertyExist(
    params.slug
  );

  if (propertyExist.exist) {
    return <PropertyDelete PropertyId={params.slug} />;
  } else {
    return (
      <>
        <div className="flex flex-col gap-8">
          <div className="pt-20 px-2 flex flex-col items-center justify-center">
            <h1 className="font-semibold">物件情報はありませんでvした。</h1>
            <Button
              label="物件一覧情報に戻る"
              small
              actionType="link"
              href="/"
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
