/**
* Template Name: eNno
* Template URL: https://bootstrapmade.com/enno-free-simple-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";
  const form = document.getElementById("form");
  const result = document.getElementById("result");
  
  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    result.innerHTML = "Please wait...";
  
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-green-500");
        } else {
          console.log(response);
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-red-500");
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
      });
  });
  
  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);
  /**
   * Service Details Dynamic Update
   */
  const services = {
    "web-development": {
      image: "assets/img/web-development.png",
      title: "Web Development",
      description: `
        <p>Our web development services focus on creating robust, scalable, and secure web applications tailored to your business needs. 
        From static websites to complex enterprise solutions, we ensure seamless performance and user experience.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> Responsive and mobile-friendly designs.</li>
          <li><i class="bi bi-check-circle"></i> E-commerce platforms and CMS solutions.</li>
          <li><i class="bi bi-check-circle"></i> API integration and custom backend systems.</li>
        </ul>
      `
    },
    "mobile-app": {
      image: "assets/img/mobile-app.png",
      title: "Mobile App Development",
      description: `
        <p>Our team creates intuitive and feature-rich mobile applications for both Android and iOS platforms. 
        From concept to launch, we deliver apps that engage and retain users.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> Native and cross-platform app development.</li>
          <li><i class="bi bi-check-circle"></i> Seamless UI/UX for exceptional user experiences.</li>
          <li><i class="bi bi-check-circle"></i> Post-launch support and maintenance.</li>
        </ul>
      `
    },
    "ui-ux-design": {
      image: "assets/img/ui-ux.png",
      title: "UI/UX Design",
      description: `
        <p>We design interfaces that are not only visually appealing but also provide an optimal user experience. 
        Our goal is to combine aesthetics with functionality to create a lasting impact.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> Wireframes and prototypes for clarity.</li>
          <li><i class="bi bi-check-circle"></i> User-centered design principles.</li>
          <li><i class="bi bi-check-circle"></i> Consistent branding and visual identity.</li>
        </ul>
      `
    },
    "digital-marketing": {
      image: "assets/img/digital-marketing.png",
      title: "Digital Marketing",
      description: `
        <p>Boost your online presence with our tailored digital marketing strategies. 
        We help businesses reach their target audience and achieve measurable results.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> Search Engine Optimization (SEO).</li>
          <li><i class="bi bi-check-circle"></i> Social media marketing and ads.</li>
          <li><i class="bi bi-check-circle"></i> Email campaigns and content marketing.</li>
        </ul>
      `
    },
    "cloud-solutions": {
      image: "assets/img/cloud-solutions.png",
      title: "Cloud Solutions",
      description: `
        <p>Leverage the power of the cloud with our scalable and secure cloud solutions. 
        We help businesses transition smoothly to cloud-based platforms, ensuring efficiency and cost savings.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> Cloud migration and setup.</li>
          <li><i class="bi bi-check-circle"></i> Secure data storage and management.</li>
          <li><i class="bi bi-check-circle"></i> Integration with existing systems.</li>
        </ul>
      `
    }
  };

  // Event listener for service items
  document.querySelectorAll(".service-item").forEach(item => {
    item.addEventListener("click", function(e) {
      e.preventDefault();

      // Remove active class from all items
      document.querySelectorAll(".service-item").forEach(el => el.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Update service content
      const serviceKey = this.dataset.service;
      const service = services[serviceKey];

      if (service) {
        const serviceContent = document.getElementById("service-content");
        serviceContent.innerHTML = `
          <img src="${service.image}" alt="${service.title}" class="img-fluid services-img" style="max-height: 300px; width: auto;">
          <h3>${service.title}</h3>
          ${service.description}
        `;
      }
    });
  });
  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();