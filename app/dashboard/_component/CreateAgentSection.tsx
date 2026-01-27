'use client'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Plus } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import {v4 as uuidv4} from 'uuid'
import { UserDetails } from '@/context/UserData';
import { toast } from 'sonner';
import { useAuth } from "@clerk/nextjs"; 

function CreateAgentSection() {

  const route = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  const CreateAgentMutation = useMutation(api.agent.createAgent)
  const [agentName, setAgentName] = useState<string>()
  const [loader, setLoader] = useState(false)
  const {userDetails, setUserDetail} = useContext(UserDetails)
  const {has} = useAuth();
  const hasPremiumAccess = has && has({plan: "unlimited_plan"});
  console.log("Has Premium Access:", hasPremiumAccess);

  const CreateAgent = async () => {
    if(!hasPremiumAccess && userDetails && userDetails?.remainingCredits <= 0){
      toast.error("You have reached the limit of free agents. Please upgrade to premium for unlimited agents.")
      return;
    }

    if (!userDetails?._id) {
      console.error("User details not available");
      toast.error("Please wait for user data to load");
      return;
    }

    setLoader(true)
    const agentId = uuidv4()
    
    try {
      const result = await CreateAgentMutation({
        agentId: agentId,
        name: agentName ?? "",
        userId: userDetails._id  
      })
      console.log(result)
      setLoader(false)
      setOpenDialog(false)
      route.push('/agent/' + agentId)
    } catch (error) {
      console.error("Error creating agent:", error)
      setLoader(false)
      toast.error("Failed to create agent. Please try again.")
    }
  }

  return (
    <div className='space-y-3 flex flex-col justify-center items-center mt-20' >
      <h2 className='font-bold text-2xl' >Create Ai Agent Workflow</h2>
      <p className='text-lg'>Build an ai agent workflow with logic and tools</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={'lg'} onClick={() => setOpenDialog(true) } >
            <Plus /> Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Agent name</DialogTitle>
            <DialogDescription>
              <Input placeholder='Agent name' onChange={(e) => setAgentName(e.target.value) } />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant={'ghost'} >Cancel</Button>
            </DialogClose>
            <Button onClick={CreateAgent} disabled={loader} >
              {loader && <Loader2Icon className='animate-spin' />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateAgentSection