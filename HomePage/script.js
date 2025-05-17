document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  const menuBtn = document.querySelector(".menu-btn")
  const nav = document.querySelector(".nav")

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
  })

  const navLinks = document.querySelectorAll(".nav a")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
    })
  })

  const messageForm = document.getElementById("messageForm")

  if (messageForm) {
    messageForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const service = document.getElementById("service").value
      const message = document.getElementById("message").value

      console.log("Form submitted:", { name, email, service, message })

      alert("Thank you for your message! We will get back to you soon.")

      messageForm.reset()
    })
  }

  const serviceSelect = document.getElementById("service")
  if (serviceSelect) {
    serviceSelect.value = ""
  }
})

