import React from 'react'
import { listPropertis } from '@/actions/properties';
import PropertiesTable from '../../_components/properties-table';

const Properties = async () => {
    const properties = await listPropertis();
  return (
    <div>
        <PropertiesTable mockProperties={properties}/>
    </div>
  )
}

export default Properties