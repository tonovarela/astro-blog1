

import Fuse from 'fuse.js';
import { useState } from 'react';
import BlogPostR from './BlogPostR';


const options = {
	keys: ['id', 'body', 'title', 'description', 'tags'],
	includeMatches: true,
	location: 0,
	distance: 100,
	findAllMatches: true,
	minMatchCharLength: 2,
	maxPatternLength: 32,

};

function Search({ searchList }) {
	// User's input
	const [query, setQuery] = useState('');

	const fuse = new Fuse(searchList, options);

	// Set a limit to the posts: 5
	const posts = fuse
		.search(query)
		.map((result) => result.item)
		.slice(0, 5);

	function handleOnSearch({ target = {} }) {
		setQuery(target.value);
		console.log(posts[0]?.data);
	}

	return (
		<>
			 <div className="flex items-center mb-4">        
        <div className="relative w-full ">
          <input
            type="text"
            id="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={query}
            onChange={handleOnSearch}
            placeholder="Buscar posts..."
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

			{query.length > 1 && (
				<p className="text-white">
					Found {posts.length} {posts.length === 1 ? 'result' : 'results'} for '{query}'
				</p>
			)}
			<div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
				{posts &&
					posts.map((post) => (

						<BlogPostR  post={post} query={query} />
					))}
			</div>


			<div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
				{
					posts.length === 0 && query.length === 0 && searchList.map((post) => (
						<BlogPostR post={post} />
					))
				}
			</div>
		</>
	);
}

export default Search;