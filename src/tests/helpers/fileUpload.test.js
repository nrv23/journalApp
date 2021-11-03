import { fileUpload } from "../../helpers/fileUpload"
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dvzbb38tx', 
    api_key: '922921222968677', 
    api_secret: 'ZC0fBZOribX5RjMWq1ALYmIkmys',
    secure: true
});
  

describe('Pruebas en el fileUpload.js', () => {
   
    test('Debe d ecargar un archivo y retornar un url ', async (done) => {

        jest.setTimeout(20000);

        const resp = await fetch('https://cdn.pixabay.com/photo/2021/10/29/15/05/floral-6752135_960_720.jpg');
        const blob = await resp.blob(); //como retorna una imagen, su respuesta es de tipo blob

        const file = new File([blob],'foto.jpg');
        const url = await fileUpload(file);


         expect(typeof url).toBe("string");

         const segments = url.split('/');
         const imageId = segments[segments.length -1].replace('.jpg','');   
         await cloudinary.v2.api.delete_resources(imageId); // como es un callback puedo usar un await para ejecutar el callback como codigo sincrono
         //expect(deleted).toEqual({ [imageId]: "deleted" });
    })
    
    test('Debe retornar un error sino se envia una imagen', async () => {
    
        const file = new File([],'foto.jpg');
        const url = await fileUpload(file);
        
        expect(url).toBe(null);
            
        })
})
