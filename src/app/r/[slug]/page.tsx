import React, { FC } from "react";
import { getAuthSession } from "../../../lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import MiniCreatePosts from "@/components/MiniCreatePosts";

import PostFeed from "@/components/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;
  const session = await getAuthSession();
  const singlesubreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  const subreddits = await db.subreddit.findMany();
  if (!singlesubreddit) return notFound();
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{singlesubreddit.name}
      </h1>
      <MiniCreatePosts session={session} />
      <PostFeed
        initialPosts={singlesubreddit.posts}
        subredditName={singlesubreddit.name}
      />
    </>
  );
};
export default page;
