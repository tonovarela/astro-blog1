import { Formatter } from "@utils/formatter";
import Highlighter from "react-highlight-words";

import type { CollectionEntry } from "astro:content";

interface Props {
  post: CollectionEntry<'blog'>;
  query?: string;  
}
function BlogPostR({post,query}: Props) {
  const frontmatter = post.data;  
  console.log(frontmatter);
  return (
<>

<div className="lg:flex">
   { <img className="object-cover w-full h-56 rounded-lg lg:w-64"   src={frontmatter.image?.src!}  
   alt={frontmatter.title}           
    loading="lazy"   
  /> } 
  <div className="flex flex-col justify-between py-6 lg:mx-6">
    <a href={`/posts/${post.slug}`} className="text-xl font-semibold hover:underline text-white">
    <Highlighter    
    searchWords={[query??'']}
    autoEscape={true}
    textToHighlight={frontmatter.description}
  />
    {/* {frontmatter.} */}
    </a>
    <span className="text-sm text-gray-300">{Formatter.formatDate(frontmatter.date)}</span>
  </div>
</div>
</>
  );
}

export default BlogPostR;