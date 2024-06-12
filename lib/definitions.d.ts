declare module "definitions" { 

    export type User = {
        id: string;
        name?: string;
        email: string;
        password: string;
    }


    export type SignupFormData = {
        email: string;
        password: string;
        repeatedPassword: string;
    };

}