# Requirements

## Password Recovery 🔐

**RF**

- The User must be able to recover his password informing his email;
- The User should receive an email with password recovery instructions;
- The User must be able to reset his password;

**RNF**

- Use Mailtrap to test sending email in the development environment;
- Use Amazon SES to send email in the production environment;
-- Sending email should happen in the background (background jobs);

**RN**

- The link sent by email should expire in 2h;
- The User must confirm their new password when resetting their password

## Profile 🗿

**RF**

- The User must be able to update his name, email and password;

**RN**

- The User must not be able to update his email with an email already used;
- To update your password, the user must enter their old password;
- To update his password, the user must confirm his new password;

## Appointments 💼

**RF**

- The User must be able to list all registered service providers;
- The user must be able to list every day of the month with at least one time available from a provider;
- The user must be able to list all available schedules of a provider, on a specific day;
- The user must be able to make a new appointment with a provider;

**RNF**

- The list of providers must be cached;

**RN**

- Each appointment must last exactly one hour;
- Appointments must be available from 8h to 18h (The first at 8h the last at 17h);
- The user cannot schedule in an already busy service;
- The user cannot schedule an service at a time that has already passed;
- The user cannot schedule services with himself;


## Adm painel 📊

**RF**

- The User must be able to list their services (appointments) on a specific day;
- The Provider must receive a notification whenever there is a new appointment;
- The Provider must be able to view your unread notifications;

**RNF**

- Provider appointments in the current day should be cached;
- Provider notifications must be stored in MongoDB;
- Provider notifications must be sent in real time with Socket.io

**RN**

- The notification must have a read or unread status;
