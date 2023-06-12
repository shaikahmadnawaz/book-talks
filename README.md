# Book Talks

The Book Talks is a platform where users can discover, review, and discuss books. It allows users to create an account, add books to their collection, and share their thoughts and ratings on books.

## Features

- User authentication: Users can create an account, log in, and log out to access personalized features.
- Book management: Users can add books to their collection, including book details such as title, author, description, and cover image.
- Book reviews: Users can provide ratings and reviews for books and view reviews from other users.
- User profiles: Users have their own profiles displaying their added books, reviews, and other relevant information.
- Search functionality: Users can search for books based on title, author, or keywords.
- Responsive design: The application is optimized for various screen sizes, ensuring a seamless experience across devices.

## Technologies Used

- Frontend: React, Redux Toolkit
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens (JWT)
- Image storage: AWS S3 (Simple Storage Service)
- External APIs: (Optional) Integration with book-related APIs for additional book details and information.

## Getting Started

To get started with the Book Talks application, follow the instructions below.

### Prerequisites

- Node.js (version >= 12.0.0)
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shaikahmadnawaz/book-talks.git
   ```

2. Navigate to the project directory:

   ```bash
   cd book-talks
   ```

3. Install the dependencies:

   ```bash
    npm install
   ```

4. Create a `.env` file in the server directory of the project and add the following environment variables:

   ```bash
   MONGO_URL="your-mongodb-uri"
   JWT_SECRET="your-jwt-secret"

   AWS_REGION="your-aws-region"
   AWS_ACCESS_KEY="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
   AWS_BUCKET_NAME="your-aws-bucket-name"
   ```

5. Start the development servers for the client and the server:

- Open a terminal and navigate to the client folder:
  ```bash
  cd client
  ```
- Start the development server:
  ```bash
  npm start
  ```
- Open another terminal and navigate to the server folder:
  ```bash
  cd server
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- The application will be accessible at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## Contributing

Contributions are welcome! To contribute to the project, follow the steps below:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push your changes to the branch
6. Submit a pull request
7. Wait for your pull request to be reviewed and merged
8. Celebrate! 🎉
9. (Optional) Consider starring the repository! ⭐
10. (Optional) Consider following me on GitHub! 🙌
11. (Optional) Consider contributing again! 😎
12. (Optional) Consider sharing the project with your friends! 👨‍👩‍👧‍👦
13. (Optional) Consider tweeting about the project! 🐦

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for details.
