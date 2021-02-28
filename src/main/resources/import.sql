# CARRERAS
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Informatica', 'Av. Villazon NRO 1995 Monoblock Central, segundo patio, edif. carrera de Informatica','2440338','informatica@informatica.edu.bo');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Fisica', 'Calle 27 Cota-Cota, Campus Universitario','2440338','fisica@fiumsa.edu.bo');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Biologia', 'Calle 27 Cota-Cota, Campus Universitario','2799459','');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Ciencias Quimicas', 'Calle 27 Cota-Cota, Campus Universitario','2792238','quimicavirtual.fcpn@gmail.com');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Matematica', 'Av. Villazon NRO 1995 Monoblock Central, Edificio Antiguo','2441578','');
INSERT INTO carreras (nombre, direccion, fono, email) VALUES ('Estadistica', 'Av. Villazon NRO 1995 Monoblock Central, Edificio Antiguo','2442100','estadistica@umsa.bo');
# INSTITUTOS
INSERT INTO institutos (nombre, sigla, fono, email, carrera_id) VALUES ('Instituto de Investigaciones de Informatica', 'III', '2440338','informatica@informatica.edu.bo', 1);
INSERT INTO institutos (nombre, sigla, fono, email, carrera_id) VALUES ('Instituto de Investigación Matemática', 'IIMAT', '2441578','', 5);
INSERT INTO institutos (nombre, sigla, fono, email, carrera_id) VALUES ('Instituto de Investigaciones Químicas', 'IIQ', '279-5878 ','iq_umsa@gmail.com', 4);

#D USUARIOS DE PRUEBA
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id, instituto_id, foto) VALUES ('9086429','Guarachi', 'Enriquez','Ronald Alcides','1995-03-18','Masculino','aligatorbol@gmail.com','ron', '$2a$10$qpsP549oRJqiswHqAmfzCO6Tyc71DLp9c7FOEK01m25Xx.c5W3m9a', true, '2020-05-25', 1, 1,'689f82fa-b77e-4905-bab6-690f068492fa_rafael-silva.jpg');
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id, instituto_id) VALUES ('8451251','Doe', 'Doe','Juan','1993-02-10','Masculino','juan_doe@gmail.com', 'admin', '$2a$10$GGcI8UT1oyjkjW1LntFb7uIlh5OwrCQC6QTXcjX30RSu1y1ZtQCiS', true, '2020-05-25',5, 2);
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id, instituto_id, foto) VALUES ('5464345','Fernandez', 'Arguedas','Maria','1990-01-15','Femenino','fernandez_maria@gmail.com', 'fema', '$2a$10$0nvA6Iyi6Nz3efVYsOdxV.NY/Wq8hC47alWcm1PtEeqzmlfIBUFe2', true, '2020-05-25',4, 3, 'c223d301-0033-4d08-8a45-b4a87a7bacc2_pexels-miklos-magyar-4243351.jpg');
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('10535687','Helguero', 'Almanza','Roberto','1995-12-30','Masculino','helguero_roberto@gmail.com', 'hero', '$2a$10$GmZXKaj5ruBhYUpR38czPemYSXbX70L6nXxTivbqr8r1b6d3uJO2C', true, '2020-05-25',4);
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('8623456','Garcia', 'Almendra','Simon','1999-01-25','Masculino','garcia_simon@hotmail.com', 'gaal', '$2a$10$u7qYK6li3i7iLTEFuGsyEesLuMrXjcNnxSuAzOaRjf/SDtk33Fsnm', true, '2020-05-25',5);
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('9352652','Gomez', 'Amestoy','Jaime','1991-09-24','Masculino','gomez_jaime@gmail.com', 'goja', '$2a$10$EagYqd1i/DmgHbaqbVK.f.w8cKqpfN.aDAI9Er9/NdBoxPHrolCii', true, '2020-05-25',6);
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('5689782','Jimenez', 'Bernan','Ximena','1992-07-08','Femenino','jimenez_ximena@outlook.com', 'jixi', '$2a$10$O5nEUUHAoyNN9TprE6xlReX5QYCFFsb.mi6/wuLiNNkPkHu8d56ye', true, '2020-05-25',1);
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('15389672','Loza', 'Benavidez','Rosalia','2000-02-13','Masculino','loza_rosalia@yahoo.com', 'loro', '$2a$10$N7fpwCjH515F34wVfI4nD.6WiCWwiIOeIDGVNIbIlGsipLtfWnt2e', true, '2020-05-25',2);

# CATEGORIAS
INSERT INTO categorias (nombre, descripcion) VALUES ('Elecciones','Temporadas para las elecciones electorales dentro la UMSA');
INSERT INTO categorias (nombre, descripcion) VALUES ('Materias','Materias dentro de tu carrera');
INSERT INTO categorias (nombre, descripcion) VALUES ('Docentes','Opinion respecto a docentes');
INSERT INTO categorias (nombre, descripcion) VALUES ('Otros','Otros');

# ROLES
INSERT INTO roles (nombre) VALUES ('ROLE_USER');
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');

#D ASIGNAR ROLES A LOS USUARIOS DE PRUEBA
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,2);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (3,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (4,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (5,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (6,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (7,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (8,1);


#D ENCUESTA CLASES VIRTUALES
insert into encuestas (create_at, uid, fecha_fin, fecha_ini, tipo, titulo, descripcion, categoria_id, usuario_id) values ('2021-01-16', 'e50c69de-547f-425e-9532-eff2794e49a4', '2021-04-30 01:00:00', '2021-01-16 01:00:00', 'Abierto', 'Clases Virtuales','Encuesta para saber la opinion de los estudiantes respecto a las satisfaccion de las clases virtuales.', 1, 3);
insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2021-01-16', '¿Que te parecio las clases en modalidad presencial?', 1, 'Parrafo');
insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2021-01-16', 'Califica del 1 al 10 las clases virtuales en cuanto a calidad', 1, 'Escala Lineal');
insert into opciones (max_value, min_value, tipo) values (10, 1, 5);
insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2021-01-16', '¿Que plataformas utilizaste para tus clases virtuales?', 1, 'Casillas de Verificacion');
insert into opciones (texto, tipo) values ('Zoom', 3);
insert into opciones (texto, tipo) values ('Microsoft Teams', 3);
insert into opciones (texto, tipo) values ('Jitsi', 3);
insert into opciones (texto, tipo) values ('Google Meet', 3);
insert into opciones (texto, tipo) values ('Otros', 3);
insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2021-01-16', '¿Que plataforma usaste con mas frecuencia?', 1, 'Opcion Multiple');
insert into opciones (texto, tipo) values ('Zoom', 3);
insert into opciones (texto, tipo) values ('Microsoft Teams', 3);
insert into opciones (texto, tipo) values ('Jitsi', 3);
insert into opciones (texto, tipo) values ('Google Meet', 3);
insert into opciones (texto, tipo) values ('Otros', 3);
insert into preguntas_opciones (pregunta_id, opcion_id) values (2, 1);
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 2);
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 3);
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 4);
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 5);
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 6);
insert into preguntas_opciones (pregunta_id, opcion_id) values (4, 7);
insert into preguntas_opciones (pregunta_id, opcion_id) values (4, 8);
insert into preguntas_opciones (pregunta_id, opcion_id) values (4, 9);
insert into preguntas_opciones (pregunta_id, opcion_id) values (4, 10);
insert into preguntas_opciones (pregunta_id, opcion_id) values (4, 11);

#D CARRERAS OBJETIVO
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 1);
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 2);
insert into encuestas_carreras (encuesta_id, carrera_id) values (1, 3);

-- D respuestas usuario 4 Helguero
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (4, 1, 'Dependiendo el docente encargado para que la enseñanza llegue a ser buena');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (4, 2, 7);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (4, 3, 5);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (4, 3, 6);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (4, 4, 10);
-- D respuestas usuario 5 Garcia
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (5, 1, 'Me parecio muy buena en todas las materias');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (5, 2, 4);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 3, 3);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 3, 5);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 3, 6);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 4, 10);
-- D respuestas usuario 6 Gomez
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (6, 1, 'Pesima, prefiero las clases en modalidad presencial');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (6, 2, 1);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (6, 3, 5);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (6, 3, 6);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (6, 4, 11);
-- D respuestas usuario 7 Jimenez
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (7, 1, 'Regular, hubo algunos docentes que no sabian usar las plataformas de comunicacion.');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (7, 2, 5);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 3, 4);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 3, 5);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 3, 6);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 4, 10);
-- D respuestas usuario 8 Loza
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (8, 1, 'Me gusto esta nueva modalidad de enseñanza, es mas moderna y creo que debemos habituarnos');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (8, 2, 10);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (8, 3, 6);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (8, 4, 11);

# VISTAS
create or replace view respuestas_stats_esc as select pregunta_id, num_value as resp, count(1) as resp_count from respuestas where num_value is not null group by pregunta_id, num_value;
create or replace view respuestas_stats_op as select pregunta_id, opcion_id as resp, count(1) as resp_count from respuestas where opcion_id is not null group by pregunta_id, opcion_id;
