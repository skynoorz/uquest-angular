package uquest.com.bo.models.entity;


import javax.persistence.*;

@Entity
@Table(name = "opciones")
public class Opcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String texto;

    private Integer tipo;

    private Integer minValue;

    private Integer maxValue;

    private String minText;

    private String maxText;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Integer getTipo() {
        return tipo;
    }

    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }

    public Integer getMinValue() {
        return minValue;
    }

    public void setMinValue(Integer minValue) {
        this.minValue = minValue;
    }

    public Integer getMaxValue() {
        return maxValue;
    }

    public void setMaxValue(Integer maxValue) {
        this.maxValue = maxValue;
    }

    public String getMinText() {
        return minText;
    }

    public void setMinText(String minText) {
        this.minText = minText;
    }

    public String getMaxText() {
        return maxText;
    }

    public void setMaxText(String maxText) {
        this.maxText = maxText;
    }
}
