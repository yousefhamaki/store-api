import sharp from "sharp";

const ResizeImage = async (
  existPath: string,
  lastPath: string,
  width: number,
  height: number
): Promise<object> => {
  const result: sharp.OutputInfo = await sharp(existPath)
    .resize({ width: Number(width), height: Number(height) })
    .toFile(lastPath);
  return result;
};

export default ResizeImage;
