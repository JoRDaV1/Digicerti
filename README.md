# Digicerti
A decentralized certificate verification platform
## Project Name - DigiCerti

##### PID 592 : Online Blockchain based certificate generation and validation system

##### for government organization.

### Project Details

Nowadays, the problem of fake certificates is rising day by day and there's no mechanism to
deal with the verification of certificates. We are aiming to build a system through which we
can verify the authenticity of personal certificates in a trustless manner using Blockchain
Technology.

# Project

# Overview

##### Members: Team^ A^ (Mentor^ -^ Dr^ Gaurav^ Pareek)

```
Divanshu Prajapat
Kanakam Venkatam Vishnu Swaroop
Jay Patel
Rajat Singh
```
##### Timeline:^15 /^09 /^2022 -^11 /^02 /^2023

#### Background


We know the current scenario where everyone is proving fake skills using invalid certificates.
Because of this, the system is not able to work in the way it must work and people are not
able to trust each other. What we are achieving in our concept is building a trustless system
where the user can prove their genuine skills and remove the fraud of certifications. We are
also providing a service where the organization can provide the certificate through our portal,
which will remove the overhead from the organization's end of managing the certification
process.

“As technology is advancing, the creation of fake certificates becomes easier. The forged
certificates range from fake universities issuing certificates to forged certificates of existing
reputed universities. Due to centralization and digitalization, this fake credentials problem
has become a pain in the neck for both the universities and recruiting organizations, and it
needs to be addressed with a sharp solution.” Job-seekers are using fake certificates to prove
the skills that they don’t have, to get jobs in various sectors. Since universities issuing
certificates store the data in their central database, anyone who has access to it can change
it. We need a database that is immutable, decentralized and transparent, which are the main
features of Blockchain.

We are developing a web solution where the certificate issuer can register their organization.
The issuer has the freedom to register dierent courses for which they are providing
certification and also has the freedom to design custom certificates for each course.After
completion of the course, the issuer can add details of course participants to the respective
courses.Participants will receive a certificate of the corresponding course in their mail.
Participants can also see their certificates on their respective dashboard. When the issuer
issues the certificate, the corresponding record will also be added to the Blockchain for

#### Goals

#### Objective and Scope


immutability and transparency. Each certificate has a QR code on it. To verify the certificate
one needs to scan the QR and they will be redirected to our verification portal. On the
verification page you will find all the details of the certificate.You can also verify the
certificate with our records on the blockchain.

If some malicious actor corrupts our central database, we would not be able to retrieve the
database back. Though we can still verify certificates through blockchain. But since we are
using a one-way hashing algorithm to store data on the blockchain as hashes, we cannot
reverse the hashes back to the original data.

If someone gets unauthorized access to some issuer dashboard, he/she may add false
certificates to anybody's account. We may delete that false record from our central database,
but it’s not possible to delete it from the blockchain.

This was our first hackathon, so working on the project in limited time was quite dicult. We
divided the work among ourselves and worked together. The first issue we were facing was to
generate qr code and draw it over a certificate template image. After many internet searches,
reading documentation, we found the solution. We have used qrcode and canvas library to
draw qr code over certificates.

When we hosted our project on Azure Vm , we were facing issues. Our frontend was not
connected to the backend despite working on our local system. To address this issue, we
open the port of VM on which the backend is running and access it using VM ip from the
frontend.

#### Potential Obstacles


##### The transaction fee for adding 100 certificate is around 0. 000279024002976256 MATIC.

This is around 0. 0286 INR. So we can see that our model is cost eective also.

#### Cost Associated

#### Screenshots of Output





