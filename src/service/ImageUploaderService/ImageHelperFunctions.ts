// Components
import { Crop } from "react-image-crop";

const IMG_EL = "img";
const CANVAS_EL = "canvas";
const CTX_2D_TYPE = "2d";

function calculateSize(startWidth: number, startHeight: number, maxSize: number) {
    let width = startWidth;
    let height = startHeight;

    if (width > height) {
        if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
        }
    } else {
        if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }
    }

    return {
        width,
        height,
    };
}

function extractImageData(canvas: HTMLCanvasElement) {
    return canvas.toDataURL("image/png").split(",")[1];
}

export async function craftImageBuffer(file: File, maxSize: number, crop?: Crop | null): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const image = document.createElement(IMG_EL);

            image.onload = () => {
                const canvas = document.createElement(CANVAS_EL);
                const ctx = canvas.getContext(CTX_2D_TYPE);

                if (ctx) {
                    if (crop) {
                        const cropWidth = crop.width || (image.width - crop.x);
                        const cropHeight = crop.height || (image.height - crop.y);

                        const { width, height } = calculateSize(
                            cropWidth,
                            cropHeight,
                            maxSize,
                        );

                        canvas.width = width;
                        canvas.height = height;

                        ctx.drawImage(image, crop.x, crop.y, cropWidth, cropHeight, 0, 0, width, height);
                    } else {
                        const { width, height } = calculateSize(image.width, image.height, maxSize);

                        canvas.width = width;
                        canvas.height = height;

                        ctx.drawImage(image, 0, 0, width, height);
                    }

                    const buffer = Buffer.from(extractImageData(canvas), "base64");
                    resolve(buffer);
                } else {
                    reject("Context does not exist");
                }
            };

            if (reader.result) {
                image.src = (reader.result as string);
            } else {
                reject("reader result is null");
                reader.abort();
            }
        };

        reader.readAsDataURL(file);
    });
}

export function openInputImageDialog(onResolve: (file: File, url: string) => void, onError: (message: string) => void) {
    // TODO: Change this to be a promise
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const url = URL.createObjectURL(file);

            onResolve(file, url);
        } else {
            onError("Arquivo selecionado é inválido");
        }
    };
}

export function openMultipleInputImageDialog(onResolve: (files: File[]) => void, onError: (message: string) => void) {
    // TODO: Change this to be a promise
    const input = document.createElement("input");

    input.setAttribute("multiple", "true");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
        if (input.files) {
            const files: File[] = [];
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < input.files.length; i++) {
                files.push(input.files[i]);
            }

            onResolve(files);
        } else {
            onError("Seleção inválida");
        }
    };
}
