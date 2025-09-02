# OralVis-Healthcare-Assignment
Full Stack Developer Task - OralVis Healthcare
Objective: Build a basic web app where:
A Technician logs in and uploads patient scan images with details.
A Dentist logs in and views stored scans.
Focus is on authentication and data storage/retrieval.
What You Need to Build (Mandatory Features)
1) Login (with Roles)
Two roles: Technician and Dentist
Login using email + password
Only Technician can upload scans
Only Dentist can view scans
2) Technician – Upload Page Form fields:
Patient Name
Patient ID
Scan Type: RGB
Region: Frontal / Upper Arch / Lower Arch
Upload Scan Image (JPG/PNG)
On submit:
Save the image to cloud storage (Cloudinary or AWS S3).
Save all form data + image URL + upload date into a SQLite database.
Include a timestamp of the upload.
3) Dentist – Scan Viewer Page
Show all stored scans with:
Patient Name
Patient ID
Scan Type
Region
Upload Date
Image Thumbnail
Button to View Full Image
4) Downloadable PDF Report
A per-scan PDF with:
Patient Name & ID
Scan Type & Region
Upload Date
Embedded scan image
5) Host the app online (Vercel, Netlify, Render, etc.)
6) Tech Stack (Suggested)
SQLite
Express + Node.js
React (Vite)
Cloudinary or AWS S3 SDK for image uploads
7) Submission Checklist
Source code (GitHub repo)
A README file with:
Tech stack used
Steps to run the project locally
Screenshots of your work
Hosted demo link
