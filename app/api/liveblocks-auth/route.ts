import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { currentUser,auth  } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export async function POST(req: NextRequest) {

    const liveblocks = new Liveblocks({
        secret : process.env.LIVEBLOCKS_SECRET_KEY!,
    });

    const {sessionClaims} = await  auth();

    if (!sessionClaims) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }

    
    const user  = await currentUser();
    if (!user) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }

    const { room } = await req.json();

    const document = await convex.query(api.document.getById,{id : room});

    if (!document) {
      return new Response("Unauthorized", {
        status: 401,
      })
    }

    const isOwner = document.ownerId === user.id;
    const isOrgMember = !!(document.organizationId && document.organizationId === sessionClaims.org_id);

    if (!isOwner && !isOrgMember) {
        return new Response("Unauthorized", {
            status: 401,
        })
    }

    const session = liveblocks.prepareSession(user.id,{
       userInfo : {
           name : user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
           avatar : user.imageUrl,
       } 
    });

    session.allow(room,session.FULL_ACCESS);
    const { body,status } = await session.authorize();

    return new Response(body, {
        status,
    })  
}
