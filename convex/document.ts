import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("User not authenticated");
    }

    return await ctx.db.insert("document", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      initialContent: args.initialContent ?? "",
    });
  }
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator  
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const query = ctx.db
      .query("document")
      .filter(q => q.eq(q.field("ownerId"), user.subject));

    return await query.paginate(args.paginationOpts);  
  },
});

export const removeById = mutation({
  args: {
    id: v.id("document")
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Document not found");
    }

    if (document.ownerId !== user.subject) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.id);
  }
});


export const updateById = mutation({
  args: {
    id: v.id("document"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error("Document not found");
    }

    if (document.ownerId !== user.subject) {
      throw new Error("Not authorized");
    }

    const updatedDocument = await ctx.db.patch(id, {
      ...rest
    });

    return updatedDocument;
  }
});