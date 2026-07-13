import { Document } from 'mongoose';
export type WishlistDocument = WishlistItem & Document;
export declare class WishlistItem {
    appid: number;
    name: string;
    headerImage: string;
    currentPrice: number;
    originalPrice: number;
    discountPercent: number;
    genres: string[];
    developer: string;
    shortDescription: string;
    targetPrice: number | null;
    currency: string;
}
export declare const WishlistItemSchema: import("mongoose").Schema<WishlistItem, import("mongoose").Model<WishlistItem, any, any, any, any, any, WishlistItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WishlistItem, Document<unknown, {}, WishlistItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    appid?: import("mongoose").SchemaDefinitionProperty<number, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    headerImage?: import("mongoose").SchemaDefinitionProperty<string, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    currentPrice?: import("mongoose").SchemaDefinitionProperty<number, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    originalPrice?: import("mongoose").SchemaDefinitionProperty<number, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    discountPercent?: import("mongoose").SchemaDefinitionProperty<number, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    genres?: import("mongoose").SchemaDefinitionProperty<string[], WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    developer?: import("mongoose").SchemaDefinitionProperty<string, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    shortDescription?: import("mongoose").SchemaDefinitionProperty<string, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    targetPrice?: import("mongoose").SchemaDefinitionProperty<number | null, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    currency?: import("mongoose").SchemaDefinitionProperty<string, WishlistItem, Document<unknown, {}, WishlistItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WishlistItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, WishlistItem>;
