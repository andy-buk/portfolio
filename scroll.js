document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
  
    function scrollToSection(index) {
      if (index >= 0 && index < sections.length) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
        currentSection = index;
      }
    }
  
    const throttleScrollToSection = throttle(scrollToSection, 500); // Add a throttle of 500ms
  
    document.addEventListener('wheel', function (event) {
      if (event.deltaY > 0) {
        // Scrolling down
        throttleScrollToSection(currentSection + 1); // Use throttleScrollToSection instead of scrollToSection
      } else {
        // Scrolling up
        throttleScrollToSection(currentSection - 1); // Use throttleScrollToSection instead of scrollToSection
      }
  
      event.preventDefault();
    }, { passive: false });
  
    function throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  });
  