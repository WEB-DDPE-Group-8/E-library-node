![](https://github.com/WEB-DDPE-Group-8/Elibrary-php/blob/main/multimedia/logo.png)

# <center> A<sup>2</sup>Z Library </center>

## This web site alllows users to upload books of their own and distribute them to an audience to boost initial noteriety of individuals as a starter for a carrer in writing

### Login Credentials

`Username`: tibex <br>
`Password`: qwerty1234

### Features

---

#### visitor(No Account)

---

- Check out the available books along with their descriptions.
- Navigate through the website with no unique functionality other than simple viewrship.
- Prompted to create an account when trying to download a book or add a book to cart.

#### User(Initial account)

---

A User can...

- Navigate the website search and sort books.
- Upload books.
- Download books.
- See his/her own downloaded, rejected or maybe even pending books(Status of their books).
- Have a cart supported on a cloud to persist their data for a long period of time.

#### Admin(Advanced account)

---

An Admin can...

- Do everything a user can plus...
- Gets a navigation bar that gives it detailed information on Events,Books and Users.
- Can Get,Approve,Reject Books based on their content being allowed by our guidelines.
  -See the statistics on the information regarding...
  - Content of the books based on Genre.
  - Content of the events based on Activity.
  - Content of the users based on User Type.
- All statistics are represented by `Doughnut` and `BarCharts` with `keys and legends` for reference
- Admins form the DashBoard can see an d navigate to events page, visit users and see book descriptions

### Known Issues

---

- Stay online due to icons,ajax libraries and other java script libraries used for this project are online.
- Check your spam for email verification and password change.
- Files to be imported are in admin in a folder named "csv".
- On first load, press the home on top navigation bar so that index.php needs to be displayed on the top bar in order for the landing page to properly refer to the correct files needed.

- The import books featured was built as a backup feature in mind therefore its best to remove db contents for the books before importing or else a dublicate data error will occur,
  Suggested order of testing for the import and export of files
  - Export books from the books database(or use the one provided in the csv folder)
  - Truncate the book table with set foreign key check to off <br>
  - import from dashboard the exported csv file(or the backup) <br>
  - The database for the website to work can be found in `database/` folder with the filename `a2zlibrary(%d).sql`
