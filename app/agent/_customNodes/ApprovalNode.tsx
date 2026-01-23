import { Handle, Position } from '@xyflow/react'
import { ThumbsUp } from 'lucide-react'
import React from 'react'

const ApprovalNode = ({ data }: any) => {
  return (
    <div className="bg-white rounded-2xl px-4 p-3 border border-gray-200 shadow-md hover:shadow-lg cursor-pointer">
      <div className="flex gap-2 items-center">
        <ThumbsUp 
          className='p-2 rounded-lg h-8 w-8' 
          style={{ backgroundColor: data?.bgColor || '#EADCF8' }}
        />
        <h2>{data?.label || 'User Approval'}</h2>
        <Handle type='target' position={Position.Left} />
        <Handle type='source' position={Position.Right} />
      </div>
    </div>
  )
}

export default ApprovalNode