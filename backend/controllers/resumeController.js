exports.getResumeForm = (req, res) => {
    res.render('index');
  };
  
  exports.generateResume = (req, res) => {
    const { name, email, skills, experience } = req.body;
    // Here you can generate a PDF or HTML resume using a library like `puppeteer` or `html-pdf`
    res.send(`Resume generated for ${name}`);
  };