import React, { useContext, useEffect } from 'react'
import { WorkflowContext } from '@/context/WorkflowContext';
import AgentSettings from './_NodeSettings/AgentSettings';

const SettingPanel = () => {

    const {selectedNode , setAddedNode} = useContext(WorkflowContext); 
    
    

    const onUpdateNodeData = (formData:any ) => {
        const updatedNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                label: formData.name,
                settings:formData
            }
        }
        



        setAddedNode((prevNode: any) => {
            return prevNode.map((node: any) => node.id === selectedNode.id ? updatedNode : node)
        })
    }


  return selectedNode && (
    <div className='p-5 bg-white rounded-lg shadow-md w-[350px]'>
        {selectedNode?.type=='AgentNode'&&<AgentSettings selectedNode={selectedNode}
        updatedFormData={(value:any)=>onUpdateNodeData(value)}
        />}
    </div>
  )
}

export default SettingPanel