import { listPropertis } from '@/actions/properties';
import React from 'react'
import PropertiesPage from './_components/PropertiesPage';
import { getDictionary } from '../dictionaries';

const Properties = async ({
  params,
}: {
  params:  Promise<{ lang: "en" | "ar" | "fr" }>;
}) => {
  const dict = await getDictionary((await params).lang);

  const result = await listPropertis();

 if (!result) {
    return <div>Tour non trouvé</div>;
  }

  return (
    <div>
        <PropertiesPage properties={result} dictdict={dict} />
    </div>
  )
}

export default Properties