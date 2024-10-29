# Pic Genie

Pic Genie is an AI-powered SaaS application developed with **Next.js** and **Clerk**, offering advanced image editing capabilities driven by AI. This app allows users to restore images, fill generative areas, remove or recolor objects, and remove backgrounds—all with AI tools that simplify complex edits for users.

![PicGenie Ai Powered SaaS application](/public/screenshot.png 'PicGenie Ai Powered SaaS application')


## Features

- **Image Restoration**: Improve and restore the quality of old or damaged images.
- **Generative Fill**: Fill missing parts of an image intelligently to match its surroundings.
- **Object Removal**: Erase unwanted objects from images seamlessly.
- **Object Recoloring**: Change the colors of specific objects within an image.
- **Background Removal**: Remove image backgrounds while preserving the main subject.

## Technologies Used

- **Next.js** for the web framework
- **Clerk** for user authentication and management
- **Cloudinary** for image storage and management
- **MongoDB** with **Mongoose** for database management
- **Stripe** for handling payments
- **Tailwind CSS** for responsive styling

## File Structure

The project follows a well-organized file structure for scalability and maintainability:

```

|-- .env.local
|-- .eslintrc.json
|-- .gitignore
|-- components.json
|-- envsample.txt
|-- folder_structure.txt
|-- next-env.d.ts
|-- next.config.mjs
|-- package-lock.json
|-- package.json
|-- postcss.config.mjs
|-- README.md
|-- tailwind.config.ts
|-- tsconfig.json

+-- public
|   |-- logo.png
|   |-- next.svg
|   `-- assets
|       |-- icons
|       |-- images
|
+-- src
|   |-- middleware.ts
|   +-- app
|   |   |-- (auth)
|   |   |-- (root)
|   |   +-- api
|   +-- components
|   |   |-- shared
|   |   `-- ui
|   +-- constants
|   +-- hooks
|   +-- lib
|   |   |-- actions
|   |   `-- database
|   `-- types
```

## Dependencies

The main dependencies used in Pic Genie are as follows:

- **@clerk/clerk-sdk-node** and **@clerk/nextjs**: User authentication
- **cloudinary**: Image storage and manipulation
- **mongodb** and **mongoose**: Database management
- **next**: Next.js framework
- **react** and **react-dom**: UI rendering
- **react-hook-form**: Form handling
- **stripe** and **@stripe/stripe-js**: Payment processing
- **tailwindcss** and **tailwindcss-animate**: Styling and animations

Thanks to [Adrian Hajdin](https://www.youtube.com/@javascriptmastery)

## Environment Configuration

To configure Pic Genie, create a `.env.local` file at the root of your project and add the following environment variables:

```env
# Clerk API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

# MongoDB Connection String
MONGODB_URL=

# Clerk Webhook Secret
WEBHOOK_SECRET=

# Cloudinary API Keys
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET=

# Server URL
NEXT_PUBLIC_SERVER_URL=
```

### How to Obtain API Keys

1. **Clerk**: Visit [Clerk’s website](https://clerk.dev/) and create an account. After setting up your project, you can access your API keys in the project dashboard.
2. **MongoDB**: Sign up on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a database. Once your database is created, get the connection URL from the dashboard.
3. **Cloudinary**: Sign up at [Cloudinary](https://cloudinary.com/), create a project, and find your API keys in the Cloudinary console.
4. **Stripe**: Register on [Stripe’s website](https://stripe.com/) and create a project. You can find your publishable and secret keys in the API section of your dashboard.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rehmanNRY/PicGenie.git
   cd pic-genie
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**: Follow the configuration steps above to set up the `.env.local` file.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## Connect with me!

Connect with me on [LinkedIn](https://www.linkedin.com/in/rehman-nry/).

---
