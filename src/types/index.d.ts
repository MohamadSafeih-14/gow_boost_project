/* eslint-disable no-unused-vars */

// ====== USER PARAMS
declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
};

declare type UpdateUserParams = {
    username: string;
};


declare type UrlQueryParams = {
    params: string;
    key: string;
    value: string | null;
};

declare type RemoveUrlQueryParams = {
    searchParams: string;
    keysToRemove: string[];
};

declare type SearchParamProps = {
    params: { id: string; type: TransformationTypeKey };
    searchParams: { [key: string]: string | string[] | undefined };
};
