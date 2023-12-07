import nodemailer from "nodemailer";
import mailSenterSave from "./model.js";

export const companyData = async (req, res, next) => {
  try {
    const companyData = await mailSenterSave.find();
    if (companyData) {
      return res.status(200).json(companyData);
    } else {
      return res.status(400).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const mailSenter = async (req, res, next) => {
  try {
    const { companyName, companyEmail, position } = req.body;
    const newData = new mailSenterSave({
      companyName,
      companyEmail,
      position,
    });

    newData.save();
    let content;

    if (position === "MEAN stack developer") {
      content = `
             
<html>

<body>

  <p>Dear HR,</p>

  <p>
    I hope this message finds you well. I am writing to express my interest in the MEAN Stack Developer role at ${companyName}. 
    As a recent graduate with proficiency in MongoDB, Express.js, Angular, and Node.js, I am eager to contribute to your team.
  </p>

  <h3>Key Points:</h3>
  <ul>
    <li>Hands-on experience in MEAN stack development.</li>
    <li>Successful completion of projects demonstrating web application design and implementation.</li>
    <li>Proactive learner committed to staying current with industry trends.</li>
  </ul>

  <p>
    I am impressed by ${companyName}'s commitment. I believe my technical skills and eagerness to learn align well with your team's goals.
  </p>

  <p>
    Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to ${companyName}.
  </p>

  <p>Best regards,<br>
  Munees tk<br>
  6282798759</p>

  <!-- Include a link to download your PDF resume -->
  <p>Attached is my <a href="https://drive.google.com/file/d/1rRwmZubtubJcfZ2u7ei37DvRhJx4NxIE/view?usp=sharing" download>resume</a> for your reference.</p>

</body>
</html>

  
                
                `;
    } else if (position === "Angular developer") {
      content = `

            
<html>
<body>

  <p>Dear HR,</p>

  <p>
    I hope this message finds you well. I am writing to express my interest in the Angular Developer role at ${companyName}. As a recent graduate with proficiency in MongoDB, Express.js, Angular, and Node.js, I am eager to contribute to your team.
  </p>

  <h3>Key Points:</h3>
  <ul>
    <li>Hands-on experience in MEAN stack development.</li>
    <li>Successful completion of projects demonstrating web application design and implementation.</li>
    <li>Proactive learner committed to staying current with industry trends.</li>
  </ul>

  <p>
    I am impressed by ${companyName}'s commitment. I believe my technical skills and eagerness to learn align well with your team's goals.
  </p>

  <p>
    Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to ${companyName}.
  </p>

  <p>Best regards,<br>
    Munees tk<br>
    6282798759
  </p>

  <p>
    <a href="https://drive.google.com/file/d/1rRwmZubtubJcfZ2u7ei37DvRhJx4NxIE/view?usp=sharing" download>Download My Resume (PDF)</a>
  </p>

</body>
</html>

                `;
    } else if (position === "Node js developer") {
      content = `
                             
<html >
<body>

  <p>Dear Hr,</p>

  <p>
    I am writing to express my interest in the Node.js Developer position at ${companyName}. 
    With a solid background in Node.js and a proven track record in developing scalable applications, 
    I believe I can contribute effectively to your team.
  </p>

  <h3>Key Qualifications:</h3>
  <ul>
    <li>Proficient in Node.js, Express.js, and JavaScript</li>
    <li>Experienced in building RESTful APIs and microservices</li>
    <li>Familiar with front-end technologies: HTML, CSS,Angular js, React.js</li>
    <li>Database expertise: MongoDB, MySQL</li>
    <li>Version control: Git</li>
  </ul>

  <p>
    I am impressed by ${companyName}'s innovative projects and commitment to excellence. 
    Enclosed is my <a href="https://drive.google.com/file/d/1rRwmZubtubJcfZ2u7ei37DvRhJx4NxIE/view?usp=sharing" download>resume</a> for your review. 
    I am excited about the opportunity to discuss how my skills align with your team's goals.
  </p>

  <p>Thank you for considering my application. I look forward to the possibility of contributing to ${companyName}.</p>

  <p>Best regards,</p>
  <p>Munees tk<br>
  6282798759</p>

</body>
</html>

                `;
    } else {
      return res.status(400).json({
        message: "select a position",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: "Munees tk",
      to: companyEmail,
      subject: "Application for " + position,
      html: content,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email send-->", info.response);
        return res.status(200).json({
          message: "success",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
