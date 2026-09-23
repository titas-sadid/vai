const PRICE=1250, DELIVERY=90;
let selectedProduct="My Soul 18+";

function orderNow(product){
 selectedProduct=product;
 document.getElementById("order").scrollIntoView({behavior:"smooth"});
 showToast("Please complete your order details.");
}
function updateTotal(){
 const q=Number(document.getElementById("qty").value);
 document.getElementById("total").textContent="৳ "+(PRICE*q+DELIVERY).toLocaleString("en-BD");
}
document.getElementById("qty").addEventListener("change",updateTotal);

document.getElementById("orderForm").addEventListener("submit",function(e){
 e.preventDefault();
 const name=document.getElementById("name").value.trim();
 const phone=document.getElementById("phone").value.trim();
 const address=document.getElementById("address").value.trim();
 const q=Number(document.getElementById("qty").value);
 const area=document.getElementById("area").value;
 if(!name||!phone||!address){showToast("Please fill in all required fields.");return}
 const total=PRICE*q+DELIVERY;
 const message=
 `Hello, I want to order My Soul 18+.%0A%0A`+
 `Product: ${encodeURIComponent(selectedProduct)}%0A`+
 `Name: ${encodeURIComponent(name)}%0A`+
 `Phone: ${encodeURIComponent(phone)}%0A`+
 `Quantity: ${q}%0A`+
 `Delivery Area: ${encodeURIComponent(area)}%0A`+
 `Address: ${encodeURIComponent(address)}%0A`+
 `Product Price: ৳${PRICE*q}%0A`+
 `Delivery Charge: ৳${DELIVERY}%0A`+
 `Total: ৳${total}`;
 window.open("https://wa.me/8801804666410?text="+message,"_blank");
});

let galleryPos=0;
function moveGallery(dir){
 const track=document.getElementById("galleryTrack");
 const items=track.children.length;
 const visible=window.innerWidth<=850?1:3;
 const max=Math.max(0,items-visible);
 galleryPos+=dir;
 if(galleryPos<0)galleryPos=max;
 if(galleryPos>max)galleryPos=0;
 const width=track.children[0].getBoundingClientRect().width+18;
 track.style.transform=`translateX(-${galleryPos*width}px)`;
}
setInterval(()=>moveGallery(1),4500);

function showToast(msg){
 const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");
 clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),3000);
}

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));
