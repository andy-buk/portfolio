import Experience from "./Experience/Experience.js"
import mixitup from 'mixitup';

const experience = new Experience(document.querySelector(".experience-canvas"));

// MIXITUP FILTER
let mixerPortfolio = mixitup('.work-container', {
  selectors: {
    target: '.work-card'
  },
  animation: {
    duration: 300
  }
});

// LINK ACTIVE WORK
const linkWork = document.querySelectorAll('.work-item')

function activeWork() {
  linkWork.forEach(l => l.classList.remove('active-work'))
  this.classList.add('active-work')
}

linkWork.forEach(l => l.addEventListener("click", activeWork))

// POPUP WORK
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("work-button")) {
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
  }
})

function togglePortfolioPopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
}

document.querySelector(".portfolio-popup-close").addEventListener("click", togglePortfolioPopup)

function portfolioItemDetails(portfolioItem) {
  document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".work-img").src;
  document.querySelector(".portfolio-popup-subtitle span").innerHTML = portfolioItem.querySelector(".work-title").innerHTML;
  document.querySelector(".portfolio-popup-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}