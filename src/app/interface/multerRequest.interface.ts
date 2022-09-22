interface MulterRequest extends Request {
  file: { [fieldname: string]: Express.Multer.File | number | string };
}

export default MulterRequest;
