# 📘 Student Enrollment Form – Micro Project

This project is a web-based **Student Enrollment Form** designed to manage student records with the help of **JsonPowerDB (JPDB)** as the backend database. It enables users to create, read, update, and reset student records using a user-friendly interface.

---

## 📌 Objective

To develop a single-page application that:
- Stores student data in a NoSQL backend (JsonPowerDB)
- Allows users to create new records
- Automatically detects existing records by primary key (`RollNo`)
- Provides functionality to update or reset the form accordingly

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (with jQuery)
- JsonPowerDB (JPDB) – REST-based NoSQL backend

---

## 🗃️ Database Configuration

- **Database Name:** `SCHOOL-DB`  
- **Relation/Table Name:** `STUDENT-TABLE`  
- **Primary Key:** `RollNo`

### 🎯 Input Fields

| Field Name       | Description           | Type   | Required |
|------------------|------------------------|--------|----------|
| `RollNo`         | Student Roll Number    | Text   | ✅ Yes   |
| `FullName`       | Full Name of Student   | Text   | ✅ Yes   |
| `Class`          | Current Class/Grade    | Text   | ✅ Yes   |
| `BirthDate`      | Date of Birth          | Date   | ✅ Yes   |
| `Address`        | Residential Address    | Text   | ✅ Yes   |
| `EnrollmentDate` | Admission/Join Date    | Date   | ✅ Yes   |

---

## 🔘 Features

- **Roll No Detection:**  
  On entering a Roll No:
  - If it exists → Form auto-fills and enables `[Update]` & `[Reset]`
  - If not → Enables empty fields and `[Save]` & `[Reset]`

- **[Save] Button:**  
  Adds a new student record to the database

- **[Update] Button:**  
  Updates an existing record using the record's internal `rec_no` from JPDB

- **[Reset] Button:**  
  Resets the form and state, focuses cursor on Roll No

---

## 🧠 Workflow

1. Page loads with only **Roll No** enabled.
2. User enters a Roll No.
3. System checks in JPDB using `GET_BY_KEY`.
4. Based on existence:
   - **Not Found:** Form is enabled for new entry.
   - **Found:** Form is pre-filled and ready for update.
5. Validation ensures all fields are filled.
6. Record is saved or updated in JsonPowerDB using the correct API.

---

## 📂 Project Structure

