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

    const org_id =  (user.org_id ?? undefined) as | string | undefined;

    return await ctx.db.insert("document", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      organizationId: org_id,
      initialContent: args.initialContent ?? "",
    });
  }
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),  
  },
  handler: async (ctx, {search,paginationOpts}, ) => {
    const user = await ctx.auth.getUserIdentity();
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    const org_id =  (user.org_id ?? undefined) as | string | undefined;

    if (search && org_id) {
      return await ctx.db
        .query("document")
          .withSearchIndex("search_title",(q) => q.search("title",search).
            eq("organizationId",org_id)
          )
          .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query("document")
          .withSearchIndex("search_title",(q) => q.search("title",search).
            eq("ownerId",user.subject)
          ).
            paginate(paginationOpts);
    }

    if (org_id) {
      return await ctx.db
        .query("document")
        .withIndex("by_organization_Id",(q) => q.eq("organizationId",org_id))
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query("document")
      .withIndex("by_owner_Id",(q) => q.eq("ownerId",user.subject))
      .paginate(paginationOpts);
  }
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

    const isOwner = document.ownerId === user.subject;
    const isOrgMember = !!(document.organizationId && document.organizationId === user.org_id);

    if (!isOwner && !isOrgMember) {
      throw new Error("Not authorized");
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


export const getById = query({
  args: {
    id: v.id("document")
  },
  handler: async (ctx, {id}) => {
    const document = await ctx.db.get(id);
    
    if (!document) {
      throw new Error("Document not found");
    }

    return document;
  }
})

export const getByIds = query({
  args: {
    ids: v.array(v.id("document"))
  },
  handler: async (ctx, { ids }) => {
    const documents = await Promise.all(ids.map(id => ctx.db.get(id)));

    const notFoundIds = ids.filter((_, index) => !documents[index]);

    if (notFoundIds.length > 0) {
      throw new Error(`Documents not found for IDs: ${notFoundIds.join(", ")}`);
    }

    return documents;
  }
});
