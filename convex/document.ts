import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
export const create = mutation({
  args : {
    title : v.optional(v.string()),
    initialContent : v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("User not authenticated");
    }

    return await ctx.db.insert("document", {
      title : args.title ?? "Untitled Document",
      ownerId : user.subject,
      initialContent : args.initialContent ?? "",
    })
  }


})

export const get = query({
  args : {paginationsOpts : paginationOptsValidator},
  handler: async (ctx,args) => {
    return await ctx.db.query("document").paginate(args.paginationsOpts);
  },
});
