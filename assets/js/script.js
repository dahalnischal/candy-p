document.addEventListener("DOMContentLoaded", function () {
  // Desktop Filters and Pagination
  (function desktopFiltersAndPagination() {
    const categoryContainer = document.getElementById("categoryContainer");
    const companyContainer = document.getElementById("companyContainer");
    const productContainer = document.getElementById("productContainer");
    const pagination = document.querySelector(".desktop-pagination");

    let selectedCategories = new Set();
    let selectedCompany = null;

    const itemsPerPage = 20;
    let currentPage = 1;

    const resetPagination = () => {
      currentPage = 1;
      pagination.querySelectorAll(".num").forEach((pageLink, index) => {
        if (index === 0) {
          pageLink.classList.add("active");
        } else {
          pageLink.classList.remove("active");
        }
      });
    };

    const filterProducts = () => {
      const products = productContainer.querySelectorAll(".items-wrap");
      let visibleCount = 0;

      products.forEach((product) => {
        const productCategory = product
          .getAttribute("data-category")
          ?.split(",");
        const productCompany = product.getAttribute("data-company");

        const matchesCategory =
          selectedCategories.size === 0 ||
          [...selectedCategories].some((category) =>
            productCategory?.includes(category)
          );

        const matchesCompany = selectedCompany
          ? productCompany === selectedCompany
          : true;

        if (matchesCategory && matchesCompany) {
          visibleCount++;
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });

      if (visibleCount <= itemsPerPage) {
        pagination.style.display = "none";
      } else {
        pagination.style.display = "flex";
        paginateProducts();
      }

      resetPagination();
    };

    const paginateProducts = () => {
      const products = productContainer.querySelectorAll(".items-wrap");
      let visibleCount = 0;

      products.forEach((product, index) => {
        if (product.style.display === "block") {
          visibleCount++;
          const start = (currentPage - 1) * itemsPerPage;
          const end = currentPage * itemsPerPage;
          product.style.display =
            visibleCount > start && visibleCount <= end ? "block" : "none";
        }
      });
    };

    categoryContainer.addEventListener("click", (e) => {
      const target = e.target.closest("li");
      if (target && target.hasAttribute("data-category")) {
        const category = target.getAttribute("data-category");

        if (target.classList.contains("active")) {
          target.classList.remove("active");
          selectedCategories.delete(category);
        } else {
          target.classList.add("active");
          selectedCategories.add(category);
        }

        filterProducts();
      }
    });

    companyContainer.addEventListener("click", (e) => {
      const target = e.target.closest(".logos");
      if (target && target.hasAttribute("data-company")) {
        const company = target.getAttribute("data-company");

        if (target.classList.contains("active")) {
          target.classList.remove("active");
          selectedCompany = null;
        } else {
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

    pagination.addEventListener("click", (e) => {
      const target = e.target.closest(".num");
      if (target && !target.classList.contains("active")) {
        pagination
          .querySelectorAll(".num")
          .forEach((pageLink) => pageLink.classList.remove("active"));

        target.classList.add("active");
        currentPage = parseInt(target.textContent, 10);
        paginateProducts();
      }
    });

    filterProducts();
  })();
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
  const mobilePaginationContainer =
    document.querySelector(".mobile-pagination");

  let selectedMobileCategories = new Set();
  let selectedMobileCompany = null;

  const itemsPerPage = 20; // Number of items per page
  let currentPage = 1;

  // Function to update product visibility based on selected filters and pagination
  const filterAndPaginateMobileProducts = () => {
    const products = Array.from(
      mobileProductContainer.querySelectorAll(".items-wrap")
    );
    const filteredProducts = products.filter((product) => {
      const productCategories = product
        .getAttribute("data-category")
        .split(",");
      const productCompany = product.getAttribute("data-company");

      const matchesCategory =
        selectedMobileCategories.size === 0 ||
        [...selectedMobileCategories].some((category) =>
          productCategories.includes(category)
        );

      const matchesCompany = selectedMobileCompany
        ? productCompany === selectedMobileCompany
        : true;

      return matchesCategory && matchesCompany;
    });

    // Paginate the filtered products
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    // Hide all products and show only paginated filtered products
    products.forEach((product) => (product.style.display = "none"));
    filteredProducts.slice(start, end).forEach((product) => {
      product.style.display = "block";
    });

    // Update pagination
    updateMobilePagination(totalPages);
  };

  // Function to update pagination
  const updateMobilePagination = (totalPages) => {
    mobilePaginationContainer.innerHTML = ""; // Clear existing pagination

    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.classList.add("num");
        pageLink.textContent = i;
        if (i === currentPage) {
          pageLink.classList.add("active");
        }
        pageLink.href = "#";
        pageLink.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          filterAndPaginateMobileProducts();
        });

        mobilePaginationContainer.appendChild(pageLink);
      }
    }
  };

  // Toggle category selection
  window.toggleCheckbox = (event, checkboxId, category) => {
    const checkbox = document.getElementById(checkboxId);
    const li = event.target.closest("li");
    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
      selectedMobileCategories.add(category);
      li.classList.add("active");
    } else {
      selectedMobileCategories.delete(category);
      li.classList.remove("active");
    }

    updateFilteredCategories();
    currentPage = 1; // Reset to the first page
    filterAndPaginateMobileProducts();
    updateLogoActiveState();
  };

  // Update filtered categories display
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

  // Update active class of logos
  const updateLogoActiveState = () => {
    if (selectedMobileCategories.size > 0) {
      mobileCompanyContainer.querySelectorAll(".logos").forEach((logo) => {
        const logoCategory = logo.getAttribute("data-category");
        if (selectedMobileCategories.has(logoCategory)) {
          logo.classList.add("active");
        } else {
          logo.classList.remove("active");
        }
      });
    } else {
      mobileCompanyContainer.querySelectorAll(".logos").forEach((logo) => {
        logo.classList.remove("active");
      });
    }
  };

  // Handle company selection
  mobileCompanyContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".logos");
    if (target) {
      const company = target.getAttribute("data-company");

      if (target.classList.contains("active")) {
        target.classList.remove("active");
        selectedMobileCompany = null;
      } else {
        mobileCompanyContainer
          .querySelectorAll(".logos")
          .forEach((companyElement) =>
            companyElement.classList.remove("active")
          );
        target.classList.add("active");
        selectedMobileCompany = company;
      }

      currentPage = 1; // Reset to the first page
      filterAndPaginateMobileProducts();
    }
  });

  // Initial call to filter and paginate products
  filterAndPaginateMobileProducts();
});

document.addEventListener("DOMContentLoaded", () => {
  const itemsPerPage = 20; // Number of items per page

  // Function to handle pagination for a given container
  const setupPagination = (containerId, paginationId) => {
    const productContainer = document.getElementById(containerId);
    const paginationContainer = document.querySelector(`.${paginationId}`);
    const items = Array.from(productContainer.querySelectorAll(".items-wrap"));
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const showPage = (page) => {
      // Hide all items
      items.forEach((item) => (item.style.display = "none"));

      // Calculate start and end index for items to display
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Show items for the current page
      items.slice(startIndex, endIndex).forEach((item) => {
        item.style.display = "block";
      });

      // Update active class in pagination
      paginationContainer.querySelectorAll(".num").forEach((link, index) => {
        link.classList.toggle("active", index + 1 === page);
      });
    };

    const createPagination = () => {
      paginationContainer.innerHTML = ""; // Clear existing pagination

      // Add page numbers
      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.classList.add("num");
        pageLink.textContent = i;
        pageLink.href = "#";
        if (i === 1) pageLink.classList.add("active"); // Set initial active page

        // Add click event to switch pages
        pageLink.addEventListener("click", (e) => {
          e.preventDefault();
          showPage(i);
        });

        paginationContainer.appendChild(pageLink);
      }

      // Add "Further" button if needed
      if (totalPages > 1) {
        const furtherLink = document.createElement("a");
        furtherLink.classList.add("further");
        furtherLink.textContent = "дальше";
        furtherLink.href = "#";

        furtherLink.addEventListener("click", (e) => {
          e.preventDefault();
          const activePage = paginationContainer.querySelector(".num.active");
          const currentPage = parseInt(activePage.textContent);
          if (currentPage < totalPages) showPage(currentPage + 1);
        });

        paginationContainer.appendChild(furtherLink);
      }
    };

    // Initialize pagination and show the first page
    createPagination();
    showPage(1);
  };

  // Setup pagination for desktop and mobile
  setupPagination("productContainer", "desktop-pagination");
  setupPagination("mobileProductContainer", "mobile-pagination");
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
