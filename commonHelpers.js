import l from"iziToast";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const p=document.getElementById("search-form"),f=document.querySelector(".gallery"),d=document.querySelector(".load-more");let u=1,m="";p.addEventListener("submit",async o=>{o.preventDefault(),m=p.elements.searchQuery.value.trim(),u=1,d.style.display="none",await y(m,u)});d.addEventListener("click",async()=>{u++,await y(m,u)});async function y(o,r){const n="42310710-0bcfa885b8d0bd9d4e21f3c00",e="https://pixabay.com/api/",t=new URLSearchParams({key:n,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:40}),s=`${e}?${t}`;try{const a=await fetch(s);if(!a.ok)throw new Error("Failed to fetch images");const c=await a.json();if(c.hits.length===0){f.innerHTML="",l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again."});return}r===1&&(f.innerHTML=""),c.hits.forEach(h=>{const g=b(h);f.appendChild(g)}),c.totalHits<=r*40?(d.style.display="none",l.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):d.style.display="block",l.success({title:"Success",message:`Hooray! We found ${c.totalHits} images.`})}catch(a){console.error(a.message),l.error({title:"Error",message:"Failed to fetch images"})}}function b({webformatURL:o,tags:r,likes:n,views:i,comments:e,downloads:t}){const s=document.createElement("div");return s.classList.add("photo-card"),s.innerHTML=`
  <img src="${o}" alt="${r}" loading="lazy">
  <div class="info">
    <p class="info-item"><b>Likes:</b> ${n}</p>
    <p class="info-item"><b>Views:</b> ${i}</p>
    <p class="info-item"><b>Comments:</b> ${e}</p>
    <p class="info-item"><b>Downloads:</b> ${t}</p> 
  </div>
    `,s}
//# sourceMappingURL=commonHelpers.js.map
