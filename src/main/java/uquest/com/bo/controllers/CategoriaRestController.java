package uquest.com.bo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uquest.com.bo.models.entity.Categoria;
import uquest.com.bo.models.services.categoria.ICategoriaService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class CategoriaRestController {

    @Autowired
    private ICategoriaService categoriaService;

    @GetMapping("/categorias")
    public List<Categoria> index() {
        return categoriaService.findAll();
    }

}
