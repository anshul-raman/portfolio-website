import type { NextPage } from "next";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { getAllArticles } from "../../src/utils/mdx";
import dayjs from "dayjs";

const BlogPage: NextPage<{ posts: any }> = ({ posts }) => {
  return (
    <main className="flex flex-col justify-center content-center min-h-screen p-3 ">
      {/* Man center div */}
      <div className="  max-w-2xl mx-auto space-y-10">
        {posts.map((frontMatter) => {
          return (
            <Link
              key={frontMatter.slug}
              href={`/blogs/${frontMatter.slug}`}
              passHref
            >
              <div className="border-red-500 border">
                <h1 className="title border">{frontMatter.title}</h1>
                <p className="summary border">{frontMatter.excerpt}</p>
                <p className="date border ">
                  {dayjs(frontMatter.publishedAt).format("MMMM D, YYYY")}{" "}
                  &mdash; {frontMatter.readingTime}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();
  articles
    .map((article) => article.data)
    .sort((a, b) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1;
      if (a.data.publishedAt < b.data.publishedAt) return -1;

      return 0;
    });

  return {
    props: {
      posts: articles.reverse(),
    },
  };
};
