package uquest.com.bo.models.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "respuestas")
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String textValue;

    private Double numValue;

    private Long opcionId;

    @NotNull
    private Long preguntaId;

    @NotNull
    private Long usuarioId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText_value() {
        return textValue;
    }

    public void setText_value(String textValue) {
        this.textValue = textValue;
    }

    public Double getNum_value() {
        return numValue;
    }

    public void setNum_value(Double numValue) {
        this.numValue = numValue;
    }

    public Long getOpcion_id() {
        return opcionId;
    }

    public void setOpcion_id(Long opcionId) {
        this.opcionId = opcionId;
    }

    public Long getPregunta_id() {
        return preguntaId;
    }

    public void setPregunta_id(Long preguntaId) {
        this.preguntaId = preguntaId;
    }

    public Long getUsuario_id() {
        return usuarioId;
    }

    public void setUsuario_id(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getTextValue() {
        return textValue;
    }

    public void setTextValue(String textValue) {
        this.textValue = textValue;
    }

    public Double getNumValue() {
        return numValue;
    }

    public void setNumValue(Double numValue) {
        this.numValue = numValue;
    }

    public Long getOpcionId() {
        return opcionId;
    }

    public void setOpcionId(Long opcionId) {
        this.opcionId = opcionId;
    }

    public Long getPreguntaId() {
        return preguntaId;
    }

    public void setPreguntaId(Long preguntaId) {
        this.preguntaId = preguntaId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Override
    public String toString() {
        return "Respuesta{" +
            "id=" + id +
            ", textValue='" + textValue + '\'' +
            ", numValue=" + numValue +
            ", opcionId=" + opcionId +
            ", preguntaId=" + preguntaId +
            ", usuarioId=" + usuarioId +
            '}';
    }


}
