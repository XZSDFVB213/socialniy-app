
export interface User  {
    id: string;
    name: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    acceptedPolicy: boolean;
    acceptedTerms: boolean;
    city: City;
};
export type City = 'Derbent' | 'Madjalis' | 'Kaspiysk' | 
                   'Kasumkent' | 'Belidzhi' | 'Dagestanskie_Ogni' | 
                   'Izberbash'
