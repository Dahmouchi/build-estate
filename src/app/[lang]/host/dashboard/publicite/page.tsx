import { getProperties } from "@/actions/host";
import PropertiesPage from "../../_components/PropertiesPage";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";

export default async function TourOrderPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    const properties = await getProperties(session.user.id);
    return (
      <div className="">
        <PropertiesPage properties={properties} />
      </div>
    );
  }
  return <div>wait</div>;
}
