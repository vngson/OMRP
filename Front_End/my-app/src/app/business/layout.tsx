import { partnerApi } from "../api/apiReponseType";
import PartnerAPI from "../api/partnerAPI";

export default function BusinessLayout({ params }: { params: { name: string, id:string } }){

    return (<>

    {/* {children} */}
    </>)
}

export async function generateStaticParams(){
    const res = await PartnerAPI.getAllPartners();
  
    const partners = res.data.partners;
  
    partners.map((partner: partnerApi)=> ({
      name: partner.Name,
      id: partner.ID_Partners
    }))
  }