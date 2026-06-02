# Neuro Detect — AI-Powered Brain Tumor Classification Platform

![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express.js](https://img.shields.io/badge/Framework-Express.js-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Python](https://img.shields.io/badge/ML-Python-blue)
![Hugging Face](https://img.shields.io/badge/Model-HuggingFace-yellow)
![Brain MRI](https://img.shields.io/badge/Dataset-Brain_MRI-red)

Neuro Detect is a full-stack AI-powered brain MRI classification platform designed to assist in brain tumor detection and medical research management. The system leverages a Hugging Face deep learning model to classify MRI scans into four categories—Glioma, Meningioma, Pituitary Tumor, and No Tumor—through an intuitive web interface. In addition to prediction capabilities, the platform provides modules for research paper management, dataset organization, AI model tracking, user authentication, and analytics, creating a centralized environment for AI-driven healthcare research and clinical decision support.

## Features

- Brain MRI Tumor Classification
- Multi-Class Prediction (Glioma, Meningioma, Pituitary, No Tumor)
- Research Paper Management
- Dataset Repository Management
- AI Model Management
- User Authentication & Profile Management
- Interactive Analytics Dashboard
- MongoDB Database Integration

## Tech Stack

**Frontend:** EJS, HTML, CSS, JavaScript

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Machine Learning:** Python, Hugging Face Transformers, PIL

## AI Model

**Model Used:** Devarshi/Brain_Tumor_Classification

## Dataset Classes

- Glioma
- Meningioma
- Pituitary Tumor
- No Tumor

## Installation

```bash
git clone <repository-url>
cd Neuro-Detect
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

Run the application:

```bash
npm start
```

## Author

**Likhitha Rao Gundavaram**  
B.Tech Computer Science Engineering (AI & ML)
