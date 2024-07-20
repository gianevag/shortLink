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

    export type ShortLinkUser = {
        originalUrl: string;
        shortUrl: string;
        views: number;
        isActive: boolean;
        shortLinkUsersId: string;
    }

    export type ShortLinkUserTableData = ShortLinkUser & {
        id: number;
    };

    export type ShortLink = {
        id: string;
        link: string;
    }
}