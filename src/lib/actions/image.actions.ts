"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils"
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";
import {v2 as Cloudinary} from 'cloudinary';

// Define type for query
type QueryType = {
  populate: (options: {
    path: string;
    model: typeof User | typeof Image;  // specify the actual models that can be used
    select: string;
  }) => QueryType;
}

const populateUser = (query: QueryType) => query.populate({
  path: 'author',
  model: User,
  select: '_id, firstName lastName clerkId'
})

// Add image
export async function addImage({image, userId, path}: AddImageParams){
  try {
    await connectToDatabase();

    const author = await User.findById(userId);
    if(!author){
      throw new Error("User not found");
    }

    const newImage = await Image.create({
      ...image,
      author: author._id,
    })

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

// Update image
export async function updateImage({image, userId, path}: UpdateImageParams){
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if(!imageToUpdate || imageToUpdate.author.toHexString() !== userId){
      throw new Error("Image not found or user not authorized");
    }

    const updateImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      {new: true},
    )


    revalidatePath(path);

    return JSON.parse(JSON.stringify(updateImage));
  } catch (error) {
    handleError(error);
  }
}

// Delete image
export async function deleteImage(imageId: string){
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);

  } catch (error) {
    handleError(error);
  } finally {
    redirect('/');
  }
}

// Get Image
export async function getImageById(imageId: string){
  try {
    await connectToDatabase();

    const image = await populateUser(Image.findById(imageId));

    if(!image){
      throw new Error("Image not found");
    }

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

// Get all images
export async function getAllImages({limit = 9, searchQuery = '', page = 1}: {
  limit?: number;
  searchQuery?: string;
  page: number;
}){
  try {
    await connectToDatabase();
    Cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })
    let expression = 'folder=picgenie';
    if(searchQuery){
      expression += ` AND n${searchQuery}`;
    }
    const {resources} = await Cloudinary.search.expression(expression).execute();
    
    interface CloudinaryResource {
      public_id: string;
    }
    
    const resourceIds = resources.map((resource: CloudinaryResource) => resource.public_id);
    let query = {};
    if(searchQuery){
      query = {
        publicId: {
          $in: resourceIds
        }
      }
    }

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find(query).sort({updatedAt: -1})
    .skip(skipAmount).limit(limit));

    const totalImages = await Image.countDocuments(query);

    const savedImages = await Image.countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
      savedImages,
    }

  } catch (error) {
    handleError(error);
  }
}

// GET IMAGES BY USER
export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find({ author: userId }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}