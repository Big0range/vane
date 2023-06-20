import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
// 定义上传文件的目录和文件名
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../uploads/images'),
  filename: (req, file, cb) => {
    const ext = file.originalname.slice(file.originalname.lastIndexOf('.'));
    const filename = uuidv4() + ext;
    cb(null, filename);
  },
});

// 定义过滤器，只允许上传 jpeg 和 png 格式的图片
const fileFilter = (req: any, file: any, cb: any) => {
  const ext = path.extname(file.originalname);
  if (ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// 创建上传对象
export const uploadImg = multer({ storage, fileFilter });
