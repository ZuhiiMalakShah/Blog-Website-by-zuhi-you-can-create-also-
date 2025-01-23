import conf from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

const { appwriteUrl, appwriteProjectId, } = conf;

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{

           const userAccount = await this.account.create(ID.unique(),email, password, name);

           if(userAccount){
                // call another method
                return this.login({email, password})
               
           }
           else{
                return userAccount;
           }

        } catch (error){

            console.log("Appwrite servive :: createAccount :: error", error);
            
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password)
        } catch(error){
            console.log("Appwrite servive :: login :: error", error);
            
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        } catch(error){
            console.log("Appwrite servive :: getcurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        } catch (error){
            console.log("Appwrite servive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService ;