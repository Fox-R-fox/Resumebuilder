document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
  
    // Display the generated resume
    document.getElementById('outputName').textContent = name;
    document.getElementById('outputEmail').textContent = email;
    document.getElementById('outputSkills').textContent = skills;
    document.getElementById('outputExperience').textContent = experience;
  
    // Show the resume output section
    document.getElementById('resumeOutput').classList.remove('hidden');
  
    // Optionally, send data to the backend for further processing
    fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, skills, experience }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Log the response from the backend
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });