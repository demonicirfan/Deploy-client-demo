//jquery for toggle dropdown menus
$(document).ready(function(){
    //toggle sub-menus
    $(".sub-btn").click(function(){
      $(this).next(".sub-menu").slideToggle();
    });

    //toggle more-menus
    $(".more-btn").click(function(){
      $(this).next(".more-menu").slideToggle();
    });
  });

  //javascript for the responsive navigation menu
  var menu = document.querySelector(".menu");
  var menuBtn = document.querySelector(".menu-btn");
  var closeBtn = document.querySelector(".close-btn");
  var closeLogout = document.querySelector(".closeLogout");
  var homeLink = document.querySelector(".closeLink");
  var progettoLink = document.querySelector(".closeProgetto");
  var dndLink = document.querySelector(".closeDnd");
  //var accediLink = document.querySelector(".closeAccedi");
  var registratiLink = document.querySelector(".closeRegistrati");

  menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  homeLink.addEventListener("click", () => {
    menu.classList.remove("active");
  })
  progettoLink.addEventListener("click", () => {
    menu.classList.remove("active");
  })
  dndLink.addEventListener("click", () => {
    menu.classList.remove("active");
  })
 /* closeLogout.addEventListener("click", () => {
    menu.classList.remove("active");
  })
  
  accediLink.addEventListener("click", () => {
    menu.classList.remove("active");
  })
  registratiLink.addEventListener("click", () => {
    menu.classList.remove("active");
  })*/

  //javascript for the navigation bar effects on scroll
  window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  const faqs = document.querySelectorAll(".faq");
  faqs.forEach((faq) => {
      faq.addEventListener("click", () => {
      faq.classList.toggle("active");
    })
  });

  

  const contactForm = document.querySelector('.contattaci');
  let nome = document.getElementById('name')
  let oggetto = document.getElementById('oggetto')
  let mail = document.getElementById('mail')
  let message = document.getElementById('message')

  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = {
        name: nome.value,
        email: email.value,
        oggetto: oggetto.value,
        message: message.value
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        if(xhr.responseText == 'success'){
            alert('Email sent')
            nome.value=''
            email.value=''
            oggetto.value=''
            message.value=''
        }else{
            alert('Qualcosa è andato storto')
        }
    }
    xhr.send(JSON.stringify(formData))
  })

  
