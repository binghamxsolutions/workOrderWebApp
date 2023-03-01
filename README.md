# Work Orders Web App

A simple .NET Core + Angular app for viewing work orders!

This web app was designed to demonstrate
  - working knowledge of the .NET framework
  - understanding of web development technologies (HTML, CSS, Angular)
  - basic knowledge of back-end processes (CRUD operations)
  - practical implementation of UI/UX design when integrated with data retrieved from a database


## Getting Started

### Requirements
  - [Windows OS] [1]
  - [NPM] [2]
  - [Angular CLI] [3]
  - Instance of MS SQL Server Express (2016, 2017, 2019*, or 2022 edition)
  - Visual Studio 2019 or higher (Older versions of Visual Studio have not been tested)

*__*This is the recommended version*__

### Setup
First, be sure to [install LocalDB][4]. Once that is complete, connect to the LocalDB 
using the following connection string: `Server=(LocalDB)\MSSQLLocalDB;Integrated Security=true;AttachDbFileName=<filepath_to_data_file>.mdf` where `<filepath_to_data_file>` 
is the path to your main/master database file (.mdf).

\
Be sure that the database file contains two tables with their respective column names as 
listed below:
- technicians
  | TechnicianID | TechnicianName | TechnicianEmail|
  |:-: | :-: | :-:|
- workorders*: 
  | WONum | Email | Status | DateReceived | DateAssigned | DateComplete | ContactName | TechnicianComments | ContactNumber | TechnicianID | Problem |
  | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
*__*All fields EXCEPT for WONum are nullable*__

\
Note that to get connect to LocalDB successfully, you may need to change the secrets ID 
found under `WorkOrderProject` > `Connected Services` > `Secrets.json(Local) `to your 
personalized secrets ID number

\
\
Once the database has been connected and the Secrets.json file points to the correct location, 
launch the web app using the green `Start` button in the Ribbon or by simply pressing `F5`. Two 
command prompt will open: one to provide you with a localhost URI to route to and another that 
launches after that site is accessed to begin accessing the back-end and providing real-time status 
logs.



\
According to [Microsoft][6], the connection to LocalDB may fail with a timeout message. If this 
is the case, please wait a few seconds and then try again.

### Notes
__This project is not in production.__

Currently the only CRUD operations supported on the workOrders database through this web app are 
`CREATE` for the workorders table for record insertion and `READ` for both `workorders` and `technicians`. 
Future iterations, if created, should include UPDATE and DELETE methods for both tables as well as a 
CREATE method for the `technicians` table. 

Concerns for the `DELETE` and `UPDATE` methods are fidelity and tracking for auditing or analytic purposes 
in case of a production implementation

\
__NOTE__: Please address fidelity and security issues in accordance to your company policy and procedures 
if this solution is used for further development, especially if used for production purposes, and adjust code 
as needed.

[1]: https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16#restrictions
[2]: https://nodejs.org/en/download/
[3]: https://angular.io/guide/setup-local 
[5]: https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16#installation-media 
[6]: https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16#connect-to-the-automatic-instance
