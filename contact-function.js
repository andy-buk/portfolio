document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  fetch(this.action, {
      method: this.method,
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(new FormData(event.target)).toString(),
  })
  .then(response => {
      if (response.ok) {
          return response.text();
      } else {
          throw new Error('Network response was not ok');
      }
  })
  .then(data => {
      alert("Your message has been sent successfully!");
  })
  .catch(error => {
      alert("Oops! There was a problem with your submission.");
      console.error('Error:', error);
  });
});