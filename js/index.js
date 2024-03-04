
const discussDivContainer = document.getElementById('discuss-div-container');
const latestContainer = document.getElementById('latest-container');
const inboxBtn = document.getElementById('inbox-btn');
const discussSide = document.getElementById('discuss-side');
const inboxCount = document.getElementById('inbox-count');
let inboxSpan = 0;


const loader = document.getElementById('loading');
loader.classList.remove('hidden')
setTimeout(() => {
  loader.classList.add('hidden')
}, 2000);




const allPost = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
  const data = await res.json();
  discussDivContainer.textContent = '';
  data.posts.forEach((item) => {
    const isActive = item.isActive;
    const activeClass = isActive ? "online" : "offline";

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="mb-6 flex flex-col lg:flex-row gap-6 bg-zinc-200 p-10 rounded-2xl">
        <div id="avatar" class="avatar ${activeClass} w-20 h-20">
        <div class="w-20">
          <img src="${item.image}" class="rounded-full"/>
        </div>
      </div>
            <div class="space-y-5">
              <div class="flex gap-5">
                <p># ${item.category}</p>
                <p>Author: ${item.author.name}</p>
              </div>
              <h3 id="card-title" class="text-xl font-extrabold">${item.title}</h3>
              <p class="max-w-[500px]">${item.description}</p>
              <div class="border border-dashed border-black"></div>
              <div class="flex gap-20">
                <div class="flex gap-6 items-center">
                  <div>
                    <i class="fa-regular fa-comment-dots"></i>
                    <span>${item.
        comment_count}</span>
                  </div>
                  <div>
                    <i class="fa-regular fa-eye"></i>
                    <span id="card-view">${item.view_count}</span>
                  </div>
                  <div>
                    <i class="fa-regular fa-clock"></i>
                    <span>${item.posted_time} minutes</span>
                  </div>
                </div>
                <div>
                <button onclick="countBox('${item.id}')" id="inbox-btn">
                <i class="fa-solid text-2xl fa-envelope-open text-green-400"></i>
              </button>
                </div>
              </div>
            </div>
          </div>
        
        
        `;
    discussDivContainer.appendChild(div);
  });

}

let postArr = [];

const countBox = async (item) => {



  inboxSpan++;



  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
  const data = await response.json();
  postArr.push(parseInt(item))
  const filteredArray = data?.posts?.filter(item => postArr.includes(item.id));



  document.getElementById('inbox-count').innerText = inboxSpan;

  const cardContainer = document.getElementById('card-container')
  const div = document.createElement('div')

  filteredArray.forEach((item) => div.innerHTML = `
       

    <div class="flex mb-6 gap-24 bg-white p-4">
                <div class="max-w-[200px]">
                  <h3 class="font-bold">${item.title}</h3>
                </div>
                <div class="flex gap-2 items-center">
                  <i class="fa-regular fa-eye"></i>
                  <p>${item.view_count}</p>
                </div>
              </div>
        `)
  cardContainer.appendChild(div);
}




const handleSearch = () => {
  const searchField = document.getElementById('search-value');
  const searchText = searchField.value;
  allPost(searchText);

  const loader = document.getElementById('loading');
  loader.classList.remove('hidden')
  setTimeout(() => {
    loader.classList.add('hidden')
  }, 2000);
  
}

allPost('comedy');


const latestPosts = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await res.json();
  data.forEach((item) => {

    const div = document.createElement('div')
    div.innerHTML = `
    <div class="border p-5 space-y-4 rounded-2xl">
          <img src="${item.cover_image}" alt="">
          <div class="flex gap-2 items-center">
            <i class="fa-regular fa-calendar"></i>
            <p>${item.author.posted_date || 'no publish date'}</p>
          </div>
          <h3 class="text-xl font-extrabold max-w-[330px]">${item.title}</h3>
          <p class="max-w-[320px]">${item.description}</p>
          <div class="flex gap-4 items-center">
            <img src="${item.profile_image}" alt="" class="w-16 rounded-xl">
            <div>
              <h3 class="font-extrabold">${item.author.name}</h3>
              <p>${item.author.designation || 'Unknown'}</p>
            </div>
          </div>
        </div>
    
    
    `;

    latestContainer.appendChild(div);
  })
};

latestPosts();
