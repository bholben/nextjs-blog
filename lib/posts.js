import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPosts = () =>
  fs
    .readdirSync(postsDirectory)
    .map((fileName) => ({
      id: getId(fileName),
      ...getFileContents(fileName).data,
    }))
    .sort(({ date: a }, { date: b }) => (a < b ? 1 : a > b ? -1 : 0));

export const getPostIds = () =>
  fs
    .readdirSync(postsDirectory)
    .map((fileName) => ({ params: { id: getId(fileName) } }));

export const getPost = async (id) => {
  const { content, data } = getFileContents(`${id}.md`);
  const processedContent = await remark().use(html).process(content);
  return { id, contentHtml: processedContent.toString(), ...data };
};

const getId = (fileName) => fileName.replace(/\.md$/, "");

const getFileContents = (fileName) => {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents);
};
