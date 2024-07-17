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

    export type CreateLinkFormData = {
        originalUrl: string;
        isActive: boolean;
        description?: string;
    };

    export type TableData = {
        id: number;
        originalUrl: string;
        shortUrl: string;
        views: number;
        isActive: boolean;
    };

    export type ShortLink = {
        id: string;
        link: string;
    }
}