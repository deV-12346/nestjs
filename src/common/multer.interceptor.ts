import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer'
import { extname } from "path";
export const MyMulter = () =>{
    FileInterceptor('file',{
        storage: diskStorage({
            destination:'./public',
            filename:(req,file,cb)=>{
                const uniqueName =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueName + extname(file.originalname));
            }
        })
    })
}
