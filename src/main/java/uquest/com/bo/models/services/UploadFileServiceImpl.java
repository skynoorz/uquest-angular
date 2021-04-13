package uquest.com.bo.models.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadFileServiceImpl implements IUploadFileService {

    private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);

    private final static String DIRECTORIO_UPLOAD = "uquest-fcpn/WEB-INF/classes/uploads/avatars";

    @Override
    public Resource cargar(String nombreFoto) throws MalformedURLException {
        Path rutaArchivo = getPath(nombreFoto);
        log.info(rutaArchivo.toString());
        Resource recurso = new UrlResource(rutaArchivo.toUri());

        if (!recurso.exists() && !recurso.isReadable()) {
            rutaArchivo = Paths.get("src/main/resources/static/images").resolve("no_user.png").toAbsolutePath();
            recurso = new UrlResource(rutaArchivo.toUri());
            log.error("Error, no se pudo cargar la imagen: " + nombreFoto);
        }
        return recurso;
    }

    @Override
    public String copiar(MultipartFile archivo) throws IOException {
        String nombreArchivo = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename().replace(" ", "");
        Path rutaArchivo = getPath(nombreArchivo);

        //        START production tomcat directory replacement
        String rutaArchivoNobin = rutaArchivo.toString();
        rutaArchivoNobin = rutaArchivoNobin.replace("/bin","/webapps");
        log.info("replaced: "+rutaArchivoNobin);
        rutaArchivo = Paths.get(rutaArchivoNobin);
//        END production tomcat directory replacement

        log.info(rutaArchivo.toString());
        Files.copy(archivo.getInputStream(), rutaArchivo);

        return nombreArchivo;
    }

    @Override
    public boolean eliminar(String nombreFoto) {
        if (nombreFoto!=null && nombreFoto.length()>0){
            Path rutaFotoAnterior = Paths.get("uploads/avatars").resolve(nombreFoto).toAbsolutePath();
            File archivoFotoAnterior = rutaFotoAnterior.toFile();
            if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()){
                archivoFotoAnterior.delete();
                return true;
            }
        }
        return false;
    }

    public Path newDU(){
        String rutaArchivoNobin = Paths.get(DIRECTORIO_UPLOAD).toAbsolutePath().toString();
        rutaArchivoNobin = rutaArchivoNobin.replace("/bin","/webapps");
        log.info("replaced: "+rutaArchivoNobin);
        return Paths.get(rutaArchivoNobin);
    }

    @Override
    public Path getPath(String nombreFoto) {
//        log.info("Paths.get(DIRECTORIO_UPLOAD): "+Paths.get(DIRECTORIO_UPLOAD).toString());
//        log.info("Paths.get(DIRECTORIO_UPLOAD).resolve(nombreFoto): "+Paths.get(DIRECTORIO_UPLOAD).resolve(nombreFoto).toString());
//        log.info("Paths.get(DIRECTORIO_UPLOAD).resolve(nombreFoto).toAbsolutePath(): "+Paths.get(DIRECTORIO_UPLOAD).resolve(nombreFoto).toAbsolutePath().toString());
        log.info("newDU() "+ newDU());
        log.info("newDU().resolve(nombreFoto) "+ newDU().resolve(nombreFoto));
        log.info("newDU().resolve(nombreFoto).toAbsolutePath() "+ newDU().resolve(nombreFoto).toAbsolutePath());
        return newDU().resolve(nombreFoto).toAbsolutePath();
    }
}
