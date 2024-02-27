document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('greetingForm');
    const generatedGreeting = document.getElementById('generatedGreeting');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });
  
      try {
        const response = await fetch('/generate-greeting', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (result.success) {
          generatedGreeting.innerHTML = `<p>${result.greeting}</p>`;
        } else {
          generatedGreeting.innerHTML = `<p>Error: ${result.error}</p>`;
        }
      } catch (error) {
        console.error(error);
        generatedGreeting.innerHTML = '<p>Error: Failed to generate greeting</p>';
      }
    });
  });
  