-- ND CARRERAS
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Informatica', 'Av. Villazon NRO 1995 Monoblock Central, segundo patio, edif. carrera de Informatica','2440338','informatica@informatica.edu.bo');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Fisica', 'Calle 27 Cota-Cota, Campus Universitario','2440338','fisica@fiumsa.edu.bo');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Biologia', 'Calle 27 Cota-Cota, Campus Universitario','2799459','');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Ciencias Quimicas', 'Calle 27 Cota-Cota, Campus Universitario','2792238','quimicavirtual.fcpn@gmail.com');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Matematica', 'Av. Villazon NRO 1995 Monoblock Central, Edificio Antiguo','2441578','');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Estadistica', 'Av. Villazon NRO 1995 Monoblock Central, Edificio Antiguo','2442100','estadistica@umsa.bo');
-- ND INSTITUTOS
INSERT INTO institutos (nombre, sigla, fono, email, carrera_id) VALUES ('Instituto de Investigaciones de Informatica', 'III', '2440338','informatica@informatica.edu.bo', 1);
INSERT INTO institutos (nombre, sigla, fono, email, carrera_id) VALUES ('Instituto de Investigación Matemática', 'IIMAT', '2441578','', 5);
INSERT INTO institutos (nombre, sigla, fono, email, carrera_id) VALUES ('Instituto de Investigaciones Químicas', 'IIQ', '279-5878 ','iq_umsa@gmail.com', 4);

-- D USUARIOS DE PRUEBA
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('1111111','Ciencias Puras', 'y Naturales','Facultad','1993-02-10','Masculino','ronaldg@fcpn.edu.bo', 'uquest', '$2y$12$jRpn6FNUw2K631JRT.w4ieJd3vv9wDDCaNxk0p7aVfbqZ/QkjTrOa', true, '2020-05-25',1);
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('1234567','Ciencias Puras', 'y Naturales','Facultad','1993-02-10','Masculino','uquest.fcpn@gmail.com', 'admin', '$2y$12$pMWoXjzYkpQ3a4ZFDypfKepQARwAtjdQLptHDfE3hqxG.1aMDGEt2', true, '2020-05-25',1);

-- ND CATEGORIAS
INSERT INTO categorias (nombre, descripcion) VALUES ('Elecciones','Temporadas para las elecciones electorales dentro la UMSA');
INSERT INTO categorias (nombre, descripcion) VALUES ('Materias','Materias dentro de tu carrera');
INSERT INTO categorias (nombre, descripcion) VALUES ('Docentes','Opinion respecto a docentes');
INSERT INTO categorias (nombre, descripcion) VALUES ('Otros','Otros');

-- ND ROLES
INSERT INTO roles (nombre) VALUES ('ROLE_USER');
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');

-- D ASIGNAR ROLES A LOS USUARIOS DE PRUEBA
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,2);

-- ENCUESTA 1 RESPONDER ENCUESTAS
insert into encuestas (create_at, uid, fecha_fin, fecha_ini, tipo, titulo, descripcion, categoria_id, usuario_id) values ('2021-03-25', 'e50c69de-547f-425e-9532-eff2794e49a4', '2021-04-15 01:00:00', '2021-03-25 01:00:00', 'Abierto', 'Inteligibilidad','Comprensibilidad del sistema para los usuarios, tanto como coherencia y racionalidad.', 1, 1);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'El uso de la aplicación me resulto fácil', 1, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'Visualizar las encuestas me parece fácil y de rápido acceso', 1, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'Responder encuestas es intuitivo', 1, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'Fue fácil para mí el aprender a usar el sistema', 1, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'La interfaz del sistema es atractiva', 1, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'Los colores utilizados en el sistema son adecuados', 1, 'Escala Lineal', true);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);

-- PREGUNTAS OPCIONES binding
insert into preguntas_opciones (pregunta_id, opcion_id) values (1, 1);
insert into preguntas_opciones (pregunta_id, opcion_id) values (2, 2);
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 3);
insert into preguntas_opciones (pregunta_id, opcion_id) values (4, 4);
insert into preguntas_opciones (pregunta_id, opcion_id) values (5, 5);
insert into preguntas_opciones (pregunta_id, opcion_id) values (6, 6);

-- CARRERAS OBJETIVO
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 1);
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 2);
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 3);
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 4);
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 5);
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 6);

-- ENCUESTA 2 GENERAR ENCUESTA
insert into encuestas (create_at, uid, fecha_fin, fecha_ini, tipo, titulo, descripcion, categoria_id, usuario_id) values ('2021-03-25', '014fba9d-f910-423b-aa20-2808f6ffb473', '2021-04-15 01:00:00', '2021-03-25 01:00:00', 'Abierto', 'Usabilidad','Usabiliad del sistema para la generacion de encuestas.', 1, 1);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'La generación de las encuestas me parece óptimo', 2, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'Encontré los tipos de preguntas que deseaba generar', 2, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'La información requerida es justa', 2, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'Generar encuestas me parece intuitivo', 2, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'La interfaz del sistema es atractiva', 2, 'Escala Lineal', true);
insert into preguntas (create_at, descripcion, encuesta_id, tipo, required) values ('2021-03-25', 'Recomendaría el sistema a otras personas', 2, 'Escala Lineal', true);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);
insert into opciones (max_value, min_value, min_text, max_text, tipo) values (5, 1, 'En desacuerdo','Muy de Acuerdo', 5);

-- PREGUNTAS OPCIONES binding
insert into preguntas_opciones (pregunta_id, opcion_id) values (7, 7);
insert into preguntas_opciones (pregunta_id, opcion_id) values (8, 8);
insert into preguntas_opciones (pregunta_id, opcion_id) values (9, 9);
insert into preguntas_opciones (pregunta_id, opcion_id) values (10, 10);
insert into preguntas_opciones (pregunta_id, opcion_id) values (11, 11);
insert into preguntas_opciones (pregunta_id, opcion_id) values (12, 12);

-- CARRERAS OBJETIVO
insert into encuestas_carreras (encuesta_id, carrera_id) values (2, 1);
insert into encuestas_carreras (encuesta_id, carrera_id) values (2, 2);
insert into encuestas_carreras (encuesta_id, carrera_id) values (2, 3);
insert into encuestas_carreras (encuesta_id, carrera_id) values (2, 4);
insert into encuestas_carreras (encuesta_id, carrera_id) values (2, 5);
insert into encuestas_carreras (encuesta_id, carrera_id) values (2, 6);


-- D VISTAS
create or replace view respuestas_stats_esc as select pregunta_id, num_value as resp, count(1) as resp_count from respuestas where num_value is not null group by pregunta_id, num_value;
create or replace view respuestas_stats_op as select pregunta_id, opcion_id as resp, count(1) as resp_count from respuestas where opcion_id is not null group by pregunta_id, opcion_id;
