// MARK: API
// import * as api from "@startapp/nvqeb-user-api";

// MARK: Mobx
import { observable, action, computed } from "mobx";

// MARK: Helper
import { craftImageBuffer, openInputImageDialog } from "./ImageHelperFunctions";

// MARK: Resources
import strings from "../../resources/strings";
import { handleError } from "../../resources/handleError";

// MARK: Stores
import { uiStore } from "../../stores/_rootStore";

// MARK: Components
import { Crop } from "react-image-crop";

export interface IUploadImage {
    imageFile?: File;
    withCrop?: boolean;
}

export default class ImageUploaderService {
    // // Control
    // @observable public status: "failed" | "loading" | "success" | "uploading" | "created" = "created";
    // @observable public progress: number = 0;

    // // Variables
    // @observable public imageFile: File | null = null;
    // @observable public uploadedImage: api.Image | null = null;

    // @observable public crop: Crop = {
    //     x: 0,
    //     y: 0,
    // };

    // @observable public pixelCrop: Crop = {
    //     x: 0,
    //     y: 0,
    // };

    // @observable public isCropping: boolean = false;

    // private cropActive: boolean = false;
    // private reasonableUploadPercentage: number = 5;

    // constructor(cropActive?: boolean) {
    //     this.cropActive = cropActive || false;
    // }

    // // Methods
    // @action
    // public startCrop = () => {
    //     this.isCropping = true;
    // }

    // @action
    // public setCrop = (crop: Crop) => {
    //     this.crop = crop;
    // }

    // @action
    // public setPixelCrop = (pixelCrop: Crop) => {
    //     this.pixelCrop = pixelCrop;
    // }

    // @action
    // public setIsCropping = (isCropping: boolean) => {
    //     this.isCropping = isCropping;
    // }

    // @computed
    // public get src(): string | null {
    //     if (this.uploadedImage) {
    //         return this.uploadedImage.url;
    //     } else {
    //         return this.imageFile ? URL.createObjectURL(this.imageFile) : null;
    //     }
    // }

    // @action
    // public setImage = (image: api.Image | null) => {
    //     this.clear();
    //     this.uploadedImage = image;

    //     if (image) {
    //         this.status = "success";
    //     } else {
    //         this.status = "created";
    //     }
    // }

    // @action
    // public selectImage = async () => {
    //     openInputImageDialog(async (file) => {
    //         this.imageFile = file;

    //         if (this.cropActive) {
    //             this.isCropping = true;
    //         } else {
    //             this.uploadImage();
    //         }
    //     }, (error) => uiStore.openSnackbar(error));
    // }

    // @action
    // public uploadImage = async (uploadImageObj?: IUploadImage) => {
    //     let imageFile = uploadImageObj ? uploadImageObj.imageFile : null;

    //     if (imageFile) {
    //         this.imageFile = imageFile;
    //     } else {
    //         imageFile = this.imageFile;
    //     }

    //     imageFile = imageFile || this.imageFile;

    //     this.status = "loading";
    //     this.isCropping = false;

    //     const withCrop = uploadImageObj && uploadImageObj.withCrop ? uploadImageObj.withCrop : false;

    //     if (withCrop && (this.pixelCrop.width === 0 || this.pixelCrop.height === 0)) {
    //         uiStore.openSnackbar(strings.components.image.error.missingCrop);
    //         return;
    //     }

    //     const buffer = imageFile ? await craftImageBuffer(
    //         imageFile,
    //         1000,
    //         withCrop ? this.pixelCrop : null,
    //     ) : null;

    //     if (!buffer && ! this.uploadedImage) {
    //         return;
    //     }

    //     try {
    //         if (this.imageFile === imageFile) {
    //             const uploadedImage = buffer ? await api.uploadImage(
    //                 buffer,
    //                 api.ImageFormat.jpeg,
    //                 null,
    //                 this.updateProgress,
    //             ) : await api.cropImage(
    //                 this.uploadedImage!.url,
    //                 {
    //                     ...this.pixelCrop,
    //                     width: this.pixelCrop.width || this.uploadedImage!.width,
    //                     height: this.pixelCrop.height || this.uploadedImage!.height,
    //                 },
    //                 this.updateProgress,
    //             );

    //             if (this.imageFile === imageFile) {
    //                 this.setImage(uploadedImage);
    //             }
    //         }
    //     } catch (e) {
    //         this.status = "failed";
    //         this.progress = 0;

    //         uiStore.openSnackbar(handleError(e));
    //     }
    // }

    // @action
    // public clear = () => {
    //     this.status = "created";

    //     // Crop
    //     this.isCropping = false;
    //     this.crop = {
    //         aspect: this.crop.aspect,
    //         x: 0,
    //         y: 0,
    //     };

    //     // Image
    //     this.imageFile = null;
    //     this.uploadedImage = null;
    // }

    // @action
    // private updateProgress = (progress: number) => {
    //     if ((progress > this.reasonableUploadPercentage) && this.status !== "failed") {
    //         this.status = "uploading";
    //     }

    //     this.progress = progress;
    // }

    // @action
    // public setUncertainfiedImage = (uncertifiedImage: api.UncertainImage) => {
    //     this.setImage(uncertifiedImage.image);
    // }

    // public getUncertainfiedImage = async (): Promise<api.UncertainImage | null> => {
    //     if (this.uploadedImage) {
    //         return {
    //             bytes: null,
    //             image: this.uploadedImage,
    //             // TODO: This should be avariable
    //             crop: null,
    //         };
    //     }

    //     return this.imageFile ? {
    //         bytes: await craftImageBuffer(this.imageFile, 1000),
    //         image: null,
    //         // TODO: This should be avariable
    //         crop: null,
    //     } : null;
    // }
}
