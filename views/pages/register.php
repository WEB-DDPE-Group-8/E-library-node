<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Registration</title>
  <link rel="stylesheet" href="../css/register.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
  <link rel="icon" href="../multimedia/logo.png" type="image/icon type">
  <script src="../js/toggle.js" defer></script>
  <script src="https://kit.fontawesome.com/a076d05399.js"></script>

</head>

<body class="reg">
  <div class="container">
    <header>Signup Form</header>
    <?php 
        include("../lib/db.php"); 
            foreach($errors as $error)
            {
              ?>
    <p class="error"><?php echo $error;
            }
       ?>
    </p>

    <div class="progress-bar">
      <div class="step">
        <p>Name</p>
        <div class="bullet">
          <span>1</span>
        </div>
        <div class="check fas fa-check"></div>
      </div>
      <div class="step">
        <p>Contact</p>
        <div class="bullet">
          <span>2</span>
        </div>
        <div class="check fas fa-check"></div>
      </div>
      <div class="step">
        <p>Birth</p>
        <div class="bullet">
          <span>3</span>
        </div>
        <div class="check fas fa-check"></div>
      </div>
      <div class="step">
        <p>Submit</p>
        <div class="bullet">
          <span>4</span>
        </div>
        <div class="check fas fa-check"></div>
      </div>
    </div>
    <div class="form-outer">
      <form action="register.php" method="POST">
        <div class="page slide-page">
          <div class="title">Registration-form:</div>
          <div class="field">
            <div class="label">Register as</div>
            <select name="role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="field">
            <div class="label">Admin-Code</div>
            <input name="admin_code" type="text">
          </div>
          <div class="field">
            <button class="firstNext next">Next</button>
          </div>
        </div>

        <div class="page slide-page">
          <div class="title">Basic Info:</div>
          <div class="field">
            <div class="label">First Name</div>
            <input name="firstname" type="text">
          </div>
          <div class="field">
            <div class="label">Last Name</div>
            <input name="lastname" type="text">
          </div>
          <div class="field">
            <button class="prev-101 prev">Previous</button>
            <button class="firstNext-1 next">Next</button>

          </div>
        </div>

        <div class="page">
          <div class="title">Contact Info:</div>
          <div class="field">
            <div class="label">Email Address</div>
            <input name="email" type="text">
          </div>
          <div class="field">
            <div class="label">Phone Number</div>
            <input name="phonenumber" type="tel" placeholder="03333333333">
          </div>
          <div class="field btns">
            <button class="prev-1 prev">Previous</button>
            <button class="next-1 next">Next</button>
          </div>
        </div>

        <div class="page">
          <div class="title">Date of Birth:</div>
          <div class="field">
            <div class="label">Date</div>
            <input name="dob" type="date">
          </div>
          <div class="field">
            <div class="label">Gender</div>
            <select name="gender">
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div class="field btns">
            <button class="prev-2 prev">Previous</button>
            <button class="next-2 next">Next</button>
          </div>
        </div>

        <div class="page">
          <div class="title">Login Details:</div>
          <div class="field">
            <div class="label username">Username</div>
            <input name="username" type="text">
          </div>
          <div class="field password">
            <div class="label">Password</div>
            <input name="pass" class="pass" type="password"><i class="far fa-eye" id="togglePassword"
              style="margin-left: -50px; margin-top: 25px; cursor: pointer;"></i>
          </div>
          <div class="field password">
            <div class="label">Password</div>
            <input name="pass2" class="pass2" type="password"><i class="far fa-eye" id="togglePassword2"
              style="margin-left: -50px; margin-top: 25px; cursor: pointer;"></i>
          </div>
          <div class="field btns">
            <button class="prev-3 prev">Previous</button>
            <button type="submit" name="register" onclick=preventDefault() class="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <script src="../js/register.js"></script>

</body>

</html>