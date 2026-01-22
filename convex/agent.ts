import {v} from 'convex/values'
import { mutation, query } from './_generated/server'


export const createAgent = mutation({
    args: {
        name: v.string(),
        agentId: v.string(),
        userId: v.id('UserTable')
    },
    handler: async (ctx, args) => {
        const result = ctx.db.insert("AgentTable", {
            name: args.name,
            agentId: args.agentId,
            published: false,
            userId:args.userId
        })
        return result
    }
})

export const GetUserAgents = query({
    args: {
        userId: v.id('UserTable')
    },
    handler: async (ctx, args) => {
        const result = ctx.db.query('AgentTable')
            .filter(q => q.eq(q.field('userId'),args.userId))
            .order('desc')
            .collect()
        return result
    }
})

export const GetAgnetById = query({
    args: {
        agentId: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('AgentTable')
            .filter(q => q.eq(q.field('agentId'), args.agentId))
            .order('desc')
            .collect()
        return result[0];
    }
})
export const UpdateDetails = mutation({
    args:{
        id:v.id('AgentTable'),
        nodes:v.any(),
        edges:v.any()
    },
    handler:async(ctx,args)=>{
        await ctx.db.patch(args.id,{
            edge:args.edges,
            node:args.nodes
        })
    }
    

})