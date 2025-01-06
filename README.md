# Record-Management-System (ESC)
This system is a record management system for all client companies who want to Export their goods from India by using the services of Electronics and Computer Software EXport Promotion Council. This project is build using technologies: Node.js, MongoDB, HTML/CSS. Following APIs are present in it:
1. Welcome page.

2. New Company(customer) registration page supporting file upload and confirmation over provided email post successfull registration.
   
3. Page containing all the applications submitted by companies(customers). This page contains the following otions for each application:
   - Approve -> To approve application
   - Reject -> To rejec application
   - Edit -> To make any edit in application on behalf of customer
   - View -> To View all details submitted by customer
     
4. Registered company detail page depicts following:
   i) Company detail provided at time of registration.
   ii) Assigned file number.
   
5. Details of products expored by copany are listed in following format:
   i) Panals
   ii) Groups
   iii) Items

6. Export details for a specific company can be depicted by following fliters;
   i) Export year
   ii) Export month
   iii) Exported item name
   iv) Exported country name
   v) Amount

> Storage details of MongoDB    
- DATABASE NAME
    - company_data    
- COLLECTIONS
  - approves 
  - companies
  - companyexports
  - companyitems
  - countries
  - exportfees
  - groups
  - panels
