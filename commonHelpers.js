import{a as y}from"./assets/vendor-60ae8458.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const u=document.getElementById("search-form"),l=document.querySelector(".gallery"),n=document.querySelector(".load-more");let c=1,d="";u.addEventListener("submit",async o=>{o.preventDefault(),d=u.elements.searchQuery.value.trim(),c=1,n.style.display="none",await f(d,c)});n.addEventListener("click",async()=>{c++,await f(d,c)});async function f(o,s){const i="42310710-0bcfa885b8d0bd9d4e21f3c00",e="https://pixabay.com/api/";try{const r=(await y.get(e,{params:{key:i,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:40}})).data;if(r.hits.length===0){l.innerHTML="",iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again."});return}s===1&&(l.innerHTML=""),r.hits.forEach(m=>{const p=g(m);l.appendChild(p)}),r.totalHits<=s*40?(n.style.display="none",iziToast.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):n.style.display="block",iziToast.success({title:"Success",message:`Hooray! We found ${r.totalHits} images.`})}catch(t){console.error(t.message),iziToast.error({title:"Error",message:"Failed to fetch images"})}}function g({webformatURL:o,tags:s,likes:i,views:a,comments:e,downloads:t}){const r=document.createElement("div");return r.classList.add("photo-card"),r.innerHTML=`
  <img src="${o}" alt="${s}" loading="lazy">
  <div class="info">
    <p class="info-item"><b>Likes:</b> ${i}</p>
    <p class="info-item"><b>Views:</b> ${a}</p>
    <p class="info-item"><b>Comments:</b> ${e}</p>
    <p class="info-item"><b>Downloads:</b> ${t}</p> 
  </div>
    `,r}
//# sourceMappingURL=commonHelpers.js.map
