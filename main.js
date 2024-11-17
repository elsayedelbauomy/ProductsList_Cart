const empty = document.querySelector(".empty");
const orderBox = document.querySelector(".order_box");
const allCount = document.querySelector(".part_two .AllCount span");
const spanTotal = document.querySelector(".part_two .totalOrder h2 .spanTotal");
const product = document.querySelector(".product");
let btn = document.getElementById("btn")
let overlay = document.getElementById("over")
let mdia = window.matchMedia("(max-width:767px)")
let req = new XMLHttpRequest();
req.open("GET","data.json");
req.send();
req.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
      for(i = 0 ; i < data.length ; i++) {
        // create box div 
        let box = document.createElement("div");
        box.classList.add("box");
        // create div image and img 
        let imageDiv = document.createElement("div");
        imageDiv.classList.add("imge");
        let img = document.createElement("img");
        img.className = "change"
        img.src = data[i].image.desktop;
        imageDiv.append(img);
        // create cart div 
        let cart = document.createElement("div");
        cart.classList.add("cart");
        cart.setAttribute("data-name",data[i].name)
        cart.setAttribute("data-price",data[i].price)
        cart.setAttribute("data-thumbnail",data[i].image.thumbnail);
        cart.innerHTML = `<img src='./assets/images/icon-add-to-cart.svg'>add to cart`;
        // create item div 
        let addItem = document.createElement("div");
        addItem.className = "addItem";
        //  create holder one
        let holderOne = document.createElement("span");
        holderOne.classList.add("holder");
        holderOne.classList.add("mins");
        let imgHolderOne = document.createElement("img");
        imgHolderOne.src = "./assets/images/icon-decrement-quantity.svg";
        holderOne.append(imgHolderOne);
        addItem.append(holderOne);
        // create count soan 
        let countSpan = document.createElement("span");
        countSpan.className = "count"
        countSpan.innerHTML = "0";
        addItem.append(countSpan);
        //  create holder two
        let holderTwo = document.createElement("span");
        holderTwo.classList.add("holder");
        holderTwo.classList.add("plus");
        let imgHolderTwo = document.createElement("img");
        imgHolderTwo.src = "./assets/images/icon-increment-quantity.svg";
        holderTwo.append(imgHolderTwo);
        addItem.append(holderTwo);
        // create category span 
        let category = document.createElement("span");
        category.className = "category";
        let textCategory = document.createTextNode(data[i].category);
        category.append(textCategory);
        // create h4 name
        let h4 = document.createElement("h4");
        h4.innerHTML = data[i].name;
        // createl span price
        let spanPrice = document.createElement("span");
        spanPrice.classList.add("price");
        spanPrice.innerHTML = `$<span>${data[i].price}</span>`;
        //  append all in box
        box.append(imageDiv)
        box.append(cart)
        box.append(addItem)
        box.append(category)
        box.append(h4)
        box.append(spanPrice);
        //  append all in product div 
        product.append(box)
      }
    //   after loop
    let carts = document.querySelectorAll(".cart");
    let mins = document.querySelectorAll(".mins");
    let plus = document.querySelectorAll(".plus");
    carts.forEach(cart => {
        cart.addEventListener("click" , cartFeatures);
        cart.addEventListener("click",addToCart)
    });
    
    function cartFeatures(e) {
        if(e.target.classList.contains("cart") ) {
            e.target.nextElementSibling.style.display = "flex";
            e.target.style.display = "none";
             e.target.previousElementSibling.style.border = "2px solid hsl(14, 86%, 42%)"
            e.target.nextElementSibling.style.marginTop = "-17px"
        }
    }
    
    mins.forEach((mins) => {
        mins.addEventListener("click", minusFunc)
    })
    
    plus.forEach((plus) => {
        plus.addEventListener("click",plusFunc)
    })
    
    function minusFunc(e) {
        if(e.target.tagName == "SPAN") {
            if(e.target.nextElementSibling.innerHTML > "0") {
                e.target.nextElementSibling.innerHTML--
                allCount.innerHTML--
            }
        }

         if(e.target.tagName == "IMG") {
                if(e.target.parentElement.nextElementSibling.innerHTML > "0") {
                    e.target.parentElement.nextElementSibling.innerHTML--
                    allCount.innerHTML--
                }
        }

    }
    
    function plusFunc(e) {
        if(e.target.classList.contains("plus")) {
                e.target.previousElementSibling.innerHTML++
                allCount.innerHTML++
         }
         if(e.target.tagName == "IMG") {
            e.target.parentElement.previousElementSibling.innerHTML++
            allCount.innerHTML++
         }
    }
    
    
    function addToCart(e) {
      if(e.target.tagName == "DIV") {
        allCount.innerHTML++
        e.target.nextElementSibling.children[1].innerHTML
        empty.style.display = "none";
        orderBox.style.display = "block";
        e.target.dataset.name
        // create the order mainDiv
        let order = document.createElement("div");
        order.className = "order";
        // create the main order box
        let box = document.createElement("div");
        box.className = "box";
        order.setAttribute("data-thumbnail",e.target.dataset.thumbnail)
        // create h6 and add the name 
        let h6 = document.createElement("h6");
        h6.innerHTML = e.target.dataset.name;
        // create details div 
        let detailes = document.createElement("div");
        detailes.className = "detailes";
        // create count span and add the count
        let count = document.createElement("span");
        count.classList.add("count")
        count.innerHTML = `<span>${++e.target.nextElementSibling.children[1].innerHTML}</span><small>x</small></span>`;
        // crrate price span 
        let mainprice = document.createElement("span");
        mainprice.className = "mainprice";
        mainprice.innerHTML = `<small>@</small> $<span class='price'>${e.target.dataset.price}</span>`;
        // create simi total 
        let totalPrice = document.createElement("span");
        totalPrice.className = "totalPrice"
        totalPrice.innerHTML = `$<span class='simiTotal'>4</span>`;
        // append items in the detailes
        detailes.append(count)
        detailes.append(mainprice)
        detailes.append(totalPrice)
        // create the delete 
        let delet = document.createElement("div");
        delet.className = "delete";
        let deletImg = document.createElement("img");
        deletImg.src = "./assets/images/icon-remove-item.svg" ;
        delet.append(deletImg)
        // append all in box
        box.append(h6)
        box.append(detailes);
        // append to the order div 
        order.append(box)
        order.append(delet);
        orderBox.prepend(order)
        // ++e.target.nextElementSibling.children[1].innerHTML
        let countSpan = document.querySelector(".count span");
        let totalPriceSpan = document.querySelector(".totalPrice .simiTotal");
        totalPriceSpan.innerHTML = e.target.dataset.price ;
        let plus = e.target.nextElementSibling.children[2];
        let mins = e.target.nextElementSibling.children[0];
        spanTotal.innerHTML = +spanTotal.innerHTML + +e.target.dataset.price
        plus.onclick = function () {
            ++countSpan.innerHTML
            totalPriceSpan.innerHTML = countSpan.innerHTML * e.target.dataset.price;
            spanTotal.innerHTML = +spanTotal.innerHTML + +e.target.dataset.price
        }
        mins.onclick = function () {
            if(countSpan.innerHTML > 0) {
                countSpan.innerHTML--
                totalPriceSpan.innerHTML-= e.target.dataset.price;
                spanTotal.innerHTML = +spanTotal.innerHTML - +e.target.dataset.price
            }
      
            
        }
        mins.addEventListener("click" , function (e) {
             if(e.target.tagName == "SPAN") {
                if(e.target.nextElementSibling.innerHTML == "0") {
                    let cart = e.target.parentElement.previousElementSibling;
                    let parent = e.target.parentElement;
                    parent.style.display = "none"
                    cart.style.display = "flex";
                    let box = e.target.parentElement.parentElement.children[0];
                    box.style.border = "none";
                    order.remove()

                }
                
            }else if (e.target.tagName == "IMG") {
                if( spanTotal.innerHTML == "0") {
                let cart = e.target.parentElement.parentElement.previousElementSibling;
                let parent = e.target.parentElement.parentElement;
                parent.style.display = "none"
                cart.style.display = "flex";
                let box = e.target.parentElement.parentElement.parentElement.children[0];
                box.style.border = "none";
                order.remove()
                    orderBox.style.display = "none"
                    empty.style.display = "block"
                }
            }
        })
      }
      let deleted = document.querySelectorAll(".delete") ;
      deleted.forEach((del) => {
        del.onclick = function (e) {
           if(e.target.tagName == "DIV") {
            spanTotal.innerHTML -= e.target.previousElementSibling.children[1].children[2].children[0].innerHTML;
            e.target.parentElement.remove()
            carts.forEach((cart) => {
             if (cart.dataset.name == e.target.previousElementSibling.children[0].innerHTML) {
                let itemCount = cart.nextElementSibling;
                let imge = cart.previousElementSibling;
                let itemConter = cart.nextElementSibling.children[1];
                cart.style.display = "flex";
                itemConter.innerHTML = "0"
                itemCount.style.display = "none";
                imge.style.border = "none"
                allCount.innerHTML -= e.target.previousElementSibling.children[1].children[0].children[0].innerHTML;
             } 
            })
           }else if (e.target.tagName == "IMG") {
            spanTotal.innerHTML -= e.target.parentElement.previousElementSibling.children[1].children[2].children[0].innerHTML
            e.target.parentElement.parentElement.remove()
            carts.forEach((cart) => {
                if (cart.dataset.name == e.target.parentElement.previousElementSibling.children[0].innerHTML) {
                   let itemCount = cart.nextElementSibling;
                   let imge = cart.previousElementSibling;
                   let itemConter = cart.nextElementSibling.children[1];
                   cart.style.display = "flex";
                   itemConter.innerHTML = "0"
                   itemCount.style.display = "none";
                   imge.style.border = "none"
                   allCount.innerHTML -= e.target.parentElement.previousElementSibling.children[1].children[0].children[0].innerHTML;
                } 
               })
           }
           if( spanTotal.innerHTML == "0") {
            orderBox.style.display = "none"
            empty.style.display = "block"
            }
        }
      })
    }

    btn.onclick = function() {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
        overlay.classList.remove("none")
        let main = document.createElement("div");
        main.className = "mainFinal"
        let rightImg = document.createElement("img");
        rightImg.src = "./assets/images/icon-order-confirmed.svg";
        let h2 = document.createElement("h2");
        h2.innerHTML = "order confirmed"
        let span = document.createElement("span");
        span.innerHTML = "we hope you enjoy your food";
        main.append(rightImg)
        main.append(h2)
        main.append(span)
        let finalOrders = document.createElement("div");
        finalOrders.classList.add("finalOrder")
        let cloneOrderBox = orderBox.cloneNode(true);
        [...cloneOrderBox.children].forEach((ord) => {
            if(ord.classList.contains("order")) {
                let img = document.createElement("img");
                img.src = ord.dataset.thumbnail;
                img.className = "thumbnail";
                ord.prepend(img)
                finalOrders.append(ord)
            }
            if(ord.classList.contains("totalOrder")) {
                finalOrders.append(ord)
            }
        })
        main.append(finalOrders)
        let newOrderBtn = document.createElement("button");
        newOrderBtn.className = "newOrderBtn";
        newOrderBtn.textContent = "start new order"
        main.append(newOrderBtn);
        document.body.append(main)
        let btnStart = document.querySelector(".newOrderBtn");
        btnStart.onclick = function () {
            window.location.reload()
        }
    }
    
}
}

