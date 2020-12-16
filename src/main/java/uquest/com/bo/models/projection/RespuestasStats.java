package uquest.com.bo.models.projection;

public interface RespuestasStats {
    Long getPregunta_id();
    Long getEncuesta_id();
    String getDescripcion();
    Long getOpcion_id();
    String getResp_text();
    Long getResp_count();
}
