document.addEventListener("DOMContentLoaded", function () {
  const categoryContainer = document.getElementById("categoryContainer");
  const companyContainer = document.getElementById("companyContainer");
  const productContainer = document.getElementById("productContainer");

  let selectedCategories = new Set();
  let selectedCompany = null;

  // Function to update product visibility based on filters
  const filterProducts = () => {
    const products = productContainer.querySelectorAll(".items-wrap");
    products.forEach((product) => {
      const productCategory = product.getAttribute("data-category").split(",");
      const productCompany = product.getAttribute("data-company");

      const matchesCategory =
        selectedCategories.size === 0 ||
        [...selectedCategories].some((category) =>
          productCategory.includes(category)
        );
      const matchesCompany = selectedCompany
        ? productCompany === selectedCompany
        : true;

      if (matchesCategory && matchesCompany) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  };

  // Add click event listener to categories (multi-select)
  categoryContainer.addEventListener("click", (e) => {
    const target = e.target.closest("li");
    if (target) {
      const category = target.getAttribute("data-category");
      if (target.classList.contains("active")) {
        // Remove from selectedCategories if already active
        target.classList.remove("active");
        selectedCategories.delete(category);
      } else {
        // Add to selectedCategories
        target.classList.add("active");
        selectedCategories.add(category);
      }
      filterProducts();
    }
  });

  // Add click event listener to companies (single-select)
  companyContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".logos");
    if (target) {
      const company = target.getAttribute("data-company");
      if (target.classList.contains("active")) {
        // Deactivate the selected company
        target.classList.remove("active");
        selectedCompany = null;
      } else {
        // Activate the clicked company and deactivate others
        companyContainer
          .querySelectorAll(".logos")
          .forEach((companyElement) => {
            companyElement.classList.remove("active");
          });
        target.classList.add("active");
        selectedCompany = company;
      }
      filterProducts();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileCategoryContainer = document.getElementById(
    "mobileCategoryContainer"
  );
  const mobileCompanyContainer = document.getElementById(
    "mobileCompanyContainer"
  );
  const mobileProductContainer = document.getElementById(
    "mobileProductContainer"
  );

  let selectedMobileCategories = new Set();
  let selectedMobileCompany = null;

  // Function to update product visibility based on selected filters
  const filterMobileProducts = () => {
    const products = mobileProductContainer.querySelectorAll(".items-wrap");
    products.forEach((product) => {
      const productCategories = product
        .getAttribute("data-category")
        .split(",");
      const productCompany = product.getAttribute("data-company");

      // Check if the product matches the selected categories and company
      const matchesCategory =
        selectedMobileCategories.size === 0 ||
        [...selectedMobileCategories].some((category) =>
          productCategories.includes(category)
        );
      const matchesCompany = selectedMobileCompany
        ? productCompany === selectedMobileCompany
        : true;

      // Show or hide the product based on the filter criteria
      if (matchesCategory && matchesCompany) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  };

  // Toggle category selection and add/remove category from the selected list
  window.toggleCheckbox = (event, checkboxId, category) => {
    const checkbox = document.getElementById(checkboxId);
    const li = event.target.closest("li"); // Get the closest <li> element
    checkbox.checked = !checkbox.checked;

    // Add or remove the category from the selected categories
    if (checkbox.checked) {
      selectedMobileCategories.add(category);
      li.classList.add("active"); // Add active class to the clicked <li>
    } else {
      selectedMobileCategories.delete(category);
      li.classList.remove("active"); // Remove active class from the clicked <li>
    }

    // Update the filtered categories display
    updateFilteredCategories();

    // Filter products after selecting/deselecting a category
    filterMobileProducts();

    // Update the active state of logos based on selected categories
    updateLogoActiveState();
  };

  // Update the list of filtered categories to show the selected ones
  const updateFilteredCategories = () => {
    const filteredCategoryContainer = document.getElementById(
      "mobileFilteredCategory"
    );
    filteredCategoryContainer.innerHTML = "";

    selectedMobileCategories.forEach((category) => {
      const categoryElement = document.createElement("div");
      categoryElement.classList.add("category-filter-out");
      categoryElement.innerHTML = `<h5>${category}</h5>`;
      filteredCategoryContainer.appendChild(categoryElement);
    });
  };

  // Update the active class of logos based on selected categories
  const updateLogoActiveState = () => {
    // Logic to determine which logo(s) to mark as active
    if (selectedMobileCategories.size > 0) {
      // If any category is selected, mark corresponding logo as active
      mobileCompanyContainer.querySelectorAll(".logos").forEach((logo) => {
        const logoCategory = logo.getAttribute("data-category"); // Assuming logo has data-category attribute
        if (selectedMobileCategories.has(logoCategory)) {
          logo.classList.add("active");
        } else {
          logo.classList.remove("active");
        }
      });
    } else {
      // Reset all logos if no category is selected
      mobileCompanyContainer.querySelectorAll(".logos").forEach((logo) => {
        logo.classList.remove("active");
      });
    }
  };

  // Add click event listener to companies (single-select for companies)
  mobileCompanyContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".logos");
    if (target) {
      const company = target.getAttribute("data-company");

      // Toggle the active class for the clicked logo
      if (target.classList.contains("active")) {
        target.classList.remove("active");
        selectedMobileCompany = null;
      } else {
        mobileCompanyContainer
          .querySelectorAll(".logos")
          .forEach((companyElement) => {
            companyElement.classList.remove("active"); // Remove active from all logos
          });
        target.classList.add("active"); // Add active class to clicked logo
        selectedMobileCompany = company;
      }

      // Filter the products after company selection
      filterMobileProducts();
    }
  });
});

// Select the go-up button
const goUpButton = document.querySelector(".go-up");

// Function to scroll to the top with a specified duration
function scrollToTop(duration) {
  const startPosition = window.scrollY;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Ensure progress is capped at 1
    const easing = progress * (2 - progress); // Ease-out effect

    window.scrollTo(0, startPosition * (1 - easing));

    if (elapsedTime < duration) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

// Add click event listener to the go-up button
goUpButton.addEventListener("click", () => {
  scrollToTop(2000);
});

// JavaScript for toggling the active class
document.querySelector(".ham-menu").addEventListener("click", function () {
  document.querySelector(".mobile-menu-content-wraps").classList.add("active");
});

document.querySelector(".cross-btn").addEventListener("click", function () {
  document
    .querySelector(".mobile-menu-content-wraps")
    .classList.remove("active");
});

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 50,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".mb-swiper", {
  spaceBetween: 32,
  slidesPerView: 3,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    340: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    437: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    540: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});
// Get all the open popup buttons
// Select all open popup buttons and the single popup overlay
// Select all open popup divs
const openPopupDivs = document.querySelectorAll(".open-popup");

// Add event listeners to all open popup divs
openPopupDivs.forEach((div) => {
  div.addEventListener("click", () => {
    const popupId = div.getAttribute("data-popup"); // Get the data-popup attribute
    const popupOverlay = document.getElementById(popupId); // Select the specific popup
    popupOverlay.classList.add("active"); // Show the popup
  });
});

// Select all close divs within popups
document.querySelectorAll(".close-popup").forEach((closeDiv) => {
  closeDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    const popupOverlay = closeDiv.closest(".popup-overlay");
    popupOverlay.classList.remove("active"); // Hide the popup
  });
});

// Close popup when clicking outside the popup content
document.querySelectorAll(".popup-overlay").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });
});
// Toggle the visibility of the category list
function toggleDropdown() {
  const categoryList = document.querySelector(".category-list-wrap");
  categoryList.style.display =
    categoryList.style.display === "none" ? "block" : "none";
}

// Toggle checkbox state and add "active" class to list item when clicked
function toggleCheckbox(event) {
  // Check if the click originated from the checkbox itself
  if (event.target.tagName.toLowerCase() === "input") {
    return; // Allow default checkbox behavior
  }

  // Toggle checkbox state manually
  const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;

  // Toggle "active" class based on checkbox state
  if (checkbox.checked) {
    event.currentTarget.classList.add("active");
  } else {
    event.currentTarget.classList.remove("active");
  }
}
