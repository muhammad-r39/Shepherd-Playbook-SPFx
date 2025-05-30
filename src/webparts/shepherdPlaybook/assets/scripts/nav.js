"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");

  if (menuIcon) {
    menuIcon.addEventListener("click", function () {
      const nav = document.querySelector("nav");
      const menu = document.querySelector("nav .menu-items");

      if (!nav || !(menu instanceof HTMLElement)) return;

      if (nav.classList.contains("open")) {
        menu.style.maxHeight = "0";
        nav.classList.remove("open");
      } else {
        menu.style.maxHeight = menu.scrollHeight + "px";
        nav.classList.add("open");
      }
    });
  }

  const submenuTogglers = document.querySelectorAll(".sub-menu-toggler");

  submenuTogglers.forEach((toggler) => {
    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".has-sub-menu").forEach((item) => {
        const submenu = item.querySelector(".sub-menu");
        if (submenu instanceof HTMLElement) {
          submenu.style.maxHeight = "0";
        }
        item.classList.remove("open");
      });

      const parentMenu = toggler.closest(".has-sub-menu");
      const submenu = parentMenu?.querySelector(".sub-menu");

      if (parentMenu?.classList.contains("open")) {
        if (submenu instanceof HTMLElement) submenu.style.maxHeight = "0";
        parentMenu.classList.remove("open");
      } else {
        if (submenu instanceof HTMLElement)
          submenu.style.maxHeight = submenu.scrollHeight + "px";
        parentMenu?.classList.add("open");
      }
    });
  });
});
