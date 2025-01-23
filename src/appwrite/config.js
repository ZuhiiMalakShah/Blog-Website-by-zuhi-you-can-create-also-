import { useId } from 'react';
import conf from '../conf/conf';
import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';

const { appwriteUrl, appwriteProjectId, appwriteDatabaseId, appwriteCollectionId, appwriteBucketId } = conf;

export class Servive{
    client = new Client();
    databases;
    bucket;

    constructor(){
        
            this.client
                .setEndpoint(appwriteUrl)
                .setProject(appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{

            return await this.databases.createDocument(
                appwriteDatabaseId,
                appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )

        } catch(error){
            console.log('Appwrite servive :: createPost :: error', error);
        }
    };

    async updatePost(slug,{title,content,featuredImage,status}){

        try{

            return await this.databases.updateDocument(
                appwriteDatabaseId,
                appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    useId

                }
            )

        }catch(error){
            console.log('Appwrite servive :: updatePost :: error', error);
            
        }

    };

    async deletePost(slug){
        try{

             await this.databases.deleteDocument(appwriteDatabaseId,appwriteCollectionId,slug)

             return true

        }catch(error){
            console.log('Appwrite servive :: deletePost :: error', error);

            return false
            
        }
    };

    async getPost(slug){ 
        try {

            return await this.databases.getDocument(
                appwriteDatabaseId,
                appwriteCollectionId,
                slug)
            
        } catch (error) {
            console.log("Appwrite servive :: getPost :: error", error);
            return false
            
        }
    };

    async getPosts(queries=[Query.equal("status","active")]){
        try{

            return await this.databases.listDocuments(
                appwriteDatabaseId,
                appwriteCollectionId,
                queries)
            }catch(error){
                console.log('Appwrite servive :: getPosts :: error', error);
                return false
            }
    };
    
    // file upload service

    async uploadFile(file){
        try {

            return await this.bucket.createFile(
                appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log('Appwrite servive :: uploadFile :: error', error);
            return false
        }
    };

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(appwriteBucketId,fileId)
            return true
        } catch (error) {
            console.log('Appwrite servive :: deleteFile :: error', error);
            return false
        }
    };

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(appwriteBucketId,fileId)
        } catch (error) {
            console.log('Appwrite servive :: getFilePreview :: error', error);
            return false
        }
    }
}

const servive = new Servive()

export default servive
