import { Button } from '@/components/ui/button'
import { Agent } from '@/types/AgentType'
import { ChevronLeft, Code2, Ghost, Play, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


type Props={
  agentDetails:Agent|undefined,
  previewHeader?:boolean
}

function Header({agentDetails, previewHeader = false}:Props) {
  return (
    <div className='w-full p-3 flex items-center justify-between'>
      <div className='flex gap-2 items-center' >
        <ChevronLeft className='h-8 w-8' />
        <h2 className='text-xl' >{agentDetails?.name}</h2>
      </div>
      <div className='flex items-center gap-3' >
        <Button variant={'ghost'} ><Code2/>Code</Button>

        {!previewHeader && <Link href={`/agent/${agentDetails?.agentId}/preview`}>
        <Button><Play/>Preview</Button>
        </Link>}

        {previewHeader && (
          <Link href={`/agent/${agentDetails?.agentId}`}>
            <Button variant={'outline'}><X/>Close Preview</Button>
          </Link>
        )}


        <Button>Publish</Button>
      </div>
    </div>
  )
}

export default Header
